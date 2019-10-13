import React from "react";
import TechTag from "./TechTag";

const GetTechTags = (tags, labels) => {
    const techTags = [];
    tags.forEach((tag, i) => {
        let isInclude = false;
        labels.forEach((label) => {
            if (tag === label.tag) {
                isInclude = true;
                techTags.push(<TechTag key={i} tag={label.tag} tech={label.tech} name={label.name} size={label.size} color={label.color} />)
            }
        });
        if (!isInclude) {
            techTags.push(<TechTag key={i} tag={tag} tech={tag} name={"FaTools"} size={17} color={"black"} />)
        }
    });
    return techTags
};
export default GetTechTags