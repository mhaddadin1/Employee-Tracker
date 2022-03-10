const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Jordan23",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

//inquirer questions
function init() {
  inquirer
    .prompt([
      {
        name: "Questions",
        type: "list",
        message: "what would you like to do?",
        choices: [
          {
            name: "View all employees",
            value: "viewEmp",
          },
          {
            name: "View all departments",
            value: "viewDepart",
          },
          {
            name: "View roles",
            value: "viewRole",
          },
          {
            name: "add employee",
            value: "addEmp",
          },
          {
            name: "add department",
            value: "addDep",
          },
          {
            name: "add role",
            value: "addRole",
          },
          {
            name: "update employee",
            value: "updateEmp",
          },
        ],
      },
    ])
    .then((answers) => {
      if (answers.Questions === "viewEmp") {
        viewEmployee();
      } else if (answers.Questions === "viewDepart") {
        viewDepartments();
      } else if (answers.Questions === "viewRole") {
        viewRoles();
      } else if (answers.Questions === "addEmp") {
        addEmployee();
      } else if (answers.Questions === "addDep") {
        addDepartment();
      } else if (answers.Questions === "addRole") {
        addRole();
      } else if (answers.Questions === "updateEmp") {
        updateEmployee();
      }
    });

  function viewEmployee() {}

  function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
      console.table(rows);
    });
  }

  function viewRoles() {}

  function addDepartment() {}

  function addRole() {}

  function addEmployee() {}

  function updateEmployee() {}
}

init();
