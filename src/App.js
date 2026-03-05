import React, { useState, useEffect } from "react";

import EmployeeForm from "./components/EmployeeForm"; // Importa el componente EmployeeForm desde la carpeta components. Este componente se encargará de mostrar el formulario para agregar o editar empleados.
import EmployeeList from "./components/EmployeeList"; // Importa el componente EmployeeList desde la carpeta components. Este componente se encargará de mostrar la lista de empleados y las opciones para editarlos o eliminarlos.
import Navbar from "./components/Navbar"; // Importa el componente Navbar desde la carpeta components.
import Footer from "./components/Footer"; // Importa el componente Footer desde la carpeta components.
import "./App.css"; // Importa el archivo CSS para aplicar estilos a la aplicación.

function App() {
  // Define el componente principal de la aplicación, llamado App.
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Define un estado llamado selectedEmployee, que se inicializa como null. Este estado se utilizará para almacenar el empleado que se está editando actualmente.

  const [employees, setEmployees] = useState([]); // Define un estado llamado employees, que se inicializa como un array vacío. Este estado se utilizará para almacenar la lista de empleados obtenida desde el backend.

  const fetchEmployees = () => {
    // Define una función llamada fetchEmployees que se encargará de obtener la lista de empleados desde el backend.
    fetch("http://localhost:3000/usuario") // Realiza una solicitud GET a la URL "http://localhost:3000/usuario" para obtener la lista de empleados.
      .then((res) => res.json()) // Convierte la respuesta de la solicitud a formato JSON.
      .then((data) => setEmployees(data)) // Actualiza el estado employees con los datos obtenidos del backend.
      .catch((err) => console.error("Error al obtener empleados:", err)); // Si ocurre un error durante la solicitud, se muestra un mensaje de error en la consola.
  };

  useEffect(() => {
    // Utiliza el hook useEffect para ejecutar la función fetchEmployees cuando el componente se monta por primera vez. Esto asegura que la lista de empleados se cargue al iniciar la aplicación.
    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    // Define una función llamada handleEdit que se encargará de manejar la acción de editar un empleado. Esta función recibe como parámetro el empleado que se desea editar.
    setSelectedEmployee(employee);
  };

  const handleSaveComplete = () => {
    // Define una función llamada handleSaveComplete que se encargará de manejar la acción después de guardar un empleado. Esta función se llamará desde el componente EmployeeForm cuando se complete la acción de guardar.
    setSelectedEmployee(null); // Restablece el estado selectedEmployee a null para limpiar el formulario después de guardar un empleado.
    fetchEmployees(); // Después de guardar un empleado, se restablece el estado selectedEmployee a null para limpiar el formulario y se llama a fetchEmployees para actualizar la lista de empleados con los cambios realizados.
  };

  return (
    <>
      <Navbar />

      <div className="container-main">
        <h1>GESTION DE EMPLEADOS</h1>

        <EmployeeForm
          employeeToEdit={selectedEmployee}
          onSaveComplete={handleSaveComplete}
        />

        <EmployeeList
          employees={employees}
          onEdit={handleEdit}
          onDelete={fetchEmployees}
        />
      </div>

      <Footer />
    </>
  );
}
// exporta el componente App para que pueda ser utilizado en otros archivos, como index.js, donde se renderiza la aplicación React.
export default App;
