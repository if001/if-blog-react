import React from "react"
import {
    FaGithubSquare,
    FaTwitterSquare
} from "react-icons/fa"
import "./sidebar.css"


const SocialLinks = ({contacts}) => {
    return (
        <div>
            <h4 className="mt-4 mb-1">Social</h4>
            <div className="side-social-links float-left mt-1 mb-1">
                <a className="text-secondary p-2"
                   href={contacts.github}>
                <span title="GitHub">
                    <FaGithubSquare size={26} style={{color: "secondary"}}/>
                </span>
                </a>
                <a className="text-secondary p-2"
                   href={contacts.twitter}>
                <span title="Twitter">
                    <FaTwitterSquare size={26} style={{color: "secondary"}}/>
                </span>
                </a>
            </div>
        </div>
    )
};

export default SocialLinks;