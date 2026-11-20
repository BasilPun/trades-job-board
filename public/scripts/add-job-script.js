document.querySelector('#add-job-form').onsubmit = () =>{
    let isValid = true;
    clearErrors();

    //validate for: job-title, start-date, link, job type, job location (switch to selector?)
    //job-title
    let job_title = document.querySelector('#job-title').value.trim();
    if (job_title == ""){
        document.querySelector('#err-job-title').style.display = "block";
        isValid = false;
    }

    //company-name
    let company_name = document.querySelector('#company-name').value.trim();
    if (company_name == ""){
        document.querySelector('#err-company-name').style.display = "block";
        isValid = false;
    }

    //trade-type
    let trade = document.querySelector('#trade').value;
    if (trade == "none") {
        document.querySelector('#err-trade').style.display = "block";
        isValid = false;
    }

    //apply by date
    let end_date = document.querySelector('#end-date').value;
    if (end_date == "") {
        document.querySelector('#err-end-date').style.display = "block";
        isValid = false;
    }

    //link
    let job_link = document.querySelector('#job-link').value.trim();
    if (job_link == ""){
        document.querySelector('#err-job-link').style.display = "block";
        isValid = false;
    }

    //job-location. job-state is fixed. making disabled false so that undefined doesn't get sent.
    document.querySelector('#job-state').disabled = false;
    let job_city = document.querySelector('#job-city').value.trim();
    if (job_city == "none") {
        document.querySelector('#err-job-city').style.display = "block";
        isValid = false;
    }

    //part-time / full-time 
    let hour_type_selected = false;
    let job_type = document.getElementsByName("job-type");
    for (let i=0; i<job_type.length; i++) {
        if(job_type[i].checked) {
            hour_type_selected = true;
        }
    }

    if (!hour_type_selected) {
        document.getElementById("err-hour-type").style.display = "block";
        isValid = false;
    }

    return isValid
}

function clearErrors(){
    //creates an array of errors
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i< errors.length; i++){
        //for each error, make it disappear.
        errors[i].style.display = "none";
    }
}