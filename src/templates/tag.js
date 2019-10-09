import React from "react"
import PropTypes from "prop-types"
import {Link, graphql} from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import "../pages/index.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"
import TechTag from "../components/tags/TechTag"
import GetTechTags from "../components/tags/GetTechTag";

const Tag = ({pageContext, data}) => {
    const posts = data.allMarkdownRemark.edges;
    const labels = data.site.siteMetadata.labels;
    const {tag} = pageContext;
    const {totalCount} = data.allMarkdownRemark;
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`;

    const getTechTags = (tags) => {
        return GetTechTags(tags, labels);
    };

    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `javascript`, `react`, `web development`, `node.js`, `graphql`]}/>
            <div className="container-fluid">
                <div className="post-list-main">
                    <div className="row">
                        <div className="col-12 col-xl-9 col-lg-9 mb-5">
                            <i><h2 className="heading">{tagHeader}</h2></i>
                            {posts.map((post) => {
                                const tags = post.node.frontmatter.tags;
                                return (
                                    <div key={post.node.id} className="container card p-3 mb-5">
                                        <Link
                                            to={post.node.fields.slug}
                                            className="text-dark"
                                        >
                                            <h2 className="heading">{post.node.frontmatter.title}</h2>
                                        </Link>
                                        <small className="d-block text-info">{post.node.frontmatter.date}
                                        </small>
                                        <p className="mt-3 d-inline">{post.node.excerpt}</p>
                                        <div className="d-block">
                                            {getTechTags(tags)}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="col-12 col-xl-3 col-lg-3">
                            <div className="px-4 py-2">
                                <Sidebar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

Tag.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
};

export const pageQuery = graphql`
  query($tag: String) {
    site {
        siteMetadata {
            title 
            author
            labels {
                tag
                tech 
                name 
                size 
                color
            } 
        }
    } 
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
         node {
            excerpt(pruneLength: 200)
            html
            id
            frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                tags
            }
             fields {
                slug
            }
        }
      }
    }
  }
`;

export default Tag