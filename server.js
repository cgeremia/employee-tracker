const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');

connection.connect((error) => { 
    if (error) throw error;
    console.log(chalk.magenta.bold(figlet.textSync('Employee Tracker')));
    promptUser();
});

const promptUser = () => {
    inquirer.prompt([
        {
            name: 'directory',
            type: 'list',
            message: 'Please select an option:',
            choices: [
                'View All Departments',
                'View All Employees',
                'View All Roles',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update Employee Role',
                'Exit'
            ]
        }
    ])
    .then((answers) => { 
        const {choices} = answers;

        if (choices === 'View All Employees') {
            viewAllEmployees();
        }

        if (choices === 'View All Departments') {
            viewAllDepartments();
        }

        if (choices === 'View All Roles') {
            viewRoles();
        }

        if (choices === 'Update Employee Role') {
            updateEmployeeRole();
        }

        if (choices === 'Add Employee') {
            addEmployee();
        }

        if (choices === 'Add Role') {
            addRole();
        }

        if (choices === 'Add Department') {
            addDepartment();
        }

        if (choices === 'Exit') {
            connection.end();
        }
    });
};

// View 
const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

const viewAllDepartments = () => { 
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.tables(res);
        promptUser();
    });
};

// Add 

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the employees first name?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the employees last name?'
        },
        {
            name: 'role',
            type: 'input',
            message: 'What is the employees role?'
        },
        {
            name: 'id',
            type: 'integer',
            message: 'What is the employees id?'
        },
        {
            name: 'manager',
            type: 'input',
            message: 'What is the managers id?'
        }
    ])
    .then((answer) => { 
        connection.query('INSERT INTO employee SET ?', answer, (err) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            promptUser();
        });
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of this role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'How much is the salary for this role?'
        },
        {
            name: 'department',
            type: 'input',
            message: 'What is the department id for this role?'
        }
    ])
    .then((answer) => {
        connection.query('INSERT INTO role SET ?', answer, (err) => { 
            if (err) throw err;
            console.log('Role added successfully!');
            promptUser();
        });
    });
};

const addDepartment = () => { 
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ])
    .then((answer) => { 
        connection.query('INSERT INTO department SET ?', answer, (err) => {
            if (err) throw err;
            console.log('Department added successfully!');
            promptUser();
        });
    });
};

// Update 

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            name: 'employee',
            type: 'input',
            message: 'What is the id of the employee?'
        },
        {
            name: 'new_role',
            type: 'input',
            message: 'What is the new role for this employee?'
        }
    ])
    .then((answer) => { 
        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.employee_id, answer.new_role], (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            promptUser();
        });
    });
};

promptUser();