
const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        {/* ✅ Zaglavlje tabele */}
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-2 px-4 border-b text-left">
                {col.label}
              </th>
            ))}
            {actions && <th className="py-2 px-4 border-b">Akcije</th>}
          </tr>
        </thead>

        {/* ✅ Telo tabele */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-4">
                Nema podataka
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100 transition">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="py-2 px-4 border-b">
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </td>
                ))}
                
                {/* ✅ Akcije (Edit/Delete) */}
                {actions && (
                  <td className="py-2 px-4 border-b flex gap-2">
                    {actions.edit && (
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => actions.edit(row)}
                      >
                        Edit
                      </button>
                    )}
                    {actions.delete && (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => actions.delete(row)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
