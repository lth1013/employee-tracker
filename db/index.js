var inquirer = require("inquirer");
const connection = require("./connection.js");
var mysql = require("mysql2");

function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View all employees", 
        "View all employees by department", 
        "View all employees by manager", 
        "Add employee", 
        "Remove employee", 
        "Update employee role", 
        "Update employee manager", 
        "View all roles", 
        "Add role", "Remove role", 
        "View all departments", 
        "Add department", 
        "Remove department", 
        "Quit"]
    }).then(function(answer) {
        switch (answer.action) {
            case "View all employees":
                viewAllEmployees();
                break;
            
            case "View all employees by department":
                viewAllEmployeesByDepartment();
                break;
            
            case "View all employees by manager":
                viewAllEmployeesByManager();
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