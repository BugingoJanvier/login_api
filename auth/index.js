require('dotenv').config();
const express = require('express');
const ldap = require('ldapjs');

const app = express();
app.use(express.json()); // Middleware to parse JSON

// LDAP Configuration
const LDAP_URL = process.env.LDAP_URL;

// Function to authenticate user
function authenticateUser(username, password, callback) {
    const client = ldap.createClient({ url: LDAP_URL });

    // Use username as `userPrincipalName` format (email-like)
    client.bind(username, password, (err) => {
        client.unbind();
        callback(err ? false : true);
    });
}

// Login Handler Function
function loginHandler(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    authenticateUser(username, password, (authenticated) => {
        if (authenticated) {
            res.json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
}

// Attach function to the login route
app.post('/login', loginHandler);


// Start Server Function
function startServer() {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports.startServer= startServer;
module.exports.loginHandler = loginHandler;
