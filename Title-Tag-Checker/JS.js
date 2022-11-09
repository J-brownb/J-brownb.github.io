'use strict';

//defining variables as the divs telling the user the status
var long = document.getElementById('toolong');
var short = document.getElementById('tooshort');
var right = document.getElementById('justright');

//hiding the Divs
long.style.display = 'none';
right.style.display = 'none';
short.style.display = 'none';

//add keyup function to the search box
document.getElementById('searchbox').addEventListener('keyup', textInput);

//define input and length variables
function textInput() {
  let input = document.getElementById('searchbox').value;
  document.getElementById('textoutput').innerHTML = input;
  let length = input.length;
  document.getElementById('textlength').innerHTML = length;
  document.getElementById('progress').value = length;

  //if statemements to determine the result, showing relevant div and hiding the others

  if (length >= 1 && length < 50) {
    short.style.display = 'block';
    right.style.display = 'none';
    long.style.display = 'none';
  }

  if (length >= 50 && length <= 60) {
    short.style.display = 'none';
    right.style.display = 'block';
    long.style.display = 'none';
  }

  if (length > 60) {
    short.style.display = 'none';
    right.style.display = 'none';
    long.style.display = 'block';
  }
}

//reset on click of refresh button, hide any divs and clear all fields
refreshbutton.onclick = function () {
  searchbox.value = 'Type here..';
  short.style.display = 'none';
  right.style.display = 'none';
  long.style.display = 'none';
  document.getElementById('textoutput').innerHTML = '';
  document.getElementById('textlength').innerHTML = '';
  document.getElementById('progress').value = '0';
};
