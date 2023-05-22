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
    if (err) {
        console.log('error connecting to database');
    } else {
        console.log('Connected to the company_db database.');
    }

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
                'View department',
                'View roles',
                'View employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        })
        .then((answers) => {
            if (answers.action === 'View department') {
                viewDepartment();
            } else if (answers.action === 'View roles') {
                viewRoles();
            } else if (answers.action === 'View employees') {
                viewEmployees();
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

function viewDepartment() {
    db.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
  
      console.table(results);
      startApp();
    });
  }
  
  function viewRoles() {
    db.query(
      `SELECT roles.id, title, salary AS department FROM roles INNER JOIN department ON roles.department_id = department.id`,
      (err, results) => {
        if (err) throw err;
  
        console.table(results);
        startApp();
      }
    );
  }
  
  function viewEmployees() {
    db.query(
        `SELECT employee.id, first_name, last_name, roles.title, department.department_name AS department, roles.salary FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id`,
      (err, results) => {
        if (err) throw err;
  
        console.table(results);
        startApp();
      }
    );
  }
  
  function addDepartment() {
    inquirer
      .createPromptModule() // Create prompt module
      ({
        type: 'input',
        name: 'department name',
        message: 'Enter the name of the department:'
      })
      .then((answers) => {
        db.query(
          'INSERT INTO department (department_name) VALUES (?)',
          [answers.name],
          (err, result) => {
            if (err) throw err;
            console.log('Department added successfully');
            startApp();
          }
        );
      });
  }
  
  
  
  

