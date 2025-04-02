"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import {
  Book,
  Video,
  FileText,
  Newspaper,
  Clock,
  ExternalLink,
  Search,
  Filter,
  BookOpen,
  PenTool,
  Code,
  Lightbulb,
  ArrowRight,
  Star,
  Bookmark,
  BookmarkPlus,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const page = () => {
  const { dict, currentLang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [bookmarkedResources, setBookmarkedResources] = useState([]);

  // Mock data to represent resource statistics cards
  const resourceStats = [
    {
      title: "Courses",
      count: 50,
      icon: BookOpen,
      color: "bg-purple-100 text-purple-700",
      buttonColor: "text-purple-700",
      borderColor: "border-purple-200",
    },
    {
      title: "Workshops",
      count: 40,
      icon: PenTool,
      color: "bg-lavender-100 text-lavender-700",
      buttonColor: "text-lavender-700",
      borderColor: "border-lavender-200",
    },
    {
      title: "Articles",
      count: 8,
      icon: Newspaper,
      color: "bg-amber-50 text-amber-700",
      buttonColor: "text-amber-700",
      borderColor: "border-amber-200",
    },
    {
      title: "Certificates",
      count: 3,
      icon: FileText,
      color: "bg-blue-50 text-blue-700",
      buttonColor: "text-blue-700",
      borderColor: "border-blue-200",
    },
  ];

  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      title: "Figma for Beginners",
      author: "Vihaana Khanna",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-alpha.figma.com%2Fhub%2Ffile%2F3404033445%2Fresized%2F800x480%2F0e17c500-4da7-4747-9135-931e6020ff5e-cover.png&f=1&nofb=1&ipt=f9e6581d5594fb066297b26a5a119eaf1817ada8df6e636d7a1064168328383f&ipo=images",
      progress: 25,
      lessons: 40,
    },
    {
      id: 2,
      title: "Complete DSA Course",
      author: "Ishani Kapoor",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.enjoyalgorithms.com%2Fstatic%2Fdsa-course-86355759140596808cd133569c0344b7.png&f=1&nofb=1&ipt=9f2735eee9e21430b54cdf2bac9821345c490efea659fdf55ba5ec1f7e8c2ccb&ipo=images",
      progress: 50,
      lessons: 120,
    },
    {
      id: 3,
      title: "Complete Interview Skills",
      author: "Neha Sharma",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fiblanguages.com%2Fwp-content%2Fuploads%2F2023%2F01%2Fog-interview-skills.jpg&f=1&nofb=1&ipt=50abca75946556b9a56df4a609f3e99309f0ccbba980034a08b2edaecd6b81a2&ipo=images",
      progress: 89,
      lessons: 30,
    },
    {
      id: 4,
      title: "Mastering Managing Project",
      author: "Zahra Khan",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fv2%2Fresize%3Afit%3A1358%2F1*BfhHLm1CYWCxmMlVn2KV8g.png&f=1&nofb=1&ipt=33ec5b7b40d1fc3ec06664cd59edf5657379c0954f5ae1a4fbf3908c2daf8a69&ipo=images",
      progress: 80,
      lessons: 80,
    },
  ];

  // Mock data for recent webinars
  const recentWebinars = [
    {
      id: 1,
      category: "UX Design",
      title: "Getting started design with Wireframing",
      author: "Richa Mehta",
      date: "Dec 16, 2022",
      time: "08:00 - 12:00",
      status: "Join Now",
    },
    {
      id: 2,
      category: "UI Design",
      title: "UI Designer Tasks and Functions",
      author: "Geeta Shah",
      date: "Dec 20, 2022",
      time: "08:00 - 12:00",
      status: "Join Now",
    },
    {
      id: 3,
      category: "UX Design",
      title: "Starting Career as an UX Writer",
      author: "Dhruvi Malik",
      date: "Jan 26, 2023",
      time: "09:00 - 13:00",
      status: "Join Now",
    },
    {
      id: 4,
      category: "UI Design",
      title: "How to become UI Designer",
      author: "Bina Sharma",
      date: "Jan 22, 2023",
      time: "08:00 - 12:00",
      status: "Join Now",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold text-purple-900">
          Course Overview
        </h1> */}

        <div className="relative w-1/3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Resource Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {resourceStats.map((stat, index) => (
          <Card
            key={index}
            className={`border shadow-sm hover:shadow-md transition-shadow duration-200 ${stat.borderColor} rounded-xl overflow-hidden`}
          >
            <CardContent className="p-6 flex justify-between items-start">
              <div className="space-y-1">
                <div className={`p-2 rounded-lg inline-flex ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-gray-600 mt-4">
                  Total {stat.title}
                </h3>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.count}
                </div>
              </div>
              <button
                className={`flex items-center ${stat.buttonColor} text-sm font-medium`}
              >
                See Details <ChevronRight size={15} />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Enrolled Courses */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-purple-900">
            Recent Enrolled Course (12)
          </h2>
          <Button
            variant="link"
            className="text-purple-600 hover:text-purple-800"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {enrolledCourses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 rounded-xl"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                {course.image && (
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              <CardContent className="p-4">
                <div className="mb-3">
                  <p className="text-sm text-gray-500 mb-1">
                    A Course by {course.author}
                  </p>
                  <h3 className="font-semibold text-purple-900 text-base line-clamp-2 h-10">
                    {course.title}
                  </h3>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">{course.progress}%</span>
                    <span className="text-gray-500">
                      {course.lessons} lessons
                    </span>
                  </div>
                  <Progress
                    value={course.progress}
                    className="h-2 bg-gray-100"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Webinars Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-purple-900">
            Recent Enrolled Webinar (8)
          </h2>
          <Button
            variant="link"
            className="text-purple-600 hover:text-purple-800"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentWebinars.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden p-4 hover:shadow-md transition-shadow flex justify-between items-start"
            >
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${webinar.author}&background=random`}
                    alt={webinar.author}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    {webinar.category} · By {webinar.author}
                  </p>
                  <h3 className="font-medium text-purple-900 mb-1">
                    {webinar.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 gap-2">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {webinar.date}
                    </div>
                    <span>·</span>
                    <span>{webinar.time}</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                {webinar.status}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
