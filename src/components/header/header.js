import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import titleLogo from "../../images/title.png"

import "./header.css"

const Header = ({ siteTitle, tagline, author, contacts }) => {

  return (
    <header className="head-main">
      <div className="head-elements"
        style={{
          margin: `0`,
          padding: `.75rem`
        }}
      >
        <h1 className="head-logo ml-4" style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
{/*             <img src={titleLogo} style={{ maxWidth: `400px` }} alt="title" /> */}
          </Link>
        </h1>
      </div>
    </header>
  )
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header
