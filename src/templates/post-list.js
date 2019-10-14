import React from "react"
import {Link, graphql} from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import "../pages/index.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"
import GetTechTags from "../components/tags/GetTechTag"
import {FaArrowRight, FaArrowLeft, FaTags} from "react-icons/fa";

const PostList = (props) => {
    const posts = props.data.allMarkdownRemark.edges;
    const labels = props.data.site.siteMetadata.labels;
    const {currentPage, numPages} = props.pageContext;
    const isFirst = (currentPage === 1 || currentPage == null);
    const isLast = (currentPage === numPages || numPages == null);
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();
    const siteName = props.data.site.siteMetadata.title;

    const getTechTags = (tags) => {
        return GetTechTags(tags, labels);
    };

    return (
        <Layout>
            <SEO title={siteName} keywords={[`gatsby`, `javascript`, `react`, `web development`, `blog`, `graphql`]}/>
            <div className="container-fluid">
                <div className="post-list-main">
                    <div className="row">
                        <div className="col-12 col-xl-9 col-lg-9 mb-5">
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
                            <div className="text-center mt-4">
                                {isFirst && (
                                    <span className="mr-4" style={{color: "gray"}}><FaArrowLeft/> Prev</span>
                                )}
                                {!isFirst && (
                                    <Link to={prevPage} rel="prev" style={{textDecoration: `none`}}>
                                        <span className="text-dark mr-4"><FaArrowLeft/> Prev</span>
                                    </Link>
                                )}
                                {isLast && (
                                    <span className="ml-4" style={{color: "gray"}}>Next <FaArrowRight/></span>
                                )}
                                {!isLast && (
                                    <Link to={nextPage} rel="next" style={{textDecoration: `none`}}>
                                        <span className="text-dark ml-4">Next <FaArrowRight/></span>
                                    </Link>
                                )}
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

export const listQuery = graphql`
				 query paginateQuery($skip: Int!, $limit: Int!) {
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
						 limit: $limit
						 skip: $skip
						 sort: { fields: [frontmatter___date], order: DESC }
						 filter: { frontmatter: { published: { eq: true } } }
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

export default PostList
