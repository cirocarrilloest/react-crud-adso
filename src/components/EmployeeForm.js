import React, { useState, useEffect } from "react";
// Componente para agregar o editar empleados
function EmployeeForm({ employeeToEdit, onSaveComplete }) {
  // Recibe el empleado a editar (si es que se está editando) y una función para llamar cuando se complete la acción de guardar
  const [nombre, setNombre] = useState(""); // Estado para el campo de nombre del empleado
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  // Cuando se recibe un empleado para editar, se llenan los campos con su información, de lo contrario se limpian para un nuevo registro
  useEffect(() => {
    if (employeeToEdit) {
      // Si se recibe un empleado para editar, se llenan los campos con su información
      setNombre(employeeToEdit.nombre); // Llenar el campo de nombre con el valor del empleado a editar
      setApellido(employeeToEdit.apellido); // Llenar el campo de apellido con el valor del empleado a editar
      setCelular(employeeToEdit.celular); // Llenar el campo de celular con el valor del empleado a editar
      setCorreo(employeeToEdit.correo); // Llenar el campo de correo con el valor del empleado a editar
      setContrasenia(employeeToEdit.contrasenia); // Llenar el campo de contraseña con el valor del empleado a editar
    } else {
      setNombre(""); // Si no se recibe un empleado para editar, se limpian los campos para un nuevo registro
      setApellido(""); // Limpiar el campo de apellido para un nuevo registro
      setCelular(""); // Limpiar el campo de celular para un nuevo registro
      setCorreo(""); // Limpiar el campo de correo para un nuevo registro
      setContrasenia(""); // Limpiar el campo de contraseña para un nuevo registro
    }
  }, [employeeToEdit]); // El efecto se ejecuta cada vez que cambia el valor de employeeToEdit, lo que permite actualizar los campos del formulario según el empleado seleccionado para editar o limpiar los campos para un nuevo registro

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = { nombre, apellido, celular, correo, contrasenia }; // Crear un objeto con los datos del empleado a enviar al backend
    const method = employeeToEdit ? "PUT" : "POST"; // Determinar el método HTTP según si se está editando o creando un empleado
    const url = employeeToEdit
      ? `http://localhost:3000/usuario/${employeeToEdit.id_usuario}`
      : "http://localhost:3000/usuario"; // Determinar la URL y el método HTTP según si se está editando o creando un empleado
    // Enviar la solicitud al backend para crear o actualizar el empleado
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    }) // Procesar la respuesta del backend después de crear o actualizar el empleado
      .then((res) => res.json())
      .then((data) => {
        const nombreMostrar = data.nombre || nombre; //verificar o cambiar por data.nombre para mostrar el nombre actualizado

        alert(
          employeeToEdit
            ? `Empleado actualizado: ${nombreMostrar}` // Mostrar un mensaje de éxito con el nombre del empleado actualizado o creado
            : `Empleado creado: ${nombreMostrar}`, // Mostrar un mensaje de éxito con el nombre del empleado creado o actualizado
        );

        setNombre("");
        setApellido(""); // Limpiar el campo de apellido después de guardar el empleado
        setCelular("");
        setCorreo("");
        setContrasenia("");
        onSaveComplete(); // Llamar a la función onSaveComplete para indicar que se ha completado la acción de guardar, lo que puede desencadenar una actualización de la lista de empleados en el componente padre (EmployeeList.js)
      })
      .catch((err) => console.error("Error", err)); // Manejar cualquier error que ocurra durante la solicitud al backend y mostrarlo en la consola para depuración
  };

  return (
    // Renderizar el formulario para agregar o editar empleados
    <form onSubmit={handleSubmit}>
      {" "}
      <h2>{employeeToEdit ? "Editar Empleado" : "Agregar Empleado"}</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)} // Agrega el campo de nombre al formulario
        required
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)} // Agrega el campo de apellido al formulario
        required
      />
      <input
        type="text"
        placeholder="Celular"
        value={celular}
        onChange={(e) => setCelular(e.target.value)} // Agrega el campo de celular al formulario
        maxLength="10" // Limita a 10 caracteres
        pattern="[0-9]{10}" // Solo permite números y máximo 10 dígitos
        title="maximo 10 numeros" // Agrega un mensaje de validación para el patrón
        required
      />
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)} // Agrega el campo de correo electrónico al formulario
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasenia}
        onChange={(e) => setContrasenia(e.target.value)} // Agrega el campo de contraseña al formulario
        required={!employeeToEdit} // Requerir contraseña solo al crear un nuevo empleado
      />
      <button type="submit">{employeeToEdit ? "Actualizar" : "Agregar"}</button>
    </form>
  );
}
export default EmployeeForm; // Exporta el componente EmployeeForm para que pueda ser utilizado en otros archivos, como EmployeeList.js donde se muestra el formulario para agregar o editar empleados, y se pueden guardar los cambios realizados en el formulario a través de la función onSaveComplete que se llama después de guardar un nuevo empleado o actualizar uno existente.
