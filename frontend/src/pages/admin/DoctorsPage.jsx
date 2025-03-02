import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctors,
  removeDoctor,
  editDoctor,
  addDoctor,
} from "../../features/doctors/doctorsSlice";
import { fetchUsers } from "../../features/users/usersSlice";
import { fetchDepartments } from "../../features/departments/departmentsSlice";
import { fetchSpecializations } from "../../features/specializations/specializationsSlice";
import DoctorsHeader from "../../features/doctors/components/DoctorsHeader";
import DoctorsSearch from "../../features/doctors/components/DoctorsSearch";
import DoctorsList from "../../features/doctors/components/DoctorsList";
import DoctorFormModal from "../../features/doctors/components/DoctorFormModal";

const DoctorsPage = () => {
  const dispatch = useDispatch();
  const {
    doctors = [],
    loading,
    error,
  } = useSelector((state) => state.doctors || { doctors: [] });
  const { users = [] } = useSelector((state) => state.users || { users: [] });
  const { role } = useSelector((state) => state.auth || {});

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchUsers());
    dispatch(fetchDepartments());
    dispatch(fetchSpecializations());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      await dispatch(removeDoctor(id));
    }
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setIsModalOpen(true);
  };

  const handleSaveDoctor = async (doctorData) => {
    if (selectedDoctor) {
      await dispatch(editDoctor({ id: selectedDoctor.id, doctorData }));
    } else {
      await dispatch(addDoctor(doctorData));
    }
    dispatch(fetchUsers());
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const filteredDoctors = (doctors ?? []).filter((doctor) => {
    const user = users.find((user) => user.id === doctor.userId);
    const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

    return (
      fullName.toLowerCase().includes((search ?? "").toLowerCase()) ||
      doctor.specialization?.name
        .toLowerCase()
        .includes((search ?? "").toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <DoctorsHeader role={role} onAddDoctor={handleAddDoctor} />
      <DoctorsSearch search={search} setSearch={setSearch} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <DoctorsList
          doctors={filteredDoctors}
          onDelete={role === "admin" ? handleDelete : null}
          onEdit={role === "admin" ? handleEdit : null}
        />
      )}

      {isModalOpen && (
        <DoctorFormModal
          onClose={handleCloseModal}
          onSave={handleSaveDoctor}
          existingDoctor={selectedDoctor}
        />
      )}
    </div>
  );
};

export default DoctorsPage;
