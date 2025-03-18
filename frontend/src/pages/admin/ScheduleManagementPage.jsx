import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSchedule, updateSchedule } from "../../features/scheduleManagement/scheduleSlice";
import UserSelect from "../../features/scheduleManagement/components/UserSelect";
import ScheduleCalendar from "../../features/scheduleManagement/components/ScheduleCalendar";
import SaveScheduleButton from "../../features/scheduleManagement/components/SaveScheduleButton";
import { useSelector } from "react-redux";
import { fetchSchedules } from "../../features/scheduleManagement/scheduleSlice"

const ScheduleManagementPage = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const schedules = useSelector((state) => state.schedules.schedules);

  const handleSave = () => {
    if (!selectedUser || !selectedDate || !startTime || !endTime) {
      alert("Please select a user, date, start time, and end time.");
      return;
    }

    const existingSchedule = schedules.find(
      (schedule) =>
        schedule.userId === selectedUser.id &&
        schedule.workDate.split("T")[0] === selectedDate
    );
    console.log(existingSchedule)

    const scheduleData = {
      userId: selectedUser.id,
      workDate: new Date(selectedDate).toISOString(),
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      status: "working",
    };

    if (existingSchedule) {
      
      const updatedScheduleData = {
        id: existingSchedule.id,
        userId: selectedUser.id,
        workDate: new Date(selectedDate).toISOString(),
        startTime: `${startTime}:00`,
        endTime: `${endTime}:00`,
        status: "working",
      };
    
      console.log(updatedScheduleData);
    
     
      dispatch(updateSchedule({ id: existingSchedule.id, scheduleData: updatedScheduleData }));
    } else {
      dispatch(addSchedule(scheduleData));  
    }
    dispatch(fetchSchedules());


    
    
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
