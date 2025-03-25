// "use client";
// import { useCallback, useState, useRef } from "react";
// import {
//   ReactFlow,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Connection,
//   Edge,
//   Node,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { Mic, MicOff, Send } from "lucide-react";
// import { AI_SERVER_URL } from "@/constants/utils"; // Make sure this path is correct or remove if not needed

// const sampleInputs = [
//   {
//     title: "Marketing Automation",
//     text: "AI-driven workflows for SEO, competitor analysis, and personalized content generation.",
//   },
//   {
//     title: "Corporate Productivity",
//     text: "Automated AI workflows for meeting summarization, email management, and customer insights.",
//   },
//   {
//     title: "Legal & Compliance",
//     text: "AI-powered contract summarization, regulatory compliance monitoring, and legal research.",
//   },
//   {
//     title: "E-Commerce Optimization",
//     text: "AI workflows for product recommendations, demand forecasting, and customer sentiment analysis.",
//   },
//   {
//     title: "Custom AI Workflows",
//     text: "Drag, drop, and customize AI agents to build workflows for any industry.",
//   },
// ];

// const WorkflowBuilder = () => {
//   const [activeTab, setActiveTab] = useState("marketing");
//   const [userInput, setUserInput] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showFlowchart, setShowFlowchart] = useState(false);
//   const textareaRef = useRef(null);
//   const [serverData, setServerData] = useState(null);
//   const flowchartRef = useRef(null);

//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   const handleSpeechToText = () => {
//     // Speech to text functionality - not as relevant for this use case, but kept for consistency and potential future use
//     if (!isListening) {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognition = new SpeechRecognition();
//         recognition.continuous = true;
//         recognition.interimResults = true;
//         recognition.lang = "en-IN";

//         recognition.onstart = () => {
//           setIsListening(true);
//         };

//         recognition.onresult = (event) => {
//           let transcript = "";
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             transcript += event.results[i][0].transcript;
//           }
//           setUserInput(transcript);
//           if (textareaRef.current) {
//             textareaRef.current.value = transcript;
//           }
//         };

//         recognition.onerror = (event) => {
//           console.error("Speech recognition error:", event.error);
//           setIsListening(false);
//         };

//         recognition.onend = () => {
//           setIsListening(false);
//         };

//         recognition.start();
//       } else {
//         alert("Speech recognition is not supported in your browser.");
//       }
//     } else {
//       setIsListening(false);
//       window.speechSynthesis.cancel();
//     }
//   };

//   const handleStrategySelect = (strategy) => {
//     setActiveTab(strategy);
//   };

//   const handleGenerate = async () => {
//     if (!activeTab) return;

//     setIsGenerating(true);
//     setShowFlowchart(false);

//     try {
//       const formData = new FormData();
//       formData.append(
//         "input",
//         userInput ||
//           `I need an AI workflow to optimize ${activeTab} processes. Please generate a structured workflow that includes:

//             1. Recommended AI agents and tools.
//             2. A brief description of each component and its benefits.
//             3. How components connect and share data.
//             4. Expected outcomes and business metrics improved.
//             5. A step-by-step workflow diagram that visually represents key decision points and process flow.`
//       );

//       formData.append("workflowType", activeTab); // Changed to workflowType for clarity

//       // Check if AI_SERVER_URL is defined before making the request
//       if (!AI_SERVER_URL) {
//         console.error(
//           "AI_SERVER_URL is not defined. Please set it in your environment."
//         );
//         setIsGenerating(false);
//         return;
//       }

//       const response = await fetch(`http://localhost:8000/agents-path`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data && data.nodes && data.edges) {
//         setServerData(data);

//         setNodes(
//           data.nodes.map((node) => ({
//             ...node,
//             className: `
//                 ${node.style.background} !important
//                 border-2
//                 ${node.style.border} !important
//                 rounded-lg
//                 p-4
//                 text-center
//                 font-medium
//               `,
//             data: {
//               ...node.data,
//               label: node.data.label,
//             },
//           }))
//         );

//         setEdges(
//           data.edges.map((edge) => ({
//             ...edge,
//             className: edge.style.stroke,
//             source: edge.source,
//             target: edge.target,
//             label: edge.label,
//           }))
//         );

//         setShowFlowchart(true);

//         setTimeout(() => {
//           flowchartRef.current?.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }, 100);
//       } else {
//         console.warn("Invalid server response:", data);
//         // Handle the case where the response is not in the expected format
//         // You might want to show an error message to the user
//       }
//     } catch (error) {
//       console.error("Error generating workflow:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleTextareaInput = (e) => {
//     setUserInput(e.target.value);

//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height =
//         textareaRef.current.scrollHeight + "px";
//     }
//   };

//   const handleSampleInput = (text) => {
//     setUserInput(text);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height =
//         textareaRef.current.scrollHeight + "px";
//     }
//   };

//   const tabs = [
//     {
//       id: "marketing",
//       label: "Marketing Automation",
//       color: "blue",
//       description:
//         "Build AI-driven marketing workflows to optimize SEO, competitor tracking, and personalized content generation.",
//       benefits: [
//         "Automated SEO optimization",
//         "Real-time competitor insights",
//         "AI-generated personalized content",
//         "Enhanced email marketing efficiency",
//       ],
//       suggestedActivities: [
//         "SEO Optimizer",
//         "Competitor Watchdog",
//         "Product Recommendation AI",
//         "Post Creator",
//         "Smart Email Manager",
//       ],
//     },
//     {
//       id: "corporate",
//       label: "Corporate Productivity",
//       color: "orange",
//       description:
//         "Enhance productivity with AI-powered meeting summaries, email management, and customer feedback analysis.",
//       benefits: [
//         "Time-efficient meeting summaries",
//         "Automated email responses",
//         "Better decision-making with customer insights",
//       ],
//       suggestedActivities: [
//         "Meeting Summarizer",
//         "Smart Email Manager",
//         "Competitor Watchdog",
//         "Customer Feedback Analyzer",
//       ],
//     },
//     {
//       id: "legal",
//       label: "Legal & Compliance",
//       color: "teal",
//       description:
//         "Streamline legal workflows with AI-driven contract analysis, compliance monitoring, and research assistance.",
//       benefits: [
//         "Faster contract summarization",
//         "Automated legal research",
//         "Regulatory compliance tracking",
//         "Enhanced document processing",
//       ],
//       suggestedActivities: [
//         "Contract Summarizer",
//         "AI Research Assistant",
//         "Regulatory Compliance Watchdog",
//         "Smart Email Manager",
//       ],
//     },
//     {
//       id: "ecommerce",
//       label: "E-Commerce Optimization",
//       color: "pink",
//       description:
//         "Boost online sales with AI-powered product recommendations, demand forecasting, and customer sentiment analysis.",
//       benefits: [
//         "Higher conversion rates",
//         "Optimized product recommendations",
//         "Accurate demand forecasting",
//         "Better customer sentiment insights",
//       ],
//       suggestedActivities: [
//         "Product Recommendation AI",
//         "Demand Forecaster",
//         "Customer Sentiment Analyzer",
//         "Personalized Shopping Assistant",
//       ],
//     },
//   ];

//   return (
//     <div className="mx-auto space-y-8 py-2 pr-2">
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
//         <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200">
//           <div className="flex items-center mb-2">
//             <span className="text-sm font-medium text-gray-700">
//               Sample Inputs:
//             </span>
//             <span className="ml-2 text-xs text-gray-500">
//               (Click to populate)
//             </span>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {sampleInputs.map((sample, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleSampleInput(sample.text)}
//                 className="px-3 py-1.5 text-sm bg-white rounded-lg border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center group"
//               >
//                 <span className="text-gray-600 group-hover:text-purple-600">
//                   {sample.title}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="relative">
//             <textarea
//               ref={textareaRef}
//               value={userInput}
//               onChange={handleTextareaInput}
//               placeholder="Describe your workflow needs, preferred AI tools, and specific business goals..."
//               className="w-full min-h-[120px] p-5 text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
//               style={{ height: "auto" }}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => handleStrategySelect(tab.id)}
//                 className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
//                   activeTab === tab.id
//                     ? `border-${tab.color}-500 bg-gradient-to-br from-${tab.color}-50 to-${tab.color}-100 text-${tab.color}-700 shadow-md`
//                     : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="font-semibold">{tab.label}</div>
//               </button>
//             ))}
//           </div>

//           {activeTab && (
//             <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
//               <h2 className="text-xl font-bold text-gray-900 mb-2">
//                 {tabs.find((tab) => tab.id === activeTab)?.label}
//               </h2>
//               <p className="text-gray-600">
//                 {tabs.find((tab) => tab.id === activeTab)?.description}
//               </p>
//               <div className="mt-4">
//                 <p className="font-medium text-gray-800">
//                   Suggested AI Agents:
//                 </p>
//                 <ul className="list-disc pl-5 text-gray-600">
//                   {tabs
//                     .find((tab) => tab.id === activeTab)
//                     ?.suggestedActivities.map((agent, index) => (
//                       <li key={index}>{agent}</li>
//                     ))}
//                 </ul>
//               </div>
//               <div className="mt-4">
//                 <p className="font-medium text-gray-800">Benefits:</p>
//                 <ul className="list-disc pl-5 text-gray-600">
//                   {tabs
//                     .find((tab) => tab.id === activeTab)
//                     ?.benefits.map((benefit, index) => (
//                       <li key={index}>{benefit}</li>
//                     ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
//           <button
//             onClick={handleGenerate}
//             disabled={!activeTab || isGenerating}
//             className={`w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-102 ${
//               activeTab && !isGenerating
//                 ? "bg-gradient-to-tr from-purple-300 to-purple-500 hover:from-purple-400 hover:to-purple-600 text-white shadow-lg hover:shadow-xl font-semibold"
//                 : "bg-gray-100 text-gray-400 cursor-not-allowed"
//             }`}
//           >
//             <Send className="h-6 w-6" />
//             <span>
//               {isGenerating ? "Generating Workflow..." : "Generate AI Workflow"}
//             </span>
//           </button>
//         </div>
//       </div>

//       {isGenerating && (
//         <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-2xl mx-auto">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto"></div>
//           <h3 className="mt-6 text-xl font-semibold text-gray-900">
//             Creating Your Custom AI Workflow
//           </h3>
//           <p className="mt-3 text-gray-600">
//             Analyzing your requirements and generating an optimized business
//             workflow...
//           </p>
//         </div>
//       )}

//       {showFlowchart && serverData && (
//         <div
//           ref={flowchartRef}
//           className="space-y-6 animate-fade-in scroll-mt-8"
//         >
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="h-[700px] w-full bg-gradient-to-br from-gray-50 to-gray-100">
//               <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 fitView
//                 className="bg-gray-50"
//                 defaultEdgeOptions={{
//                   type: "smoothstep",
//                   animated: true,
//                   style: { strokeWidth: 2 },
//                 }}
//               >
//                 <Background />
//                 <Controls />
//               </ReactFlow>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkflowBuilder;

"use client";
import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Rocket, Star, TrendingUp } from "lucide-react";

const careerCategories = [
  {
    id: "tech",
    label: "Technology",
    bgColor: "bg-lavender-50",
    textColor: "text-lavender-700",
    activeBg: "bg-lavender-600",
    activeText: "text-white",
    borderColor: "border-lavender-300",
    description:
      "Explore innovative career paths in software, AI, cybersecurity, and emerging technologies.",
    benefits: [
      "High growth potential",
      "Competitive salaries",
      "Continuous learning opportunities",
      "Global career prospects",
    ],
    suggestedPaths: [
      "Software Engineering",
      "Data Science",
      "Cloud Architecture",
      "AI/Machine Learning",
      "Cybersecurity",
    ],
  },
  {
    id: "business",
    label: "Business & Management",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    activeBg: "bg-purple-600",
    activeText: "text-white",
    borderColor: "border-purple-300",
    description:
      "Discover strategic career paths in management, consulting, and entrepreneurship.",
    benefits: [
      "Leadership opportunities",
      "Diverse industry exposure",
      "Networking potential",
      "Strategic decision-making skills",
    ],
    suggestedPaths: [
      "Product Management",
      "Business Consulting",
      "Startup Entrepreneurship",
      "Marketing Strategy",
      "Operations Management",
    ],
  },
  {
    id: "creative",
    label: "Creative Industries",
    bgColor: "bg-lavender-50",
    textColor: "text-lavender-700",
    activeBg: "bg-lavender-600",
    activeText: "text-white",
    borderColor: "border-lavender-300",
    description:
      "Explore careers that blend creativity, technology, and innovation.",
    benefits: [
      "Personal expression",
      "Diverse project opportunities",
      "Cross-industry applications",
      "Continuous innovation",
    ],
    suggestedPaths: [
      "UX/UI Design",
      "Digital Marketing",
      "Content Creation",
      "Brand Strategy",
      "Creative Technology",
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare & Wellness",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    activeBg: "bg-purple-600",
    activeText: "text-white",
    borderColor: "border-purple-300",
    description:
      "Discover meaningful career paths that make a difference in people's lives.",
    benefits: [
      "Impact-driven careers",
      "Continuous learning",
      "Job stability",
      "Personal fulfillment",
    ],
    suggestedPaths: [
      "Healthcare Technology",
      "Telemedicine",
      "Health Informatics",
      "Wellness Coaching",
      "Medical Research",
    ],
  },
];

const CareerPathGenerator = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [generatedPaths, setGeneratedPaths] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const inputRef = useRef(null);

  const handleGenerate = async () => {
    if (!activeCategory) return;

    setIsGenerating(true);
    setGeneratedPaths([]);

    try {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          const paths = [
            "Junior Software Engineer → Senior Engineer → Technical Architect",
            "Data Analyst → Data Scientist → AI/ML Specialist",
            "UX Designer → UX Research Lead → Design Strategy Consultant",
            "Entry-level Project Coordinator → Project Manager → Director of Operations",
          ];
          resolve(paths);
        }, 1500);
      });

      setGeneratedPaths(response);
    } catch (error) {
      console.error("Error generating career paths:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    setGeneratedPaths([]);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-lavender-100/10 to-purple-100/10">
          <h1 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
            <Rocket className="mr-3 text-lavender-500" />
            Career Path Generator
          </h1>
          <p className="text-muted-foreground">
            Explore potential career trajectories and strategic progression
            paths.
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {careerCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  className={`
                    w-full 
                    ${
                      isActive
                        ? `${category.activeBg} ${category.activeText}`
                        : `${category.bgColor} ${category.textColor} ${
                            category.borderColor
                          } hover:bg-${category.bgColor.replace(
                            "bg-",
                            ""
                          )}-100 hover:text-purple-800`
                    }
                  `}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.label}
                </Button>
              );
            })}
          </div>

          {activeCategory && (
            <Card className="bg-white border border-muted-200 rounded-xl p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-purple-800">
                  {careerCategories.find((c) => c.id === activeCategory)?.label}
                </h2>
                <p className="text-muted-foreground">
                  {
                    careerCategories.find((c) => c.id === activeCategory)
                      ?.description
                  }
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-purple-700 mb-2 flex items-center">
                      <Star className="mr-2 text-lavender-500" size={20} />
                      Suggested Career Paths
                    </h3>
                    <ul className="list-disc pl-5 text-muted-foreground">
                      {careerCategories
                        .find((c) => c.id === activeCategory)
                        ?.suggestedPaths.map((path, index) => (
                          <li key={index}>{path}</li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-700 mb-2 flex items-center">
                      <TrendingUp
                        className="mr-2 text-lavender-500"
                        size={20}
                      />
                      Key Benefits
                    </h3>
                    <ul className="list-disc pl-5 text-muted-foreground">
                      {careerCategories
                        .find((c) => c.id === activeCategory)
                        ?.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-4">
            <Input
              placeholder="Add any specific career interests or goals (optional)"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={handleGenerate}
              disabled={!activeCategory || isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? "Generating Paths..." : "Generate Career Paths"}
            </Button>
          </div>

          {isGenerating && (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                Analyzing career opportunities and progression paths...
              </p>
            </div>
          )}

          {generatedPaths.length > 0 && (
            <Card className="bg-lavender-50 border-lavender-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-purple-800">
                Recommended Career Progression Paths
              </h3>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {generatedPaths.map((path, index) => (
                    <div
                      key={index}
                      className="bg-white border border-lavender-200 rounded-lg p-4 shadow-sm"
                    >
                      {path}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CareerPathGenerator;
