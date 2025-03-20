import React, { useEffect, useState, useMemo } from "react";
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
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const parseTime = (timeString) => parseInt(timeString.split(":")[0], 10);
  const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
  
  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSchedules());
    }
  }, [dispatch, status]);

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        return 11;
      }
      return prev - 1;
    });
    if (currentMonth === 0) {
      setYear((y) => y - 1);
    }
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        return 0;
      }
      return prev + 1;
    });
    if (currentMonth === 11) {
      setYear((y) => y + 1);
    }
  };

  const userSchedules = useMemo(() => {
    return selectedUser
      ? schedules.filter((schedule) => schedule.userId === selectedUser.id)
      : [];
  }, [selectedUser, schedules]);

  const handleDateClick = (day) => {
    const date = formatDate(year, currentMonth, day);
    setSelectedDate(date);
    setStartTime(null);
    setEndTime(null);
  };

  const handleTimeSelection = (time) => {
    if (startTime === null || (endTime !== null && time < startTime)) {
      setStartTime(time);
      setEndTime(null);
    } else if (endTime === null && time > startTime) {
      setEndTime(time);
    } else {
      setStartTime(time);
      setEndTime(null);
    }
  };

  const getTimeButtonClass = (index, isOccupied) => {
    if (isOccupied) return "bg-red-400";
    if (startTime === index || endTime === index) return "bg-green-400";
    if (highlightedHours.includes(index)) return "bg-green-300";
    return "hover:bg-green-200 border p-2";
  };
  
  const occupiedHoursByDay = useMemo(() => {
    const occupied = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(year, currentMonth, day);
      occupied[day] = userSchedules
        .filter((schedule) => schedule.workDate.split("T")[0] === date)
        .map((schedule) => ({
          start: parseTime(schedule.startTime),
          end: parseTime(schedule.endTime),
        }));
    }
    return occupied;
  }, [userSchedules, year, currentMonth, daysInMonth]);

  const getOccupiedHours = (day) => occupiedHoursByDay[day] || [];

  const highlightedHours = useMemo(() => {
    if (startTime !== null && endTime !== null && endTime > startTime) {
      return Array.from(
        { length: endTime - startTime },
        (_, i) => startTime + i
      );
    }
    return [];
  }, [startTime, endTime]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Schedule Management</h2>
      <div className="flex justify-between items-center mt-2">
        <button onClick={prevMonth} className="p-2 bg-gray-200 rounded">
          ←
        </button>
        <h3 className="text-lg font-semibold">
          {new Date(year, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </h3>
        <button onClick={nextMonth} className="p-2 bg-gray-200 rounded">
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const date = formatDate(year, currentMonth, day);
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

      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Occupied Hours for {selectedDate}:
          </h3>
          <ul className="list-disc pl-5">
            {userSchedules
              .filter(
                (schedule) => schedule.workDate.split("T")[0] === selectedDate
              )
              .map((schedule, index) => (
                <li key={index} className="text-sm">
                  {schedule.startTime} - {schedule.endTime}
                </li>
              ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <p>Select Time Range:</p>
        <div className="grid grid-cols-6 gap-2 mt-2">
          {Array.from({ length: 24 }, (_, index) => {
            const isOccupied = userSchedules.some(
              (schedule) =>
                selectedDate === schedule.workDate.split("T")[0] &&
                index >= parseInt(schedule.startTime.split(":")[0]) &&
                index < parseInt(schedule.endTime.split(":")[0])
            );

            return (
              <button
                key={index}
                onClick={() => handleTimeSelection(index)}
                className={getTimeButtonClass(index, isOccupied)}
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
