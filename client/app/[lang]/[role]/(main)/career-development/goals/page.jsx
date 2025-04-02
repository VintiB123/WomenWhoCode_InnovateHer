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
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";
import {
  Plus,
  Target,
  Calendar,
  CheckCircle2,
  Clock,
  Star,
  Edit2,
  Trash2,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";

const page = () => {
  const { dict, currentLang } = useLanguage();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "career",
    priority: "medium",
  });
  const [newMilestone, setNewMilestone] = useState("");
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    priority: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for goals
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete Advanced React Course",
      description:
        "Master advanced React concepts including hooks, context, and performance optimization",
      deadline: "2025-04-15",
      category: "learning",
      priority: "high",
      progress: 65,
      status: "in-progress",
      milestones: [
        { id: 1, text: "Complete hooks section", completed: true },
        { id: 2, text: "Learn context API", completed: true },
        { id: 3, text: "Study performance optimization", completed: false },
      ],
    },
    {
      id: 2,
      title: "Get AWS Certification",
      description:
        "Obtain AWS Certified Solutions Architect Associate certification",
      deadline: "2025-06-30",
      category: "certification",
      priority: "high",
      progress: 30,
      status: "in-progress",
      milestones: [
        { id: 1, text: "Complete AWS fundamentals", completed: true },
        { id: 2, text: "Study for exam", completed: false },
      ],
    },
    {
      id: 3,
      title: "Build Portfolio Website",
      description:
        "Create a modern portfolio website showcasing my projects and skills",
      deadline: "2025-05-01",
      category: "project",
      priority: "medium",
      progress: 85,
      status: "in-progress",
      milestones: [
        { id: 1, text: "Design UI/UX", completed: true },
        { id: 2, text: "Implement responsive design", completed: true },
        { id: 3, text: "Add project showcase", completed: false },
      ],
    },
    {
      id: 4,
      title: "Learn Machine Learning Basics",
      description:
        "Understand fundamental concepts of machine learning and data science",
      deadline: "2025-07-15",
      category: "learning",
      priority: "medium",
      progress: 20,
      status: "in-progress",
      milestones: [
        { id: 1, text: "Complete Python basics", completed: true },
        { id: 2, text: "Learn NumPy and Pandas", completed: false },
        { id: 3, text: "Study basic ML algorithms", completed: false },
      ],
    },
    {
      id: 5,
      title: "Get Google Cloud Certification",
      description: "Obtain Google Cloud Professional Developer certification",
      deadline: "2025-08-30",
      category: "certification",
      priority: "high",
      progress: 15,
      status: "in-progress",
      milestones: [
        { id: 1, text: "Complete GCP fundamentals", completed: true },
        { id: 2, text: "Practice with hands-on labs", completed: false },
        { id: 3, text: "Take practice exams", completed: false },
      ],
    },
    {
      id: 6,
      title: "Develop Mobile App",
      description: "Create a cross-platform mobile app using React Native",
      deadline: "2025-09-01",
      category: "project",
      priority: "low",
      progress: 10,
      status: "in-progress",
      milestones: [
        { id: 1, text: "Set up development environment", completed: true },
        { id: 2, text: "Design app architecture", completed: false },
        { id: 3, text: "Implement core features", completed: false },
        { id: 4, text: "Test and deploy", completed: false },
      ],
    },
  ]);

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.description || !newGoal.deadline) return;

    const goal = {
      id: goals.length + 1,
      ...newGoal,
      progress: 0,
      status: "in-progress",
      milestones: [],
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: "",
      description: "",
      deadline: "",
      category: "career",
      priority: "medium",
    });
    setShowAddGoal(false);
  };

  const handleUpdateProgress = (goalId, milestoneId) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.map((milestone) =>
            milestone.id === milestoneId
              ? { ...milestone, completed: !milestone.completed }
              : milestone
          );

          const progress =
            (updatedMilestones.filter((m) => m.completed).length /
              goal.milestones.length) *
            100;
          return { ...goal, milestones: updatedMilestones, progress };
        }
        return goal;
      })
    );
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setNewGoal({
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline,
      category: goal.category,
      priority: goal.priority,
    });
  };

  const handleUpdateGoal = () => {
    if (!editingGoal) return;

    setGoals(
      goals.map((goal) => {
        if (goal.id === editingGoal.id) {
          return {
            ...goal,
            title: newGoal.title,
            description: newGoal.description,
            deadline: newGoal.deadline,
            category: newGoal.category,
            priority: newGoal.priority,
          };
        }
        return goal;
      })
    );

    setEditingGoal(null);
    setNewGoal({
      title: "",
      description: "",
      deadline: "",
      category: "career",
      priority: "medium",
    });
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
    setNewGoal({
      title: "",
      description: "",
      deadline: "",
      category: "career",
      priority: "medium",
    });
  };

  const handleAddMilestone = (goalId) => {
    if (!newMilestone.trim()) return;

    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const newMilestoneObj = {
            id: goal.milestones.length + 1,
            text: newMilestone.trim(),
            completed: false,
          };
          return {
            ...goal,
            milestones: [...goal.milestones, newMilestoneObj],
          };
        }
        return goal;
      })
    );

    setNewMilestone("");
  };

  const handleEditMilestone = (goalId, milestoneId) => {
    const goal = goals.find((g) => g.id === goalId);
    const milestone = goal.milestones.find((m) => m.id === milestoneId);
    setEditingMilestone({ goalId, milestoneId, text: milestone.text });
  };

  const handleUpdateMilestone = () => {
    if (!editingMilestone) return;

    setGoals(
      goals.map((goal) => {
        if (goal.id === editingMilestone.goalId) {
          const updatedMilestones = goal.milestones.map((milestone) =>
            milestone.id === editingMilestone.milestoneId
              ? { ...milestone, text: editingMilestone.text }
              : milestone
          );
          return { ...goal, milestones: updatedMilestones };
        }
        return goal;
      })
    );

    setEditingMilestone(null);
  };

  const handleDeleteMilestone = (goalId, milestoneId) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.filter(
            (m) => m.id !== milestoneId
          );
          const progress =
            (updatedMilestones.filter((m) => m.completed).length /
              updatedMilestones.length) *
            100;
          return { ...goal, milestones: updatedMilestones, progress };
        }
        return goal;
      })
    );
  };

  const filteredGoals = goals.filter((goal) => {
    if (filterOptions.status !== "all" && goal.status !== filterOptions.status)
      return false;
    if (
      filterOptions.priority !== "all" &&
      goal.priority !== filterOptions.priority
    )
      return false;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "career":
        return "bg-purple-100 text-purple-700";
      case "learning":
        return "bg-lavender-100 text-lavender-700";
      case "certification":
        return "bg-blue-100 text-blue-700";
      case "project":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold text-purple-900">Goal Tracker</h1> */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </div>

      {/* Add/Edit Goal Form */}
      {(showAddGoal || editingGoal) && (
        <Card className="border-purple-200">
          <CardContent className="p-4 space-y-4">
            <h3 className="text-lg font-medium text-purple-900">
              {editingGoal ? "Edit Goal" : "Add New Goal"}
            </h3>
            <Input
              placeholder="Goal Title"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal({ ...newGoal, title: e.target.value })
              }
              className="border-purple-200"
            />
            <Textarea
              placeholder="Goal Description"
              value={newGoal.description}
              onChange={(e) =>
                setNewGoal({ ...newGoal, description: e.target.value })
              }
              className="min-h-[100px] border-purple-200"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, deadline: e.target.value })
                  }
                  className="mt-1 border-purple-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  value={newGoal.priority}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, priority: e.target.value })
                  }
                  className="mt-1 block w-full border border-purple-200 rounded-md px-3 py-2"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Milestone Management Section */}
            {editingGoal && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">
                  Milestones
                </h4>
                <div className="space-y-2">
                  {editingGoal.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-2">
                      {editingMilestone?.milestoneId === milestone.id ? (
                        <>
                          <Input
                            value={editingMilestone.text}
                            onChange={(e) =>
                              setEditingMilestone({
                                ...editingMilestone,
                                text: e.target.value,
                              })
                            }
                            className="flex-1 border-purple-200"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleUpdateMilestone}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingMilestone(null)}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <CheckCircle2
                            size={16}
                            className={`cursor-pointer ${
                              milestone.completed
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                            onClick={() =>
                              handleUpdateProgress(editingGoal.id, milestone.id)
                            }
                          />
                          <span className="flex-1 text-sm">
                            {milestone.text}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleEditMilestone(editingGoal.id, milestone.id)
                            }
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleDeleteMilestone(
                                editingGoal.id,
                                milestone.id
                              )
                            }
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new milestone"
                    value={newMilestone}
                    onChange={(e) => setNewMilestone(e.target.value)}
                    className="flex-1 border-purple-200"
                  />
                  <Button
                    onClick={() => handleAddMilestone(editingGoal.id)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={
                  editingGoal ? handleCancelEdit : () => setShowAddGoal(false)
                }
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                Cancel
              </Button>
              <Button
                onClick={editingGoal ? handleUpdateGoal : handleAddGoal}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {editingGoal ? "Update Goal" : "Add Goal"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Options */}
      {showFilters && (
        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={filterOptions.status}
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      status: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-purple-200 rounded-md px-3 py-2"
                >
                  <option value="all">All</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  value={filterOptions.priority}
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      priority: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-purple-200 rounded-md px-3 py-2"
                >
                  <option value="all">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => (
          <Card
            key={goal.id}
            className="hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-purple-900">{goal.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {goal.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditGoal(goal)}
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Badge className={getPriorityColor(goal.priority)}>
                    {goal.priority}
                  </Badge>
                  <Badge className={getCategoryColor(goal.category)}>
                    {goal.category}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-purple-600">
                      {Math.round(goal.progress)}%
                    </span>
                  </div>
                  <Progress
                    value={goal.progress}
                    className="h-2 bg-purple-100"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>
                      Deadline: {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>Status: {goal.status}</span>
                  </div>
                </div>

                {goal.milestones.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Milestones
                    </h4>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle2
                            size={16}
                            className={`cursor-pointer ${
                              milestone.completed
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                            onClick={() =>
                              handleUpdateProgress(goal.id, milestone.id)
                            }
                          />
                          <span
                            className={
                              milestone.completed
                                ? "text-gray-500 line-through"
                                : ""
                            }
                          >
                            {milestone.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
