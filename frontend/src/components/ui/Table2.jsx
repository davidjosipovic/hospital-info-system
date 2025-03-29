import Button from "./Button" 

const Table2 = ({ data, onEdit, onDelete }) => {
    if (!data || data.length === 0) return <p>No data available</p>;
  
    const headers = Object.keys(data[0]);
  
    return (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header) => (
              <th key={header} className="border p-2 capitalize">
                {header.replace(/_/g, " ")}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="border p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b">
              {headers.map((key) => {
                const value = item[key];
  
                return (
                  <td key={key} className="border p-2">
                    {typeof value === "object" && value !== null
                      ? JSON.stringify(value) // Convert object to string
                      : value ?? "N/A"}
                  </td>
                );
              })}
              {(onEdit || onDelete) && (
                <td className="border p-2 flex gap-2">
                  {onEdit && (
                    <Button onClick={()=>onEdit(item)} >
                      Edit </Button>
                    
                  )}
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table2;
  