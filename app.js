import express from 'express';
// Import mysql
import mysql2 from 'mysql2';

// Import .env
import dotenv from 'dotenv';
dotenv.config();

// city and state data
import {
    getStatesOfCountry,
    getAllCitiesOfCountry
} from '@countrystatecity/countries';

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

app.get('/login', (req, res) =>{
    res.render('login');
});

app.get('/signup', (req, res) =>{
    res.render('signup');
});

app.get('/add-job', async(req, res) =>{
    const states = await getStatesOfCountry('US');
    const us_cities = await getAllCitiesOfCountry('US')

    res.render('add-job', {states, us_cities});
});

//show city only once state has been chosen to populate data needed


app.post('/add-job-summary', (req, res) =>{
    const job = req.body;

    //job location
    const state = job['job-state'];
    const city = job['job-city'];
    job['job-location'] = `${city}, ${state}`;

    console.log(job);
    // Define SQL query to INSERT the new job
    const sql = `INSERT INTO jobs (trade, job-title, conpensation, job-desc, job-type, is_internship, start-date, end-date, 
                job-location, job-link, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Create an array of parameters from job data
    const params = [
        jobs.trade,
        jobs.job-title,
        jobs.conpensation,
        jobs.job-desc,
        jobs.job-type,
        jobs.is_internship,
        jobs.start-Date,
        jobs.end-Date,
        jobs.job-location,
        jobs.job-link,
        jobs.timestamp
    ];

    res.render('add-job-summary', {job});
});

app.post('/login', (req, res) =>{
    const user = req.body;
    user.timestamp = new Date();
    loginInfo.push(user);
    res.redirect('/');
});

const jobs = [
    {
        trade: "mechatronics",
        "job-title": "Robotics Technician",
        compensation: 35,
        "job-desc": "Maintain and troubleshoot industrial robotic systems.",
        "job-type": ["full-time"],
        "start-date": "2026-12-01",
        "end-date": "",
        "job-location": "Seattle, WA",
        "job-link": "https://example.com",
        timestamp: new Date("2026-11-01")
    },
    {
        trade: "mechatronics",
        "job-title": "Automation Engineering Intern",
        compensation: 25,
        "job-desc": "Assist engineers with PLC programming and automation.",
        "job-type": ["internship"],
        "start-date": "2027-01-15",
        "end-date": "2027-05-15",
        "job-location": "Bellevue, WA",
        "job-link": "https://example.com",
        timestamp: new Date("2026-11-02")
    },
    {
        trade: "automotive",
        "job-title": "Automotive Service Technician",
        compensation: 29,
        "job-desc": "Diagnose and repair engines, brakes, and transmissions.",
        "job-type": ["full-time"],
        "start-date": "2026-12-10",
        "end-date": "",
        "job-location": "Kent, WA",
        "job-link": "https://example.com",
        timestamp: new Date("2026-10-28")
    },
    {
        trade: "automotive",
        "job-title": "Auto Shop Assistant",
        compensation: 21,
        "job-desc": "Assist mechanics with vehicle maintenance and inspections.",
        "job-type": ["part-time"],
        "start-date": "2026-12-05",
        "end-date": "",
        "job-location": "Renton, WA",
        "job-link": "https://example.com",
        timestamp: new Date("2026-11-03")
    },
    {
        trade: "welding",
        "job-title": "MIG Welder",
        compensation: 32,
        "job-desc": "Perform MIG welding on structural steel components.",
        "job-type": ["full-time"],
        "start-date": "2026-12-15",
        "end-date": "",
        "job-location": "Tacoma, WA",
        "job-link": "https://example.com",
        timestamp: new Date("2026-10-30")
    },
    {
        trade: "welding",
        "job-title": "Welding Apprentice",
        compensation: 23,
        "job-desc": "Learn TIG and MIG welding under experienced welders.",
        "job-type": ["internship"],
        "start-date": "2027-01-10",
        "end-date": "2027-06-10",
        "job-location": "Auburn, WA",
        "job-link": "https://example.com",
        timestamp: new Date("2026-11-01")
    },
    {
        trade: "manufacturing",
        "job-title": "CNC Machine Operator",
        compensation: 28,
        "job-desc": "Operate CNC machines and inspect manufactured parts.",
        "job-type": ["full-time"],
        "start-date": "2026-12-01",
        "end-date": "",
        "job-location": "Everett, WA",
        "job-link": "https://example.com",
        timestamp: new Date("2026-10-29")
    },
    {
        trade: "manufacturing",
        "job-title": "Production Assistant",
        compensation: 22,
        "job-desc": "Support assembly line operations and quality inspections.",
        "job-type": ["part-time"],
        "start-date": "2026-12-20",
        "end-date": "",
        "job-location": "Federal Way, WA",
        "job-link": "https://example.com",
        timestamp: new Date("2026-11-02")
    },
    {
        trade: "carpentry",
        "job-title": "Residential Carpenter",
        compensation: 34,
        "job-desc": "Construct wooden frames, install doors, and perform renovations.",
        "job-type": ["full-time"],
        "start-date": "2026-12-05",
        "end-date": "",
        "job-location": "Seattle, WA",
        "job-link": "https://example.com",
        timestamp: new Date("2026-10-31")
    },
    {
        trade: "carpentry",
        "job-title": "Carpentry Apprentice",
        compensation: 20,
        "job-desc": "Assist with measuring, cutting, and assembling wood structures.",
        "job-type": ["internship"],
        "start-date": "2027-01-05",
        "end-date": "2027-05-30",
        "job-location": "Redmond, WA",
        "job-link": "https://example.com",
        timestamp: new Date("2026-11-03")
    }
];
const loginInfo = [];

app.get('/admin', (req, res) =>{
    res.render('admin', {jobs});
});

app.get('/job-board', (req,res) =>{
    //get selected trade from home page and route to job-board w needed info
    const selectedTrade = req.query.trade;
    res.render('job-board', {selectedTrade, jobs});
})

app.listen(PORT, () =>{
    console.log(`Server is running at: http://localhost:${PORT}`);
});