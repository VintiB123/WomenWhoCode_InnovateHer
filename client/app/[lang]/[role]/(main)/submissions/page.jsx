// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useLanguage } from "@/context/LanguageContext";
// import {
//   Calendar,
//   Clock,
//   FileText,
//   CheckCircle2,
//   AlertCircle,
//   Filter,
//   ChevronRight,
//   Download,
//   Star,
//   SortAsc,
//   SortDesc,
//   MoreVertical,
//   Mail,
//   Download as DownloadIcon,
//   Eye,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const page = () => {
//   const { dict, currentLang } = useLanguage();
//   const [showFilters, setShowFilters] = useState(false);
//   const [showGradeDialog, setShowGradeDialog] = useState(false);
//   const [selectedSubmission, setSelectedSubmission] = useState(null);
//   const [grade, setGrade] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [filterOptions, setFilterOptions] = useState({
//     status: "all",
//     course: "all",
//   });
//   const [sortConfig, setSortConfig] = useState({
//     key: "deadline",
//     direction: "asc",
//   });
//   const [selectedSubmissions, setSelectedSubmissions] = useState([]);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [isSendingEmail, setIsSendingEmail] = useState(false);

//   // Mock data for submissions
//   const [submissions] = useState([
//     {
//       id: 1,
//       menteeName: "Priya Sharma",
//       title: "React Hooks Implementation",
//       description:
//         "Create a custom hook for form validation and implement it in a sample form",
//       course: "Advanced React",
//       deadline: "2025-04-20",
//       status: "submitted",
//       submission: {
//         date: "2025-04-19",
//         files: ["form-validation.js", "custom-hook.js"],
//         comment: "Implemented form validation with custom hook",
//       },
//       grade: null,
//       feedback: null,
//     },
//     {
//       id: 2,
//       menteeName: "Raha Patel",
//       title: "Database Design Project",
//       description:
//         "Design and implement a normalized database schema for an e-commerce system",
//       course: "Database Management",
//       deadline: "2025-04-25",
//       status: "submitted",
//       submission: {
//         date: "2025-04-23",
//         files: ["schema.sql", "documentation.pdf"],
//         comment: "Completed the database design with normalization",
//       },
//       grade: "A",
//       feedback:
//         "Excellent work on the normalization process. Good documentation.",
//     },
//     {
//       id: 3,
//       menteeName: "Anjali Gupta",
//       title: "Machine Learning Model",
//       description: "Build and train a classification model using scikit-learn",
//       course: "Machine Learning",
//       deadline: "2025-05-01",
//       status: "late",
//       submission: {
//         date: "2025-05-02",
//         files: ["model.py", "results.csv"],
//         comment: "Submission delayed due to data preprocessing issues",
//       },
//       grade: "B-",
//       feedback:
//         "Good implementation but submission was late. Consider adding more documentation.",
//     },
//     {
//       id: 4,
//       menteeName: "Aditi Singh",
//       title: "Web Security Analysis",
//       description:
//         "Perform security analysis on a given web application and provide recommendations",
//       course: "Web Security",
//       deadline: "2025-05-05",
//       status: "pending",
//       submission: null,
//       grade: null,
//       feedback: null,
//     },
//   ]);

//   const filteredSubmissions = submissions.filter((submission) => {
//     if (
//       filterOptions.status !== "all" &&
//       submission.status !== filterOptions.status
//     )
//       return false;
//     if (
//       filterOptions.course !== "all" &&
//       submission.course !== filterOptions.course
//     )
//       return false;
//     return true;
//   });

//   // Sort submissions
//   const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === "asc" ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === "asc" ? 1 : -1;
//     }
//     return 0;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "submitted":
//         return "bg-green-100 text-green-700";
//       case "pending":
//         return "bg-amber-100 text-amber-700";
//       case "late":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "submitted":
//         return <CheckCircle2 className="h-4 w-4 text-green-500" />;
//       case "pending":
//         return <Clock className="h-4 w-4 text-amber-500" />;
//       case "late":
//         return <AlertCircle className="h-4 w-4 text-red-500" />;
//       default:
//         return null;
//     }
//   };

//   const handleGradeSubmission = (submission) => {
//     setSelectedSubmission(submission);
//     setShowGradeDialog(true);
//   };

//   const handleSubmitGrade = () => {
//     // Here you would typically make an API call to update the grade
//     console.log("Submitting grade:", { grade, feedback });
//     setShowGradeDialog(false);
//     setSelectedSubmission(null);
//     setGrade("");
//     setFeedback("");
//   };

//   const handleSort = (key) => {
//     setSortConfig((prevConfig) => ({
//       key,
//       direction:
//         prevConfig.key === key && prevConfig.direction === "asc"
//           ? "desc"
//           : "asc",
//     }));
//   };

//   const handleDownloadSubmission = async (submissionId) => {
//     setIsDownloading(true);
//     try {
//       // Simulate API call to download files
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       console.log("Downloading submission:", submissionId);
//     } catch (error) {
//       console.error("Error downloading submission:", error);
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const handleBulkAction = async (action) => {
//     if (action === "download") {
//       setIsDownloading(true);
//       try {
//         // Simulate bulk download
//         await Promise.all(
//           selectedSubmissions.map((id) => handleDownloadSubmission(id))
//         );
//       } finally {
//         setIsDownloading(false);
//       }
//     } else if (action === "email") {
//       setIsSendingEmail(true);
//       try {
//         // Simulate sending reminder emails
//         await new Promise((resolve) => setTimeout(resolve, 1500));
//         console.log("Sending reminders to:", selectedSubmissions);
//       } finally {
//         setIsSendingEmail(false);
//       }
//     }
//   };

//   const handleViewDetails = (submission) => {
//     // Implement view details functionality
//     console.log("Viewing details for:", submission);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header with Sort and Bulk Actions */}
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="text-purple-600 border-purple-200 hover:bg-purple-50"
//               >
//                 <SortAsc className="mr-2 h-4 w-4" />
//                 Sort
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem onClick={() => handleSort("deadline")}>
//                 By Deadline{" "}
//                 {sortConfig.key === "deadline" &&
//                   (sortConfig.direction === "asc" ? "↑" : "↓")}
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => handleSort("status")}>
//                 By Status{" "}
//                 {sortConfig.key === "status" &&
//                   (sortConfig.direction === "asc" ? "↑" : "↓")}
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => handleSort("menteeName")}>
//                 By Mentee{" "}
//                 {sortConfig.key === "menteeName" &&
//                   (sortConfig.direction === "asc" ? "↑" : "↓")}
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <div className="flex gap-2">
//           {selectedSubmissions.length > 0 && (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="text-purple-600 border-purple-200 hover:bg-purple-50"
//                 >
//                   Bulk Actions ({selectedSubmissions.length})
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem
//                   onClick={() => handleBulkAction("download")}
//                   disabled={isDownloading}
//                 >
//                   <DownloadIcon className="mr-2 h-4 w-4" />
//                   Download All
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onClick={() => handleBulkAction("email")}
//                   disabled={isSendingEmail}
//                 >
//                   <Mail className="mr-2 h-4 w-4" />
//                   Send Reminder
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//           <Button
//             variant="outline"
//             className="text-purple-600 border-purple-200 hover:bg-purple-50"
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             <Filter className="mr-2 h-4 w-4" />
//             Filter
//           </Button>
//         </div>
//       </div>

//       {/* Filter Options */}
//       {showFilters && (
//         <Card className="border-purple-200">
//           <CardContent className="p-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Status
//                 </label>
//                 <select
//                   value={filterOptions.status}
//                   onChange={(e) =>
//                     setFilterOptions({
//                       ...filterOptions,
//                       status: e.target.value,
//                     })
//                   }
//                   className="mt-1 block w-full border border-purple-200 rounded-md px-3 py-2"
//                 >
//                   <option value="all">All</option>
//                   <option value="pending">Pending</option>
//                   <option value="submitted">Submitted</option>
//                   <option value="late">Late</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Course
//                 </label>
//                 <select
//                   value={filterOptions.course}
//                   onChange={(e) =>
//                     setFilterOptions({
//                       ...filterOptions,
//                       course: e.target.value,
//                     })
//                   }
//                   className="mt-1 block w-full border border-purple-200 rounded-md px-3 py-2"
//                 >
//                   <option value="all">All Courses</option>
//                   <option value="Advanced React">Advanced React</option>
//                   <option value="Database Management">
//                     Database Management
//                   </option>
//                   <option value="Machine Learning">Machine Learning</option>
//                   <option value="Web Security">Web Security</option>
//                 </select>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Submissions List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {sortedSubmissions.map((submission) => (
//           <Card
//             key={submission.id}
//             className="hover:shadow-md transition-shadow duration-200"
//           >
//             <CardContent className="p-4">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={selectedSubmissions.includes(submission.id)}
//                     onChange={(e) => {
//                       setSelectedSubmissions((prev) =>
//                         e.target.checked
//                           ? [...prev, submission.id]
//                           : prev.filter((id) => id !== submission.id)
//                       );
//                     }}
//                     className="rounded border-purple-200 text-purple-600 focus:ring-purple-500"
//                   />
//                   <div>
//                     <h3 className="font-medium text-purple-900">
//                       {submission.title}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {submission.description}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {getStatusIcon(submission.status)}
//                   <Badge className={getStatusColor(submission.status)}>
//                     {submission.status}
//                   </Badge>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent>
//                       <DropdownMenuItem
//                         onClick={() => handleViewDetails(submission)}
//                       >
//                         <Eye className="mr-2 h-4 w-4" />
//                         View Details
//                       </DropdownMenuItem>
//                       {submission.submission && (
//                         <DropdownMenuItem
//                           onClick={() =>
//                             handleDownloadSubmission(submission.id)
//                           }
//                           disabled={isDownloading}
//                         >
//                           <DownloadIcon className="mr-2 h-4 w-4" />
//                           Download Files
//                         </DropdownMenuItem>
//                       )}
//                       {submission.status === "submitted" &&
//                         !submission.grade && (
//                           <DropdownMenuItem
//                             onClick={() => handleGradeSubmission(submission)}
//                           >
//                             <Star className="mr-2 h-4 w-4" />
//                             Grade Submission
//                           </DropdownMenuItem>
//                         )}
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between text-sm">
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <FileText size={14} />
//                     <span>{submission.course}</span>
//                   </div>
//                   <span className="text-gray-500">
//                     Mentee: {submission.menteeName}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <Calendar size={14} />
//                   <span>
//                     Deadline:{" "}
//                     {new Date(submission.deadline).toLocaleDateString()}
//                   </span>
//                 </div>

//                 {submission.submission && (
//                   <div className="space-y-2">
//                     <h4 className="text-sm font-medium text-gray-700">
//                       Submission Details
//                     </h4>
//                     <div className="text-sm space-y-1">
//                       <p className="text-gray-500">
//                         Submitted on:{" "}
//                         {new Date(
//                           submission.submission.date
//                         ).toLocaleDateString()}
//                       </p>
//                       <div className="flex flex-wrap gap-2">
//                         {submission.submission.files.map((file, index) => (
//                           <div key={index} className="flex items-center">
//                             <Badge className="bg-purple-100 text-purple-700">
//                               {file}
//                             </Badge>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-6 w-6 ml-1"
//                               onClick={() =>
//                                 handleDownloadSubmission(submission.id)
//                               }
//                             >
//                               <DownloadIcon className="h-3 w-3 text-purple-600" />
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                       {submission.submission.comment && (
//                         <p className="text-gray-500 mt-2">
//                           Comment: {submission.submission.comment}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {submission.grade && (
//                   <div className="space-y-2">
//                     <h4 className="text-sm font-medium text-gray-700">
//                       Grade & Feedback
//                     </h4>
//                     <div className="text-sm space-y-1">
//                       <p className="text-purple-600 font-medium">
//                         Grade: {submission.grade}
//                       </p>
//                       <p className="text-gray-500">{submission.feedback}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Grade Dialog */}
//       <Dialog open={showGradeDialog} onOpenChange={setShowGradeDialog}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Grade Submission</DialogTitle>
//             <DialogDescription>
//               Provide grade and feedback for {selectedSubmission?.menteeName}'s
//               submission
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">Grade</label>
//               <Select value={grade} onValueChange={setGrade}>
//                 <SelectTrigger className="border-purple-200">
//                   <SelectValue placeholder="Select grade" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="A">A</SelectItem>
//                   <SelectItem value="A-">A-</SelectItem>
//                   <SelectItem value="B+">B+</SelectItem>
//                   <SelectItem value="B">B</SelectItem>
//                   <SelectItem value="B-">B-</SelectItem>
//                   <SelectItem value="C+">C+</SelectItem>
//                   <SelectItem value="C">C</SelectItem>
//                   <SelectItem value="C-">C-</SelectItem>
//                   <SelectItem value="D">D</SelectItem>
//                   <SelectItem value="F">F</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Feedback
//               </label>
//               <Textarea
//                 placeholder="Provide detailed feedback..."
//                 value={feedback}
//                 onChange={(e) => setFeedback(e.target.value)}
//                 className="min-h-[100px] border-purple-200 resize-none"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setShowGradeDialog(false)}
//               className="text-purple-600 border-purple-200 hover:bg-purple-50"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmitGrade}
//               disabled={!grade || !feedback}
//               className="bg-purple-600 hover:bg-purple-700"
//             >
//               Submit Grade
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default page;

"use client";
import React, { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  Filter,
  ChevronRight,
  Download,
  Star,
  SortAsc,
  SortDesc,
  MoreVertical,
  Mail,
  Download as DownloadIcon,
  Eye,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const page = () => {
  const { dict, currentLang } = useLanguage();
  const [showGradeDialog, setShowGradeDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    course: "all",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "deadline",
    direction: "asc",
  });
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for submissions
  const [submissions] = useState([
    {
      id: 1,
      menteeName: "Priya Sharma",
      title: "React Hooks Implementation",
      description:
        "Create a custom hook for form validation and implement it in a sample form",
      course: "Advanced React",
      deadline: "2025-04-20",
      status: "submitted",
      submission: {
        date: "2025-04-19",
        files: ["form-validation.js", "custom-hook.js"],
        comment: "Implemented form validation with custom hook",
      },
      grade: null,
      feedback: null,
    },
    {
      id: 2,
      menteeName: "Raha Patel",
      title: "Database Design Project",
      description:
        "Design and implement a normalized database schema for an e-commerce system",
      course: "Database Management",
      deadline: "2025-04-25",
      status: "submitted",
      submission: {
        date: "2025-04-23",
        files: ["schema.sql", "documentation.pdf"],
        comment: "Completed the database design with normalization",
      },
      grade: "A",
      feedback:
        "Excellent work on the normalization process. Good documentation.",
    },
    {
      id: 3,
      menteeName: "Anjali Gupta",
      title: "Machine Learning Model",
      description: "Build and train a classification model using scikit-learn",
      course: "Machine Learning",
      deadline: "2025-05-01",
      status: "late",
      submission: {
        date: "2025-05-02",
        files: ["model.py", "results.csv"],
        comment: "Submission delayed due to data preprocessing issues",
      },
      grade: "B-",
      feedback:
        "Good implementation but submission was late. Consider adding more documentation.",
    },
    {
      id: 4,
      menteeName: "Aditi Singh",
      title: "Web Security Analysis",
      description:
        "Perform security analysis on a given web application and provide recommendations",
      course: "Web Security",
      deadline: "2025-05-05",
      status: "pending",
      submission: null,
      grade: null,
      feedback: null,
    },
  ]);

  // Filter submissions based on search query and filter options
  const filteredSubmissions = submissions.filter((submission) => {
    // Filter by status and course
    if (
      filterOptions.status !== "all" &&
      submission.status !== filterOptions.status
    )
      return false;
    if (
      filterOptions.course !== "all" &&
      submission.course !== filterOptions.course
    )
      return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        submission.title.toLowerCase().includes(query) ||
        submission.menteeName.toLowerCase().includes(query) ||
        submission.description.toLowerCase().includes(query) ||
        submission.course.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Sort submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "late":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "submitted":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "late":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const handleGradeSubmission = (submission) => {
    setSelectedSubmission(submission);
    setShowGradeDialog(true);
  };

  const handleSubmitGrade = () => {
    // Here you would typically make an API call to update the grade
    console.log("Submitting grade:", { grade, feedback });
    setShowGradeDialog(false);
    setSelectedSubmission(null);
    setGrade("");
    setFeedback("");
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleDownloadSubmission = async (submissionId) => {
    setIsDownloading(true);
    try {
      // Simulate API call to download files
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Downloading submission:", submissionId);
    } catch (error) {
      console.error("Error downloading submission:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBulkAction = async (action) => {
    if (action === "download") {
      setIsDownloading(true);
      try {
        // Simulate bulk download
        await Promise.all(
          selectedSubmissions.map((id) => handleDownloadSubmission(id))
        );
      } finally {
        setIsDownloading(false);
      }
    } else if (action === "email") {
      setIsSendingEmail(true);
      try {
        // Simulate sending reminder emails
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Sending reminders to:", selectedSubmissions);
      } finally {
        setIsSendingEmail(false);
      }
    }
  };

  const handleViewDetails = (submission) => {
    // Implement view details functionality
    console.log("Viewing details for:", submission);
  };

  return (
    <div className="space-y-8">
      {/* Header with Search, Sort, Status and Course Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Left side - Search */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search submissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>

        {/* Right side - Filters and Actions */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={filterOptions.status}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                status: e.target.value,
              })
            }
            className="block w-full md:w-auto border border-purple-200 rounded-md px-3 py-2 text-sm focus:border-purple-400 focus:ring-purple-400"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="late">Late</option>
          </select>

          {/* Course Filter */}
          <select
            value={filterOptions.course}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                course: e.target.value,
              })
            }
            className="block w-full md:w-auto border border-purple-200 rounded-md px-3 py-2 text-sm focus:border-purple-400 focus:ring-purple-400"
          >
            <option value="all">All Courses</option>
            <option value="Advanced React">Advanced React</option>
            <option value="Database Management">Database Management</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Web Security">Web Security</option>
          </select>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                <SortAsc className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleSort("deadline")}>
                By Deadline{" "}
                {sortConfig.key === "deadline" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("status")}>
                By Status{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("menteeName")}>
                By Mentee{" "}
                {sortConfig.key === "menteeName" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bulk Actions (only shown when items are selected) */}
          {selectedSubmissions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  Bulk Actions ({selectedSubmissions.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleBulkAction("download")}
                  disabled={isDownloading}
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleBulkAction("email")}
                  disabled={isSendingEmail}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reminder
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Submissions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedSubmissions.length > 0 ? (
          sortedSubmissions.map((submission) => (
            <Card
              key={submission.id}
              className="hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSubmissions.includes(submission.id)}
                      onChange={(e) => {
                        setSelectedSubmissions((prev) =>
                          e.target.checked
                            ? [...prev, submission.id]
                            : prev.filter((id) => id !== submission.id)
                        );
                      }}
                      className="rounded border-purple-200 text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <h3 className="font-medium text-purple-900">
                        {submission.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {submission.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(submission.status)}
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(submission)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {submission.submission && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleDownloadSubmission(submission.id)
                            }
                            disabled={isDownloading}
                          >
                            <DownloadIcon className="mr-2 h-4 w-4" />
                            Download Files
                          </DropdownMenuItem>
                        )}
                        {submission.status === "submitted" &&
                          !submission.grade && (
                            <DropdownMenuItem
                              onClick={() => handleGradeSubmission(submission)}
                            >
                              <Star className="mr-2 h-4 w-4" />
                              Grade Submission
                            </DropdownMenuItem>
                          )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <FileText size={14} />
                      <span>{submission.course}</span>
                    </div>
                    <span className="text-gray-500">
                      Mentee: {submission.menteeName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>
                      Deadline:{" "}
                      {new Date(submission.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  {submission.submission && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">
                        Submission Details
                      </h4>
                      <div className="text-sm space-y-1">
                        <p className="text-gray-500">
                          Submitted on:{" "}
                          {new Date(
                            submission.submission.date
                          ).toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {submission.submission.files.map((file, index) => (
                            <div key={index} className="flex items-center">
                              <Badge className="bg-purple-100 text-purple-700">
                                {file}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-1"
                                onClick={() =>
                                  handleDownloadSubmission(submission.id)
                                }
                              >
                                <DownloadIcon className="h-3 w-3 text-purple-600" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        {submission.submission.comment && (
                          <p className="text-gray-500 mt-2">
                            Comment: {submission.submission.comment}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {submission.grade && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">
                        Grade & Feedback
                      </h4>
                      <div className="text-sm space-y-1">
                        <p className="text-purple-600 font-medium">
                          Grade: {submission.grade}
                        </p>
                        <p className="text-gray-500">{submission.feedback}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-500">
              No submissions match your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Grade Dialog */}
      <Dialog open={showGradeDialog} onOpenChange={setShowGradeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
            <DialogDescription>
              Provide grade and feedback for {selectedSubmission?.menteeName}'s
              submission
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Grade</label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="border-purple-200">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="C+">C+</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="C-">C-</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Feedback
              </label>
              <Textarea
                placeholder="Provide detailed feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px] border-purple-200 resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowGradeDialog(false)}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitGrade}
              disabled={!grade || !feedback}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Submit Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
