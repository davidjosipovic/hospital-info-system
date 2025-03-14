import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSchedule } from "../../features/scheduleManagement/scheduleSlice";
import UserSelect from "../../features/scheduleManagement/components/UserSelect";
import ScheduleCalendar from "../../features/scheduleManagement/components/ScheduleCalendar";
import SaveScheduleButton from "../../features/scheduleManagement/components/SaveScheduleButton";

const ScheduleManagementPage = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null); // Null instead of empty string
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleSave = () => {
    if (!selectedUser || !selectedDate || !startTime || !endTime) {
      alert("Please select a user, date, start time, and end time.");
      return;
    }

    const scheduleData = {
      userId: selectedUser.id,
      workDate: new Date(selectedDate).toISOString(), // Ensure UTC format
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      status: "working",
    };
    
    console.log("Schedule Data:", scheduleData); // Log the schedule data


    dispatch(addSchedule(scheduleData));

    // Reset selections
    setSelectedUser(null);
    setSelectedDate(null);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <div className="p-4 mx-auto max-w-lg border rounded">
      <UserSelect onSelectUser={setSelectedUser} />
      <ScheduleCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        selectedUser={selectedUser}
      />
      <SaveScheduleButton onSave={handleSave} />
    </div>
  );
};

export default ScheduleManagementPage;
