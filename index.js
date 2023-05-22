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

// function to start application and use inquirer. 
// listing of prompts that you can choose
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

// function to view all from department table that was created in the database
function viewDepartment() {
    db.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
  
      console.table(results);
      startApp();
    });
  }
  
//   function to view the roles with the salary that is listed in the data base
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
  
//   function to view employees full name role and salary
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

  function addRole() {
    inquirer
      .createPromptModule() // Create prompt module
      ({
        type: 'input',
        name: 'roles',
        message: 'Enter the name of the role:'
      })
      .then((answers) => {
        db.query(
          'INSERT INTO role (title, salary) VALUES (?)',
          [answers.name],
          (err, result) => {
            if (err) throw err;
            console.log('Role added successfully');
            startApp();
          }
        );
      });
  }
  
  function addEmployee() {
    inquirer
      .createPromptModule() // Create prompt module
      ({
        type: 'input',
        name: 'addEmployee',
        message: 'Enter the name of the employee:'
      })
      .then((answers) => {
        db.query(
          'INSERT INTO employee (first_name, last_name) VALUES (?)',
          [answers.name],
          (err, result) => {
            if (err) throw err;
            console.log('Employee added successfully');
            startApp();
          }
        );
      });
  }
  

  
  
  

