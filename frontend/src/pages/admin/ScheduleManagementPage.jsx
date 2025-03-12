import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules, addSchedule, editSchedule, removeSchedule } from '../../features/scheduleManagement/scheduleSlice';
import ScheduleForm from '../../features/scheduleManagement/components/ScheduleForm';
import ScheduleTable from '../../features/scheduleManagement/components/ScheduleTable';

const ScheduleManagementPage = () => {
  const dispatch = useDispatch();
  const { schedules, status, error } = useSelector((state) => state.schedules);
  const [newSchedule, setNewSchedule] = useState({
    userId: '',
    workDate: '',
    startTime: '',
    endTime: '',
    status: 'working',
  });
  const [editScheduleData, setEditScheduleData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  const handleAddSchedule = (e) => {
    e.preventDefault();
    dispatch(addSchedule(newSchedule));
    setNewSchedule({ userId: '', workDate: '', startTime: '', endTime: '', status: 'working' });
  };

  const handleUpdateSchedule = (e) => {
    e.preventDefault();
    dispatch(editSchedule({ id: editScheduleData.id, scheduleData: editScheduleData }));
    setIsEditing(false);
    setEditScheduleData(null);
  };

  const handleDeleteSchedule = (id) => {
    dispatch(removeSchedule(id));
  };

  const handleEditSchedule = (schedule) => {
    setIsEditing(true);
    setEditScheduleData({ ...schedule });
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="mx-80">
      <h1 className=''>Schedule management</h1>
      <ScheduleForm
        isEditing={isEditing}
        scheduleData={isEditing ? editScheduleData : newSchedule}
        onSubmit={isEditing ? handleUpdateSchedule : handleAddSchedule}
        onChange={isEditing ? setEditScheduleData : setNewSchedule}
      />

      <ScheduleTable
        schedules={schedules}
        onEdit={handleEditSchedule}
        onDelete={handleDeleteSchedule}
      />
    </div>
  );
};

export default ScheduleManagementPage;
