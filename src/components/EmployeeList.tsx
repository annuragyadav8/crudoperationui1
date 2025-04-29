import React, { useEffect, useState, FunctionComponent  } from 'react';
import { getEmployees ,delteEmployee, getEmployee} from '../services/EmployeeService';
import { Employee } from '../models/Employee';
import AddEmployeeModal from './AddEmployeeModal';
import './EmployeeList.css';

const EmployeeList : FunctionComponent = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employee, setEmployee] = useState<Employee>();
  const [showModal, setShowModal] = useState(false);
  const [addOrEdit, setAddOrEdit] = useState(false);
  
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data: Employee[] = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.log('API error:', err);
    }
  };

  const handleEdit = async (id?: number) => {
    setAddOrEdit(false);
    if (id !== undefined) 
    {
      const data: Employee = await getEmployee(id);
      console.log("data ==>",data);
      setEmployee(data);
    setShowModal(true);
       <AddEmployeeModal
             onClose={() => setShowModal(false)}
             onAddSuccess={fetchEmployees}
             employee={data}
             addOrEdit={addOrEdit}
           />
    }
  
  };
  
  const handleDelete = (id?: number) => {
    if (id !== undefined) {
      delteEmployee(id);
      fetchEmployees();
    } else {
      console.error("Invalid employee ID for deletion");
    }
  };

  const handleAddEmployeeClick = () => {
    setAddOrEdit(true);
    setShowModal(true);
  };

  return (
    <div className="table-container">
      <h2>Employee List</h2>
      <button onClick={handleAddEmployeeClick}>Add Employee</button>
      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onAddSuccess={fetchEmployees}
          employee={employee} 
          addOrEdit = {addOrEdit}
        />
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Department</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.address}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(emp.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
