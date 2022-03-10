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
        console.log(answers);
        viewEmployee();
      } else if (answers.Questions === "viewDepart") {
        console.log(answers);
        viewDepartments();
      } else if (answers.Questions === "viewRole") {
        console.log(answers);
        viewRoles();
      } else if (answers.Questions === "addEmp") {
        console.log(answers);
        addEmployee();
      } else if (answers.Questions === "addDep") {
        console.log(answers);
        addDepartment();
      } else if (answers.Questions === "addRole") {
        console.log(answers);
        addRole();
      } else if (answers.Questions === "updateEmp") {
        console.log(answers);
        updateEmployee();
      }
    });

  function viewEmployee() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, res) => {
      console.table(res);
    });
  }

  function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
      console.table(res);
    });
  }

  function viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, res) => {
      console.table(res);
    });
  }

  // function addDepartment() {}

  // function addRole() {}

  // function addEmployee() {}

  // function updateEmployee() {}
}

init();
