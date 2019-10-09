import React from "react"
import "./sidebar.css"

const Bio = ({ author, tagline }) => {

    return (
        <div className="bio-main w-100">
            <h4 className="mb-3">Author</h4>
            <h5 className="m-2"> {author}</h5>
            <small className="m-2 text-muted">{tagline}</small>
        </div>
    )
};

export default Bio