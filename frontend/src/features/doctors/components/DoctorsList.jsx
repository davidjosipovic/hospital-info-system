import { useSelector } from "react-redux";

const DoctorsList = ({ doctors, onDelete, onEdit }) => {
  const { users = [] } = useSelector((state) => state.users || { users: [] });

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">First Name</th>
          <th className="border p-2">Last Name</th>
          <th className="border p-2">Specialization</th>
          <th className="border p-2">Department</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor) => {
          const user = users.find((user) => user.id === doctor.userId);

          return (
            <tr key={doctor.id} className="border-b">
              <td className="border p-2">{user?.firstName ?? "N/A"}</td>
              <td className="border p-2">{user?.lastName ?? "N/A"}</td>

              <td className="border p-2">
                {doctor.specialization?.name ?? "N/A"}
              </td>

              <td className="border p-2">{doctor.department?.name ?? "N/A"}</td>

              <td className="border p-2 flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(doctor)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(doctor.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DoctorsList;
