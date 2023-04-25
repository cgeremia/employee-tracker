const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");
const chalk = require("chalk");
const figlet = require("figlet");

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
                'Update Employee Role',
                'Add Employee',
                'Add Role',
                'Add Department',
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