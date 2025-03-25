import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  BarChart3,
  BrainCircuit,
  CheckCircle,
  Clock,
  Code,
  Database,
  FileSpreadsheet,
  LineChart,
  MessageSquare,
  PieChart,
  RefreshCw,
  Settings,
  User,
  Users,
  XCircle,
} from "lucide-react";

export default function Dashboard() {
  // Sample data (would be fetched from API in a real implementation)
  const trendingAgents = [
    {
      name: "Data Analyst",
      uses: 2873,
      satisfaction: 98,
      isNew: false,
      color: "#4EA8DE",
    }, // Blue
    {
      name: "Creative Writer",
      uses: 2456,
      satisfaction: 92,
      isNew: false,
      color: "#9D4EDE",
    }, // Purple
    {
      name: "Code Assistant",
      uses: 2103,
      satisfaction: 95,
      isNew: false,
      color: "#DE4E4E",
    }, // Red
    {
      name: "Market Researcher",
      uses: 1834,
      satisfaction: 93,
      isNew: true,
      color: "#4EDE97",
    }, // Green
    {
      name: "Legal Document Reviewer",
      uses: 1542,
      satisfaction: 91,
      isNew: false,
      color: "#DEAE4E",
    }, // Orange
  ];

  const activeWorkflows = [
    {
      name: "Data Analysis Pipeline",
      count: 348,
      category: "Analytics",
      color: "#4EA8DE",
    },
    {
      name: "Content Generation",
      count: 274,
      category: "Marketing",
      color: "#9D4EDE",
    },
    {
      name: "Code Review",
      count: 205,
      category: "Development",
      color: "#DE4E4E",
    },
    {
      name: "Contract Analysis",
      count: 186,
      category: "Legal",
      color: "#4EDE97",
    },
    {
      name: "Customer Support",
      count: 154,
      category: "Support",
      color: "#DEAE4E",
    },
  ];

  const agentPerformance = [
    {
      name: "Data Analyst",
      executionTime: 1.3,
      successRate: 97,
      accuracy: 94,
      color: "#4EA8DE",
    },
    {
      name: "Creative Writer",
      executionTime: 2.1,
      successRate: 95,
      accuracy: 90,
      color: "#9D4EDE",
    },
    {
      name: "Code Assistant",
      executionTime: 1.7,
      successRate: 96,
      accuracy: 92,
      color: "#DE4E4E",
    },
    {
      name: "Market Researcher",
      executionTime: 2.4,
      successRate: 93,
      accuracy: 89,
      color: "#4EDE97",
    },
    {
      name: "Legal Document Reviewer",
      executionTime: 2.8,
      successRate: 91,
      accuracy: 93,
      color: "#DEAE4E",
    },
  ];

  const workflowCategories = [
    { name: "Marketing", value: 32, color: "#9D4EDE" },
    { name: "Development", value: 27, color: "#DE4E4E" },
    { name: "Analytics", value: 18, color: "#4EA8DE" },
    { name: "Legal", value: 14, color: "#4EDE97" },
    { name: "Support", value: 9, color: "#DEAE4E" },
  ];

  const userEngagement = {
    activeToday: 4287,
    newUsers: 342,
    returningUsers: 3945,
    completionRate: 84,
  };

  const systemHealth = {
    uptime: 99.98,
    errors: 12,
    warnings: 34,
    apiRequests: 104578,
  };

  // Chart data visualization
  const createBarChart = (dataset, height = 100) => {
    const maxValue = Math.max(...dataset.map((item) => item.value));

    return (
      <div className="flex items-end h-24 space-x-2 mt-4 ">
        {dataset.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-12 rounded-t"
              style={{
                height: `${(item.value / maxValue) * height}%`,
                backgroundColor: item.color,
              }}
            ></div>
            <span className="text-xs mt-1 text-muted-foreground truncate w-12 text-center">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6  min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-coolTeal-800">
          AI Agents Dashboard
        </h1>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-coolTeal-500 text-white">
            24 Active Agents
          </Badge>
          <Badge variant="outline" className="bg-coolTeal-700 text-white">
            1167 Running Workflows
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Trending AI Agents */}
        <Card className="col-span-1 shadow-lg hover:shadow-xl transition-shadow border-t-4">
          <CardHeader className="bg-gradient-to-r from-ivoryWhite-800 to-ivoryWhite-60">
            <div className="flex items-center justify-between">
              <CardTitle className="text-coolTeal-900 flex items-center gap-2">
                <BrainCircuit size={20} className="text-coolTeal-700" />
                Trending AI Agents
              </CardTitle>
              <Badge className="bg-coolTeal-600 hover:bg-coolTeal-700 text-white">
                Top 5
              </Badge>
            </div>
            <CardDescription>
              Most used and highest rated agents
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {trendingAgents.map((agent, index) => (
              <div
                key={index}
                className="mb-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span
                    className="mr-3 font-bold w-6 h-6 flex items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: agent.color }}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{agent.name}</span>
                      {agent.isNew && (
                        <Badge className="ml-2 bg-green-500 text-white text-xs">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {agent.uses.toLocaleString()} uses
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm mr-2">{agent.satisfaction}%</span>
                  <Progress
                    value={agent.satisfaction}
                    className="w-16 h-2 bg-gray-200"
                    style={{
                      "--tw-bg-opacity": "1",
                      "--progress-background": agent.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Workflows */}
        <Card className="col-span-1 shadow-lg hover:shadow-xl transition-shadow border-t-4">
          <CardHeader className="bg-gradient-to-r from-ivoryWhite-800 to-ivoryWhite-60">
            <div className="flex items-center justify-between">
              <CardTitle className="text-coolTeal-900 flex items-center gap-2">
                <RefreshCw size={20} className="text-coolTeal-700" />
                Active Workflows
              </CardTitle>
              <Badge className="bg-coolTeal-600 hover:bg-coolTeal-700 text-white">
                1167 Total
              </Badge>
            </div>
            <CardDescription>
              Currently running workflow templates
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {activeWorkflows.map((workflow, index) => (
              <div
                key={index}
                className="mb-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{workflow.name}</div>
                  <Badge
                    variant="outline"
                    className="text-xs mt-1"
                    style={{
                      backgroundColor: `${workflow.color}20`,
                      color: workflow.color,
                      borderColor: workflow.color,
                    }}
                  >
                    {workflow.category}
                  </Badge>
                </div>
                <div className="text-coolTeal-700 font-semibold">
                  {workflow.count}
                </div>
              </div>
            ))}
            {createBarChart(
              workflowCategories.map((cat) => ({
                name: cat.name,
                value: cat.value,
                color: cat.color,
              }))
            )}
          </CardContent>
        </Card>

        {/* Agent Performance Metrics */}
        <Card className="col-span-1 shadow-lg hover:shadow-xl transition-shadow border-t-4">
          <CardHeader className="bg-gradient-to-r from-ivoryWhite-800 to-ivoryWhite-60">
            <div className="flex items-center justify-between">
              <CardTitle className="text-coolTeal-900 flex items-center gap-2">
                <BarChart3 size={20} className="text-coolTeal-700" />
                Agent Performance
              </CardTitle>
              <Badge className="bg-coolTeal-600 hover:bg-coolTeal-700 text-white">
                Metrics
              </Badge>
            </div>
            <CardDescription>
              Success rates and response accuracy
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="success">
              <TabsList className="bg-coolTeal-100 text-coolTeal-800">
                <TabsTrigger value="success">Success Rate</TabsTrigger>
                <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
                <TabsTrigger value="time">Execution Time</TabsTrigger>
              </TabsList>
              <TabsContent value="success" className="space-y-4 mt-4">
                {agentPerformance.map((agent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="font-medium truncate mr-2 text-sm flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: agent.color }}
                      ></div>
                      {agent.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">
                        {agent.successRate}%
                      </span>
                      <Progress
                        value={agent.successRate}
                        className="w-24 h-2 bg-gray-200"
                        style={{ "--progress-background": agent.color }}
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="accuracy" className="space-y-4 mt-4">
                {agentPerformance.map((agent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="font-medium truncate mr-2 text-sm flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: agent.color }}
                      ></div>
                      {agent.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">
                        {agent.accuracy}%
                      </span>
                      <Progress
                        value={agent.accuracy}
                        className="w-24 h-2 bg-gray-200"
                        style={{ "--progress-background": agent.color }}
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="time" className="space-y-4 mt-4">
                {agentPerformance.map((agent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="font-medium truncate mr-2 text-sm flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: agent.color }}
                      ></div>
                      {agent.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">
                        {agent.executionTime}s
                      </span>
                      <Progress
                        value={100 - (agent.executionTime / 3) * 100}
                        className="w-24 h-2 bg-gray-200"
                        style={{ "--progress-background": agent.color }}
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Workflow Insights */}
        <Card className="col-span-1 lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow border-t-4">
          <CardHeader className="bg-gradient-to-r from-ivoryWhite-800 to-ivoryWhite-600">
            <div className="flex items-center justify-between">
              <CardTitle className="text-coolTeal-900 flex items-center gap-2">
                <PieChart size={20} className="text-coolTeal-700" />
                Workflow Insights
              </CardTitle>
              <Badge className="bg-coolTeal-600 hover:bg-coolTeal-700 text-white">
                By Industry
              </Badge>
            </div>
            <CardDescription>
              Distribution and efficiency of workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-2 text-coolTeal-800">
                  Industry Distribution
                </h3>
                <div className="space-y-3">
                  {workflowCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {category.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-coolTeal-800">
                  Most Popular Combinations
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Badge
                      className="mr-2"
                      style={{ backgroundColor: "#9D4EDE" }}
                    >
                      1
                    </Badge>
                    <span className="text-sm">
                      Data Analysis + Visualization
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      className="mr-2"
                      style={{ backgroundColor: "#4EA8DE" }}
                    >
                      2
                    </Badge>
                    <span className="text-sm">Content Creation + SEO</span>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      className="mr-2"
                      style={{ backgroundColor: "#DE4E4E" }}
                    >
                      3
                    </Badge>
                    <span className="text-sm">Code Generation + Testing</span>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      className="mr-2"
                      style={{ backgroundColor: "#4EDE97" }}
                    >
                      4
                    </Badge>
                    <span className="text-sm">
                      Document Review + Summarization
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2 text-coolTeal-800">
                Workflow Efficiency (Time Saved)
              </h3>
              <div className="grid grid-cols-4 gap-4 mt-3">
                <div
                  className="p-3 rounded-lg text-center"
                  style={{
                    backgroundColor: `${workflowCategories[0].color}15`,
                  }}
                >
                  <div
                    className="text-2xl font-bold"
                    style={{ color: workflowCategories[0].color }}
                  >
                    87%
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: workflowCategories[0].color }}
                  >
                    Marketing
                  </div>
                </div>
                <div
                  className="p-3 rounded-lg text-center"
                  style={{
                    backgroundColor: `${workflowCategories[1].color}15`,
                  }}
                >
                  <div
                    className="text-2xl font-bold"
                    style={{ color: workflowCategories[1].color }}
                  >
                    92%
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: workflowCategories[1].color }}
                  >
                    Development
                  </div>
                </div>
                <div
                  className="p-3 rounded-lg text-center"
                  style={{
                    backgroundColor: `${workflowCategories[3].color}15`,
                  }}
                >
                  <div
                    className="text-2xl font-bold"
                    style={{ color: workflowCategories[3].color }}
                  >
                    78%
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: workflowCategories[3].color }}
                  >
                    Legal
                  </div>
                </div>
                <div
                  className="p-3 rounded-lg text-center"
                  style={{
                    backgroundColor: `${workflowCategories[4].color}15`,
                  }}
                >
                  <div
                    className="text-2xl font-bold"
                    style={{ color: workflowCategories[4].color }}
                  >
                    83%
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: workflowCategories[4].color }}
                  >
                    Finance
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Engagement */}
        <Card className="col-span-1 shadow-lg hover:shadow-xl transition-shadow border-t-4">
          <CardHeader className="bg-gradient-to-r from-ivoryWhite-800 to-ivoryWhite-60">
            <div className="flex items-center justify-between">
              <CardTitle className="text-coolTeal-900 flex items-center gap-2">
                <Users size={20} className="text-coolTeal-700" />
                User Engagement
              </CardTitle>
              <Badge className="bg-coolTeal-600 hover:bg-coolTeal-700 text-white">
                Last 24h
              </Badge>
            </div>
            <CardDescription>
              Active users and completion metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-coolTeal-50 rounded-lg p-4 text-center border-l-4">
                <div className="text-coolTeal-900 text-2xl font-bold">
                  {userEngagement.activeToday.toLocaleString()}
                </div>
                <div className="text-coolTeal-700 text-sm">Active Users</div>
              </div>
              <div className="bg-coolTeal-50 rounded-lg p-4 text-center border-l-4 ">
                <div className="text-coolTeal-900 text-2xl font-bold">
                  {userEngagement.completionRate}%
                </div>
                <div className="text-coolTeal-700 text-sm">Completion Rate</div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-coolTeal-600 mr-2"></div>
              <span className="text-sm">
                Returning ({userEngagement.returningUsers.toLocaleString()})
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">
                New ({userEngagement.newUsers.toLocaleString()})
              </span>
            </div>
            <div className="mt-6">
              <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-coolTeal-600 to-coolTeal-400 rounded-l-full"
                  style={{
                    width: `${
                      (userEngagement.returningUsers /
                        userEngagement.activeToday) *
                      100
                    }%`,
                  }}
                ></div>
                <div
                  className="absolute h-full rounded-l-full"
                  style={{
                    width: `${
                      (userEngagement.newUsers / userEngagement.activeToday) *
                      100
                    }%`,
                    right: 0,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI System Health */}
        <Card className="col-span-1 shadow-lg hover:shadow-xl transition-shadow border-t-4">
          <CardHeader className="bg-gradient-to-r from-ivoryWhite-800 to-ivoryWhite-60">
            <div className="flex items-center justify-between">
              <CardTitle className="text-coolTeal-900 flex items-center gap-2">
                <Activity size={20} className="text-coolTeal-700" />
                System Health
              </CardTitle>
              <Badge
                className={
                  systemHealth.errors > 0 ? "bg-amber-500" : "bg-green-500"
                }
              >
                {systemHealth.errors > 0
                  ? "Issues Detected"
                  : "All Systems Normal"}
              </Badge>
            </div>
            <CardDescription>System performance and error logs</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-coolTeal-700" />
                <span className="text-sm font-medium">Uptime</span>
              </div>
              <Badge className="bg-green-500">{systemHealth.uptime}%</Badge>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <XCircle className="mr-2 h-4 w-4 text-coolTeal-700" />
                <span className="text-sm font-medium">Errors</span>
              </div>
              <Badge
                className={
                  systemHealth.errors > 0 ? "bg-amber-500" : "bg-green-500"
                }
              >
                {systemHealth.errors}
              </Badge>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Database className="mr-2 h-4 w-4 text-coolTeal-700" />
                <span className="text-sm font-medium">API Requests</span>
              </div>
              <span className="text-sm font-bold">
                {systemHealth.apiRequests.toLocaleString()}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2 text-coolTeal-800">
                Recent Activity
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto text-xs">
                <div className="flex items-center text-amber-600 bg-amber-50 p-2 rounded">
                  <span className="font-mono bg-amber-100 px-1 rounded mr-2">
                    12:42
                  </span>
                  <span>
                    API rate limit warning on /agents/execute endpoint
                  </span>
                </div>
                <div className="flex items-center text-green-600 bg-green-50 p-2 rounded">
                  <span className="font-mono bg-green-100 px-1 rounded mr-2">
                    12:38
                  </span>
                  <span>New agent model deployed successfully</span>
                </div>
                <div className="flex items-center text-coolTeal-700 bg-coolTeal-50 p-2 rounded">
                  <span className="font-mono bg-coolTeal-100 px-1 rounded mr-2">
                    12:34
                  </span>
                  <span>Backup completed successfully</span>
                </div>
                <div className="flex items-center text-amber-600 bg-amber-50 p-2 rounded">
                  <span className="font-mono bg-amber-100 px-1 rounded mr-2">
                    12:28
                  </span>
                  <span>High memory usage detected (82%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Workflows */}
        <Card className="col-span-1 shadow-lg hover:shadow-xl transition-shadow border-t-4">
          <CardHeader className="bg-gradient-to-r from-ivoryWhite-800 to-ivoryWhite-60">
            <div className="flex items-center justify-between">
              <CardTitle className="text-coolTeal-900 flex items-center gap-2">
                <FileSpreadsheet size={20} className="text-coolTeal-700" />
                Suggested Workflows
              </CardTitle>
              <Badge className="bg-coolTeal-600 hover:bg-coolTeal-700 text-white">
                Personalized
              </Badge>
            </div>
            <CardDescription>AI-recommended workflow templates</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="p-3 border border-purple-200 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-purple-900">
                    Content Calendar Automation
                  </div>
                  <div className="text-xs text-purple-700 mt-1">
                    Generate + schedule social posts from your blog
                  </div>
                </div>
                <Badge className="bg-purple-500">Marketing</Badge>
              </div>
              <div className="flex mt-3 gap-1">
                <Badge
                  variant="outline"
                  className="text-xs bg-purple-100 text-purple-700 border-purple-300"
                >
                  Content Writer
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs bg-purple-100 text-purple-700 border-purple-300"
                >
                  Social Media
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs bg-purple-100 text-purple-700 border-purple-300"
                >
                  Scheduler
                </Badge>
              </div>
            </div>
            <div className="p-3 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-red-900">
                    Bug Fix Assistant
                  </div>
                  <div className="text-xs text-red-700 mt-1">
                    Debug, fix, and test code automatically
                  </div>
                </div>
                <Badge className="bg-red-500">Development</Badge>
              </div>
              <div className="flex mt-3 gap-1">
                <Badge
                  variant="outline"
                  className="text-xs bg-red-100 text-red-700 border-red-300"
                >
                  Code Assistant
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs bg-red-100 text-red-700 border-red-300"
                >
                  Tester
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs bg-red-100 text-red-700 border-red-300"
                >
                  Version Control
                </Badge>
              </div>
            </div>
            <div className="p-3 border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-blue-900">
                    Market Research Pipeline
                  </div>
                  <div className="text-xs text-blue-700 mt-1">
                    Analyze competitors and generate insights
                  </div>
                </div>
                <Badge className="bg-blue-500">Analytics</Badge>
              </div>
              <div className="flex mt-3 gap-1">
                <Badge
                  variant="outline"
                  className="text-xs bg-blue-100 text-blue-700 border-blue-300"
                >
                  Researcher
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs bg-blue-100 text-blue-700 border-blue-300"
                >
                  Data Analyst
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs bg-blue-100 text-blue-700 border-blue-300"
                >
                  Report Builder
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
