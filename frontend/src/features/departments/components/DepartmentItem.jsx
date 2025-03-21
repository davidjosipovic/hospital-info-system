import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"

const DepartmentItem = ({ department, handleEditClick, handleDeleteDepartment, editingDepartment, updatedName, setUpdatedName, handleUpdateDepartment, setEditingDepartment }) => (
  <li className="flex justify-between items-center p-3 border rounded">
    {editingDepartment?.id === department.id ? (
      <form onSubmit={handleUpdateDepartment} className="flex gap-2">
        <Input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          required
        />
        <Button type="submit" className="bg-blue-500">
          Save
        </Button>
        <Button
          type="button"
          className="bg-gray-400"
          onClick={() => setEditingDepartment(null)}
        >
          Cancel
        </Button>
      </form>
    ) : (
      <>
        <span>{department.name}</span>
        <div className="flex gap-2">
          <Button className="bg-blue-500" onClick={() => handleEditClick(department)}>
            Edit
          </Button>
          <Button className="bg-red-500" onClick={() => handleDeleteDepartment(department.id)}>
            Delete
          </Button>
        </div>
      </>
    )}
  </li>
);

export default DepartmentItem