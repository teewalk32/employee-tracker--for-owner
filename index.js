const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'company_db'
    });
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the company_db database.');

    startApp();
});

function startApp() {
    inquirer
      .createPromptModule() // Create prompt module
      ({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      })
      .then((answers) => {
        if (answers.action === 'View all departments') {
          viewAllDepartments();
        } else if (answers.action === 'View all roles') {
          viewAllRoles();
        } else if (answers.action === 'View all employees') {
          viewAllEmployees();
        } else if (answers.action === 'Add a department') {
          addDepartment();
        } else if (answers.action === 'Add a role') {
          addRole();
        } else if (answers.action === 'Add an employee') {
          addEmployee();
        } else if (answers.action === 'Update an employee role') {
          updateEmployeeRole();
        } else if (answers.action === 'Exit') {
          console.log('Exiting the application.');
          db.end();
        }
      });
  }
