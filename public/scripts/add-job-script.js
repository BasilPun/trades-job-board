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

    //start-date
    let start_date = document.querySelector('#start-date').value;
    if (start_date == "") {
        document.querySelector('#err-start-date').style.display = "block";
        isValid = false;
    }

    //link
    let job_link = document.querySelector('#job-link').value.trim();
    if (job_link == ""){
        document.querySelector('#err-job-link').style.display = "block";
        isValid = false;
    }

    //job-location
    let job_location = document.querySelector('#job-location').value.trim();
    if (job_location == ""){
        document.querySelector('#err-job-location').style.display = "block";
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