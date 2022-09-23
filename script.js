"use strict";

// BANKIST APP

// Data
const account1 = {
  owner: "Chinmay Gupta",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2022-09-17T23:36:17.929Z",
    "2022-09-20T10:51:36.790Z",
  ],
  currency: "INR",
  locale: "en-GB",
};

const account2 = {
  owner: "Aditya Gupta",
  movements: [5000, 3400, -150, -1000, 8500, -30, -1000, 10000],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Karuna Singhal",
  movements: [2000, -200, 3400, -300, -20, 50, 4000, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "INR",
  locale: "en-GB",
};

const account4 = {
  owner: "Vikas Gupta",
  movements: [430, 1000, 700, 50, 90, 220, 998, -233, 8752, -909],
  interestRate: 1,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2022-09-17T23:36:17.929Z",
    "2022-09-20T10:51:36.790Z",
  ],
  currency: "INR",
  locale: "en-GB",
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const btnLogout = document.querySelector(".btn--logout");

const inputLogin = document.querySelectorAll(".login__input");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const updateUI = function (currentAccount) {
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};

////////////////////////////////////////////////

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};
////////////////////////////////////////////////

const updateMovementsDate = function (currentDate, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), currentDate);

  // const date = `${currentDate.getDate()}`.padStart(2, 0);
  // const month = `${currentDate.getMonth() + 1}`.padStart(2, 0);
  // const year = `${currentDate.getFullYear()}`;
  // const hour = `${currentDate.getHours()}`.padStart(2, 0);
  // const minutes = `${currentDate.getMinutes()}`.padStart(2, 0);

  if (daysPassed === 0) return "today";
  else if (daysPassed === 1) return "yesterday";
  else if (daysPassed < 4) return `${daysPassed} days ago`;
  // else return `${date}/${month}/${year}, ${hour}:${minutes}`;
  else return new Intl.DateTimeFormat(locale).format(currentDate);
};

////////////////////////////////////////////////

const displayMovements = function (acc, sorted = false) {
  containerMovements.innerHTML = "";

  const movs = sorted
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const currentDate = new Date(acc.movementsDates[i]);

    const movementDate = updateMovementsDate(currentDate, acc.locale);

    const movementValue = formatCurrency(mov, acc.locale, acc.currency);

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1}
      ${type}</div>
      <div class="movements__date">${movementDate}</div>
      <div class="movements__value">${movementValue}</div>
   </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });

  [...document.querySelectorAll(".movements__row")].forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = "#dfdfdf";
  });
};

////////////////////////////////////////////////

const createUsernames = function (accounts) {
  accounts.forEach(function (accNum) {
    accNum.userName = accNum.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word.at(0))
      .join("");
  });
};

createUsernames(accounts);
// console.log(accounts);

////////////////////////////////////////////////

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((total, mov) => total + mov, 0);

  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

////////////////////////////////////////////////

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((income) => income >= 0)
    .reduce((incomeSum, value) => incomeSum + value, 0);

  labelSumIn.textContent = formatCurrency(income, acc.locale, acc.currency);

  const spent = acc.movements
    .filter((spent) => spent < 0)
    .reduce((spentSum, value) => spentSum + value, 0);

  labelSumOut.textContent = formatCurrency(spent, acc.locale, acc.currency);

  const interest = acc.movements
    .filter((income) => income > 0)
    .map((interest) => (interest * acc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((interestSum, value) => interestSum + value, 0);

  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

////////////////////////////////////////////////

let currentAccount, timer;

const nowDate = new Date();

const optionDate = {
  weekday: "long",
  day: "numeric",
  month: "numeric",
  year: "numeric",
  minute: "numeric",
  hour: "numeric",
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Login to get started";
      containerApp.style.opacity = 0;
      containerApp.style.visibility = "hidden";
    }

    time--;
  };

  let time = 300;

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

////////////////////////////////////////////////

// const date = `${nowDate.getDate()}`.padStart(2, 0);
// const month = `${nowDate.getMonth() + 1}`.padStart(2, 0);
// const year = `${nowDate.getFullYear()}`;
// const hour = `${nowDate.getHours()}`.padStart(2, 0);
// const minutes = `${nowDate.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${date}/${month}/${year}, ${hour}:${minutes}`;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(" ")
      .at(0)}`;

    containerApp.style.opacity = 1;
    containerApp.style.visibility = "visible";

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      optionDate
    ).format(nowDate);

    inputLogin.forEach((input) => (input.style.visibility = "hidden"));
    btnLogin.style.visibility = "hidden";

    setTimeout(function () {
      btnLogout.style.visibility = "visible";
    }, 500);

    updateUI(currentAccount);

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
  } else alert("Inavalid Credentials!");

  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();
  inputLoginUsername.blur();
});

////////////////////////////////////////////////

btnLogout.addEventListener("click", function (e) {
  e.preventDefault();

  setTimeout(function () {
    inputLogin.forEach((input) => (input.style.visibility = "visible"));
    btnLogin.style.visibility = "visible";
  }, 500);

  btnLogout.style.visibility = "hidden";

  labelWelcome.textContent = "Login to get started";
  containerApp.style.opacity = 0;
  containerApp.style.visibility = "hidden";
});

////////////////////////////////////////////////

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const recieverAccount = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );

  if (
    recieverAccount &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieverAccount.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  } else alert("Inavalid Credentials!");

  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
  inputTransferTo.blur();

  clearInterval(timer);
  timer = startLogoutTimer();
});

////////////////////////////////////////////////

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => currentAccount.userName === acc.userName
    );

    accounts.splice(index, 1);

    setTimeout(function () {
      inputLogin.forEach((input) => (input.style.visibility = "visible"));
      btnLogin.style.visibility = "visible";
    }, 500);

    btnLogout.style.visibility = "hidden";

    labelWelcome.textContent = "Login to get started";
    containerApp.style.opacity = 0;
    containerApp.style.visibility = "hidden";
  } else alert("Inavalid Credentials!");

  inputCloseUsername.value = inputClosePin.value = "";
  inputCloseUsername.blur();
  inputClosePin.blur();
});

////////////////////////////////////////////////

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((value) => value >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  } else alert("Loan limit exceeded.");

  inputLoanAmount.value = "";
  inputLoanAmount.blur();

  clearInterval(timer);
  timer = startLogoutTimer();
});

////////////////////////////////////////////////

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
