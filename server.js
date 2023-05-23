const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");
const chalk = require("chalk");
const figlet = require("figlet");

connection.connect((err) => {
  console.log(chalk.magenta.bold(figlet.textSync("Employee Tracker")));
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "View all employees":
          viewEmployees();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update an employee role":
          updateEmployeeRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

// View all departments
function viewDepartments() {
  const query = "SELECT department_id, department_name FROM departments";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// View all roles
function viewRoles() {
  const query = `
    SELECT roles.role_id, roles.title, departments.department_name, roles.salary
    FROM roles
    INNER JOIN departments ON roles.department_id = departments.department_id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// View all employees
function viewEmployees() {
  const query = `
    SELECT employees.employee_id, employees.first_name, employees.last_name, 
      roles.title, departments.department_name, roles.salary, managers.manager_name AS manager
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.role_id
    INNER JOIN departments ON roles.department_id = departments.department_id
    LEFT JOIN (
      SELECT CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name, employees.employee_id
      FROM employees
      INNER JOIN employees AS managers ON employees.manager_id = managers.employee_id
    ) AS managers ON employees.employee_id = managers.employee_id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Add a department
function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter the name of the department:",
    })
    .then((answer) => {
      const query = "INSERT INTO departments SET ?";
      connection.query(
        query,
        { department_name: answer.department },
        (err, res) => {
          if (err) throw err;
          console.log("Department added successfully!");
          start();
        }
      );
    });
}

// Add a role
function addRole() {
  const query = "SELECT * FROM departments";
  connection.query(query, (err, departments) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Enter the title of the role:",
        },
        {
          name: "salary",
          type: "number",
          message: "Enter the salary for the role:",
        },
        {
          name: "department",
          type: "list",
          message: "Select the department for the role:",
          choices: departments.map((department) => department.department_name),
        },
      ])
      .then((answers) => {
        const selectedDepartment = departments.find(
          (department) => department.department_name === answers.department
        );
        const query = "INSERT INTO roles SET ?";
        connection.query(
          query,
          {
            title: answers.title,
            salary: answers.salary,
            department_id: selectedDepartment.department_id,
          },
          (err, res) => {
            if (err) throw err;
            console.log("Role added successfully!");
            start();
          }
        );
      });
  });
}

// Add an employee
function addEmployee() {
  const query = `
    SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.role_id`;
  connection.query(query, (err, roles) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "Enter the employee's first name:",
        },
        {
          name: "lastName",
          type: "input",
          message: "Enter the employee's last name:",
        },
        {
          name: "role",
          type: "list",
          message: "Select the employee's role:",
          choices: roles.map((role) => role.title),
        },
        {
          name: "manager",
          type: "list",
          message: "Select the employee's manager:",
          choices: roles.map((role) => `${role.first_name} ${role.last_name}`),
        },
      ])
      .then((answers) => {
        const selectedRole = roles.find((role) => role.title === answers.role);
        const selectedManager = roles.find(
          (role) => `${role.first_name} ${role.last_name}` === answers.manager
        );
        const query = "INSERT INTO employees SET ?";
        connection.query(
          query,
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: selectedRole.role_id,
            manager_id: selectedManager.employee_id,
          },
          (err, res) => {
            if (err) throw err;
            console.log("Employee added successfully!");
            start();
          }
        );
      });
  });
}

// Update an employee role
function updateEmployeeRole() {
  const query = `
    SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.role_id`;
  connection.query(query, (err, employees) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Select the employee to update:",
          choices: employees.map(
            (employee) => `${employee.first_name} ${employee.last_name}`
          ),
        },
        {
          name: "role",
          type: "list",
          message: "Select the new role for the employee:",
          choices: employees.map((employee) => employee.title),
        },
      ])
      .then((answers) => {
        const selectedEmployee = employees.find(
          (employee) =>
            `${employee.first_name} ${employee.last_name}` === answers.employee
        );
        const selectedRole = employees.find(
          (employee) => employee.title === answers.role
        );
        const query = "UPDATE employees SET ? WHERE ?";
        connection.query(
          query,
          [
            { role_id: selectedRole.role_id },
            { employee_id: selectedEmployee.employee_id },
          ],
          (err, res) => {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            start();
          }
        );
      });
  });
}
