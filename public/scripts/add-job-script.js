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

    //trade-type
    let trade = document.querySelector('#trade').value;
    if (trade == "none") {
        document.querySelector('#err-trade').style.display = "block";
        isValid = false;
    }

    //start-date
    let start_date = document.querySelector('#start-date').value;
    if (start_date == "") {
        document.querySelector('#err-start-date').style.display = "block";
        isValid = false;
    }

    //end date
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

    //job-location
    let job_state = document.querySelector('#job-state').value.trim();
    if (job_state == "none") {
        document.querySelector('#err-job-state').style.display = "block";
        isValid = false;
    }

    let job_city = document.querySelector('#job-city').value.trim();
    if (job_city == "none") {
        document.querySelector('#err-job-city').style.display = "block";
        isValid = false;
    }

    //job-type
    let hasChecked = false;

    let job_type_boxes = document.querySelectorAll('#hours-box input')
    for (let i = 0; i < job_type_boxes.length; i++){
        if (job_type_boxes[i].checked == true){
            hasChecked = true;
        }
    }

    if (!hasChecked){
        document.querySelector('#err-job-type').style.display = "block";
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