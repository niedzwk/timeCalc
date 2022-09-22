let startDate = document.querySelector(".startDate");
let routerTime = document.querySelector(".routerTime");
let btnCalc = document.querySelector(".btnCalc");
let result = document.querySelector(".result");

const timeOnValue = (time) => {
  console.log(time);
  let hours = time[0] * 10 + parseInt(time[1]);
  let minutes = time[3] * 10 + parseInt(time[4]);
  let seconds = time[6] * 10 + parseInt(time[7]);
  let value = hours * 3600 + minutes * 60 + seconds;
  console.log(minutes);
  return value;
};

const actualDate = (workingTime) => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let timeInSeconds = hours * 3600 + minutes * 60 + seconds;
  let realStartTimeInSeconds;
  if (timeInSeconds > workingTime) {
    realStartTimeInSeconds = timeInSeconds - workingTime;
  } else {
    realStartTimeInSeconds = timeInSeconds + 86400 - workingTime;
  }
  if (realStartTimeInSeconds >= 86400) {
    realStartTimeInSeconds = realStartTimeInSeconds - 86400;
  }
  // console.log("fdfnsdjf" + realStartTimeInSeconds);
  return realStartTimeInSeconds;
};

const formatTime = (startTime) => {
  let hours = Math.floor(startTime / 3600);
  let minutes = Math.floor((startTime - 3600 * hours) / 60);
  let seconds = startTime - 3600 * hours - minutes * 60;
  return (
    addZeroInResult(hours) +
    ":" +
    addZeroInResult(minutes) +
    ":" +
    addZeroInResult(seconds)
  );
};

const addZeroInResult = (value) => {
  let result = value;
  if (value.toString().length < 2) {
    result = "0" + value;
  }
  return result;
};

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

const calc = () => {
  startTimeInSeconds = timeOnValue(startDate.value);
  routerTimeInSeconds = timeOnValue(routerTime.value);
  let workingTime = routerTimeInSeconds - startTimeInSeconds;
  let realStartTimeInSeconds = actualDate(workingTime);
  let resultTime = formatTime(realStartTimeInSeconds);
  // console.log(workingTime);
  result.textContent = resultTime;
  result.textContent.focus();
  result.textContent.select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }
};

btnCalc.addEventListener("click", calc);
btnCalc.addEventListener("click", function (event) {
  copyTextToClipboard(result.textContent);
});
