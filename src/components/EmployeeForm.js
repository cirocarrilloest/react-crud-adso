import React, { useState, useEffect } from "react";

function EmployeeForm({ employeeToEdit, onSaveComplete }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  useEffect(() => {
    if (employeeToEdit) {
      setNombre(employeeToEdit.nombre);
      setApellido(employeeToEdit.apellido);
      setCelular(employeeToEdit.celular);
      setCorreo(employeeToEdit.correo);
      setContrasenia(employeeToEdit.contrasenia);
    } else {
      setNombre("");
      setApellido("");
      setCelular("");
      setCorreo("");
      setContrasenia("");
    }
  }, [employeeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = { nombre, apellido, celular, correo, contrasenia };

    const method = employeeToEdit ? "PUT" : "POST";
    const url = employeeToEdit
      ? `http://localhost:3000/usuario/${employeeToEdit.id_usuario}`
      : "http://localhost:3000/usuario";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    })
      .then((res) => res.json())
      .then((data) => {
        const nombreMostrar = data.nombre || nombre; //verificar o cambiar por data.nombre para mostrar el nombre actualizado

        alert(
          employeeToEdit
            ? `Empleado actualizado: ${nombreMostrar}`
            : `Empleado creado: ${nombreMostrar}`,
        );

        setNombre("");
        setApellido("");
        setCelular("");
        setCorreo("");
        setContrasenia("");
        onSaveComplete();
      })
      .catch((err) => console.error("Error", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{employeeToEdit ? "Editar Empleado" : "Agregar Empleado"}</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <input
        type="text"
        placeholder="Celular"
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
        maxLength="10" // Limita a 10 caracteres
        pattern="[0-9]{10}" // Solo permite números y máximo 10 dígitos
        title="maximo 10 numeros" // Agrega un mensaje de validación para el patrón
      />
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasenia}
        onChange={(e) => setContrasenia(e.target.value)}
        required={!employeeToEdit} // Requerir contraseña solo al crear un nuevo empleado
      />
      <button type="submit">{employeeToEdit ? "Actualizar" : "Agregar"}</button>
    </form>
  );
}
export default EmployeeForm;
