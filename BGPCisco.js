let bgpTime = document.querySelector(".startTime");
let buttonBGP = document.querySelector(".btnCalcBGP");
let bgpResultH1 = document.querySelector(".bgpResultH1");
let backDays = 0;

const bgpTimeToSec = () => {
  const bgpTimeInSec = bgpTime.value;
  let hours = bgpTimeInSec[0] * 10 + parseInt(bgpTimeInSec[1]);
  let minutes = bgpTimeInSec[3] * 10 + parseInt(bgpTimeInSec[4]);
  let seconds = bgpTimeInSec[6] * 10 + parseInt(bgpTimeInSec[7]);
  let timeValue = hours * 3600 + minutes * 60 + seconds;
  return timeValue;
};

const actualDateBGP = (workingTime) => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let timeInSeconds = hours * 3600 + minutes * 60 + seconds;
  return timeInSeconds;
};

const formatTimeBGP = (startTime) => {
  let hours = Math.floor(startTime / 3600);
  let minutes = Math.floor((startTime - 3600 * hours) / 60);
  let seconds = startTime - 3600 * hours - minutes * 60;
  let date = new Date();
  //   let day = date.getDate();
  //   let month = date.getMonth() + 1;
  let day = 1;
  let month = 3;
  let year = date.getFullYear();
  oldDay = backDays - day;
  day -= backDays;
  console.log("fdfs" + backDays);
  if (day < 1) {
    let days;
    if (
      month == 2 ||
      month == 4 ||
      month == 6 ||
      month == 8 ||
      month == 9 ||
      month == 11 ||
      month == 1
    )
      days = 1;
    if (day < 1 && days == 1) {
      day = 31 - oldDay;
    } else if (month == 3) {
      day = 28 - oldDay;
    } else day = 30 - oldDay;

    month -= 1;
    if (month == 0) {
      month = 12;
      year -= 1;
    }
    console.log(day + "-" + month);
  }
  console.log(day);

  return (
    year +
    "-" +
    addZeroInResult(month) +
    "-" +
    addZeroInResult(day) +
    " " +
    addZeroInResult(hours) +
    ":" +
    addZeroInResult(minutes) +
    ":" +
    addZeroInResult(seconds)
  );
};

const backMounth = (day, month, year) => {
  // let day= day
  let days;
  if (
    (month = 2) ||
    (month = 4) ||
    (month = 6) ||
    (month = 8) ||
    (month = 9) ||
    (month = 11) ||
    (month = 1)
  )
    days = 1;
  if (day < 1 && (days = 1)) {
    day = 31;
    //   } else if ((month = 3)) {
    //     day = 28;
  } else day = 30;

  month -= 1;
  if ((month = 0)) {
    month = 12;
    year = -1;
  }
  console.log(day + "-" + month);
};

const bgpResult = () => {
  let actualDateInSec = actualDateBGP();
  let bgpTimeInSec = bgpTimeToSec();
  while (actualDateInSec < bgpTimeInSec) {
    actualDateInSec += 86400;
    backDays += 1;
  }
  let result = actualDateInSec - bgpTimeInSec;
  let format = formatTimeBGP(result);
  //   console.log(format);
  bgpResultH1.textContent = format;
  bgpResultH1.focus();
  bgpResultH1.select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }
};

buttonBGP.addEventListener("click", bgpResult);
