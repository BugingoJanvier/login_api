const express = require('express');
const path = require('path');


const app = express();



app.use(express.json()); // Middleware to parse JSON

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../view')); // Adjusted path to ../view

app.get('/', (req, res) => {
    res.render('../view/index'); // Adjusted path to ../view/index
});

app.get('/login', (req, res) => {
    res.render('../view/login');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
