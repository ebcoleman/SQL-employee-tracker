
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'school',
    database: 'employees_db',
});

// Function to display all departments
function showDepartment() {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error occurred:', err);
            return;
        }
        console.log('All Departments:');
        results.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.department_name}`);
        });
        promptUser(); // Continue prompting after displaying departments
    });
}

// Function to display all roles
function viewAllRoles() {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error occurred:', err);
            return;
        }
        console.log('All Roles:');
        results.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
        });
        promptUser(); // Continue prompting after displaying roles
    });
}


// Function to display all employees
function viewAllEmployees() {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error occurred:', err);
            return;
        }
        console.log('All Employees:');
        results.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
        });
        promptUser(); // Continue prompting after displaying employees
    });
}


// Function to add a department
async function addDepartment() {
    const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department: ',
    });

    const query = `INSERT INTO department (department_name) VALUES ('${departmentName}')`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error occurred:', err);
            return;
        }
        console.log('Department added successfully!');
        promptUser(); // Continue prompting after adding the department
    });
}


// Function to add a role
function addRole() {
    // Implement logic to add a role similar to showDepartment()
}

// Function to add an employee
function addEmployee() {
    // Implement logic to add an employee similar to showDepartment()
}

// Function to update an employee role
function updateEmployeeRole() {
    // Implement logic to update an employee role similar to showDepartment()
}

// Function to handle user input
async function promptUser() {
    const questions = [
        {
            type: 'list',
            name: 'action',
            message: 'Please choose an action: ',
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
        }
    ];

    try {
        const { action } = await inquirer.prompt(questions);
        console.log('You chose:', action);

        if (action === 'View all departments') {
            showDepartment();
        } else if (action === 'View all roles') {
            viewAllRoles();
        } else if (action === 'View all employees') {
            viewAllEmployees();
        } else if (action === 'Add a department') {
            addDepartment();
        } else if (action === 'Add a role') {
            addRole();
        } else if (action === 'Add an employee') {
            addEmployee();
        } else if (action === 'Update an employee role') {
            updateEmployeeRole();
        } else if (action === 'Exit') {
            connection.end(); // Close the database connection
            console.log('Exiting...');
            return;
        } else {
            console.log('Invalid action');
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

// Start the application
promptUser();

