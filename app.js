import express from 'express';
// Import mysql
import mysql2 from 'mysql2';

// Import .env
import dotenv from 'dotenv';
dotenv.config();

// city and state data
import {getCitiesOfState} from '@countrystatecity/countries';

// Create a connection pool for sql
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

const app = express();
const PORT = 3010;

app.use(express.static(`public`));
//Allow access of form data from req.body
app.use(express.urlencoded({extended: true}));
//set view engine to ejs
app.set('view engine', 'ejs');


app.get('/', (req, res) =>{
    res.render('home');
});

//trades route
app.get('/trades', (req, res) => {
    res.render('trades');
})

app.get('/login', (req, res) =>{
    res.render('login');
});

app.get('/signup', (req, res) =>{
    res.render('signup');
});

app.get('/add-job', async(req, res) =>{
    const states = "WA";
    const wa_cities = await getCitiesOfState('US', 'WA');

    res.render('add-job', {states, wa_cities});
});

//show city only once state has been chosen to populate data needed


app.post('/add-job-summary', async(req, res) =>{
    const job = req.body;

    job.timestamp = new Date();

    //job location
    const state = job['job-state'];
    const city = job['job-city'];
    job['job-location'] = `${city}, ${state}`;

    console.log(job);

    //internship logic. turn it into boolean
    if (job['is_internship'] == 'internship') {
        job['is_internship'] = true;
    } else {
        job['is_internship'] = false;
    }

    // Define SQL query to INSERT the new job. TODO: DROP: jobage, isecpired.
    const sql = `INSERT INTO jobs (trade, \`job-title\`, compensation, \`job-desc\`, \`job-type\`, is_internship,
        \`start-date\`, \`end-date\`, \`job-location\`, \`job-link\`, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    //TODO: add job['is_internship'] when internship is its own input/selection in the form

    // Create an array of parameters from job data.
    const params = [
        job.trade,
        job['job-title'],
        job.compensation,
        job['job-desc'],
        job['job-type'],
        job['is_internship'],
        job['start-date'],
        job['end-date'],
        job['job-location'],
        job['job-link'],
        job.timestamp
    ];

    // Execute the query
    const [result] = await pool.execute(sql, params);

    // Get the ID from the newly inserted row
    job.id = result.insertId;
    console.log("A new row was inserted with ID " + job.id);

    res.render('add-job-summary', {job});
});

app.post('/login', (req, res) =>{
    const user = req.body;
    user.timestamp = new Date();
    loginInfo.push(user);
    res.redirect('/');
});

const loginInfo = [];

app.get('/admin', async(req, res) =>{

    try {
        const [jobs] = await pool.query('SELECT * FROM jobs ORDER BY timestamp DESC');
        console.log(jobs);
        
        res.render('admin', {jobs});
    } catch(err) {
        console.error('Database error ', err);
        res.status(500).send('Database error occurred.')
    }

});

app.get('/job-board', async(req,res) =>{
    //get selected trade from home page and route to job-board w needed info
    const selectedTrade = req.query.trade;

    try {
        const [jobs] = await pool.query('SELECT * FROM jobs ORDER BY timestamp DESC');
        console.log(jobs);

        res.render('job-board', {selectedTrade, jobs});
    } catch(err) {
        console.error('Database error ', err);
        res.status(500).send('Database error occurred.')
    }

})

app.listen(PORT, () =>{
    console.log(`Server is running at: http://localhost:${PORT}`);
});