import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedules } from "../scheduleSlice"; // Import the async thunk

const ScheduleCalendar = ({
  selectedDate,
  setSelectedDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectedUser
}) => {
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.schedules.schedules); // Access schedules from the Redux store
  const status = useSelector((state) => state.schedules.status); // Access loading status

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSchedules()); // Fetch schedules when the component mounts
    }
  }, [dispatch, status]);

  // Helper function to get the days in the month
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month + 1, 0); // Last day of the month
    return date.getDate();
  };

  // Handle clicking a date in the calendar
  const handleDateClick = (day) => {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(date);
    setStartTime(null);
    setEndTime(null);
  };

  // Time selection logic
  const handleTimeSelection = (time) => {
    if (!startTime) {
      setStartTime(time);
    } else if (!endTime && time > startTime) {
      setEndTime(time);
    }
  };

  // Calendar days display logic
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  // Filter schedules by selected user, only if selectedUser exists
  const userSchedules = selectedUser 
    ? schedules.filter((schedule) => schedule.userId === selectedUser.id) 
    : [];

  // Find the schedules for the selected date
  const selectedDateSchedules = selectedDate
    ? userSchedules.filter((schedule) => schedule.workDate.split("T")[0] === selectedDate)
    : [];

  // Function to get the occupied hours for a day
  const getOccupiedHours = (day) => {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const schedulesForDay = userSchedules.filter(
      (schedule) => schedule.workDate.split("T")[0] === date
    );
    return schedulesForDay.map((schedule) => ({
      start: parseInt(schedule.startTime.split(":")[0]), // Get hour from startTime
      end: parseInt(schedule.endTime.split(":")[0])    // Get hour from endTime
    }));
  };

  // Helper function to get the hours between startTime and endTime
  const getHighlightedHours = () => {
    if (startTime !== null && endTime !== null && endTime > startTime) {
      return [...Array(endTime - startTime)].map((_, i) => startTime + i);
    }
    return [];
  };

  const highlightedHours = getHighlightedHours();

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Schedule Management</h2>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          
          // Get occupied hours for the day
          const occupiedHours = getOccupiedHours(day);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}  // Now clickable even if the day has schedules
              className={`border p-2 hover:bg-blue-200 ${occupiedHours.length > 0 ? "bg-gray-300" : ""} ${selectedDate === date ? "bg-blue-400 text-white" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Display selected day's scheduled hours */}
      {selectedDate && selectedDateSchedules.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Zauzeti Sati za {selectedDate}:</h3>
          <ul className="list-disc pl-5">
            {selectedDateSchedules.map((schedule, index) => (
              <li key={index} className="text-sm">
                {schedule.startTime} - {schedule.endTime}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Time Range Selection */}
      <div className="mt-4">
        <p>Select Time Range:</p>
        <div className="grid grid-cols-6 gap-2 mt-2">
          {[...Array(24)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleTimeSelection(index)}
              className={`border p-2 hover:bg-green-200 ${startTime === index || endTime === index ? "bg-green-400" : ""} ${highlightedHours.includes(index) ? "bg-green-300" : ""} ${selectedDateSchedules.some(schedule => index >= parseInt(schedule.startTime.split(":")[0]) && index < parseInt(schedule.endTime.split(":")[0])) ? "bg-red-400" : ""}`}
            >
              {index}:00
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
