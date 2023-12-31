var inquirer = require("inquirer");
const connection = require("./connection.js");
var mysql = require("mysql2");

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "View all roles",
        "Add role",
        "Remove role",
        "View all departments",
        "Add department",
        "Remove department",
        "Quit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Remove employee":
          removeEmployee();
          break;

        case "Update employee role":
          updateEmployeeRole();
          break;

        case "Update employee manager":
          updateEmployeeManager();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "Add role":
          addRole();
          break;

        case "Remove role":
          removeRole();
          break;

        case "View all departments":
          viewAllDepartments();
          break;

        case "Add department":
          addDepartment();
          break;

        case "Remove department":
          removeDepartment();
          break;

        case "Quit":
          quit();
          break;
      }
    });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleId",
        type: "input",
        message: "What is the employee's role ID?",
      },
      {
        name: "managerId",
        type: "input",
        message: "What is the employee's manager ID?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee added successfully!");
          start();
        }
      );
    });
}

function removeEmployee() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the employee's ID?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "DELETE FROM employee WHERE ?",
        {
          id: answer.id,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee deleted successfully!");
          start();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the employee's ID?",
      },
      {
        name: "roleId",
        type: "input",
        message: "What is the employee's new role ID?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: answer.roleId,
          },
          {
            id: answer.id,
          },
        ],
        function (err) {
          if (err) throw err;
          console.log("Employee role updated successfully!");
          start();
        }
      );
    });
}

function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the employee's ID?",
      },
      {
        name: "managerId",
        type: "input",
        message: "What is the employee's new manager ID?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            manager_id: answer.managerId,
          },
          {
            id: answer.id,
          },
        ],
        function (err) {
          if (err) throw err;
          console.log("Employee manager updated successfully!");
          start();
        }
      );
    });
}

function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role's title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role's salary?",
      },
      {
        name: "departmentId",
        type: "input",
        message: "What is the role's department ID?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId,
        },
        function (err) {
          if (err) throw err;
          console.log("Role added successfully!");
          start();
        }
      );
    });
}

function removeRole() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the role's ID?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "DELETE FROM role WHERE ?",
        {
          id: answer.id,
        },
        function (err) {
          if (err) throw err;
          console.log("Role deleted successfully!");
          start();
        }
      );
    });
}

function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the department's name?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function (err) {
          if (err) throw err;
          console.log("Department added successfully!");
          start();
        }
      );
    });
}

function removeDepartment() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the department's ID?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "DELETE FROM department WHERE ?",
        {
          id: answer.id,
        },
        function (err) {
          if (err) throw err;
          console.log("Department deleted successfully!");
          start();
        }
      );
    });
}

function quit() {
  connection.end();
}

module.exports = start;
