import Layout from "../../Layouts/Layout";

import React, {useState} from 'react';
import { router } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';


function Profile({profile}) {
    const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
    const [aboutMeText, setAboutMeText] = useState(profile?.proAboutMe);

    // Toggle editing mode
    const toggleEditAboutMe = () => {
        setIsEditingAboutMe(!isEditingAboutMe);
    };

    // Save changes (for now just toggles editing mode; extendable for API call)
    const saveAboutMe = () => {
        router.put('/profiles/1', {
            proAboutMe: aboutMeText,
        });
        // You could add an API call here to save changes if needed
        setIsEditingAboutMe(false);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header / Profile Picture */}
                <div className="bg-gray-100 p-6 flex flex-col items-center">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="rounded-full w-32 h-32 mb-4"
                    />
                    <h2 className="text-2xl font-bold">{profile?.proFirstName} {profile?.proLastName}</h2>
                    <p className="text-blue-200 text-sm">{profile?.proPosition}</p>
                </div>

                {/* About Section */}
                <div className="p-6">
                    <SectionTitle title="About Me" onEdit={toggleEditAboutMe} isEditing={isEditingAboutMe} />
                    {isEditingAboutMe ? (
                        <div className="mt-2">
                            <textarea
                                value={aboutMeText}
                                onChange={(e) => setAboutMeText(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                            <button
                                onClick={saveAboutMe}
                                className="mt-2 text-blue-500 hover:underline"
                            >
                                <FontAwesomeIcon icon={faSave} /> Save
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-600 mt-2">{aboutMeText}</p>
                    )}
                </div>

                {/* Skills Section */}
                <div className="p-6 border-t border-gray-200">
                    <SectionTitle title="Skills" />
                    <div className="flex flex-wrap mt-2">
                        <SkillBadge skill="JavaScript" />
                        <SkillBadge skill="React" />
                        <SkillBadge skill="Node.js" />
                        <SkillBadge skill="CSS / Tailwind" />
                        <SkillBadge skill="SQL / NoSQL" />
                    </div>
                </div>

                {/* Experience Section */}
                <div className="p-6 border-t border-gray-200">
                    <SectionTitle title="Experience" />
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                        <li>Senior Developer at Tech Solutions (2021 - Present)</li>
                        <li>Front-End Developer at Web Creators (2018 - 2021)</li>
                        <li>Intern at CodeLab (2017 - 2018)</li>
                    </ul>
                </div>

                {/* Education Section */}
                <div className="p-6 border-t border-gray-200">
                    <SectionTitle title="Education" />
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                        <li>Bachelor of Science in Computer Science, XYZ University (2014 - 2018)</li>
                        <li>Full Stack Web Development Bootcamp, CodeCamp (2019)</li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="p-6 border-t border-gray-200">
                    <SectionTitle title="Contact" />
                    <p className="text-gray-600 mt-2">Email: johndoe@example.com</p>
                    <p className="text-gray-600">Phone: +1 (234) 567-8900</p>
                    <p className="text-gray-600 mt-2">
                        LinkedIn:{' '}
                        <a
                            href="https://linkedin.com/in/johndoe"
                            className="text-blue-500 hover:underline"
                        >
                            linkedin.com/in/johndoe
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ title, onEdit, isEditing }) {
    return (
        <div className="flex items-center justify-between group">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            {/* Toggle between edit and view mode */}
            <FontAwesomeIcon
                icon={isEditing ? faSave : faEdit}
                onClick={onEdit}
                className="text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            />
        </div>
    );
}


function SkillBadge({ skill }) {
    return (
        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full m-1">
          {skill}
        </span>
    );
}


Profile.layout = page => <Layout>{page}</Layout>;
export default Profile;
