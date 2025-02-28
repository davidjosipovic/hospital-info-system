import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors, addDoctor, editDoctor, removeDoctor } from "../../features/doctors/doctorsSlice";
import { fetchUsers } from "../../store/slices/usersSlice";  // ✅ Fetch users
import { fetchDepartments } from "../../features/departments/departmentsSlice";
import { fetchSpecializations } from "../../features/specializations/specializationsSlice";
import DoctorsList from "../../features/doctors/components/DoctorsList";
import DoctorForm from "../../features/doctors/components/DoctorForm";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { PlusCircle, Loader } from "lucide-react";

const DoctorsPage = () => {
  const dispatch = useDispatch();
  const { doctors = [], loading, error } = useSelector((state) => state.doctors || { doctors: [] });
  const { users = [] } = useSelector((state) => state.users || { users: [] }); // ✅ Ensure users are available
  const { role } = useSelector((state) => state.auth || {});

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchUsers());  // ✅ Fetch users when the page loads
    dispatch(fetchDepartments())
    dispatch(fetchSpecializations())
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
    dispatch(fetchUsers());  // ✅ Refetch users after adding/editing
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const filteredDoctors = (doctors ?? []).filter((doctor) => {
    const user = users.find((user) => user.id === doctor.userId);
    const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

    return fullName.toLowerCase().includes((search ?? "").toLowerCase()) ||
      doctor.specialization?.name.toLowerCase().includes((search ?? "").toLowerCase());
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Doctors</h2>
        {role === "admin" && (
          <Button className="bg-green-500 text-white flex items-center" onClick={handleAddDoctor}>
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Doctor
          </Button>
        )}
      </div>

      <Input
        type="text"
        placeholder="Search by name or specialization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full"
      />

      {loading && (
        <div className="flex justify-center">
          <Loader className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <DoctorsList
          doctors={filteredDoctors}
          onDelete={role === "admin" ? handleDelete : null}
          onEdit={role === "admin" ? handleEdit : null}
        />
      )}

      {isModalOpen && (
        <DoctorForm
          onClose={handleCloseModal}
          onSave={handleSaveDoctor}
          existingDoctor={selectedDoctor}
        />
      )}
    </div>
  );
};

export default DoctorsPage;
