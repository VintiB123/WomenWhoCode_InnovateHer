'use client';
import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Users, 
  Briefcase,
  MapPin,
  Sparkles 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const mentors = [
  {
    id: 1,
    name: 'John Peterson',
    image: '/placeholder/john-peterson.png',
    skills: ['Python', 'AI', 'Web Development'],
    hourRate: 24,
    experience: 15,
    availability: 'Available',
    location: 'San Francisco, CA',
    communicationModes: ['Zoom', 'Skype'],
    expertiseDomains: ['Software Engineering', 'Machine Learning'],
    mentoringFocus: ['Career Growth', 'Technical Skills'],
    description: 'Seasoned software engineer with 15 years of experience in building web applications and AI models. Passionate about mentoring aspiring developers and sharing industry insights.'
  },
  {
    id: 2,
    name: 'Elevan Georgi',
    image: '/placeholder/elevan-georgi.png',
    skills: ['Python', 'Cybersecurity', 'Cloud Computing'],
    hourRate: 10,
    experience: 6,
    availability: 'Busy',
    location: 'New York, NY',
    communicationModes: ['Google Meet'],
    expertiseDomains: ['Network Security', 'Cloud Architecture'],
    mentoringFocus: ['Security Best Practices', 'Cloud Migration'],
    description: 'Cybersecurity expert specializing in securing cloud infrastructure and networks. Currently working on cutting-edge security solutions and guiding professionals.'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    image: '/placeholder/sarah-johnson.png',
    skills: ['React', 'UI/UX', 'Frontend Development'],
    hourRate: 35,
    experience: 8,
    availability: 'Available',
    location: 'Seattle, WA',
    communicationModes: ['Zoom', 'Google Meet'],
    expertiseDomains: ['Product Design', 'User Experience'],
    mentoringFocus: ['Design Thinking', 'Career Development'],
    description: 'UI/UX designer with 8 years of experience in creating user-centric web applications. Dedicated to helping designers and developers enhance their craft.'
  },
  {
    id: 4,
    name: 'Michael Smith',
    image: '/placeholder/michael-smith.png',
    skills: ['Data Science', 'Machine Learning'],
    hourRate: 30,
    experience: 10,
    availability: 'Offline',
    location: 'Boston, MA',
    communicationModes: ['Skype'],
    expertiseDomains: ['Data Analysis', 'Predictive Modeling'],
    mentoringFocus: ['Data Visualization', 'Model Deployment'],
    description: 'Data scientist with a decade of experience in advanced analytics and machine learning. Committed to guiding professionals in data-driven decision making.'
  },
];

const MentorCard = ({ mentor, onClick }) => {
  return (
    <Card 
      className="w-full hover:shadow-lg transition-all duration-300 
        border-border hover:border-primary/50 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="w-16 h-16">
          <AvatarImage src={mentor.image} alt={mentor.name} />
          <AvatarFallback className="bg-primary/20 text-primary">
            {mentor.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold text-foreground">{mentor.name}</h3>
            <Badge 
              variant={
                mentor.availability === 'Available' ? 'default' : 
                mentor.availability === 'Busy' ? 'secondary' : 'destructive'
              }
              className="text-xs"
            >
              {mentor.availability}
            </Badge>
          </div>
          <div className="flex items-center text-muted-foreground text-sm space-x-2">
            <MapPin size={14} className="text-primary" />
            <span>{mentor.location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {mentor.skills.map(skill => (
            <Badge key={skill} variant="outline" className="text-primary">
              {skill}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {mentor.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock size={16} className="text-primary" />
            <span className="text-sm">${mentor.hourRate}/hr</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Briefcase size={16} className="text-primary" />
            <span className="text-sm">{mentor.experience} years exp</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FindMentor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [aiMatchInput, setAiMatchInput] = useState('');
  const [aiRecommendations, setAiRecommendations] = useState([]);

  const allSkills = [
    'Python', 'AI', 'Web Development', 'Cybersecurity', 
    'Cloud Computing', 'UI/UX', 'React', 'Data Science', 
    'Machine Learning', 'Frontend Development'
  ];

  // AI-Powered Mentor Matching Algorithm (Same as previous implementation)
  const getAiRecommendations = () => {
    if (!aiMatchInput.trim()) return [];

    const recommendations = mentors.map(mentor => {
      let matchScore = 0;

      const inputLower = aiMatchInput.toLowerCase();
      const mentorTextToMatch = [
        mentor.name.toLowerCase(),
        mentor.description.toLowerCase(),
        mentor.skills.join(' ').toLowerCase(),
        mentor.expertiseDomains.join(' ').toLowerCase(),
        mentor.mentoringFocus.join(' ').toLowerCase()
      ].join(' ');

      const keywords = inputLower.split(/\s+/);
      keywords.forEach(keyword => {
        if (mentorTextToMatch.includes(keyword)) {
          matchScore += 5;
        }
      });

      const inputSkills = keywords.filter(k => allSkills.map(s => s.toLowerCase()).includes(k));
      inputSkills.forEach(skill => {
        if (mentor.skills.some(s => s.toLowerCase() === skill)) {
          matchScore += 10;
        }
      });

      if (mentor.availability === 'Available') {
        matchScore += 3;
      }

      if (mentor.experience > 5) {
        matchScore += 2;
      }

      return { ...mentor, matchScore };
    })
    .filter(m => m.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

    return recommendations;
  };

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.some(skill => mentor.skills.includes(skill));
    const matchesAvailability = !selectedAvailability || 
      mentor.availability === selectedAvailability;
    
    return matchesSearch && matchesSkills && matchesAvailability;
  });

  const handleAiMatch = () => {
    const recommendations = getAiRecommendations();
    setAiRecommendations(recommendations);
  };

  return (
    <div className="container mx-auto px-4 py-2 bg-background text-foreground">
      <div className="flex">
        {/* Left Column - Filters and Mentor Grid */}
        <div className="flex-1 pr-6">
          <h1 className="text-3xl font-bold mb-8 text-center text-primary">Find Your Mentor</h1>
          
          <div className="flex space-x-6">
            {/* Filters Sidebar */}
            <div className="w-64 bg-secondary/10 p-4 rounded-lg border border-border bg-purple-100/30">
              <div className="mb-4">
                <Label className="text-foreground">Search Mentors</Label>
                <div className="relative mt-2">
                  <Input 
                    type="text" 
                    placeholder="Name or skill" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 bg-background border-purple-100/40 text-foreground 
                      focus:ring-primary focus:border-primary"
                  />
                  <Search className="absolute right-3 top-3 text-muted-foreground" />
                </div>
              </div>

              {/* Skills Filter */}
              <div className="mb-4">
                <Label className="text-foreground">Skills</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allSkills.map(skill => (
                    <Button
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      size="sm"
                      className={`
                        ${selectedSkills.includes(skill) 
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                          : 'border-purple-100/40 text-foreground hover:bg-accent hover:text-accent-foreground'}
                      `}
                      onClick={() => 
                        setSelectedSkills(prev => 
                          prev.includes(skill) 
                          ? prev.filter(s => s !== skill)
                          : [...prev, skill]
                        )
                      }
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <Label className="text-foreground">Availability</Label>
                <Select 
                  value={selectedAvailability}
                  onValueChange={setSelectedAvailability}
                >
                  <SelectTrigger className="mt-2 bg-background border-border text-foreground">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {['Available', 'Busy', 'Offline'].map(status => (
                      <SelectItem 
                        key={status} 
                        value={status}
                        className="text-foreground hover:bg-accent"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mentors Grid */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              {filteredMentors.map(mentor => (
                <MentorCard 
                  key={mentor.id} 
                  mentor={mentor}
                  onClick={() => setSelectedMentor(mentor)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - AI Mentor Matcher */}
        <div className="w-80 bg-secondary/10 p-4 rounded-lg border border-border bg-purple-100/30">
          <Label className="text-foreground flex items-center mb-4">
            <Sparkles className="mr-2 text-primary" size={20} />
            AI Mentor Matcher
          </Label>
          <Textarea 
            placeholder="Describe your mentorship goals, skills you want to learn, or career aspirations..."
            className="mt-2 bg-background border-purple-100/40 text-foreground 
              focus:ring-primary focus:border-primary h-48"
            value={aiMatchInput}
            onChange={(e) => setAiMatchInput(e.target.value)}
          />
          <Button 
            onClick={handleAiMatch}
            className="w-full mt-2 bg-primary hover:bg-primary/90"
          >
            Find Best Matches
          </Button>

          {/* AI Recommendations Section */}
          {aiRecommendations.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-bold mb-4 text-primary flex items-center">
                <Sparkles className="mr-3 text-primary" size={20} />
                AI Recommended Mentors
              </h2>
              <div className="space-y-4">
                {aiRecommendations.map(mentor => (
                  <MentorCard 
                    key={mentor.id} 
                    mentor={mentor}
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