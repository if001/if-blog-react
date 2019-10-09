import React from "react"
import GetTechTags from "../tags/GetTechTag";

const TechTags = (props) => {
    const labels = props.labels;
    const posts = props.posts;

    const tags = [];
    posts.forEach((x) => {
        x.node.frontmatter.tags.forEach((y) => {
            if (!tags.includes(y)) {
                tags.push(y);
            }
        })
    });

    const getTechTags = (tags) => {
        return GetTechTags(tags, labels);
    };

    return (
        <>
            <h4 className="mb-2">Tags</h4>
            <div className="d-block">
                {getTechTags(tags)}
            </div>
        </>
    )
};


export default TechTags