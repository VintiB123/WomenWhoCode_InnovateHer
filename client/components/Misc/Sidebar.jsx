// "use client";

// import { useGlobalState } from "@/context/GlobalContext";
// import { useLanguage } from "@/context/LanguageContext";
// import { sidebarData } from "@/constants/sidebarData";
// import Image from "next/image";
// import Link from "next/link";
// import Logo from "@/public/images/logo.png";
// import { UserButton, useUser } from "@clerk/nextjs";
// import SmallLoader from "./SmallLoader";

// const Sidebar = () => {
//   const { sidebarState } = useGlobalState();
//   const { currentLang, dict } = useLanguage();
//   const { user, isLoaded } = useUser();

//   return (
//     <div className="relative h-screen max-md:hidden">
//       <div
//         className={`absolute inset-0 bg-gradient-to-br from-teal-500/70 to-teal-300/70 opacity-50 blur-lg -z-10 ${
//           sidebarState ? "w-[17rem]" : "w-20"
//         }`}
//       />

//       <div
//         className={`h-screen flex flex-col justify-between py-4 bg-teal-100 backdrop-blur-lg ${
//           sidebarState ? "w-[17rem] px-2" : "w-20 px-0.5"
//         } shadow-xl`}
//       >
//         <div className="flex flex-col justify-start items-start">
//           <div className="flex justify-between items-center mb-2" id="step1">
//             <Image
//               src={Logo}
//               alt="Event Discovery Logo"
//               className="h-20 w-auto mb-5 tour-logo"
//             />
//           </div>

//           <nav className="px-2">
//             {sidebarData.map((category, index) => (
//               <div key={index} className="mb-4">
//                 {sidebarState && (
//                   <p className="text-sm font-semibold text-teal-800 uppercase mb-3">
//                     {dict?.sidebar?.[category.category] || category.category}
//                   </p>
//                 )}
//                 <ul>
//                   {category.items.map((item, itemIndex) => (
//                     <li
//                       key={itemIndex}
//                       className="flex items-center mb-5"
//                       id={`${item.title === "chatbot" ? "amigo" : ""}`}
//                     >
//                       <Link
//                         href={`/${currentLang}${item.route}`}
//                         className={`flex items-center gap-3 text-golden-500 hover:text-golden-400 hover:font-medium transition ${
//                           sidebarState ? "pl-2" : "w-14 justify-center"
//                         }`}
//                       >
//                         <span
//                           className={`${
//                             sidebarState ? "text-xl" : "text-2xl mb-3"
//                           }`}
//                         >
//                           <item.icon />
//                         </span>
//                         {sidebarState && (
//                           <span className="text-100">
//                             {dict?.sidebar?.[item.title]}
//                           </span>
//                         )}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </nav>
//         </div>

//         {!isLoaded ? (
//           <SmallLoader />
//         ) : (
//           <div
//             className={`flex ${
//               sidebarState ? "justify-start" : "justify-center"
//             } items-center px-2`}
//           >
//             <UserButton
//               afterSignOutUrl={`/${currentLang}`}
//               appearance={{
//                 elements: {
//                   userButtonAvatarBox: { height: "40px", width: "40px" },
//                 },
//               }}
//             />

//             {sidebarState && (
//               <div className="flex flex-col justify-center items-start ml-3">
//                 <h1 className="text-teal-500 font-semibold">
//                   {user?.fullName || "User"}
//                 </h1>
//                 <h3 className="text-[0.75rem] text-tan-600 -mt-0.5 font-medium">
//                   {user?.primaryEmailAddress?.emailAddress || "User email"}
//                 </h3>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

"use client";

import { useParams } from "next/navigation";
import { useGlobalState } from "@/context/GlobalContext";
import { useLanguage } from "@/context/LanguageContext";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.png";
import SmallLoader from "./SmallLoader";

// Import icons
import { RiHome3Line, RiFlowChart } from "react-icons/ri";
import {
  TbReportAnalytics,
  TbMessageChatbot,
  TbCalendar,
} from "react-icons/tb";
import { LuBrain, LuUserRound, LuGoal } from "react-icons/lu";
import { FaUsers, FaComments } from "react-icons/fa6";

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
      {
        title: "chatbot",
        route: "/communication/chatbot",
        icon: TbMessageChatbot,
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
        title: "communication",
        route: "/communication",
        icon: FaComments,
      },
      {
        title: "calendar",
        route: "/calendar",
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
  const { user, isLoaded } = useUser();
  const params = useParams();

  // Extract user type from params
  // Assumes the route is structured like /mentee/... or /mentor/...
  const loginType = params?.type?.[0] || "mentee";

  // Choose sidebar data based on login type
  const sidebarData =
    loginType === "mentor" ? mentorSidebarData : menteeSidebarData;

  return (
    <div className="relative h-screen max-md:hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-500/70 to-lavender-500/70 opacity-50 blur-lg -z-10 ${
          sidebarState ? "w-[17rem]" : "w-20"
        }`}
      />

      <div
        className={`h-screen flex flex-col justify-between py-4 bg-ivoryWhite-600 backdrop-blur-lg ${
          sidebarState ? "w-[17rem] px-2" : "w-20 px-0.5"
        } shadow-xl border-r border-border`}
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
                  <p className="text-sm font-semibold text-purple-700 uppercase mb-3">
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
                        className={`flex items-center gap-3 text-purple-600 hover:text-purple-700 hover:font-medium transition group ${
                          sidebarState ? "pl-2" : "w-14 justify-center"
                        }`}
                      >
                        <span
                          className={`${
                            sidebarState ? "text-xl" : "text-2xl mb-3"
                          } group-hover:text-purple-800`}
                        >
                          <item.icon />
                        </span>
                        {sidebarState && (
                          <span className="text-muted-foreground group-hover:text-foreground">
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

        {!isLoaded ? (
          <SmallLoader />
        ) : (
          <div
            className={`flex ${
              sidebarState ? "justify-start" : "justify-center"
            } items-center px-2`}
          >
            <UserButton
              afterSignOutUrl={`/${currentLang}`}
              appearance={{
                elements: {
                  userButtonAvatarBox: { height: "40px", width: "40px" },
                },
              }}
            />

            {sidebarState && (
              <div className="flex flex-col justify-center items-start ml-3">
                <h1 className="text-primary font-semibold">
                  {user?.fullName || "User"}
                </h1>
                <h3 className="text-[0.75rem] text-muted-foreground -mt-0.5 font-medium">
                  {user?.primaryEmailAddress?.emailAddress || "User email"}
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
