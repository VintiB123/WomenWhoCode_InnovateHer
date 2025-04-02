import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import EventInfoPopover from "./EventInfoPopup";

const MonthView = ({
  currentDate,
  events,
  setCurrentDate,
  setViewMode,
  userId,
  setEditEvent,
  setData,
  setSelectedSlot,
}) => {
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const startOfCurrent = startOfMonth(currentDate);
  const endOfCurrent = endOfMonth(currentDate);
  const { dict } = useLanguage();

  const startDayOfWeek = startOfCurrent.getDay();

  const monthDays = eachDayOfInterval({
    start: startOfCurrent,
    end: endOfCurrent,
  });

  const leadingEmptyDays = Array.from(
    { length: startDayOfWeek },
    (_, index) => index
  );

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="relative grid grid-cols-7 gap-2 border rounded-lg p-3">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="font-bold text-center text-xl mb-2 rounded-lg py-2"
        >
          {dict?.calendar?.[day] ?? day}{" "}
          {/* Fallback to English if dict.calendar is undefined */}
        </div>
      ))}

      {leadingEmptyDays.map((_, index) => (
        <div key={`empty-${index}`} className="p-2 min-h-[120px]"></div>
      ))}

      {monthDays.map((day) => {
        const dayEvents = events.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate.toDateString() === day.toDateString();
        });

        return (
          <div
            key={day.toISOString()}
            className="border rounded-lg p-3 min-h-[120px] relative"
            onClick={() => {
              setCurrentDate(day);
              setViewMode("day");
            }}
          >
            <div className="font-semibold mb-2 text-lg">{format(day, "d")}</div>

            {dayEvents.map((event) => (
              <div
                key={event._id}
                className="rounded-md p-1 h-6 text-xs mb-1 relative"
                style={{ backgroundColor: event.color }}
                onMouseEnter={() => setHoveredEventId(event._id)}
                onMouseLeave={() => setHoveredEventId(null)}
              >
                <h1 className="text-white font-bold">{event.title}</h1>

                {userId === event.userId && (
                  <button
                    className="absolute top-1 right-1 text-white text-xs rounded px-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditEvent(event);
                      setData({
                        _id: event._id || "",
                        title: event.title || "",
                        supervisor: event.supervisor_id || "",
                        patient: event.patient_id || "",
                        roomNo: event.room_no || "",
                        date: event.selected_date || "",
                        startTime: event.start_time || "",
                        endTime: event.end_time || "",
                        description: event.description || "",
                        color: event.color || "#0000FF",
                        activeTab: event.messageType,
                      });
                      setSelectedSlot({
                        date: new Date(event.selected_date),
                        time: `${event.start_time}-${event.end_time}`,
                      });
                    }}
                  >
                    <h5 className="text-xs text-gray-300 font-semibold">
                      {dict?.calendar?.edit}
                    </h5>
                  </button>
                )}

                {hoveredEventId === event._id && (
                  <EventInfoPopover event={event} />
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;
