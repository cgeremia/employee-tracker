INSERT INTO departments (department_name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('Human Resources');

  INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 70000.00, 1),
  ('Sales Representative', 50000.00, 1),
  ('Marketing Manager', 65000.00, 2),
  ('Marketing Coordinator', 45000.00, 2),
  ('Finance Manager', 80000.00, 3),
  ('Financial Analyst', 60000.00, 3),
  ('HR Manager', 75000.00, 4),
  ('HR Coordinator', 55000.00, 4);

  INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('David', 'Johnson', 3, 1),
  ('Emily', 'Davis', 4, 1),
  ('Michael', 'Wilson', 5, NULL),
  ('Jessica', 'Brown', 6, 5),
  ('Robert', 'Miller', 7, 5),
  ('Olivia', 'Anderson', 8, 5);