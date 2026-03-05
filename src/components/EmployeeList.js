import React from "react";

function EmployeeList({ employees, onEdit, onDelete }) {
  // Componente para mostrar la lista de empleados recibe la lista de empleados, una función para editar y otra para eliminar
  if (employees.length === 0) {
    // Si no hay empleados registrados, se muestra un mensaje indicando que no hay empleados
    return (
      <div>
        <p>No hay empleados registrados.</p>
      </div>
    );
  }
  const handleDelete = (id) => {
    // Función para manejar la eliminación de un empleado, recibe el ID del empleado a eliminar
    if (window.confirm("¿Estás seguro de eliminar este empleado?")) {
      // Mostrar una confirmación antes de eliminar el empleado para evitar eliminaciones accidentales
      fetch(`http://localhost:3000/usuario/${id}`, { method: "DELETE" }) // Enviar una solicitud DELETE al backend para eliminar el empleado, y luego llamar a onDelete para actualizar la lista de empleados en el componente padre (EmployeeList.js)
        .then((res) => res.json()) // Procesar la respuesta del backend después de eliminar el empleado
        .then(() => {
          // Mostrar un mensaje de éxito después de eliminar el empleado y llamar a onDelete para actualizar la lista de empleados en el componente padre (EmployeeList.js)
          alert("Empleado eliminado");
          onDelete();
        })
        .catch((err) => console.error("Error al eliminar el empleado:", err)); // Enviar una solicitud DELETE al backend para eliminar el empleado, y luego llamar a onDelete para actualizar la lista de empleados en el componente padre (EmployeeList.js)
    }
  };
  return (
    // Renderizar la tabla con la lista de empleados, mostrando sus datos y botones para editar y eliminar cada empleado
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
        {employees.map(
          (
            emp, // Iterar sobre la lista de empleados y renderizar una fila para cada empleado, mostrando sus datos y botones para editar y eliminar cada empleado
          ) => (
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
          ),
        )}
      </tbody>
    </table>
  );
}

export default EmployeeList; // Exportar el componente EmployeeList para que pueda ser utilizado en otros archivos, como EmployeeForm.js, donde se muestra la lista de empleados y se pueden editar o eliminar cada empleado a través de los botones correspondientes en cada fila de la tabla.
