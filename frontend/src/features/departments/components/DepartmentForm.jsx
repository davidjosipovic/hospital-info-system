import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"

const  DepartmentForm = ({ newDepartment, setNewDepartment, handleAddDepartment }) => (
  <form onSubmit={handleAddDepartment} className="mb-4 flex gap-2">
    <Input
      type="text"
      placeholder="New Department Name"
      value={newDepartment}
      onChange={(e) => setNewDepartment(e.target.value)}
      required
    />
    <Button type="submit" className="bg-green-500">
      Add
    </Button>
  </form>
);
export default DepartmentForm;