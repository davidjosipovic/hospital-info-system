import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedules } from "../scheduleSlice";

const ScheduleCalendar = ({
  selectedDate,
  setSelectedDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectedUser,
}) => {
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.schedules.schedules);
  const status = useSelector((state) => state.schedules.status);
  const [selectedHour, setSelectedHour] = useState(null); // ✅ Track clicked hour

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSchedules());
    }
  }, [dispatch, status]);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const userSchedules = selectedUser
    ? schedules.filter((schedule) => schedule.userId === selectedUser.id)
    : [];

  const selectedDateSchedules = selectedDate
    ? userSchedules.filter((schedule) => schedule.workDate.split("T")[0] === selectedDate)
    : [];

  const handleDateClick = (day) => {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(date);
    setStartTime(null);
    setEndTime(null);
    setSelectedHour(null); // ✅ Reset hour selection when date changes
  };

  const handleTimeSelection = (time) => {
    setSelectedHour(time); // ✅ Store the clicked hour
    if (startTime === null) {
      setStartTime(time);
    } else if (endTime === null && time > startTime) {
      setEndTime(time);
    } else {
      setStartTime(time);
      setEndTime(null);
    }
  };

  const getOccupiedHours = (day) => {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return userSchedules
      .filter((schedule) => schedule.workDate.split("T")[0] === date)
      .map((schedule) => ({
        start: parseInt(schedule.startTime.split(":")[0]),
        end: parseInt(schedule.endTime.split(":")[0]),
      }));
  };

  const getHighlightedHours = () => {
    if (startTime !== null && endTime !== null && endTime > startTime) {
      return Array.from({ length: endTime - startTime }, (_, i) => startTime + i);
    }
    return [];
  };

  const highlightedHours = getHighlightedHours();

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Schedule Management</h2>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const occupiedHours = getOccupiedHours(day);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`border p-2 hover:bg-blue-200 ${
                occupiedHours.length > 0 ? "bg-gray-300" : ""
              } ${selectedDate === date ? "bg-blue-400 text-white" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Display occupied hours */}
      {selectedDate && selectedDateSchedules.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Occupied Hours for {selectedDate}:</h3>
          <ul className="list-disc pl-5">
            {selectedDateSchedules.map((schedule, index) => (
              <li key={index} className="text-sm">
                {schedule.startTime} - {schedule.endTime}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Select Time Range */}
      <div className="mt-4">
        <p>Select Time Range:</p>
        <div className="grid grid-cols-6 gap-2 mt-2">
          {Array.from({ length: 24 }, (_, index) => {
            const isOccupied = selectedDateSchedules.some(
              (schedule) =>
                index >= parseInt(schedule.startTime.split(":")[0]) &&
                index < parseInt(schedule.endTime.split(":")[0])
            );

            return (
              <button
                key={index}
                onClick={() => handleTimeSelection(index)}
                className={`border p-2 hover:bg-green-200 
                    ${selectedHour === index ? "bg-green-400" : ""} 
    ${startTime === index || endTime === index ? "bg-green-400" : ""} 
    ${highlightedHours.includes(index) ? "bg-green-300" : ""} 
    ${isOccupied && !(selectedHour === index || startTime === index || endTime === index || highlightedHours.includes(index)) ? "bg-red-400" : ""}`}
              >
                {index}:00
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
