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
            <div className="row mt-1 mb-1">
                <div className="col-1 ma-2">
                    <a className="text-secondary p-2"
                       href={contacts.github}
                       rel="noopener noreferrer"
                       target="_blank">
                        <span title="GitHub">
                            <FaGithubSquare size={26} style={{color: "secondary"}}/>
                        </span>
                    </a>
                </div>

                <div className="col-1 ma-2">
                    <a className="text-secondary p-2"
                       href={contacts.twitter}
                       rel="noopener noreferrer"
                       target="_blank">
                        <span title="Twitter">
                            <FaTwitterSquare size={26} style={{color: "secondary"}}/>
                        </span>
                    </a>
                </div>

            </div>
        </div>
    )
};

export default SocialLinks;