"use client";

import { useParams } from "next/navigation";
import { useGlobalState } from "@/context/GlobalContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.png";

// Import icons
import { RiHome3Line, RiFlowChart } from "react-icons/ri";
import {
  TbReportAnalytics,
  TbMessageChatbot,
  TbCalendar,
} from "react-icons/tb";
import { LuBrain, LuUserRound, LuGoal } from "react-icons/lu";
import { FaUsers, FaComments } from "react-icons/fa6";
import { useState, useEffect } from "react";

const menteeSidebarData = [
  {
    category: "dashboard",
    items: [{ title: "overview", route: "/overview", icon: RiHome3Line }],
  },
  {
    category: "career development",
    items: [
      {
        title: "career path",
        route: "/career-development/career-path",
        icon: RiFlowChart,
      },
      {
        title: "find mentor",
        route: "/career-development/find-mentor",
        icon: FaUsers,
      },
      {
        title: "goal tracking",
        route: "/career-development/goals",
        icon: LuGoal,
      },
    ],
  },
  {
    category: "learning",
    items: [
      {
        title: "submissions",
        route: "/learning/submissions",
        icon: TbReportAnalytics,
      },
      {
        title: "resources",
        route: "/learning/resources",
        icon: LuBrain,
      },
      {
        title: "discussions",
        route: "/learning/discussions",
        icon: FaComments,
      },
    ],
  },
  {
    category: "communication",
    items: [
      {
        title: "calendar",
        route: "/communication/calendar",
        icon: TbCalendar,
      },
      {
        title: "messaging",
        route: "/communication/message",
        icon: FaComments,
      },
      // {
      //   title: "chatbot",
      //   route: "/communication/chatbot",
      //   icon: TbMessageChatbot,
      // },
    ],
  },
  {
    category: "settings",
    items: [
      {
        title: "user-profile",
        route: "/settings/profile",
        icon: LuUserRound,
      },
    ],
  },
];

const mentorSidebarData = [
  {
    category: "dashboard",
    items: [{ title: "overview", route: "/overview", icon: RiHome3Line }],
  },
  {
    category: "mentorship",
    items: [
      {
        title: "mentees",
        route: "/mentees",
        icon: FaUsers,
      },
      {
        title: "submissions",
        route: "/submissions",
        icon: TbReportAnalytics,
      },
    ],
  },
  {
    category: "communication",
    items: [
      {
        title: "messaging",
        route: "/communication/message",
        icon: FaComments,
      },
      {
        title: "calendar",
        route: "/communication/calendar",
        icon: TbCalendar,
      },
    ],
  },
  {
    category: "settings",
    items: [
      {
        title: "user-profile",
        route: "/settings/profile",
        icon: LuUserRound,
      },
    ],
  },
];

const Sidebar = () => {
  const { sidebarState } = useGlobalState();
  const { currentLang, dict } = useLanguage();
  const params = useParams();

  // State to store user details from local storage
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });

  // Extract user type from params
  const loginType = params?.role || "mentee";

  // Choose sidebar data based on login type
  const sidebarData =
    loginType === "mentor" ? mentorSidebarData : menteeSidebarData;

  // Effect to retrieve user details from local storage
  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "User";
    const storedEmail = localStorage.getItem("userEmail") || "User email";
    setUserDetails({ name: storedName, email: storedEmail });
  }, []);

  return (
    <div className="relative h-screen max-md:hidden">
      {/* Background with gradient and subtle glow */}
      <div
        className={`absolute inset-0 
          bg-gradient-to-br 
          from-purple-300/50 
          to-lavender-200/50 
          opacity-70 
          blur-lg 
          -z-10 
          shadow-2xl 
          ${sidebarState ? "w-[17rem]" : "w-20"}
        `}
      />

      {/* Sidebar container with enhanced styling */}
      <div
        className={`
          h-screen 
          flex 
          flex-col 
          justify-between 
          py-4 
          bg-purple-100 
          backdrop-blur-xl 
          ${sidebarState ? "w-[17rem] px-2" : "w-20 px-0.5"}
          shadow-[0_10px_50px_-15px_rgba(145,99,203,0.3)] 
          border-r 
          border-purple-200/50
          transition-all 
          duration-300 
          ease-in-out
        `}
      >
        <div className="flex flex-col justify-start items-start">
          <div className="flex justify-between items-center mb-2" id="step1">
            <Image
              src={Logo}
              alt="MentorHer Logo"
              className="h-16 w-auto mb-5 tour-logo"
            />
          </div>

          <nav className="px-2">
            {sidebarData.map((category, index) => (
              <div key={index} className="mb-4">
                {sidebarState && (
                  <p className="text-sm font-semibold text-purple-800 uppercase mb-3">
                    {dict?.sidebar?.[category.category] || category.category}
                  </p>
                )}
                <ul>
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center mb-5"
                      id={`${item.title === "chatbot" ? "amigo" : ""}`}
                    >
                      <Link
                        href={`/${currentLang}/${loginType}${item.route}`}
                        className={`
                          flex 
                          items-center 
                          gap-3 
                          text-purple-700 
                          hover:text-purple-900 
                          hover:bg-purple-200/50 
                          rounded-lg 
                          transition 
                          group 
                          ${sidebarState ? "pl-2 py-1" : "w-14 justify-center"}
                        `}
                      >
                        <span
                          className={`${
                            sidebarState ? "text-xl" : "text-2xl mb-3"
                          } group-hover:text-purple-900`}
                        >
                          <item.icon />
                        </span>
                        {sidebarState && (
                          <span className="text-purple-800 group-hover:font-semibold">
                            {dict?.sidebar?.[item.title] || item.title}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div
          className={`flex ${
            sidebarState ? "justify-start" : "justify-center"
          } items-center px-2`}
        >
          <div className="h-10 w-10 bg-purple-300 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
            {userDetails.name.charAt(0).toUpperCase()}
          </div>

          {sidebarState && (
            <div className="flex flex-col justify-center items-start ml-3">
              <h1 className="text-purple-900 font-semibold">
                {userDetails.name}
              </h1>
              <h3 className="text-[0.75rem] text-purple-700/70 -mt-0.5 font-medium">
                {userDetails.email}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
