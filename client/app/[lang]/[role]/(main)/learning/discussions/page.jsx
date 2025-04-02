"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  MessageSquare,
  Users,
  BookOpen,
  Code,
  Lightbulb,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  ChevronRight,
  Filter,
  Send,
  X,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";

const page = () => {
  const { dict, currentLang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showPostBox, setShowPostBox] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "all",
  });
  const [filterOptions, setFilterOptions] = useState({
    sortBy: "recent",
    timeRange: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [comment, setComment] = useState("");

  // Mock data for discussion categories
  const categories = [
    {
      id: "all",
      name: "All Discussions",
      icon: MessageSquare,
      count: 156,
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "mentorship",
      name: "Mentorship",
      icon: Users,
      count: 45,
      color: "bg-lavender-100 text-lavender-700",
    },
    {
      id: "courses",
      name: "Courses",
      icon: BookOpen,
      count: 38,
      color: "bg-amber-50 text-amber-700",
    },
    {
      id: "technical",
      name: "Technical",
      icon: Code,
      count: 42,
      color: "bg-blue-50 text-blue-700",
    },
    {
      id: "career",
      name: "Career Advice",
      icon: Lightbulb,
      count: 31,
      color: "bg-green-50 text-green-700",
    },
  ];

  // Mock data for recent discussions
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "How to prepare for technical interviews?",
      content:
        "I'm preparing for technical interviews and would love to hear about your experiences and tips...",
      author: "Divya Gandhi",
      category: "technical",
      replies: 12,
      views: 245,
      lastReply: "2 hours ago",
      likes: 28,
      dislikes: 3,
      authorImage:
        "https://ui-avatars.com/api/?name=Divya+Gandhi&background=random",
      comments: [
        {
          id: 1,
          author: "Zoe Mathews",
          content: "Great question! I recommend practicing with LeetCode...",
          timestamp: "1 hour ago",
          likes: 5,
        },
      ],
    },
    {
      id: 2,
      title: "Looking for a mentor in UI/UX Design",
      content:
        "I'm interested in finding a mentor who can guide me through UI/UX design principles...",
      author: "Jeel Doshi",
      category: "mentorship",
      replies: 8,
      views: 189,
      lastReply: "4 hours ago",
      likes: 15,
      dislikes: 0,
      authorImage:
        "https://ui-avatars.com/api/?name=Jeel+Doshi&background=random",
      comments: [],
    },
    {
      id: 3,
      title: "Best practices for career transition",
      content:
        "I'm planning to transition from marketing to product management. Any advice?",
      author: "Maria Garcia",
      category: "career",
      replies: 15,
      views: 312,
      lastReply: "5 hours ago",
      likes: 42,
      dislikes: 2,
      authorImage:
        "https://ui-avatars.com/api/?name=Maria+Garcia&background=random",
      comments: [],
    },
    {
      id: 4,
      title: "Recommended courses for web development",
      content:
        "What are the best online courses for learning web development in 2025?",
      author: "Vinti Bhatia",
      category: "courses",
      replies: 10,
      views: 278,
      lastReply: "6 hours ago",
      likes: 23,
      dislikes: 1,
      authorImage:
        "https://ui-avatars.com/api/?name=Vinti+Bhatia&background=random",
      comments: [],
    },
  ]);

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;

    const post = {
      id: discussions.length + 1,
      ...newPost,
      author: "Shanaya Malhotra",
      authorImage:
        "https://ui-avatars.com/api/?name=Shanaya+Malhotra&background=random",
      replies: 0,
      views: 0,
      lastReply: "Just now",
      likes: 0,
      dislikes: 0,
      comments: [],
    };

    setDiscussions([post, ...discussions]);
    setNewPost({ title: "", content: "", category: "all" });
    setShowPostBox(false);
  };

  const handleLike = (discussionId) => {
    setDiscussions(
      discussions.map((discussion) =>
        discussion.id === discussionId
          ? { ...discussion, likes: discussion.likes + 1 }
          : discussion
      )
    );
  };

  const handleDislike = (discussionId) => {
    setDiscussions(
      discussions.map((discussion) =>
        discussion.id === discussionId
          ? { ...discussion, dislikes: discussion.dislikes + 1 }
          : discussion
      )
    );
  };

  const handleComment = (discussionId) => {
    if (!comment.trim()) return;

    const newComment = {
      id: discussions.find((d) => d.id === discussionId).comments.length + 1,
      author: "Shanaya Malhotra",
      content: comment,
      timestamp: "Just now",
      likes: 0,
    };

    setDiscussions(
      discussions.map((discussion) =>
        discussion.id === discussionId
          ? {
              ...discussion,
              comments: [...discussion.comments, newComment],
              replies: discussion.replies + 1,
              lastReply: "Just now",
            }
          : discussion
      )
    );
    setComment("");
  };

  const filteredDiscussions = discussions
    .filter(
      (discussion) =>
        activeCategory === "all" || discussion.category === activeCategory
    )
    .filter(
      (discussion) =>
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (filterOptions.sortBy === "recent") {
        return new Date(b.lastReply) - new Date(a.lastReply);
      }
      if (filterOptions.sortBy === "popular") {
        return b.likes - a.likes;
      }
      return 0;
    });

  return (
    <div className="space-y-8">
      {/* Header with Search */}
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold text-purple-900">Discussion Forum</h1> */}
        <div className="relative w-1/3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Create Post Button */}
      <Button
        onClick={() => setShowPostBox(!showPostBox)}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
      >
        {showPostBox ? "Cancel" : "Create New Discussion"}
      </Button>

      {/* Post Creation Box */}
      {showPostBox && (
        <Card className="border-purple-200">
          <CardContent className="p-4 space-y-4">
            <Input
              placeholder="Discussion Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="border-purple-200"
            />
            <Textarea
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              className="min-h-[100px] border-purple-200"
            />
            <div className="flex justify-between items-center">
              <select
                value={newPost.category}
                onChange={(e) =>
                  setNewPost({ ...newPost, category: e.target.value })
                }
                className="border border-purple-200 rounded-md px-3 py-2"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Button
                onClick={handleCreatePost}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="mr-2 h-4 w-4" />
                Post
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              activeCategory === category.id
                ? "border-2 border-purple-500"
                : "border border-gray-200"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-600"
                >
                  {category.count}
                </Badge>
              </div>
              <h3 className="font-medium text-gray-900 mt-3">
                {category.name}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Discussions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-purple-900">
            Recent Discussions
          </h2>
          <Button
            variant="outline"
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <Card className="border-purple-200">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Sort By
                  </label>
                  <select
                    value={filterOptions.sortBy}
                    onChange={(e) =>
                      setFilterOptions({
                        ...filterOptions,
                        sortBy: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-purple-200 rounded-md px-3 py-2"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {filteredDiscussions.map((discussion) => (
            <Card
              key={discussion.id}
              className="hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={discussion.authorImage}
                        alt={discussion.author}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-purple-900 hover:text-purple-700 cursor-pointer">
                        {discussion.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Posted by {discussion.author} · {discussion.lastReply}
                      </p>
                      <p className="text-gray-600 mt-2">{discussion.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      {discussion.replies}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp
                        size={16}
                        className="cursor-pointer hover:text-purple-600"
                        onClick={() => handleLike(discussion.id)}
                      />
                      {discussion.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsDown
                        size={16}
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleDislike(discussion.id)}
                      />
                      {discussion.dislikes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {discussion.views}
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {selectedDiscussion === discussion.id && (
                  <div className="mt-4 border-t pt-4">
                    <div className="space-y-4">
                      {discussion.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <Image
                              src={`https://ui-avatars.com/api/?name=${comment.author}&background=random`}
                              alt={comment.author}
                              width={32}
                              height={32}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {comment.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {comment.content}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <ThumbsUp
                                size={14}
                                className="cursor-pointer hover:text-purple-600"
                              />
                              <span className="text-xs text-gray-500">
                                {comment.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Input
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => handleComment(discussion.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Toggle Comments Button */}
                <Button
                  variant="ghost"
                  className="mt-4 text-purple-600 hover:text-purple-700"
                  onClick={() =>
                    setSelectedDiscussion(
                      selectedDiscussion === discussion.id
                        ? null
                        : discussion.id
                    )
                  }
                >
                  {selectedDiscussion === discussion.id
                    ? "Hide Comments"
                    : "Show Comments"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
