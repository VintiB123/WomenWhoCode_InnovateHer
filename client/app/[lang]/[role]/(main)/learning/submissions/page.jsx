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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import {
  Upload,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  Filter,
  ChevronRight,
  X,
  FileUp,
} from "lucide-react";

const page = () => {
  const { dict, currentLang } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [submissionComment, setSubmissionComment] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "React Hooks Implementation",
      description:
        "Create a custom hook for form validation and implement it in a sample form",
      course: "Advanced React",
      instructor: "Dr. Prachi Kanani",
      deadline: "2025-04-20",
      status: "pending",
      submission: null,
      grade: null,
      feedback: null,
      attachments: [],
    },
    {
      id: 2,
      title: "Database Design Project",
      description:
        "Design and implement a normalized database schema for an e-commerce system",
      course: "Database Management",
      instructor: "Prof. Manisha Solanki",
      deadline: "2025-04-25",
      status: "submitted",
      submission: {
        date: "2025-04-23",
        files: ["database_schema.pdf", "implementation.sql"],
        comment: "Completed the schema design with all required normalizations",
      },
      grade: "A",
      feedback:
        "Excellent work on the normalization process. Good documentation.",
      attachments: ["database_schema.pdf", "implementation.sql"],
    },
    {
      id: 3,
      title: "Machine Learning Model",
      description: "Build and train a classification model using scikit-learn",
      course: "Machine Learning",
      instructor: "Dr. Nita Patil",
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
      attachments: ["model.py", "results.csv"],
    },
    {
      id: 4,
      title: "Web Security Analysis",
      description:
        "Perform security analysis on a given web application and provide recommendations",
      course: "Web Security",
      instructor: "Prof. Swapna Naik",
      deadline: "2025-05-05",
      status: "pending",
      submission: null,
      grade: null,
      feedback: null,
      attachments: [],
    },
  ]);
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    course: "all",
  });

  const filteredAssignments = assignments.filter((assignment) => {
    if (
      filterOptions.status !== "all" &&
      assignment.status !== filterOptions.status
    )
      return false;
    if (
      filterOptions.course !== "all" &&
      assignment.course !== filterOptions.course
    )
      return false;
    return true;
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadFiles(files);
  };

  const handleSubmitAssignment = async (assignmentId) => {
    setIsUploading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update the assignment status
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) => {
          if (assignment.id === assignmentId) {
            const submissionDate = new Date().toISOString().split("T")[0];
            const deadline = new Date(assignment.deadline);
            const isLate = new Date(submissionDate) > deadline;

            return {
              ...assignment,
              status: isLate ? "late" : "submitted",
              submission: {
                date: submissionDate,
                files: uploadFiles.map((file) => file.name),
                comment: submissionComment,
              },
            };
          }
          return assignment;
        })
      );

      // Reset form and close dialog
      setUploadFiles([]);
      setSubmissionComment("");
      setShowUploadDialog(false);
      setSelectedAssignment(null);
    } catch (error) {
      console.error("Error submitting assignment:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenUploadDialog = (assignment) => {
    setSelectedAssignment(assignment);
    setShowUploadDialog(true);
  };

  const handleRemoveFile = (index) => {
    setUploadFiles((files) => files.filter((_, i) => i !== index));
  };

  const handleCancelUpload = () => {
    setUploadFiles([]);
    setSubmissionComment("");
    setShowUploadDialog(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-900">Assignments</h1>
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
                  <option value="pending">Pending</option>
                  <option value="submitted">Submitted</option>
                  <option value="late">Late</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Course
                </label>
                <select
                  value={filterOptions.course}
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      course: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-purple-200 rounded-md px-3 py-2"
                >
                  <option value="all">All Courses</option>
                  <option value="Advanced React">Advanced React</option>
                  <option value="Database Management">
                    Database Management
                  </option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Web Security">Web Security</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((assignment) => (
          <Card
            key={assignment.id}
            className="hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-purple-900">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {assignment.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(assignment.status)}
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FileText size={14} />
                    <span>{assignment.course}</span>
                  </div>
                  <span className="text-gray-500">
                    Instructor: {assignment.instructor}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>
                    Deadline:{" "}
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </span>
                </div>

                {assignment.submission && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Submission Details
                    </h4>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-500">
                        Submitted on:{" "}
                        {new Date(
                          assignment.submission.date
                        ).toLocaleDateString()}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {assignment.submission.files.map((file, index) => (
                          <Badge
                            key={index}
                            className="bg-purple-100 text-purple-700"
                          >
                            {file}
                          </Badge>
                        ))}
                      </div>
                      {assignment.submission.comment && (
                        <p className="text-gray-500 mt-2">
                          Comment: {assignment.submission.comment}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {assignment.grade && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Grade & Feedback
                    </h4>
                    <div className="text-sm space-y-1">
                      <p className="text-purple-600 font-medium">
                        Grade: {assignment.grade}
                      </p>
                      <p className="text-gray-500">{assignment.feedback}</p>
                    </div>
                  </div>
                )}

                {assignment.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 text-purple-600 border-purple-200 hover:bg-purple-50"
                      onClick={() => handleOpenUploadDialog(assignment)}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Assignment
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Submit Assignment
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Upload your files and add any comments for{" "}
              {selectedAssignment?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Files
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="w-full cursor-pointer flex items-center justify-between px-4 py-2 border border-purple-200 rounded-md text-gray-600 hover:bg-purple-50"
                    >
                      <span>Choose Files</span>
                      <FileUp className="h-4 w-4 text-purple-600" />
                    </label>
                  </div>
                </div>
              </div>

              {uploadFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white border border-purple-100 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-700 truncate max-w-[300px]">
                          {file.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-red-500"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-medium text-gray-900">Comments</h3>
              <Textarea
                placeholder="Add any comments about your submission..."
                value={submissionComment}
                onChange={(e) => setSubmissionComment(e.target.value)}
                className="min-h-[100px] border-purple-200 resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleCancelUpload}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmitAssignment(selectedAssignment?.id)}
              disabled={isUploading || uploadFiles.length === 0}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isUploading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Uploading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
