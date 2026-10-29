import express from 'express';

const app = express();
const PORT = 3010;

app.use(express.static(`public`));
//Allow access of form data from req.body
app.use(express.urlencoded({extended: true}));
//set view engine to ejs
app.set('view engine', 'ejs');


app.get('/', (req, res) =>{
    res.render('home')
});

app.get('/add-job', (req, res) =>{
    res.render('add-job');
});

app.post('/add-job-summary', (req, res) =>{
    const job = req.body;
    job.timestamp = new Date();
    jobs.push(job);
    console.log(job);
    res.render('add-job-summary', {job});
});

const jobs = [];

app.get('/admin', (req, res) =>{
    res.render('admin', {jobs});
});

app.listen(PORT, () =>{
    console.log(`Server is running at: http://localhost:${PORT}`);
});