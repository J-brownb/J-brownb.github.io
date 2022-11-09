'use strict';

//Array for active jobs
let listofJobs = [];

//Array for completed jobs
let completedJobs = [];

//Getting 'add job' button element by ID
const addJob = document.getElementById('addjob');

//Adding click function for the 'add job' button
addJob.addEventListener('click', function () {
  //Getting the value of the jobs text area, saving to new jobs variable
  let newJobs = document.getElementById('jobs').value;
  //Adding jobs to new jobs div
  document.getElementById('listofjobs').innerHTML +=
    '<li>' + listofJobs.length + `: ` + newJobs + '</li>';
  //pushing new jobs variable to list of jobs array
  listofJobs.push(newJobs);
});

// Add a "checked" symbol when clicking on a list item
let list = document.getElementById('listofjobs');
list.addEventListener('click', function () {
  list.classList.toggle('checked');
});
