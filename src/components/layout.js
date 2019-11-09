/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import Header from "./header/header"
import "./layout.css"
import "./my_layout.css"

const Layout = ({ children }) => {

  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            tagline
            author
            contacts {
              linkedin
              github
              stackoverflow
              freecodecamp
              twitter
            }
          }
        }
      }
    `}
      render={data => (
        <>
          <Header
            siteTitle={data.site.siteMetadata.title}
            tagline={data.site.siteMetadata.tagline}
            author={data.site.siteMetadata.author}
            contacts={data.site.siteMetadata.contacts} />
          <div
            style={{
                margin: `0 auto`,
                backgroundColor: "rgb(238, 238, 238)"
            }}
          >
            <main className="xs-padding sm-lt-padding">{children}</main>
            <footer className="text-center">
              <hr/>
              <p className="d-inline">© 2017 <a className="text-info" href="https://willjw3.github.io/">if-blog.site</a>, All Rights Reserved.</p>
              <p className="mt-5 text-muted d-inline"><i> Built with
                            {` `}
                <a className="text-info" href="https://www.gatsbyjs.org">Gatsby</a></i>
              </p>
            </footer>
          </div>
        </>
      )}
    />
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout
