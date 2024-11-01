import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

import libraryBeigeIcon from '../assets/images/libraryLight-icon.png';
import libraryYellowIcon from '../assets/images/libraryDark-icon.png';
import studentsBeigeIcon from '../assets/images/classLight-icon.png';
import classDarkIcon from '../assets/images/classDark-icon.png';
import reportsBeigeIcon from '../assets/images/reportLight-icon.png';
import reportsYellowIcon from '../assets/images/reportDark-icon.png';
import settingsBeigeIcon from '../assets/images/settingLight-icon.png';
import settingsYellowIcon from '../assets/images/settingDark-icon.png';
import profileBeigeIcon from '../assets/images/profileLight-icon.png';
import profileYellowIcon from '../assets/images/profileDark-icon.png';
import navButtonIcon from '../assets/images/sideBar-icon.png';
import logoDarkIcon from '../assets/images/logo-icon.png'; // Import the logo icon
import qbankDarkIcon from "../assets/images/qbankDark-icon.png";
import qbankLightIcon from "../assets/images/qbankLight-icon.png";

function Nav({ activeLink, setActiveLink }) {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false); // State to handle collapsing
    const location = useLocation(); // Get the current location

    const links = [
        {
            path: "/teacher/Library",
            text: "Library",
            activeIcon: libraryYellowIcon,
            inactiveIcon: libraryBeigeIcon,
            submenu: [
                {   text: "Question Bank", 
                    path: "/teacher/Library/QuestionBank",
                    activeIcon: qbankDarkIcon,
                    inactiveIcon: qbankLightIcon, }
            ]
        },
        {
            path: "/teacher/Class",
            text: "Class",
            activeIcon: classDarkIcon,
            inactiveIcon: studentsBeigeIcon,
        },
        {
            path: "/teacher/Reports",
            text: "Reports",
            activeIcon: reportsYellowIcon,
            inactiveIcon: reportsBeigeIcon,
        },
        {
            path: "/teacher/Settings",
            text: "Settings",
            activeIcon: settingsYellowIcon,
            inactiveIcon: settingsBeigeIcon,
        },
        {
            path: "/teacher/Profile",
            text: "Profile",
            activeIcon: profileYellowIcon,
            inactiveIcon: profileBeigeIcon,
        }
    ];

    const handleLinkClick = (index) => {
        setActiveLink(index);
    };

    const handleLibraryClick = () => {
        setShowSubmenu(prevState => !prevState); // Toggle submenu visibility
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed); // Toggle collapse state
    };

    return (
        <nav
            className={`${
                isCollapsed
                    ? "relative w-auto"
                    : "fixed sm:relative md:static sm:w-64 md:w-64"
            } sm:fixed md:static md:left-0 md:top-0 h-full sm:z-50 md:z-0 p-5 shadow-custom-darkblue bg-gradient-to-b from-darkp to-midp  flex flex-col border-r transition-all duration-300`}
        >
            <div className="flex-grow">
                <div className="flex items-center space-x-2">
                    <img src={logoDarkIcon} alt="Logo" className="w-8 h-8" />
                    {!isCollapsed && (
                        <h1 className="text-2xl font-bold text-custom-textcolor">
                            KWISAYSAYAN
                        </h1>
                    )}
                </div>

                <div className="space-y-8 mt-14">
                    {links.map((link, index) => (
                        <div key={index}>
                            {/* For Library, toggle the submenu on click */}
                            <Link
                                to={link.path}
                                className={`flex items-center rounded-full ${
                                    location.pathname.startsWith(link.path) // Use startsWith instead of strict equality check
                                        ? "text-darkp font-semibold bg-custom-brownbg" // Selected link styling
                                        : "font-semibold text-custom-brownbg"
                                } hover:bg-white hover:text-darkp text-lg`}
                                onClick={() => {
                                    handleLinkClick(index);
                                    if (link.submenu) handleLibraryClick(); // Toggle submenu for links with submenu
                                }}
                            >
                                {link.activeIcon && (
                                    <img
                                        src={
                                            location.pathname.startsWith(link.path) // Use startsWith here too
                                                ? link.activeIcon
                                                : link.inactiveIcon
                                        }
                                        alt={link.text}
                                        className="w-5 h-5 m-2"
                                    />
                                )}
                                {!isCollapsed && <span>{link.text}</span>}
                            </Link>

                            {/* Render Submenu if showSubmenu is true and this is the Library link */}
                            {link.submenu && showSubmenu && (
                                <div className=" mt-8 space-y-8">
                                    {link.submenu.map((sublink, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            to={sublink.path}
                                            className={`flex items-center rounded-full ${
                                                location.pathname.startsWith(sublink.path)
                                                    ? "text-darkp font-semibold bg-custom-brownbg"
                                                    : "font-semibold text-custom-brownbg"
                                            } hover:bg-white hover:text-darkp text-lg`}
                                            onClick={() => handleLinkClick(index)}
                                        >
                                            <img
                                                src={
                                                    location.pathname.startsWith(sublink.path)
                                                        ? sublink.activeIcon
                                                        : sublink.inactiveIcon
                                                }
                                                alt={sublink.text}
                                                className="w-5 h-5 m-2"
                                            />
                                            {!isCollapsed && <span>{sublink.text}</span>}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Collapse/Expand Button at the bottom */}
            <div className="mt-auto">
                <button
                    onClick={toggleCollapse}
                    className="bg-custom-textcolor p-0 rounded-lg"
                >
                    <img
                        src={navButtonIcon}
                        alt="Collapse/Expand Navigation"
                        className="w-6 h-6"
                    />
                </button>
            </div>
        </nav>
    );
}

export default Nav;
