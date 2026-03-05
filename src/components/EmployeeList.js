import React from "react";

function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return (
      <div>
        <p>No hay empleados registrados.</p>
      </div>
    );
  }
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este empleado?")) {
      fetch(`http://localhost:3000/usuario/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          alert("Empleado eliminado");
          onDelete();
        })
        .catch((err) => console.error("Error al eliminar el empleado:", err));
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th className="nombre">Nombre</th>
          <th className="apellido">Apellido</th>
          <th className="celular">Celular</th>
          <th className="correo">Correo</th>
          <th className="contrasenia">Contraseña</th>
          <th className="acciones">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id_usuario}>
            <td className="nombre">{emp.nombre}</td>
            <td className="apellido">{emp.apellido}</td>
            <td className="celular">{emp.celular}</td>
            <td className="correo">{emp.correo}</td>
            <td className="contrasenia">{emp.contrasenia}</td>
            <td className="acciones">
              <div className="button-group">
                <button className="btn-edit" onClick={() => onEdit(emp)}>
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(emp.id_usuario)}
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeList;
