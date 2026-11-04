import express from 'express';

const app = express();
const PORT = 3010;

app.use(express.static(`public`));
//Allow access of form data from req.body
app.use(express.urlencoded({extended: true}));
//set view engine to ejs
app.set('view engine', 'ejs');


app.get('/', (req, res) =>{
    res.render('home', {jobs});
});

app.get('/login', (req, res) =>{
    res.render('login');
});

app.get('/signup', (req, res) =>{
    res.render('signup');
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

app.post('/login', (req, res) =>{
    const user = req.body;
    user.timestamp = new Date();
    loginInfo.push(user);
    res.redirect('/');
});

const jobs = [];
const loginInfo = [];

app.get('/admin', (req, res) =>{
    res.render('admin', {jobs});
});

app.get('/job-board', (req,res) =>{
    //get selected trade from home page and route to job-board w needed info
    const selectedTrade = req.query.trade;
    res.render('job-board', {selectedTrade});
})

app.listen(PORT, () =>{
    console.log(`Server is running at: http://localhost:${PORT}`);
});