import React from "react"
import "./sidebar.css"

import willjw3 from "../../images/willjw3.jpg"

const Bio = ({ author, tagline }) => {

    return (
        <div className="bio-main w-75">
            {/*<img src={willjw3} style={{ maxWidth: `100px` }} className="profile-img" alt="" />*/}
            <h4 className="mb-3">Author</h4>
            <h5 className="m-2"> {author}</h5>
            <small className="m-2 text-muted">{tagline}</small>
        </div>
    )
};

export default Bio