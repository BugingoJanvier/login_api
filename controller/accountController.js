const Login = require('../auth/index'); // Adjust the path as needed

Login.startServer();

async function login(username, password) {
    
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username, // Replace with your username
            password // Replace with your password
        })
    });

    const data = await response.json();
    console.log(data); // Output the response
}

login('j.bugingo@brd.rw', 'jkldjfgkfjlg');

 
  