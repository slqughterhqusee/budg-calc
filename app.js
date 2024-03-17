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


//gets information from the monthly income input
getId('incform').addEventListener('submit', function firstIncome(input) {
    input.preventDefault();

    //create an empty array for data return to go in
    var inputArray = [];


    //retrieve info and place it in array
    var salary = parseFloat(getId('salary').value);
    inputArray.push(parseFloat(salary));

    var addinc = parseFloat(getId('addInc').value);
    inputArray.push(parseFloat(addinc));

    //iterate through array to get the total amount of income
    finSum = 0;

    for (i = 0; i < inputArray.length; i++) {
        if (!isNaN(inputArray[i])) {
            console.log(inputArray[i]);
            finSum += inputArray[i];

        }
    }

    //deduct taxes
    let total = Math.round(finSum * .3265);

    //have the 50/30/20 appear where it needs to on the page
    getId('need').innerText = `$${Math.round(total * .5).toLocaleString()}`;
    getId('want').innerText = `$${Math.round(total * .3).toLocaleString()}`;
    getId('savings').innerText = `$${Math.round(total * .2).toLocaleString()}`;
    getId('necessity').innerText = `$${Math.round(total * .5).toLocaleString()}`
    getId('life').innerText = `$${Math.round(total * .3).toLocaleString()}`;
    getId('savi').innerText = `$${Math.round(total * .2).toLocaleString()}`;

    return total;
});


// ^^ input grab

//grab information from the first form
getId(`form1`).addEventListener('submit', function (input) {
    input.preventDefault();

    //collect want values and push them into an returnable array for future use
        var wantArray1 = [];

        var ogtrans = getId('trans').value;
        wantArray1.push(parseFloat(ogtrans));

        var oghob = parseFloat(getId('hobb').value);
        wantArray1.push(parseFloat(oghob));

        var ogout = parseFloat(getId('out').value);
        wantArray1.push(parseFloat(ogout));

        var ogfood = parseFloat(getId('food').value);
        wantArray1.push(parseFloat(ogfood));

        for (i = 0; i < wantArray1; i++) {
            if (isNaN(wantArray1[i])) {
                wantArray1[i] = 0;
            }
        }

    //same as above for savings values
        var savArray1 = [];

        var ogsav = parseFloat(getId('sav').value);
        savArray1.push(parseFloat(ogsav));

        var ogretir = parseFloat(getId('retir').value);
        savArray1.push(parseFloat(ogretir));

        var ogextra = parseFloat(getId('extra').value);
        savArray1.push(parseFloat(ogextra));

        for (i = 0; i < savArray1; i++) {
            if (isNaN(savArray1[i])) {
                savArray1[i] = 0;
            }
        }

    //same as above for needs values


    var needArray1 = [];

    var oghousing = parseFloat(getId('housing').value);
    needArray1.push(parseFloat(oghousing));

    var ogutil = parseFloat(getId('util').value);
    needArray1.push(parseFloat(ogutil));

    var oginsur = parseFloat(getId('insur').value);
    needArray1.push(parseFloat(oginsur));

    var ogdebt = parseFloat(getId('debt').value);
    needArray1.push(parseFloat(ogdebt));

    for (i = 0; i < needArray1; i++) {
        if (isNaN(needArray1[i])) {
            needArray1[i] = 0;
        }
    }


    //add the results together to be used for later operation
    let nonBudgSums = { wants: wantArray1, needs: needArray1, savings: savArray1 };
    // Pull arrays from object

    let wants = nonBudgSums.wants;
    let needs = nonBudgSums.needs;
    let savs = nonBudgSums.savings;

    // add arrays together to get a total

    let necSum = 0;

    for (i = 0; i < wants.length; i++) {
        if (!isNaN(wants[i])) {
            console.log(wants[i]);
            necSum += wants[i];

        }
    }

    let needSum = 0;

    for (i = 0; i < needs.length; i++) {
        if (!isNaN(needs[i])) {
            console.log(needs[i]);
            needSum += needs[i];

        }
    }

    let saviSum = 0;

    for (i = 0; i < savs.length; i++) {
        if (!isNaN(savs[i])) {
            console.log(savs[i]);
            saviSum += savs[i];

        }
    }

    let compSum = necSum + needSum + saviSum;

    if(compSum > incomeInput){
        getId('ovUn').innerText = `$${Math.round(parseInt(compSum-incomeInput)).toLocaleString()} under`;
    }
    else {
        getId('ovUn').innerText = `$${Math.round(parseInt(compSum-incomeInput)).toLocaleString()} over`;
    }


    return nonBudgSums;
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