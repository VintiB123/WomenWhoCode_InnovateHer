"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Search,
  Clock,
  Users,
  Briefcase,
  MapPin,
  Sparkles,
  Filter,
  Star,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const mentors = [
  {
    id: 1,
    name: "Smita Iyer",
    image: "/placeholder/rajesh-iyer.png",
    skills: ["Python", "AI", "Web Development"],
    hourRate: 24,
    experience: 15,
    availability: "Available",
    location: "Bangalore, India",
    communicationModes: ["Zoom", "Skype"],
    expertiseDomains: ["Software Engineering", "Machine Learning"],
    mentoringFocus: ["Career Growth", "Technical Skills"],
    description:
      "Seasoned software engineer with 15 years of experience in building web applications and AI models. Passionate about mentoring aspiring developers and sharing industry insights.",
  },
  {
    id: 2,
    name: "Prachi Shah",
    image: "/placeholder/priya-sharma.png",
    skills: ["React", "Frontend Development", "UI/UX"],
    hourRate: 35,
    experience: 8,
    availability: "Busy",
    location: "Mumbai, India",
    communicationModes: ["Google Meet", "Slack"],
    expertiseDomains: ["Product Design", "User Experience"],
    mentoringFocus: ["Career Transition", "Design Thinking"],
    description:
      "Creative frontend developer with a passion for building intuitive user interfaces. Experienced in helping professionals transition into tech design roles.",
  },
  {
    id: 3,
    name: "Amrita Verma",
    image: "/placeholder/amit-verma.png",
    skills: ["Machine Learning", "AI", "Data Science"],
    hourRate: 50,
    experience: 12,
    availability: "Available",
    location: "Hyderabad, India",
    communicationModes: ["Zoom", "Discord"],
    expertiseDomains: ["AI Research", "Data Engineering"],
    mentoringFocus: ["Technical Deep Dives", "Research Guidance"],
    description:
      "AI research scientist with extensive experience in machine learning algorithms and data-driven solutions. Dedicated to mentoring the next generation of AI professionals.",
  },
];

const MentorCard = ({ mentor, onClick, highlighted = false }) => {
  return (
    <Card
      className={`w-full transition-all duration-300 
        ${
          highlighted
            ? "border-purple-400 bg-purple-50/70 hover:bg-purple-100/80 shadow-lg"
            : "border-neutral-200 bg-white hover:bg-neutral-50 hover:shadow-md"
        }
        overflow-hidden`}
      onClick={onClick}
    >
      <CardHeader
        className="flex flex-row items-center space-x-4 pb-3 
        border-b border-neutral-200/50"
      >
        <Avatar className="w-20 h-20 ring-4 ring-purple-200/50">
          <AvatarImage src={mentor.image} alt={mentor.name} />
          <AvatarFallback className="bg-purple-100 text-purple-800 font-bold">
            {mentor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">
                {mentor.name}
              </h3>
              <Badge
                variant={
                  mentor.availability === "Available"
                    ? "default"
                    : mentor.availability === "Busy"
                    ? "secondary"
                    : "destructive"
                }
                className="mt-1 text-xs"
              >
                {mentor.availability}
              </Badge>
            </div>
            <div className="flex items-center text-amber-500">
              {[...Array(Math.min(Math.floor(mentor.experience / 3), 5))].map(
                (_, i) => (
                  <Star key={i} size={18} className="fill-current" />
                )
              )}
            </div>
          </div>
          <div className="flex items-center text-neutral-600 text-sm mt-1 space-x-2">
            <MapPin size={14} className="text-purple-600" />
            <span>{mentor.location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {mentor.skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-purple-700 border-purple-300 bg-purple-50 hover:bg-purple-100"
            >
              {skill}
            </Badge>
          ))}
        </div>
        <p className="text-sm mb-4 line-clamp-3 text-neutral-700">
          {mentor.description}
        </p>
        <div className="flex justify-between items-center pt-3 border-t border-neutral-200">
          <div className="flex items-center space-x-2 text-neutral-800">
            <Clock size={16} className="text-purple-600" />
            <span className="text-sm font-medium">${mentor.hourRate}/hr</span>
          </div>
          <div className="flex items-center space-x-2 text-neutral-800">
            <Briefcase size={16} className="text-purple-600" />
            <span className="text-sm font-medium">
              {mentor.experience} years exp
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

MentorCard.propTypes = {
  mentor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    hourRate: PropTypes.number.isRequired,
    experience: PropTypes.number.isRequired,
    availability: PropTypes.oneOf(["Available", "Busy", "Offline"]).isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  highlighted: PropTypes.bool,
};

const FindMentor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [aiMatchInput, setAiMatchInput] = useState("");
  const [aiRecommendations, setAiRecommendations] = useState([]);

  const allSkills = [
    "Python",
    "AI",
    "Web Development",
    "Cybersecurity",
    "Cloud Computing",
    "UI/UX",
    "React",
    "Data Science",
    "Machine Learning",
    "Frontend Development",
  ];

  const getAiRecommendations = () => {
    if (!aiMatchInput.trim()) return [];

    const recommendations = mentors
      .map((mentor) => {
        let matchScore = 0;

        const inputLower = aiMatchInput.toLowerCase();
        const mentorTextToMatch = [
          mentor.name.toLowerCase(),
          mentor.description.toLowerCase(),
          mentor.skills.join(" ").toLowerCase(),
          mentor.expertiseDomains?.join(" ").toLowerCase() || "",
          mentor.mentoringFocus?.join(" ").toLowerCase() || "",
        ].join(" ");

        const keywords = inputLower.split(/\s+/);
        keywords.forEach((keyword) => {
          if (mentorTextToMatch.includes(keyword)) {
            matchScore += 5;
          }
        });

        const inputSkills = keywords.filter((k) =>
          allSkills.map((s) => s.toLowerCase()).includes(k)
        );
        inputSkills.forEach((skill) => {
          if (mentor.skills.some((s) => s.toLowerCase() === skill)) {
            matchScore += 10;
          }
        });

        if (mentor.availability === "Available") {
          matchScore += 3;
        }

        if (mentor.experience > 5) {
          matchScore += 2;
        }

        return { ...mentor, matchScore };
      })
      .filter((m) => m.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);

    return recommendations;
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => mentor.skills.includes(skill));
    const matchesAvailability =
      !selectedAvailability || mentor.availability === selectedAvailability;

    return matchesSearch && matchesSkills && matchesAvailability;
  });

  const handleAiMatch = () => {
    const recommendations = getAiRecommendations();
    setAiRecommendations(recommendations);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-[1fr_400px] divide-x divide-neutral-200">
        {/* Left Section - Mentor Exploration */}
        <div className="p-10">
          <div className="flex justify-between items-center mb-8">
            {/* <h1 className="text-4xl font-extrabold text-neutral-900">Find Your Mentor</h1> */}
            <div className="flex items-center space-x-3">
              <Filter className="text-purple-600" />
              <span className="text-neutral-600 font-medium">
                {filteredMentors.length} Mentors
              </span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <Label className="text-neutral-700 mb-2">Search</Label>
              <Input
                placeholder="Name or skill"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-neutral-100 border-neutral-300"
                prefix={<Search className="text-neutral-500" />}
              />
            </div>
            <div>
              <Label className="text-neutral-700 mb-2">Skills</Label>
              <Select
                value={selectedSkills.join(",")}
                onValueChange={(value) => setSelectedSkills(value.split(","))}
                multiple
              >
                <SelectTrigger className="bg-neutral-100 border-neutral-300">
                  <SelectValue placeholder="Select skills" />
                </SelectTrigger>
                <SelectContent>
                  {allSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-neutral-700 mb-2">Availability</Label>
              <Select
                value={selectedAvailability}
                onValueChange={setSelectedAvailability}
              >
                <SelectTrigger className="bg-neutral-100 border-neutral-300">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {["Available", "Busy", "Offline"].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onClick={() => setSelectedMentor(mentor)}
              />
            ))}
          </div>
        </div>

        {/* Right Section - AI Matcher */}
        <div className="bg-purple-50/50 p-8">
          <div className="text-center mb-6">
            <Sparkles className="mx-auto text-purple-600 mb-3" size={40} />
            <h2 className="text-2xl font-bold text-neutral-900">
              AI Mentor Matcher
            </h2>
            <p className="text-neutral-600 mt-2">
              Describe your goals and get personalized mentor recommendations
            </p>
          </div>

          <Textarea
            placeholder="Share your learning objectives, career aspirations, or skills you want to develop..."
            className="h-48 mb-4 bg-white border-neutral-300 focus:ring-purple-500"
            value={aiMatchInput}
            onChange={(e) => setAiMatchInput(e.target.value)}
          />

          <Button
            onClick={handleAiMatch}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Find Best Matches
          </Button>

          {/* AI Recommendations */}
          {aiRecommendations.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                AI Recommended Mentors
              </h3>
              <div className="space-y-4">
                {aiRecommendations.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    highlighted
                    onClick={() => setSelectedMentor(mentor)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindMentor;
