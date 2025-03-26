'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { RefreshCw, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Focusing Chart Component
const FocusingChart = ({ focusingData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={focusingData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="maxFocus" 
          stroke="#ff6384" 
          strokeWidth={2} 
          dot={false}
        />
        <Line 
          type="monotone" 
          dataKey="minFocus" 
          stroke="#36a2eb" 
          strokeWidth={2} 
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Mentorship Insights Pie Chart Component
const MentorshipInsightsPieChart = () => {
  const mentorshipData = [
    { name: 'Mentorship Sessions', value: 35 },
    { name: 'Career Path Learning', value: 25 },
    { name: 'Discussion Boards', value: 20 },
    { name: 'Skill Development', value: 20 }
  ];

  const COLORS = [
    '#3B82F6',   // Vibrant Blue
    '#10B981',   // Emerald Green
    '#F43F5E',   // Rose Red
    '#8B5CF6'    // Deep Purple
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white shadow-lg rounded-lg p-4 border">
          <p className="font-bold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">{data.value}%</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center space-x-4 mt-4">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center">
            <span 
              className="w-3 h-3 mr-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col justify-center items-center">
      <h3 className="text-sm font-semibold mb-4">Mentorship Insights</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={mentorshipData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            innerRadius={50}
            paddingAngle={3}
          >
            {mentorshipData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            content={<CustomLegend />}
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 mt-2">Platform Engagement Overview</p>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  // Sample Data
  const focusingData = [
    { month: 'Aug', maxFocus: 50, minFocus: 20 },
    { month: 'Sep', maxFocus: 80, minFocus: 30 },
    { month: 'Oct', maxFocus: 60, minFocus: 25 },
    { month: 'Nov', maxFocus: 40, minFocus: 15 },
    { month: 'Dec', maxFocus: 70, minFocus: 35 }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              Welcome, Kristina
            </h1>
          </div>
          <div className="relative">
            <input 
              type="search" 
              placeholder="Search" 
              className="px-4 py-2 border rounded-lg w-64"
            />
            <Search size={20} className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Top Section with Profile, Tasks, and Mentorship Insights */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="relative inline-block mb-4">
              <img 
                src="/api/placeholder/120/120" 
                alt="Profile" 
                className="rounded-full mx-auto w-24 h-24 object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
                <RefreshCw size={16} />
              </div>
            </div>
            <h2 className="text-xl font-bold">Kristin Watson</h2>
            <p className="text-gray-500">Design Manager</p>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="text-center">
                <p className="font-bold">11</p>
                <p className="text-xs text-gray-500">Contacts</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-orange-500">56</p>
                <p className="text-xs text-gray-500">Messages</p>
              </div>
              <div className="text-center">
                <p className="font-bold">12</p>
                <p className="text-xs text-gray-500">Projects</p>
              </div>
            </div>
          </div>

          {/* Task Progress Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-4 shadow-lg flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Prioritized Tasks</h3>
                <div className="bg-white/50 p-1 rounded-full">⏰</div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <div className="text-center">
                  <p className="text-4xl font-bold">83%</p>
                  <p className="text-sm text-gray-600">Avg. Completed</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Additional Tasks</h3>
                <div className="bg-white/50 p-1 rounded-full">🎯</div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <div className="text-center">
                  <p className="text-4xl font-bold">56%</p>
                  <p className="text-sm text-gray-600">Avg. Completed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mentorship Insights Pie Chart */}
          <MentorshipInsightsPieChart />
        </div>

        {/* Focusing and Developed Areas */}
        <div className="grid grid-cols-3 gap-6">
          {/* Focusing Section */}
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">Focusing</h3>
                <p className="text-xs text-gray-500">Productivity Analytics</p>
              </div>
              <select className="text-sm border rounded px-2 py-1">
                <option>Last Month</option>
              </select>
            </div>
            
            <FocusingChart focusingData={focusingData} />
            
            <div className="text-center mt-4">
              <p className="text-2xl font-bold">41%</p>
              <p className="text-sm text-gray-600">Avg. Completion</p>
              <div className="flex justify-center space-x-4 mt-2">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
                  <span className="text-xs">Maximum Focus</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-xs">Minimum Focus</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-500">Week 8 • Unbalanced</span>
              </div>
            </div>
          </div>

          {/* Developed Areas */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold mb-4">Developed Areas</h3>
            <p className="text-xs text-gray-500 mb-4">Most Common Areas of Interest</p>
            <div className="space-y-4">
              {[
                { skill: "Communication Skills", progress: 71, color: "orange" },
                { skill: "JAVA", progress: 92, color: "blue" },
                { skill: "DSA", progress: 33, color: "orange" },
                { skill: "AI/ML", progress: 56, color: "blue" },
                { skill: "Web Development", progress: 79, color: "blue" }
              ].map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{area.skill}</span>
                    <span className={cn(`text-${area.color}-500 text-sm`)}>
                      {area.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn(`bg-${area.color}-500 h-2 rounded-full`)} 
                      style={{ width: `${area.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;