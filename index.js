const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // MySQL password
  password: "Jordan23",
  database: "employee_db",
});

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
            name: "View all departments",
            value: "viewDepart",
          },

          {
            name: "View roles",
            value: "viewRole",
          },

          {
            name: "View all employees",
            value: "viewEmp",
          },

          {
            name: "Add Department",
            value: "addDep",
          },

          {
            name: "Add Role",
            value: "addRole",
          },

          {
            name: "Add Employee",
            value: "addEmp",
          },

          // {
          //   name: "Update Employee",
          //   value: "updateEmp",
          // },

          // {
          //   name: "Delete Department",
          //   value: "delDep",
          // },

          // {
          //   name: "Delete Role",
          //   value: "delRol",
          // },

          // {
          //   name: "Delete Employee",
          //   value: "delemp",
          // },

          {
            name: "Done",
            value: "done",
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

  function viewDepartments() {
    db.query("select * from department", function (err, results) {
      console.table(results);
      init();
    });
  }

  function viewRoles() {
    db.query("select * from role", function (err, results) {
      console.table(results);
      init();
    });
  }

  function viewEmployee() {
    db.query("select * from employee", function (err, results) {
      console.table(results);
      init();
    });
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          name: "departId",
          type: "number",
          message: "what is the department id?",
        },
        {
          name: "departName",
          type: "input",
          message: "what is the departments name?",
        },
      ])
      .then((answers) => {
        db.query("insert into department(id, name) values(?,?)", [
          answers.departId,
          answers.departName,
        ]);
        init();
      });
  }

  function addRole() {
    inquirer
      .prompt([
        {
          name: "roleId",
          type: "number",
          message: "what is the role id?",
        },
        {
          name: "role",
          type: "input",
          message: "what role would you like to add?",
        },
        {
          name: "roleSalary",
          type: "number",
          message: "what is the roles salary?",
        },
      ])
      .then((answers) => {
        db.query("select * from department", function (err, results) {
          const depart = results.map(({ id }) => ({
            name: id,
          }));
          inquirer
            .prompt({
              type: "list",
              name: "id",
              message: "what is the department id for this role?",
              choices: depart,
            })
            .then((depart) => {
              db.query(
                "insert into role(id, title, salary, department_id) values(?,?,?,?)",
                [answers.roleId, answers.role, answers.roleSalary, depart.id]
              );
              init();
            });
        });
      });
  }

  function addEmployee() {
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "what is the first name",
        },
        {
          name: "lastName",
          type: "input",
          message: "what is the last name",
        },
      ])
      .then((answers) => {
        db.query("select * from role", function (err, results) {
          const role = results.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt({
              type: "list",
              name: "id",
              message: "what is the employees role?",
              choices: role,
            })
            .then((role) => {
              db.query(
                "select * from employee where manager_id is null",
                function (err, results) {
                  const managers = results.map(({ id, last_name }) => ({
                    name: last_name,
                    value: id,
                  }));
                  inquirer
                    .prompt({
                      type: "list",
                      name: "id",
                      message: "what is the managers name?",
                      choices: managers,
                    })
                    .then((manager) => {
                      db.query(
                        "insert into employee(first_name, last_name, manager_id, role_id ) values(?,?,?,?)",
                        [
                          answers.firstName,
                          answers.lastName,
                          manager.id,
                          role.id,
                        ]
                      );
                      init();
                    });
                }
              );
            });
        });
      });
  }
}

init();
