// import React, { useEffect, useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { useLanguage } from "@/context/LanguageContext";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Textarea } from "../ui/textarea";

// const EventModal = ({
//   selectedSlot,
//   setSelectedSlot,
//   events,
//   setEvents,
//   editEvent,
//   handleEditEvent,
//   setEditEvent,
//   data,
//   setData,
// }) => {
//   const [supervisorData, setSupervisorData] = useState([]);
//   const [supervisorName, setSupervisorName] = useState("");
//   const [supervisorId, setSupervisorId] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const { dict } = useLanguage();

//   // useEffect(() => {
//   //   const getSupervisorData = async () => {
//   //     const response = await fetch(GET_ALL_SUP_ROUTE, {
//   //       method: "GET",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       setSupervisorData(data);
//   //     }
//   //   };

//   //   getSupervisorData();
//   // }, []);

//   useEffect(() => {
//     supervisorData.forEach((supervisor) => {
//       if (supervisor._id === data.supervisor) {
//         setSupervisorName(supervisor.name);
//       }
//     });
//   }, [data]);

//   if (!selectedSlot) return null;

//   const closeModal = () => {
//     setSelectedSlot(null);
//     setData({
//       title: "",
//       supervisor: "",
//       patient: "",
//       roomNo: "",
//       selected_date: "",
//       startTime: "",
//       endTime: "",
//       description: "",
//       color: "#0000FF",
//       activeTab: "appointments",
//     });
//     setEditEvent([]);
//   };

//   const colors = [
//     { value: "#FFFF00", label: dict?.colors?.yellow },
//     { value: "#FF0000", label: dict?.colors?.red },
//     { value: "#9D00FF", label: dict?.colors?.purple },
//     { value: "#00FF00", label: dict?.colors?.green },
//     { value: "#0000FF", label: dict?.colors?.blue },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const userType = localStorage.getItem("userType");
//     const userId = localStorage.getItem("user");
//     const formData = {
//       ...data,
//       userId,
//       userType,
//     };

//     // const response = await fetch(ADD_CALENDAR_EVENT_ROUTE, {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(formData),
//     // });
//     let response;

//     if (response.ok) {
//       const data = response.json();
//       setEvents([...events, data.event]);
//     }

//     closeModal();
//   };

//   // To display date in a proper format
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     if (isNaN(date)) return "";
//     return date.toISOString().split("T")[0];
//   };

//   // To display start date and end date in a proper format
//   const formatTime = (dateTimeString) => {
//     if (!dateTimeString) return "";

//     if (/^\d{2}:\d{2}$/.test(dateTimeString)) {
//       return dateTimeString;
//     }
//     const date = new Date(dateTimeString);
//     if (isNaN(date)) return "";
//     return date.toTimeString().slice(0, 5);
//   };

//   return (
//     <Dialog open={!!selectedSlot} onOpenChange={closeModal}>
//       <DialogContent className="sm:max-w-4/5">
//         <DialogHeader>
//           <DialogTitle>
//             {data.activeTab === "appointments"
//               ? `${dict?.calendar?.title_app}`
//               : `${dict?.calendar?.title_rem}`}
//           </DialogTitle>
//         </DialogHeader>

//         <Tabs
//           defaultValue={
//             data.activeTab === "reminder" ? "reminders" : "appointments"
//           }
//           onValueChange={(value) =>
//             setData({
//               title: "",
//               supervisor: "",
//               patient: "",
//               roomNo: "",
//               selected_date: "",
//               startTime: "",
//               endTime: "",
//               description: "",
//               color: "#0000FF",
//               activeTab: value,
//             })
//           }
//         >
//           <TabsList className="grid w-full grid-cols-2 mb-4">
//             <TabsTrigger value="appointments">
//               {dict?.calendar?.appointment}
//             </TabsTrigger>
//             <TabsTrigger value="reminders">
//               {dict?.calendar?.reminder}
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="appointments">
//             <form id="appointmentsForm" className="space-y-4">
//               <div className="grid w-full items-center gap-2">
//                 <Label htmlFor="title">{dict?.calendar?.app_title}</Label>
//                 <Input
//                   id="title"
//                   name="title"
//                   value={data.title}
//                   onChange={handleInputChange}
//                   placeholder="Enter appointment title"
//                   required
//                 />
//               </div>

//               <div className="space-y-1 w-full">
//                 <Label htmlFor="supervisor" className="text-gray-700 text-sm">
//                   {dict?.calendar?.sel_sup}
//                 </Label>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger
//                     className={`w-full flex items-center justify-start h-[2.25rem] rounded-md border ${
//                       !data.supervisor ? "text-gray-500" : ""
//                     } border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
//                   >
//                     {supervisorName || dict?.calendar?.sel_sup_plchldr}
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="max-h-80 overflow-y-scroll">
//                     {supervisorData.length > 0 ? (
//                       supervisorData.map((supervisor) => (
//                         <DropdownMenuItem
//                           key={supervisor.supervisor_id}
//                           onClick={() => {
//                             setData({ ...data, supervisor: supervisor._id });
//                             setSupervisorName(supervisor.name);
//                             setSupervisorId(supervisor._id);
//                           }}
//                         >
//                           {supervisor.name}
//                         </DropdownMenuItem>
//                       ))
//                     ) : (
//                       <DropdownMenuItem disabled>
//                         {dict?.calendar?.no_sup}
//                       </DropdownMenuItem>
//                     )}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>

//               <div className="flex items-center justify-between gap-x-5">
//                 <div className="grid w-full items-center gap-2">
//                   <Label htmlFor="patient">{dict?.calendar?.patient}</Label>
//                   <Input
//                     id="patient"
//                     name="patient"
//                     value={data.patient}
//                     onChange={handleInputChange}
//                     placeholder="Enter patient name"
//                     required
//                   />
//                 </div>

//                 <div className="grid w-full items-center gap-2">
//                   <Label htmlFor="roomNo">{dict?.calendar?.room_no}</Label>
//                   <Input
//                     id="roomNo"
//                     name="roomNo"
//                     value={data.roomNo}
//                     onChange={handleInputChange}
//                     placeholder="Enter room number"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid w-full items-center gap-2">
//                 <Label htmlFor="selected_date">{dict?.calendar?.date}</Label>
//                 <Input
//                   id="selected_date"
//                   name="selected_date"
//                   type="date"
//                   value={
//                     data.selected_date ? formatDate(data.selected_date) : ""
//                   }
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="grid w-full items-center gap-2">
//                   <Label htmlFor="startTime">
//                     {dict?.calendar?.start_time}
//                   </Label>
//                   <Input
//                     id="startTime"
//                     name="startTime"
//                     type="time"
//                     value={data.startTime ? formatTime(data.startTime) : ""}
//                     onChange={handleInputChange}
//                     required
//                     min="08:00"
//                     max="20:00"
//                   />
//                 </div>
//                 <div className="grid w-full items-center gap-2">
//                   <Label htmlFor="endTime">{dict?.calendar?.end_time}</Label>
//                   <Input
//                     id="endTime"
//                     name="endTime"
//                     type="time"
//                     value={data.endTime ? formatTime(data.endTime) : ""}
//                     onChange={handleInputChange}
//                     required
//                     min="08:00"
//                     max="20:00"
//                   />
//                 </div>
//               </div>

//               <div className="w-full flex-row-center gap-x-5 max-md:flex-col-center max-md:gap-y-5 mt-5">
//                 <div className="space-y-1 w-full">
//                   <Label
//                     htmlFor="description"
//                     className="text-gray-700 text-sm flex items-center"
//                   >
//                     {dict?.calendar?.desc}
//                   </Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     value={data.description}
//                     placeholder={dict?.calendar?.desc_plchldr}
//                     onChange={handleInputChange}
//                     className="h-20"
//                   />
//                 </div>
//               </div>

//               <div className="grid w-full items-center gap-2">
//                 <Label htmlFor="color">{dict?.calendar?.event_color}</Label>
//                 <div className="w-full flex items-center justify-between rounded-md p-2 bg-gray-100">
//                   {colors.map((color) => (
//                     <div
//                       key={color.value}
//                       onClick={() => setData({ ...data, color: color.value })}
//                       className={`flex flex-col items-center space-y-3 cursor-pointer p-2 px-3 rounded-md ${
//                         data.color === color.value
//                           ? "ring-2 ring-offset-2 ring-gray-500"
//                           : ""
//                       }`}
//                     >
//                       <h1 className="text-sm font-semibold text-gray-700">
//                         {color.label}
//                       </h1>
//                       <div
//                         className="h-10 w-10 rounded-full shadow-lg"
//                         style={{ backgroundColor: color.value }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </form>
//           </TabsContent>

//           <TabsContent value="reminders">
//             <form id="remindersForm" className="space-y-4">
//               <div className="grid w-full items-center gap-2">
//                 <Label htmlFor="title">{dict?.calendar?.rem_title}</Label>
//                 <Input
//                   id="title"
//                   name="title"
//                   value={data.title}
//                   onChange={handleInputChange}
//                   placeholder="Enter reminder title"
//                   required
//                 />
//               </div>
//               <div className="grid w-full items-center gap-2">
//                 <Label htmlFor="selected_date">{dict?.calendar?.date}</Label>
//                 <Input
//                   id="selected_date"
//                   name="selected_date"
//                   type="date"
//                   value={
//                     data.selected_date ? formatDate(data.selected_date) : ""
//                   }
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="grid w-full items-center gap-2">
//                 <Label htmlFor="startTime">{dict?.calendar?.time}</Label>
//                 <Input
//                   id="startTime"
//                   name="startTime"
//                   type="time"
//                   value={data.startTime ? formatTime(data.startTime) : ""}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className="w-full flex-row-center gap-x-5 max-md:flex-col-center max-md:gap-y-5 mt-5">
//                 <div className="space-y-1 w-full">
//                   <Label
//                     htmlFor="description"
//                     className="text-gray-700 text-sm flex items-center"
//                   >
//                     {dict?.calendar?.desc}
//                   </Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     value={data.description}
//                     placeholder={dict?.calendar?.desc_plchldr}
//                     onChange={handleInputChange}
//                     className="h-20"
//                   />
//                 </div>
//               </div>
//             </form>
//           </TabsContent>
//         </Tabs>

//         <DialogFooter>
//           <Button
//             variant="destructive"
//             onClick={closeModal}
//             className="font-semibold"
//           >
//             {dict?.calendar?.cancel || "Cancel"}
//           </Button>
//           {editEvent.length > 0 ? (
//             <Button
//               form={
//                 data.activeTab === "appointments"
//                   ? "appointmentsForm"
//                   : "remindersForm"
//               }
//               className="bg-green-400 hover:bg-green-600"
//               onClick={handleEditEvent}
//             >
//               {dict?.calendar?.editEvent || "Edit Event"}
//             </Button>
//           ) : (
//             <Button
//               form={
//                 data.activeTab === "appointments"
//                   ? "appointmentsForm"
//                   : "remindersForm"
//               }
//               className="bg-green-400 hover:bg-green-600"
//               onClick={handleFormSubmit}
//             >
//               {dict?.calendar?.addEvent || "Add Event"}
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EventModal;

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "../ui/textarea";

const EventModal = ({
  selectedSlot,
  setSelectedSlot,
  events,
  setEvents,
  editEvent,
  handleEditEvent,
  setEditEvent,
  data,
  setData,
}) => {
  const [menteesData, setMenteesData] = useState([]);
  const [menteeName, setMenteeName] = useState("");
  const [menteeId, setMenteeId] = useState("");
  const { dict } = useLanguage();

  // useEffect(() => {
  //   const getMenteesData = async () => {
  //     const response = await fetch(GET_ALL_MENTEES_ROUTE, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setMenteesData(data);
  //     }
  //   };

  //   getMenteesData();
  // }, []);

  useEffect(() => {
    menteesData.forEach((mentee) => {
      if (mentee._id === data.mentee) {
        setMenteeName(mentee.name);
      }
    });
  }, [data]);

  if (!selectedSlot) return null;

  const closeModal = () => {
    setSelectedSlot(null);
    setData({
      title: "",
      mentee: "",
      sessionType: "",
      location: "",
      selected_date: "",
      startTime: "",
      endTime: "",
      description: "",
      color: "#0000FF",
      activeTab: "sessions",
    });
    setEditEvent([]);
  };

  const colors = [
    { value: "#FFFF00", label: dict?.colors?.yellow || "Yellow" },
    { value: "#FF0000", label: dict?.colors?.red || "Red" },
    { value: "#9D00FF", label: dict?.colors?.purple || "Purple" },
    { value: "#00FF00", label: dict?.colors?.green || "Green" },
    { value: "#0000FF", label: dict?.colors?.blue || "Blue" },
  ];

  const sessionTypes = [
    { value: "oneOnOne", label: dict?.sessionTypes?.oneOnOne || "One-on-One" },
    {
      value: "groupSession",
      label: dict?.sessionTypes?.groupSession || "Group Session",
    },
    {
      value: "skillBuilding",
      label: dict?.sessionTypes?.skillBuilding || "Skill Building",
    },
    {
      value: "projectReview",
      label: dict?.sessionTypes?.projectReview || "Project Review",
    },
    {
      value: "careerGuidance",
      label: dict?.sessionTypes?.careerGuidance || "Career Guidance",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("user");
    const formData = {
      ...data,
      userId,
      userType,
    };

    // const response = await fetch(ADD_CALENDAR_EVENT_ROUTE, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });
    let response = { ok: true, json: () => ({ event: formData }) };

    if (response.ok) {
      const data = response.json();
      setEvents([...events, data.event]);
    }

    closeModal();
  };

  // To display date in a proper format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toISOString().split("T")[0];
  };

  // To display start date and end date in a proper format
  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return "";

    if (/^\d{2}:\d{2}$/.test(dateTimeString)) {
      return dateTimeString;
    }
    const date = new Date(dateTimeString);
    if (isNaN(date)) return "";
    return date.toTimeString().slice(0, 5);
  };

  return (
    <Dialog open={!!selectedSlot} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-4/5">
        <DialogHeader>
          <DialogTitle>
            {data.activeTab === "sessions"
              ? dict?.calendar?.title_session || "Add Mentoring Session"
              : dict?.calendar?.title_task || "Add Task"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue={data.activeTab === "tasks" ? "tasks" : "sessions"}
          onValueChange={(value) =>
            setData({
              title: "",
              mentee: "",
              sessionType: "",
              location: "",
              selected_date: "",
              startTime: "",
              endTime: "",
              description: "",
              color: "#0000FF",
              activeTab: value,
            })
          }
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="sessions">
              {dict?.calendar?.session || "Sessions"}
            </TabsTrigger>
            <TabsTrigger value="tasks">
              {dict?.calendar?.task || "Tasks"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sessions">
            <form id="sessionsForm" className="space-y-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="title">
                  {dict?.calendar?.session_title || "Session Title"}
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={data.title}
                  onChange={handleInputChange}
                  placeholder="Enter session title"
                  required
                />
              </div>

              <div className="space-y-1 w-full">
                <Label htmlFor="mentee" className="text-gray-700 text-sm">
                  {dict?.calendar?.sel_mentee || "Select Mentee"}
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`w-full flex items-center justify-start h-[2.25rem] rounded-md border ${
                      !data.mentee ? "text-gray-500" : ""
                    } border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                  >
                    {menteeName ||
                      dict?.calendar?.sel_mentee_plchldr ||
                      "Select a mentee"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-80 overflow-y-scroll">
                    {menteesData.length > 0 ? (
                      menteesData.map((mentee) => (
                        <DropdownMenuItem
                          key={mentee._id}
                          onClick={() => {
                            setData({ ...data, mentee: mentee._id });
                            setMenteeName(mentee.name);
                            setMenteeId(mentee._id);
                          }}
                        >
                          {mentee.name}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem disabled>
                        {dict?.calendar?.no_mentees || "No mentees available"}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between gap-x-5">
                <div className="space-y-1 w-full">
                  <Label
                    htmlFor="sessionType"
                    className="text-gray-700 text-sm"
                  >
                    {dict?.calendar?.session_type || "Session Type"}
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={`w-full flex items-center justify-start h-[2.25rem] rounded-md border ${
                        !data.sessionType ? "text-gray-500" : ""
                      } border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                    >
                      {sessionTypes.find(
                        (type) => type.value === data.sessionType
                      )?.label ||
                        dict?.calendar?.sel_session_type_plchldr ||
                        "Select session type"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-h-80 overflow-y-scroll">
                      {sessionTypes.map((type) => (
                        <DropdownMenuItem
                          key={type.value}
                          onClick={() => {
                            setData({ ...data, sessionType: type.value });
                          }}
                        >
                          {type.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="location">
                    {dict?.calendar?.location || "Location"}
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={data.location}
                    onChange={handleInputChange}
                    placeholder="Enter location or meeting link"
                    required
                  />
                </div>
              </div>

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="selected_date">
                  {dict?.calendar?.date || "Date"}
                </Label>
                <Input
                  id="selected_date"
                  name="selected_date"
                  type="date"
                  value={
                    data.selected_date ? formatDate(data.selected_date) : ""
                  }
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="startTime">
                    {dict?.calendar?.start_time || "Start Time"}
                  </Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={data.startTime ? formatTime(data.startTime) : ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="endTime">
                    {dict?.calendar?.end_time || "End Time"}
                  </Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={data.endTime ? formatTime(data.endTime) : ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex-row-center gap-x-5 max-md:flex-col-center max-md:gap-y-5 mt-5">
                <div className="space-y-1 w-full">
                  <Label
                    htmlFor="description"
                    className="text-gray-700 text-sm flex items-center"
                  >
                    {dict?.calendar?.desc || "Description"}
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={data.description}
                    placeholder={
                      dict?.calendar?.desc_plchldr ||
                      "Enter session details, goals, or agenda"
                    }
                    onChange={handleInputChange}
                    className="h-20"
                  />
                </div>
              </div>

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="color">
                  {dict?.calendar?.event_color || "Event Color"}
                </Label>
                <div className="w-full flex items-center justify-between rounded-md p-2 bg-gray-100">
                  {colors.map((color) => (
                    <div
                      key={color.value}
                      onClick={() => setData({ ...data, color: color.value })}
                      className={`flex flex-col items-center space-y-3 cursor-pointer p-2 px-3 rounded-md ${
                        data.color === color.value
                          ? "ring-2 ring-offset-2 ring-gray-500"
                          : ""
                      }`}
                    >
                      <h1 className="text-sm font-semibold text-gray-700">
                        {color.label}
                      </h1>
                      <div
                        className="h-10 w-10 rounded-full shadow-lg"
                        style={{ backgroundColor: color.value }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="tasks">
            <form id="tasksForm" className="space-y-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="title">
                  {dict?.calendar?.task_title || "Task Title"}
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={data.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="space-y-1 w-full">
                <Label htmlFor="mentee" className="text-gray-700 text-sm">
                  {dict?.calendar?.related_mentee ||
                    "Related Mentee (Optional)"}
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`w-full flex items-center justify-start h-[2.25rem] rounded-md border ${
                      !data.mentee ? "text-gray-500" : ""
                    } border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                  >
                    {menteeName ||
                      dict?.calendar?.sel_mentee_optional ||
                      "Select mentee (optional)"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-80 overflow-y-scroll">
                    <DropdownMenuItem
                      onClick={() => {
                        setData({ ...data, mentee: "" });
                        setMenteeName("");
                        setMenteeId("");
                      }}
                    >
                      {dict?.calendar?.no_mentee || "No specific mentee"}
                    </DropdownMenuItem>
                    {menteesData.length > 0 ? (
                      menteesData.map((mentee) => (
                        <DropdownMenuItem
                          key={mentee._id}
                          onClick={() => {
                            setData({ ...data, mentee: mentee._id });
                            setMenteeName(mentee.name);
                            setMenteeId(mentee._id);
                          }}
                        >
                          {mentee.name}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem disabled>
                        {dict?.calendar?.no_mentees || "No mentees available"}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="selected_date">
                  {dict?.calendar?.due_date || "Due Date"}
                </Label>
                <Input
                  id="selected_date"
                  name="selected_date"
                  type="date"
                  value={
                    data.selected_date ? formatDate(data.selected_date) : ""
                  }
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="startTime">
                  {dict?.calendar?.reminder_time || "Reminder Time"}
                </Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={data.startTime ? formatTime(data.startTime) : ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full flex-row-center gap-x-5 max-md:flex-col-center max-md:gap-y-5 mt-5">
                <div className="space-y-1 w-full">
                  <Label
                    htmlFor="description"
                    className="text-gray-700 text-sm flex items-center"
                  >
                    {dict?.calendar?.task_details || "Task Details"}
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={data.description}
                    placeholder={
                      dict?.calendar?.task_details_plchldr ||
                      "Enter task details, requirements, or notes"
                    }
                    onChange={handleInputChange}
                    className="h-20"
                  />
                </div>
              </div>

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="color">
                  {dict?.calendar?.task_priority || "Task Priority"}
                </Label>
                <div className="w-full flex items-center justify-between rounded-md p-2 bg-gray-100">
                  {colors.map((color) => (
                    <div
                      key={color.value}
                      onClick={() => setData({ ...data, color: color.value })}
                      className={`flex flex-col items-center space-y-3 cursor-pointer p-2 px-3 rounded-md ${
                        data.color === color.value
                          ? "ring-2 ring-offset-2 ring-gray-500"
                          : ""
                      }`}
                    >
                      <h1 className="text-sm font-semibold text-gray-700">
                        {color.label}
                      </h1>
                      <div
                        className="h-10 w-10 rounded-full shadow-lg"
                        style={{ backgroundColor: color.value }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={closeModal}
            className="font-semibold"
          >
            {dict?.calendar?.cancel || "Cancel"}
          </Button>
          {editEvent.length > 0 ? (
            <Button
              form={
                data.activeTab === "sessions" ? "sessionsForm" : "tasksForm"
              }
              className="bg-green-400 hover:bg-green-600"
              onClick={handleEditEvent}
            >
              {dict?.calendar?.editEvent || "Update"}
            </Button>
          ) : (
            <Button
              form={
                data.activeTab === "sessions" ? "sessionsForm" : "tasksForm"
              }
              className="bg-green-400 hover:bg-green-600"
              onClick={handleFormSubmit}
            >
              {dict?.calendar?.addEvent || "Add to Calendar"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
