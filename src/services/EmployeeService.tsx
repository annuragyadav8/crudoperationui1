import { Employee } from "../models/Employee";

const API_BASE_URL = 'https://localhost:7266/employee';

export const getEmployees = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getemployees`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const addEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/AddEmployee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  });

  if (!response.ok) {
    throw new Error('Failed to add employee');
  }

  return await response.json();
};


export const editEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/UpdateEmployee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  });

  if (!response.ok) {
    throw new Error('Failed to add employee');
  }

  return await response.json();
};

export const delteEmployee = async (id: number): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/DeleteEmployee/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete employee');
  }

  return await response.json();
};



