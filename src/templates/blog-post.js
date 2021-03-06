import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./blog-post.css"
import "./codeblock.css"

import CustomShareBlock from "../components/CustomShareBlock"
import GetTechTags from "../components/tags/GetTechTag";
// import RelatedContent from "../components/relatedContent";

const BlogPost = (props) => {
  const post = props.data.markdownRemark;
  const labels = props.data.site.siteMetadata.labels;
  const siteName = props.data.site.siteMetadata.title ;
  const siteUrl = props.data.site.siteMetadata.url;
  const url = `${siteUrl}${props.pageContext.slug}`;
  const tags = post.frontmatter.tags;

  const getTechTags = (tags) => {
    return GetTechTags(tags, labels);
  };
  const tableOfContents = post.tableOfContents;


  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="post-page-main">
        <div className="post-main p-4">
          <SEO title={post.frontmatter.title} />
          <div className="mt-3">
            <h1 className="heading">{post.frontmatter.title}</h1>
            <div className="d-block">
              {getTechTags(tags)}
            </div>
            <br />
            <small className="float-right mr-4"><i></i>Published on {post.frontmatter.date}</small>
            <div className="mt-5" dangerouslySetInnerHTML={{ __html: post.html }} />
            <CustomShareBlock title={post.frontmatter.title} siteName={siteName} url={url} />
          </div>
        </div>

        <div className="table-of-content px-4 py-2">
          {/*<div className="position-fixed">*/}
          <div className="sticky mt-2">
          {tableOfContents.length !== 0 && (
                <>
                  <h3>目次</h3>
                  <div className="table-of-content-inner" dangerouslySetInnerHTML={{__html: tableOfContents}}/>
                </>)
            }
          </div>
        </div>

      </div>
    </Layout>
  )
};

export const query = graphql`
  query($slug: String!) {
      site {
        siteMetadata {
          url
          title
          labels {
              tag
              tech 
              name 
              size 
              color
          }
        }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
      }
      tableOfContents
    }
  }
`;

export default BlogPost
