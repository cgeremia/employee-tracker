DROP DATABASE IF EXISTS Employees_DB;
CREATE DATABASE Employees_DB;

USE Employees_DB;

CREATE TABLE departments (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL
);


INSERT INTO departments (department_name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('Human Resources');


CREATE TABLE roles (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments (department_id)
);


INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 70000.00, 1),
  ('Sales Representative', 50000.00, 1),
  ('Marketing Manager', 65000.00, 2),
  ('Marketing Coordinator', 45000.00, 2),
  ('Finance Manager', 80000.00, 3),
  ('Financial Analyst', 60000.00, 3),
  ('HR Manager', 75000.00, 4),
  ('HR Coordinator', 55000.00, 4);


CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles (role_id),
  FOREIGN KEY (manager_id) REFERENCES employees (employee_id)
);


INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('David', 'Johnson', 3, 1),
  ('Emily', 'Davis', 4, 1),
  ('Michael', 'Wilson', 5, NULL),
  ('Jessica', 'Brown', 6, 5),
  ('Robert', 'Miller', 7, 5),
  ('Olivia', 'Anderson', 8, 5);
