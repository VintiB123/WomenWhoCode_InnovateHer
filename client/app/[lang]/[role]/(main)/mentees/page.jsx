"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const MenteeCard = ({ mentee }) => {
  const mentor = {
    name: "John Peterson",
    avatar: "JP",
    status: "Available",
    location: "San Francisco, CA",
    skills: ["Python", "AI", "Web Development", "Machine Learning", "Cloud Computing"],
    description: "Innovative software engineer transforming complex technical challenges into breakthrough solutions. Passionate about mentoring emerging tech talent and driving technological innovation.",
    education: {
      degree: "M.S. Computer Science",
      university: "Stanford University",
      year: "2008"
    },
    certifications: [
      "AWS Solutions Architect",
      "Google Cloud ML Engineer", 
      "Certified Scrum Master"
    ],
    rate: "$24/hr",
    experience: "15 years",
    rating: 4.5
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={`
          ${mentee.color} 
          border-2 border-transparent 
          hover:border-purple-300 
          transition-all duration-300 
          shadow-lg hover:shadow-xl 
          cursor-pointer 
          group
        `}>
          <CardHeader className="flex flex-row items-center space-x-4 p-5">
            <Avatar className="w-20 h-20 border-2 border-purple-100 group-hover:border-purple-300 transition-all">
              <AvatarImage src={mentee.avatar} alt={mentee.name} className="object-cover" />
              <AvatarFallback className="bg-purple-100 text-purple-900 font-bold text-2xl">
                {mentee.name.split(' ').map(name => name.charAt(0)).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-purple-900 mb-1 group-hover:text-purple-700 transition-colors">
                {mentee.name}
              </h2>
              <p className="text-purple-600 font-medium">{mentee.role}</p>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-purple-600">🎓</span>
                <p className="text-sm text-gray-700 font-medium">{mentee.background}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {mentee.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-white border border-purple-200 text-purple-800 hover:bg-purple-100"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl p-0">
        <div className={`grid md:grid-cols-3 gap-6 p-8 ${mentee.color}`}>
          <div className="col-span-1 flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4 border-4 border-white shadow-xl">
              <AvatarImage src={mentee.avatar} alt={mentee.name} className="object-cover" />
              <AvatarFallback className="text-4xl bg-purple-100 text-purple-900">
                {mentee.name.split(' ').map(name => name.charAt(0)).join('')}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-bold text-purple-900">{mentee.name}</h2>
            <p className="text-purple-600 mb-4">{mentee.role}</p>
          </div>
          
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Professional Impact</h3>
              <p className="text-gray-700">{mentee.impact}</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Key Strengths</h3>
              <ScrollArea className="h-32">
                <ul className="space-y-2">
                  {mentee.strengths.map((strength, index) => (
                    <li 
                      key={index} 
                      className="bg-purple-50 px-3 py-2 rounded-md text-purple-800"
                    >
                      {strength}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Future Goals</h3>
              <ScrollArea className="h-32">
                <ul className="space-y-2">
                  {mentee.goals.map((goal, index) => (
                    <li 
                      key={index} 
                      className="bg-purple-50 px-3 py-2 rounded-md text-purple-800"
                    >
                      {goal}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function MenteesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const menteesData = [
    { 
      id: 1,
      name: "Priya Sharma", 
      role: "Junior Designer",
      skills: ["Figma", "UX", "Prototyping"],
      background: "Design graduate from RISD",
      color: "bg-white",
      avatar: "/path/to/priya-avatar.jpg",
      impact: "Redesigned user interface for a leading startup, improving user engagement by 40%",
      strengths: [
        "Creative problem-solving",
        "User-centered design",
        "Rapid prototyping"
      ],
      goals: [
        "Become a UX design lead",
        "Develop expertise in AI-driven design tools",
        "Create inclusive design systems"
      ]
    },
    { 
      id: 2,
      name: "Ananya Patel", 
      role: "Software Engineer",
      skills: ["React", "TypeScript", "Next.js"],
      background: "Computer Science graduate from MIT",
      color: "bg-white",
      avatar: "/path/to/ananya-avatar.jpg",
      impact: "Developed scalable microservices architecture reducing system latency by 35%",
      strengths: [
        "Performance optimization",
        "Full-stack development",
        "Clean code architecture"
      ],
      goals: [
        "Become a technical architect",
        "Contribute to open-source projects",
        "Specialize in distributed systems"
      ]
    },
    { 
      id: 3,
      name: "Ishita Gupta", 
      role: "Data Scientist",
      skills: ["Python", "Machine Learning", "Data Visualization"],
      background: "Statistics graduate from Berkeley",
      color: "bg-white",
      avatar: "/path/to/ishita-avatar.jpg",
      impact: "Developed predictive models that increased business efficiency by 50%",
      strengths: [
        "Statistical analysis",
        "Machine learning algorithms",
        "Data storytelling"
      ],
      goals: [
        "Lead AI innovation projects",
        "Develop ethical AI frameworks",
        "Mentor aspiring data scientists"
      ]
    },
    { 
      id: 4,
      name: "Neha Rajput", 
      role: "Cloud Architect",
      skills: ["AWS", "Kubernetes", "DevOps"],
      background: "Information Systems graduate from CMU",
      color: "bg-white",
      avatar: "/path/to/neha-avatar.jpg",
      impact: "Implemented cloud migration strategy saving 40% on infrastructure costs",
      strengths: [
        "Cloud infrastructure design",
        "Scalability optimization",
        "Security implementation"
      ],
      goals: [
        "Become a cloud innovation leader",
        "Design sustainable cloud solutions",
        "Build resilient multi-cloud architectures"
      ]
    }
  ];

  // Memoized filtered mentees based on search term
  const filteredMentees = useMemo(() => {
    if (!searchTerm) return menteesData;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return menteesData.filter(mentee => 
      mentee.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      mentee.role.toLowerCase().includes(lowerCaseSearchTerm) ||
      mentee.skills.some(skill => skill.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }, [searchTerm, menteesData]);

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-purple-900">
        Our Talented Mentees
      </h1>
      
      {/* Search Input */}
      <div className="mb-8 max-w-md mx-auto relative">
        <Input 
          type="text" 
          placeholder="Search mentees by name, role, or skills" 
          className="pl-10 py-2 border-purple-300 focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" 
          size={20} 
        />
      </div>

      {filteredMentees.length > 0 ? (
        <div className="grid grid-cols-2 gap-8">
          {filteredMentees.map(mentee => (
            <MenteeCard key={mentee.id} mentee={mentee} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl py-12">
          No mentees found matching your search.
        </div>
      )}
    </div>
  );
}