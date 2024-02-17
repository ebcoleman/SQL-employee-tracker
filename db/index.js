const inquirer = require('inquirer');
const mysql = require('mysql2');

// function to handle user's input
async function promptUser() {

// Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'school',
        database: 'employees_db',
    });

    const questions = [
        {
            type: 'list', 
            name: 'action',
            message: 'Please choose an action: ',
            choices: ['View all departments', 
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
    // prompts the user
    const { action } = await inquirer.prompt(questions);

    console.log('You chose: ', action);


}