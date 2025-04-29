import React, { FC, useState } from 'react';
import { Employee } from '../models/Employee';
import {addEmployee, editEmployee} from '../services/EmployeeService'
import './AddEmployeeModal.css';

interface Props {
  onClose: () => void;
  onAddSuccess: () => void;
  employee?: Employee;
  addOrEdit: boolean;
  onDelete?: (id: number) => void;
}

const AddEmployeeModal: FC<Props> = ({ onClose, onAddSuccess, employee, addOrEdit }) => {
  const [empState, setEmpState] = useState<Employee>(
    employee || {
      id: 0,
      name: '',
      department: '',
      address: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpState({ ...empState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
       console.log("addOrEdit ==>",addOrEdit);
    try {
      addOrEdit? await addEmployee(empState) : await editEmployee(empState);
      onAddSuccess(); 
      onClose();      
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Employee</h3>
        <input type="text" name="name" placeholder="Name" value={empState.name} onChange={handleChange} />
        <input type="text" name="department" placeholder="Department" value={empState.department} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={empState.address} onChange={handleChange} />
        <div className="modal-buttons">
        <button onClick={handleSubmit}>Save Employee</button> 
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
function onDelete(id: number) {
  throw new Error('Function not implemented.');
}

