let date_temp = "";
let subcontainer = document.getElementsByClassName("sub-container")[0];
let subcontainer2 = document.getElementsByClassName("sub-container-2")[0];
let date_form = document.getElementsByClassName("date")[0];
let name_form = document.getElementsByClassName("name")[0];
let done_button = document.getElementsByClassName("done")[0];
let hint_button = document.getElementsByClassName("hint-button")[0];
let loader = document.getElementsByClassName("loader")[0];
let wishes_form = document.getElementsByClassName("wishes")[0];

date_form.addEventListener('blur', function(){
    if(hint_button.checked){
        date_form.focus();
    }else{
        date_form.blur();
    }
}, true);

function close_intro(){
    subcontainer.style.animation = "closing 0.5s ease forwards";
    setTimeout(() => subcontainer.style.display = "none", 500);
}

function hint(a){
    date_form.focus();
    if(a){
        date_temp = date_form.value;
        date_form.value = "DD - MM - YYYY";
        date_form.readOnly = true;
    }else{
        date_form.value = date_temp;
        date_form.readOnly = false;
    }
}

function enable_button(){
    let name_pattern = /^[\w\s]+$/;
    let date_pattern = /^\d{2} - \d{2} - \d{4}$/;
    if(name_pattern.test(name_form.value) && date_pattern.test(date_form.value)){
        let date_test = new Date(date_form.value.split(" - ").reverse().join("-"));
        if(date_test.toString() != "Invalid Date"){
            if(!hint_button.checked){
                done_button.disabled = false;
            }else{
                done_button.disabled = true;
            }
        }else{
            done_button.disabled = true;
        }
    }else{
        done_button.disabled = true;
    }
}

function submit(){
    done_button.style.visibility = "hidden";
    loader.style.display = "block";
    name_form.readOnly = true;
    date_form.readOnly = true;
    document.getElementsByClassName("hint")[0].style.visibility = "hidden";
    setTimeout(wishes, 1000);
}

function wishes(){
    let name = document.getElementsByClassName("name")[0].value;
    let date_now = new Date();
    let birth = new Date(date_form.value.split(" - ").reverse().join("-"));
    let age = parseInt((date_now.getTime() - (birth.getTime() - 25200000)) / 31556952000);
    let grammar = (age > 1) ? "years" : "year";
    wishes_form.getElementsByTagName("h1")[0].innerHTML = `Hello, ${name}!`;
    if(date_now.getMonth() == birth.getMonth() && date_now.getDate() == date_now.getDate()){
        wishes_form.getElementsByTagName("p")[0].innerHTML = `Congratulation! Today is your birthday. Now you are ${age} ${grammar} old. I wish you all the best and wish you long life and good health always.`
    }else{
        wishes_form.getElementsByTagName("p")[0].innerHTML = "Sorry! Today is not your birthday. Please try again later.";
    }
    show_wishes();
}

function show_wishes(){
    loader.style.animationPlayState = "paused";
    subcontainer2.style.opacity = "1";
    subcontainer2.style.zIndex = "1";
    subcontainer2.getElementsByClassName("wishes")[0].style.transform = "scale(1)";
}