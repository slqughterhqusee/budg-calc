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

    var addinc = parseFloat(getId('addinc').value);
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
    getId('need').innerText = `$${Math.round(total * .5)}`;
    getId('want').innerText = `$${Math.round(total * .3)}`;
    getId('savings').innerText = `$${Math.round(total * .2)}`;
    getId('necessity').innerText = `$${Math.round(total * .5)}`
    getId('life').innerText = `$${Math.round(total * .3)}`;
    getId('savi').innerText = `$${Math.round(total * .2)}`;

    return total;
});


// ^^ input grab

//grab information from the first form
getId(`form1`).addEventListener('submit', function (input) {
    input.preventDefault();


    //collect want values and push them into an returnable array for future use
    function wants() {
        var wantArray1 = [];

        var ogtrans = document.getId('trans1').value;
        wantArray1.push(parseFloat(ogtrans));

        var oghob = parseFloat(document.getId('hobb1').value);
        wantArray1.push(parseFloat(oghob));

        var ogout = parseFloat(document.getId('out1').value);
        wantArray1.push(parseFloat(ogout));

        var ogfood = parseFloat(document.getId('food1').value);
        wantArray1.push(parseFloat(ogfood));

        for (i = 0; i < wantArray1; i++) {
            if (isNaN(wantArray1[i])) {
                wantArray1[i] = 0;
            }
        }

        return wantArray1;
    }

    //same as above for savings values
    function sav() {
        var savArray1 = [];

        var ogsav = parseFloat(document.getId('sav1').value);
        savArray1.push(parseFloat(ogsav));

        var ogretir = parseFloat(document.getId('retir1').value);
        savArray1.push(parseFloat(ogretir));

        var ogextra = parseFloat(document.getId('extra1').value);
        savArray1.push(parseFloat(ogextra));

        for (i = 0; i < savArray1; i++) {
            if (isNaN(savArray1[i])) {
                savArray1[i] = 0;
            }
        }

        return savArray1;
    }

    //same as above for needs values
    function needs() {

        var needArray1 = [];

        var oghousing = parseFloat(document.getId('housing1').value);
        needArray1.push(parseFloat(oghousing));

        var ogutil = parseFloat(document.getId('util1').value);
        needArray1.push(parseFloat(ogutil));

        var oginsur = parseFloat(document.getId('insur1').value);
        needArray1.push(parseFloat(oginsur));

        var ogdebt = parseFloat(document.getId('debt1').value);
        needArray1.push(parseFloat(ogdebt));

        for (i = 0; i < needArray1; i++) {
            if (isNaN(needArray1[i])) {
                needArray1[i] = 0;
            }
        }

        return needArray1;
    }

    //total all the arrays individually so they can be added together
    function needsTot() {

        let needSum = 0;

        for (i = 0; i < needs().length; i++) {
            if (!isNaN(needs()[i])) {
                console.log(needs()[i]);
                needSum += needs()[i];

            }
        }
        return needSum;
    }

    function wantsTot() {
        let wantSum = 0;

        for (i = 0; i < wants().length; i++) {
            if (!isNaN(wants()[i])) {
                console.log(wants()[i]);
                wantSum += wants()[i];
            }
        }
        return wantSum;
    }

    function savTot() {

        let savSum = 0;

        for (i = 0; i < sav().length; i++) {
            if (!isNaN(sav()[i])) {
                console.log(sav()[i]);
                savSum += sav()[i];

            }
        }
    }

    //add the results together to be used for later operation
    let nonBudgSums = wantsTot() + needsTot() + savTot();

    return nonBudgSums;
});


//grab inputs from the second form
getId(`form2`).addEventListener('submit', function budgetPlan(input) {
    input.preventDefault();

    //make a function with a return i can use later
    function newWants() {
        var newWantArray1 = [];

        var newtrans = parseFloat(document.getId('trans2').value);
        newWantArray1.push(parseFloat(newtrans));

        var newhob = parseFloat(document.getId('hobb2').value);
        newWantArray1.push(parseFloat(newhob));

        var newout = parseFloat(document.getId('out2').value);
        newWantArray1.push(parseFloat(newout));

        var newfood = parseFloat(document.getId('food2').value);
        newWantArray1.push(parseFloat(newfood));

        return newWantArray1;
    };

    //same as above
    function newSavs() {

        var newSavArray1 = [];

        var newsav = parseFloat(document.getId('sav2').value);
        newSavArray1.push(parseFloat(newsav));

        var newretir = parseFloat(document.getId('retir2').value);
        newSavArray1.push(parseFloat(newretir));

        var newextra = parseFloat(document.getId('extra2').value);
        newSavArray1.push(parseFloat(newextra));

        return newSavArray1;
    };

    // same as above
    function newNeeds() {

        var newNeedArray1 = [];

        var newhousing = parseFloat(document.getId('housing2').value);
        newNeedArray1.push(parseFloat(newhousing));

        var newutil = parseFloat(document.getId('util2').value);
        newNeedArray1.push(parseFloat(newutil));

        var newinsur = parseFloat(document.getId('insur2').value);
        newNeedArray1.push(parseFloat(newinsur));

        var newdebt = parseFloat(document.getId('deb2').value);
        newNeedArray1.push(parseFloat(newdebt));

        return newNeedArray1;
    }

    //sum up the previously made arrays for total use
    function newWantsTot() {
        let newWantSum = 0;

        for (i = 0; i < newWants().length; i++) {
            if (!isNaN(newWants()[i])) {
                console.log(newWants()[i]);
                newWantSum += newWants()[i];

            }
        }

        return newWantSum;
    };

    function newNesTot() {
        let newNeedSum = 0;
        for (i = 0; i < newNeeds().length; i++) {
            if (!isNaN(newNeeds()[i])) {
                console.log(newNeeds()[i]);
                newNeedSum += newNeeds()[i];

            }
        }
        return newNeedSum;
    }

    function newSavTot() {
        let newSavSum = 0;

        for (i = 0; i < newSavs().length; i++) {
            if (!isNaN(newSavs()[i])) {
                console.log(newSavs()[i]);
                newSavSum += newSavs()[i];

            }
        }
        return newSavSum;
    }


    let budgSum = newNesTot() + newSavTot() + newWantsTot();

    return budgSum;
});

//save the returns as accessible variables
var ogneeds = needs();
var ogwants = want();
var ogsaving = sav();

// create an array of all the original inputs
function ogArray() {
    let ogArray = 0;
    for (i = 0; i < ogneeds.length; i++) {
        ogArray += ogneeds[i];
    }
    for (i = 0; i < ogwants.length; i++) {
        ogArray += ogwants[i];
    }
    for (i = 0; i < ogsaving.length; i++) {
        ogArray += ogsaving[i];
    }
    return ogArray;
}


//^^ arrays pulled from form 1


//do the same thing as above but with the new budget inputs
var newWants = newWants();
var newNeeds = newNeeds();
var newSav = newSav();

function newArray() {
    let newArray = 0;
    for (i = 0; i < newNeeds.length; i++) {
        newArray += newNeeds[i];
    }
    for (i = 0; i < newWants.length; i++) {
        newArray += newWants[i];
    }
    for (i = 0; i < newSav.length; i++) {
        newArray += newSav[i];
    }
    return newArray;
}
// ^^ arrays pulled from form 2

//save the results of the income stuff as well
var budgTotal = budgetPlan();
var startPoint = firstIncome();

// display whether you're over or under budget
function budgDetermine() {
    if (Math.round(startPoint - budgTotal) > 0) {
        getId('ovUn').innerText = ` $${Math.round(startPoint - budgTotal)} under `;
    }
    else if (Math.round(startPoint - budgTotal) === 0) {
        getId('ovUn').innerText = ` exactly on `;
    }
    else {
        getId('ovUn'.innerText = ` $${Math.round(startPoint - budgTotal)} over`);
    }
};

//display 30% of the income for housing stuff
function forHouse() {
    getId('houBudg').innerText = ` $${Math.round(startPoint * .3)}`;
}

//iterate through both arrays to change the innertext accordingly for the first category
function oldBudgReplace() {
    let oldlabels = [getId('curhou'), getId('curut'), getId('curin'), getId('curdeb'), getId('curtrans'), 
    getId('curhob'), getId('curfood'), getId('cursav'), getId('currer'), getId('curcase')];
    for (i = 0; i < oldlabels.length; i++) {
        oldlabels[i].innerText = ogArray()[i];
    }
}

//iterate through both arrays to change the innertext accordingly for the second category
function newBudgReplace() {
    let newlabels = [getId('newhou'), getId('newut'), getId('newin'), getId('newdeb'), getId('newtrans'), 
    getId('newhob'), getId('newfood'), getId('newsav'), getId('newrer'), getId('newcase')];
    for (i = 0; i < newlabels.length; i++) {
        newlabels[i].innerText = newArray()[i];
    }
}

//add the inputs and stuff only when the summary button is clicked
getId('summaryBtn').addEventListener('click', function (input) {
    input.preventDefault();
    budgDetermine();
    forHouse();
    oldBudgReplace();
    newBudgReplace();
})


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