import React from "react"
import {Link, graphql} from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import "./index.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"
import {FaArrowRight, FaArrowLeft, FaTags} from "react-icons/fa";
import GetTechTags from "../components/tags/GetTechTag";

const IndexPage = ({data}) => {
    const posts = data.allMarkdownRemark.edges;
    const labels = data.site.siteMetadata.labels;
    const currentPage = 1;
    const nextPage = (currentPage + 1).toString();
    const perPage = 10;
    const isNext = data.allMarkdownRemark.totalCount > perPage;

    const getTechTags = (tags) => {
        return GetTechTags(tags, labels);
    };

    return (
        <Layout>
            <SEO title="" keywords={[`gatsby`, `javascript`, `react`, `web development`, `blog`, `graphql`]}/>
            <div className="container-fluid">
                <div className="post-list-main">
                    <div className="row">
                        <div className="col-12 col-xl-9 col-lg-9">
                            {posts.map((post) => {
                                const tags = post.node.frontmatter.tags;
                                return (
                                    <div key={post.node.id} className="container card mb-5 p-3 bg-white">
                                        <Link
                                            to={post.node.fields.slug}
                                            className="text-dark"
                                        >
                                            <h2 className="title">{post.node.frontmatter.title}</h2>
                                        </Link>
                                        <small className="d-block text-info"><i>Published
                                            on {post.node.frontmatter.date}</i>
                                        </small>
                                        <p className="mt-3 d-inline">{post.node.excerpt}</p>

                                        <div className="d-block">
                                            <span className="mr-2"><FaTags/></span>{getTechTags(tags)}
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="mt-4 text-center">
                                <span className="mr-4" style={{color: "gray"}}><FaArrowLeft/> Prev</span>
                                {isNext && (
                                    <Link to={nextPage} rel="next" style={{textDecoration: `none`}}>
                                        <span className="text-dark ml-4">Next <FaArrowRight/></span>
                                    </Link>)
                                }
                                {!isNext && (
                                    <span className="mr-4" style={{color: "gray"}}>Next <FaArrowRight/></span>)
                                }
                            </div>
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

export const pageQuery = graphql`
				 query IndexQuery {
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
						 limit: 10
						 sort: { fields: [frontmatter___date], order: DESC }
						 filter: { frontmatter: { published: { eq: true } } }
					 ) {
						 totalCount
						 edges {
							 node {
								 excerpt(pruneLength: 200)
								 html
								 id
								 tableOfContents
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

export default IndexPage

