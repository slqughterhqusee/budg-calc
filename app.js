function getId(element) {
    return document.getElementById(element);
}

// function getClass(element) {
//     return document.getElementsByClassName(element);
// }


//^^ gets shortcuts
let utils = {}; //create a namespace for our utility functions

//get function to make an HTTP GET request
utils.get = (url) => {

    //start promise object
    return new Promise(function (resolve, reject) {

        //create a new XMLHttpRequest object
        let request = new XMLHttpRequest();

        //initialize the request
        request.open('GET', url);

        request.onload = function () {
            //resolve on success
            if (request.status == 200) { // HTTP: OK
                console.log('Response OK');
                resolve(request.response);
            }
            //reject on error
            else {
                reject(Error(`promise error with ${request.status}`))
            }
        };
        //handle network errors
        request.onerror = function (error) {
            reject(Error(`Network Error with ${url}: ${error}`))
        };
        //send the request
        request.send();
    }); //end Promise Object
}

//getJSON function to get JSON data from the server
utils.getJSON = async function (url) {
    let string = null;
    //get the JSON string from the server
    try {
        string = await utils.get(url);
    }
    catch (error) {
        console.log(error)
    }
    //parse the JSON string and return the data
    let data = JSON.parse(string);
    return data;
}

async function init() {
    //get the root element of the web page
    let root = document.querySelector('#root');

    //create a variable to hold the URL of the JSON data source
    let url = 'https://api-demo.cartwebapp.com/data/2024';

    //create a variable to hold the JSON data
    let occupations = null;

    //try to retrieve the JSON data from the server
    try {
        //retrieve the JSON data from the server
        occupations = await utils.getJSON(url);
    }
    //catch any errors and display them in the root element
    catch (error) {
        root.style.color = 'red';
        root.textContent = `error: ${error}`;
    }

    //show JSON data on the html page
    root.innerHTML = buildList(occupations);


}

function buildList(jobs) {
    //create an empty string to hold the HTML
    let html = '';

    //loop through the array of job objects retrieved from the JSON data
    for (let job of jobs) {

        //start an HTML section for each job
        html += '<section>';

        /* An alternative way of looping through each item in the data, not as useful for this assignment but something to keep in mind for a story? ... */
        //loop through each entry and create a div for each key:value pair
        // for (let key in job) {
        //     html += `<div><strong>${key}</strong>: ${job[key]}</div > `;
        // }

        //create a div element for the job title
        html += `<div><strong>Occupation</strong>: ${job.occupation}</div>`;
        //create a div element for the salary and format it as currency
        html += `<div><strong>Salary</strong>: $${job.salary.toLocaleString('en-US')}</div>`;
        //close the section
        html += '</section>';
        html += '<br>'
    }

    //return the completed html
    return html;
}

//^^ joblist code

let frame = document.getElementsByClassName('frame');
let frames = [frame];
console.log(frame);
console.log(frames);

function nextFrame() {
    for (i = 0; i < frame.length; i++) {
        switch (frame) {
            case 0:
                getId('frame0').classList.remove('hide');
                break;

            case 1:
                getId('frame1').classList.remove('hide');
                break;
        }
    }
}

//^^frame functioning....

getId('incform').addEventListener('submit', function (input) {
    input.preventDefault();
    var inputArray = [];

    var salary = parseFloat(getId('salary').value);
    inputArray.push(parseFloat(salary));

    var addinc = parseFloat(getId('addinc').value);
    inputArray.push(parseFloat(addinc));


    finSum = 0;

    for (i = 0; i < inputArray.length; i++) {
        if (!isNaN(inputArray[i])) {
            console.log(inputArray[i]);
            finSum += inputArray[i];

        }
    }

    let total = Math.round(finSum * .3265);

    getId('need').innerText = `$${Math.round(total * .5)}`;
    getId('want').innerText = `$${Math.round(total * .3)}`;
    getId('savings').innerText = `$${Math.round(total * .2)}`;
    getId('necessity').innerText =  `$${Math.round(total * .5)}`
    getId('want').innerText = `$${Math.round(total * .3)}`;
    getId('savi').innerText = `$${Math.round(total * .2)}`;
});


// ^^ input grab


getId(`form1`).addEventListener('submit', function (input) {
    input.preventDefault();
    var wantArray1 = [];

    var ogtrans = parseFloat(document.getId('trans1').value);
    wantArray1.push(parseFloat(ogtrans));



    var oghob = parseFloat(document.getId('hobb1').value);
    wantArray1.push(parseFloat(oghob));



    var ogout = parseFloat(document.getId('out1').value);
    wantArray1.push(parseFloat(ogout));



    var ogfood = parseFloat(document.getId('food1').value);
    wantArray1.push(parseFloat(ogfood));

    wantSum = 0;

    for (i = 0; i < wantArray1.length; i++) {
        if (!isNaN(wantArray1[i])) {
            console.log(wantArray1[i]);
            wantSum += wantArray1[i];

        }
    }

    var savArray1 = [];

    var ogsav = parseFloat(document.getId('sav1').value);
    savArray1.push(parseFloat(ogsav));

    var ogretir = parseFloat(document.getId('retir1').value);
    savArray1.push(parseFloat(ogretir));

    var ogextra = parseFloat(document.getId('extra1').value);
    savArray1.push(parseFloat(ogextra));

    savSum = 0;

    for (i = 0; i < savArray1.length; i++) {
        if (!isNaN(savArray1[i])) {
            console.log(wantArray1[i]);
            savSum += savArray1[i];

        }
    }

    var needArray1 = [];

    var oghousing = parseFloat(document.getId('housing1').value);
    needArray1.push(parseFloat(oghousing));

    var ogutil = parseFloat(document.getId('util1').value);
    needArray1.push(parseFloat(ogutil));

    var oginsur = parseFloat(document.getId('insur1').value);
    needArray1.push(parseFloat(oginsur));

    var ogdebt = parseFloat(document.getId('debt1').value);
    needArray1.push(parseFloat(ogdebt));

    needSum = 0;

    for (i = 0; i < needArray1.length; i++) {
        if (!isNaN(needArray1[i])) {
            console.log(wantArray1[i]);
            needSum += needArray1[i];

        }
    }

    let nonBudgSums = [wantSum, needSum, savSum];

    return nonBudgSums;
});

getId(`form2`).addEventListener('submit', function (input) {
    input.preventDefault();
    var wantArray1 = [];

    var ogtrans = parseFloat(document.getId('trans2').value);
    wantArray1.push(parseFloat(ogtrans));



    var oghob = parseFloat(document.getId('hobb2').value);
    wantArray1.push(parseFloat(oghob));



    var ogout = parseFloat(document.getId('out2').value);
    wantArray1.push(parseFloat(ogout));



    var ogfood = parseFloat(document.getId('food2').value);
    wantArray1.push(parseFloat(ogfood));


    wantSum = 0;

    for (i = 0; i < wantArray1.length; i++) {
        if (!isNaN(wantArray1[i])) {
            console.log(wantArray1[i]);
            wantSum += wantArray1[i];

        }
    }

    var savArray1 = [];

    var ogsav = parseFloat(document.getId('sav2').value);
    savArray1.push(parseFloat(ogsav));

    var ogretir = parseFloat(document.getId('retir2').value);
    savArray1.push(parseFloat(ogretir));

    var ogextra = parseFloat(document.getId('extra2').value);
    savArray1.push(parseFloat(ogextra));

    savSum = 0;

    for (i = 0; i < savArray1.length; i++) {
        if (!isNaN(savArray1[i])) {
            console.log(wantArray1[i]);
            savSum += savArray1[i];

        }
    }

    var needArray1 = [];

    var oghousing = parseFloat(document.getId('housing2').value);
    needArray1.push(parseFloat(oghousing));

    var ogutil = parseFloat(document.getId('util2').value);
    needArray1.push(parseFloat(ogutil));

    var oginsur = parseFloat(document.getId('insur2').value);
    needArray1.push(parseFloat(oginsur));

    var ogdebt = parseFloat(document.getId('deb2').value);
    needArray1.push(parseFloat(ogdebt));

    needSum = 0;

    for (i = 0; i < needArray1.length; i++) {
        if (!isNaN(needArray1[i])) {
            console.log(wantArray1[i]);
            needSum += needArray1[i];

        }
    }

    let budgSum = [needSum + wantSum + savSum];

    return budgSum;

});






// ^^ pie stuff

var xValues = ["Necessities", "Life", "Savings"];
var yValues = [88, 33, 40];
const barColors = [
    "rgba(120, 182, 208, 1)",
    "rgba(89, 224, 216, 1)",
    "rgba(202, 236, 211, 1)",
];
const barColors2 = [
    "#8DDDFF",
    "#00E0B8",
    "#B4F6BE",
];

// chart stuff ^^


//all new JS goes here ^^^^
//initialize the web page when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    init();


    // chart 1 page 1 ^^

    const budgSpend1 = document.getElementById('budgSpend1');

    new Chart(budgSpend1, {
        type: 'pie',
        data: {
            labels: ['Neccesities', 'Life', 'Savings'],
            datasets: [{
                label: 'Amount Spent',
                data: [50, 30, 20],
                borderWidth: 1,
                backgroundColor: barColors2
            }],
        },
    });

});