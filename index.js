const inquirer = require('inquirer');
const mysql = require('mysql2');

// connects to the employees db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'school',
    database: 'employees_db',
});

// function displays all departments
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
        promptUser(); 
    });
}

// function displays all roles
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
        promptUser(); 
    });
}


// function displays all employees
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
        promptUser();
    });
}


// function to add a department
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
        promptUser();
    });
}


// function to add a role
async function addRole() {
    const { title, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter the salary for the role:',
        },
        {
            type: 'number',
            name: 'departmentId',
            message: 'Enter the department ID for the role:',
        }
    ]);

    // inserts the role into the role table
    const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    connection.query(query, [title, salary, departmentId], (err, results) => {
        if (err) {
            console.error('Error occurred:', err);
            return;
        }
        console.log('Role added successfully!');
        promptUser();
    });
}

// function to add an employee
async function addEmployee() {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee:',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee:',
        },
        {
            type: 'number',
            name: 'roleId',
            message: 'Enter the role ID for the employee:',
        },
        {
            type: 'number',
            name: 'managerId',
            message: 'Enter the manager ID for the employee:',
        },
    ]);
    // inserts into employee table
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    connection.query(query, [firstName, lastName, roleId, managerId], (err, results) => {
        if (err) {
            console.error('Error occurred:', err);
            return;
        }
        console.log('Employee added successfully!');
        promptUser(); // Continue prompting after adding the employee
    });
}

// the below to functions are needed for the update employee role function below
// function to fetch all employees
async function fetchEmployees() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM employee';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error occurred while fetching employees:', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// function to fetch all roles 
async function fetchRoles() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM role';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error occurred while fetching roles:', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// function to update an employee role
async function updateEmployeeRole() {
   
    const employees = await fetchEmployees();
    const roles = await fetchRoles();

    // prompts user to select an employee
    const { employeeId, roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            })),
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the new role for the employee:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id,
            })),
        },
    ]);

    // updates employee role
    const updateQuery = `UPDATE employee SET role_id = ? WHERE id = ?`;
    connection.query(updateQuery, [roleId, employeeId], (err, results) => {
        if (err) {
            console.error('Error occurred while updating employee role:', err);
            return;
        }
        console.log('Employee role updated successfully!');
        promptUser();
    });
}

// function to handle user input
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

// starts application
promptUser();

