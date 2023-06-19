'use strict';
/// Data

const account1 = {
  owner: 'Jonny Hodgson',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-08-20T17:01:17.194Z',
    '2022-08-28T23:36:17.929Z',
    '2022-08-30T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2022-08-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const info = document.querySelector('.info');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Functions

const formatMovementDate = function (date, locale) {
  //Function to calculate time between days
  const calcDaysPassed = (date1, date2) =>
    //Convert from ms to days, rounded to integer
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

//Function to format currency

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  //Create new copy of array and sort it
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    //Internationalisation of currency
    const formattedMov = formatCurr(mov, acc.locale, acc.currency);

    const html = `<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1}: ${type} </div>
<div class="movements__value">${formattedMov} ${type}</div>          <div class="movements__date">${displayDate}</div>
</div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Function to display balance of accounts
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

//Calculating the total withdrawls and deposits
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  //Withdrawals
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locale, acc.currency);

  //Interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    //Interest only paid if deposit is >= 1
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

//Creating usernames
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

//Update UI function
const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);
  //Display balance
  calcPrintBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};

//Logout timer
const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    //In each call (second), print remaining time to UI
    labelTimer.textContent = `${min}:${seconds}`;

    //When time == 0, log user out
    if (time === 0) {
      clearInterval(timer);
      alert(
        `You have not done anything for 5 minutes, you have been logged out for security reasons.`
      );
      containerApp.style.opacity = 0;
    }
    //Decrease timer by 1
    time--;
  };
  //Set time to 5 minutes
  let time = 300;
  //Call timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//Event Handlers for Login

let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  //Checks if the value of the username is the same as the account owner name
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  //If else with optional chaining
  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display welcome message. Split array at space and use 0 index so only shows the first name
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    } 👋`;
    containerApp.style.opacity = 100;

    //Internationalisation API
    const now = new Date();
    //Options object
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      // weekday: 'long', //can also use 'short' or 'narrow'
      day: 'numeric',
      month: 'numeric', //can also use 'long' for text version
      year: 'numeric', //can also use '2-digit
    };

    //Formatting as US MM/DD/YYYY
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //Clear input fields on login
    info.style.display = 'none';

    inputLoginUsername.value = inputLoginPin.value = '';
    //Remove cursor focus
    inputLoginPin.blur();
    //Starting logout timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    //Update UI call
    updateUI(currentAccount);
  } else {
    alert('Incorrect login details 😭');
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  //Person can borrow 10% of their largest deposit
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    //add movement to the balance
    setTimeout(function () {
      currentAccount.movements.push(amount);
      //Tell user it's done
      alert('Loan accepted, happy spending 💰');
      //Adding a date to the loan
      currentAccount.movementsDates.push(new Date().toISOString());
      //Update UI
      updateUI(currentAccount);
    }, 2500);
  } else alert(`Loan declined 😭 you don't have enough money`);
  inputLoanAmount.value = '';
  clearInterval(timer);
  timer = startLogoutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
});

//Transfers
btnTransfer.addEventListener('click', function (e) {
  //Preventing default page reload
  e.preventDefault();
  //Save amount and reciever as variable
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  //Clear transfer fields on submission
  inputTransferAmount.value = inputTransferTo.value = '';

  //Checking there is money in acc, that the balance is sufficient, that the reciver account exists AND that they are not sending money to themself
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Transferring the money
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //Adding a date to the transfer
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
    alert(`Transfer made 💸`);
    //Reset Timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.pin === +inputClosePin.value &&
    currentAccount.username === inputCloseUsername.value
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    //Delete current account
    accounts.splice(index, 1);
    //Let user know
    alert('Your account has been deleted, bye 👋');
    //Hide the UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in again`;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//Sort functionality
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

labelBalance.addEventListener('click', function () {
  //Using from to turn querySelectorAll to an array
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('£', '')
  );
  console.log(movementsUI);
});

//Practice
//Returns true
console.log(23 === 23.0);

//Returns 0.30000000000000004
console.log(0.1 + 0.2);
//Returns false
console.log(0.1 + 0.2 === 0.3);

console.log(Number('23'));
console.log(+'23');

//Parsing
//Returns 30
console.log(Number.parseInt('30px'));
//Returns 30 in base 16 (hex)
console.log(Number.parseInt('30px', 16));
//Returns 30 in base 10 (30)
console.log(Number.parseInt('30px', 10));

console.log(Number.parseFloat('2.5rem'));

//NAN

//Returns false (n)
console.log(Number.isNaN(20));
//Returns false (n)
console.log(Number.isNaN('20'));
//Returns true (NAN)
console.log(Number.isNaN(+'20X'));
//Returns false (n)
console.log(Number.isNaN(23 / 0));

//isFinite checks if its a real number
//Returns true (n)
console.log(Number.isFinite(20));
//Returns false (NAN)
console.log(Number.isFinite('20'));
//Returns false (NAN)
console.log(Number.isFinite(+'20X'));
//Returns false (NAN)
console.log(Number.isFinite(23 / 0));

//isInteger checks if its an integer
//Returns true (integer)
console.log(Number.isInteger(23));
//Returns true (integer)
console.log(Number.isInteger(23.0));
//Returns false (not integer)
console.log(Number.isInteger(23 / 0));

//Sqaure root operator (5)
console.log(Math.sqrt(25));
//Same using exponentiation (5)
console.log(25 ** (1 / 2));

//Returns the largest value
console.log(Math.max(5, 18, 23, 11));
//Works with type coercion
console.log(Math.max(5, 18, '23', 11));
//But NOT parsing
console.log(Math.max(5, 18, '23px', 11));

//Math.PI
//Returns PI
console.log(Math.PI);
//Calculating radius of a circle 10px in size
console.log(Math.PI * Number.parseFloat('10px') ** 2);

//Math.random
//Returns random # between 0-1
console.log(Math.random());

//Math.trunc removes the decimal, second value (6) is the max and +1 ensures it works
console.log(Math.trunc(Math.random() * 6) + 1);

//Function to create random number
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(1, 100));

//Rounding (returns 23)
console.log(Math.trunc(23.3));

//Rounding Floating Point Numbers (decimals)
//Returns 3
console.log((2.75).toFixed(0));
//Returns 2.8
console.log((2.75).toFixed(1));
//Returns 2.75
console.log((2.75).toFixed(2));
//Returns 2.750
console.log((2.75).toFixed(3));
//Returning number instead of string
console.log(+(2.75).toFixed(3));

//Remainder operator
//Returns 1 (5/2 leaves 1)
console.log(5 % 2);
//Returns 2 (8/3 leaves 2)
console.log(8 % 3);
//Retuns 0 (6/2 leaves 0)
console.log(6 % 2);
//Returns 1 (7/2 leaves 1)
console.log(7 % 2);

//Checking for odd or even numbers
const isEven = n => n % 2 === 0;
//Returns false for odd and true for even
console.log(isEven(1));
console.log(isEven(2));
console.log(isEven(3));
console.log(isEven(4));

//Makes every other row change on click
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

// //Large number, used instead of ,
// const diameter = 287_460_000_000;
// console.log(diameter);
// //Prices, used instead of .
// const price = 345_99;
// console.log(price);
// //Fees, different meanings
// const transferFee = 15_00;
// const transferFee2 = 150_0;
// console.log(transferFee, transferFee2);
// // // Cannot be placed before or after a . or at the start / end of number
// // const PI = 3._1415;
// // console.log(PI);
// // //Strings that contain underscores cannot be converted to numbers (returns NAN)
// // console.log(Number('23_0'));

// //The biggest number JS can safely represent
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// //Big Int
// console.log(62378618937912043233333432);
// console.log(62378618937912043233333432n);
// console.log(BigInt(62378618937912043233333432));

// //Operations
// console.log(9999n + 9999n);

// //Dates and Times
// //Creating date from exact time
// console.log(new Date());
// //Creating a date from string
// console.log(new Date('December 25, 2022'));
// //Creating a date from array item
// console.log(new Date(account1.movementsDates[0]));
// //Creating date manually (year, month, day, hour, minute, second)
// console.log(new Date(2034, 10, 19, 15, 23, 5));
// //UNIX time (Jan 1st 1970)
// console.log(new Date(0));
// // 3 days after initial UNIX time, the calculation returns the timestamp of the new date
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// const future = new Date(2037, 10, 19, 15, 23);
// //Converting date into a timestamp in ms
// console.log(Number(future));
// console.log(+future);

//International number formatting
const num = 3884764.23;

const options = {
  style: 'currency',
  currency: 'EUR',
  useGrouping: false,
};

//USA
console.log(new Intl.NumberFormat('en-US', options).format(num));
//UK
console.log(new Intl.NumberFormat('en-GB', options).format(num));
//Germany
console.log(new Intl.NumberFormat('de-DE', options).format(num));
//Browser
console.log(new Intl.NumberFormat(navigator.language, options).format(num));

//Set Timeout
//Ordering a Pizza, executes after 3 seconds
// const ings = ['olives', 'spinach'];
// const timer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your Pizza 🍕 with ${ing1} and ${ing2}`),
//   3000,
//   ...ings
// );
// //Clearing the timer if the ingredients include spinach
// if (ings.includes('spinach')) clearTimeout(timer);

// //setInterval
// //Logs the current time to the console
// setInterval(function () {
//   const now = new Date();
//   console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
// }, 1000);
