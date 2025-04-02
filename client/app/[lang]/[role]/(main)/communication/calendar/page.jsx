"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, startOfWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import DayView from "@/components/calendar/DayView";
import WeekView from "@/components/calendar/WeekView";
import MonthView from "@/components/calendar/MonthView";
import EventModal from "@/components/calendar/EventModal";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

export default function AdvancedCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("week");
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [editEvent, setEditEvent] = useState([]);
  const { dict, currentLang } = useLanguage();
  const router = useRouter();
  const [data, setData] = useState({
    _id: "",
    title: "",
    supervisor: "",
    patient: "",
    roomNo: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    color: "#0000FF",
    activeTab: "appointments",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userName");

    if (!userId) router.push(`/${currentLang}/sign-in`);

    // Simulated data fetch (replace with actual API calls)
    const mockEvents = [
      {
        _id: "1",
        title: "Team Meeting",
        selected_date: new Date().toISOString(),
        start_time: new Date().toISOString(),
        end_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        color: "#9163CB",
        userId: userId,
      },
    ];

    setEvents(mockEvents);
    setCurrentUser(userId);
  }, []);

  const changeDate = (direction) => {
    const newDate = new Date(currentDate);
    const increment = direction === "next" ? 1 : -1;

    switch (viewMode) {
      case "day":
        newDate.setDate(newDate.getDate() + increment);
        break;
      case "week":
        const adjustedDate = startOfWeek(newDate, { weekStartsOn: 1 });
        newDate.setDate(adjustedDate.getDate() + increment * 7);
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + increment);
        break;
      default:
        break;
    }

    setCurrentDate(newDate);
  };

  const modes = ["day", "week", "month"];

  const handleEditEvent = async () => {
    // Simulated edit event logic
    console.log("Editing event:", data);
  };

  const renderView = () => {
    switch (viewMode) {
      case "day":
        return (
          <DayView
            currentDate={currentDate}
            events={events}
            setSelectedSlot={setSelectedSlot}
            userId={currentUser}
            setEditEvent={setEditEvent}
            setData={setData}
          />
        );
      case "week":
        return (
          <WeekView
            currentDate={currentDate}
            events={events}
            setSelectedSlot={setSelectedSlot}
            userId={currentUser}
            setEditEvent={setEditEvent}
            setData={setData}
          />
        );
      case "month":
        return (
          <MonthView
            currentDate={currentDate}
            events={events}
            setCurrentDate={setCurrentDate}
            setViewMode={setViewMode}
            userId={currentUser}
            setSelectedSlot={setSelectedSlot}
            setEditEvent={setEditEvent}
            setData={setData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-y-auto">
      <Card className="shadow-xl border-purple-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <TooltipProvider>
              <div className="flex items-center space-x-5">
                <div className="flex gap-x-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => changeDate("prev")}
                        className="bg-purple-200/50 hover:bg-purple-300"
                      >
                        <ChevronLeft className="h-6 w-6 text-purple-700" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{dict?.calendar?.prev}</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => changeDate("next")}
                        className="bg-purple-200/50 hover:bg-purple-300"
                      >
                        <ChevronRight className="h-6 w-6 text-purple-700" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{dict?.calendar?.next}</TooltipContent>
                  </Tooltip>
                </div>

                <h2 className="text-2xl font-bold text-purple-900">
                  {viewMode === "day"
                    ? format(currentDate, "MMMM d, yyyy")
                    : viewMode === "week"
                    ? format(currentDate, "MMMM, yyyy")
                    : format(currentDate, "MMMM, yyyy")}
                </h2>
              </div>
            </TooltipProvider>

            <div className="flex items-center space-x-4">
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(value) => value && setViewMode(value)}
                className="border border-purple-300 rounded-lg p-1"
              >
                {modes.map((mode) => (
                  <ToggleGroupItem
                    key={mode}
                    value={mode}
                    className={`capitalize px-4 py-2 rounded-md transition-colors 
                      ${
                        viewMode === mode
                          ? "bg-purple-600 text-white font-bold"
                          : "text-purple-600 font-semibold hover:bg-purple-100"
                      }`}
                  >
                    {mode}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              <Button
                onClick={() => setSelectedSlot({ date: currentDate })}
                className="flex items-center bg-white text-purple-600 border-2 border-purple-500 hover:border-purple-600 hover:bg-purple-500 hover:text-white rounded-md px-4 py-5"
              >
                <Plus className="h-7 w-auto" />
                <span className="text-[1rem] leading-3 font-bold">
                  Add Event
                </span>
              </Button>
            </div>
          </div>

          {renderView()}
        </CardContent>
      </Card>

      <EventModal
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        events={events}
        setEvents={setEvents}
        editEvent={editEvent}
        setEditEvent={setEditEvent}
        handleEditEvent={handleEditEvent}
        data={data}
        setData={setData}
      />
    </div>
  );
}
