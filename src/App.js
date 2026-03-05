import React, { useState, useEffect } from "react";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    fetch("http://localhost:3000/usuario")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error al obtener empleados:", err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSaveComplete = () => {
    setSelectedEmployee(null);
    fetchEmployees();
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
