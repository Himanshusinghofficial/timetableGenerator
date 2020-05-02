import Subject from "./Subject.js";
import PracticalSlot from "./Practical.js";
import displayTable from "./displayTable.js";

var nextStepTheory = document.getElementsByClassName("nextStepTheory")[0];
var addTheory = document.getElementsByClassName("addTheory")[0];
var nextStepPractical = document.getElementsByClassName("nextStepPractical")[0];
var addPractical = document.getElementsByClassName("addPractical")[0];
var applyTheory = document.getElementsByClassName("applyTheory")[0];

var dayCount;
var theoryCount;
var practicalCount;

function generateTable() {
  theoryCount = document.getElementById("theorySubjects").value.trim();
  practicalCount = document.getElementById("practicalSubjects").value.trim();
  dayCount = document.getElementById("getDays").value.trim();
  var theoryArray = [];
  var pracArray = [];
  var alotted = [];
  var twiceInADay = false;
  var week = [];

  var AvailablePracWeek = [];
  var practicalG1 = [],
    practicalG2 = [],
    practicalG3 = [];

  var flagG3ii = 0,
    flagG3i = 0,
    flagG2 = 0;

  for (var i = 1; i <= theoryCount; i++) {
    var maxDayRepeat =
      parseInt(document.getElementById("maxInADayT" + i).value.trim()) || 0;
    var totalRepeatPerWeek =
      parseInt(document.getElementById("maxInAWeekT" + i).value.trim()) || 0;
    var subName = document.getElementById("nameT" + i).value.trim() || "";
    theoryArray.push(
      new Subject(i, "Theory", subName, totalRepeatPerWeek, maxDayRepeat)
    );
  }

  for (var i = 1; i <= practicalCount; i++) {
    var subName = document.getElementById("nameP" + i).value.trim() || "";
    pracArray.push(new Subject(i, "Practical", subName, 1, 1));
  }

  for (var i = 0; i < practicalCount; i++) {
    AvailablePracWeek.push(new PracticalSlot(i + 1));

    practicalG1.push(i + 1);
    practicalG2.push(i + 1);
    practicalG3.push(i + 1);
  }

  var AvailableSubWeek = [];
  theoryArray.forEach((element) => {
    AvailableSubWeek.push(element);
  });
  var bugFlag = null;

  for (i = 0; i < dayCount; i++) {
    alotted = [];
    twiceInADay = false;

    var AvailableSubDay = [];
    AvailableSubWeek.forEach((element) => {
      if (
        bugFlag === null ||
        (bugFlag !== null && element.subject !== bugFlag.subject)
      ) {
        AvailableSubDay.push(element);
        bugFlag = null;
      }
    });
    var daySubs = new Set();
    while (alotted.length < 5) {
      // Theory Subject Handling
      var choosenSubTInd = parseInt(Math.random() * AvailableSubDay.length);
      var choosenSubT = AvailableSubDay[choosenSubTInd];

      // while (choosenSubT === null) {
      //   choosenSubTInd = parseInt(Math.random() * AvailableSubDay.length);
      //   choosenSubT = AvailableSubDay[choosenSubTInd];
      // }

      alotted.push(choosenSubT);
      daySubs.add(choosenSubT.subject);

      choosenSubT.usedSlots += 1;
      choosenSubT.usedInADay += 1;
      choosenSubT.setSlotsPerDay();

      if (choosenSubT.usedInADay === 2) {
        twiceInADay = true;
        bugFlag = choosenSubT;
        var arr = [...daySubs];

        for (let sub of daySubs) {
          AvailableSubDay = AvailableSubDay.filter(
            (value) => value.subject !== sub
          );
        }
      }

      if (twiceInADay) {
        AvailableSubDay = AvailableSubDay.filter(
          (element) => element.subject !== choosenSubT.subject
        );
      }
      if (choosenSubT.usedSlots === choosenSubT.maxSlots) {
        AvailableSubDay = AvailableSubDay.filter(
          (element) => element.subject !== choosenSubT.subject
        );
        AvailableSubWeek = AvailableSubWeek.filter(
          (element) => element.subject !== choosenSubT.subject
        );
      } else if (choosenSubT.usedInADay === choosenSubT.maxInADay) {
        AvailableSubDay = AvailableSubDay.filter(
          (element) => element.subject !== choosenSubT.subject
        );
      }
    }
    // Practical Subject Handling

    do {
      var randomInd = parseInt(Math.random() * alotted.length);
    } while (randomInd == 3);

    try {
      var choosenSubPInd = parseInt(Math.random() * AvailablePracWeek.length);
      var choosenSubP = AvailablePracWeek[choosenSubPInd];

      // practical slot Handling START
      var pracG1RandInd = parseInt(Math.random() * practicalG1.length);
      var pracG1Sub = practicalG1[pracG1RandInd];
      choosenSubP.practicalArray.push(pracG1Sub);
      practicalG1 = practicalG1.filter((element) => element !== pracG1Sub);

      if (practicalG2.indexOf(pracG1Sub) != -1) {
        flagG2 = 1;
        practicalG2 = practicalG2.filter((element) => element !== pracG1Sub);
      }
      var pracG2RandInd = parseInt(Math.random() * practicalG2.length);
      var pracG2Sub = practicalG2[pracG2RandInd];
      choosenSubP.practicalArray.push(pracG2Sub);
      practicalG2 = practicalG2.filter((element) => element !== pracG2Sub);

      if (practicalG3.indexOf(pracG1Sub) != -1) {
        flagG3i = 1;
        practicalG3 = practicalG3.filter((element) => element !== pracG1Sub);
      }
      if (practicalG3.indexOf(pracG2Sub) != -1) {
        flagG3ii = 1;
        practicalG3 = practicalG3.filter((element) => element !== pracG2Sub);
      }
      var pracG3RandInd = parseInt(Math.random() * practicalG3.length);
      var pracG3Sub = practicalG3[pracG3RandInd];
      choosenSubP.practicalArray.push(pracG3Sub);
      practicalG3 = practicalG3.filter((element) => element !== pracG3Sub);

      if (flagG2 == 1) {
        practicalG2.push(pracG1Sub);
        flagG2 = 0;
      }
      if (flagG3i == 1) {
        flagG3i = 0;
        practicalG3.push(pracG1Sub);
      }
      if (flagG3ii == 1) {
        flagG3ii = 0;
        practicalG3.push(pracG2Sub);
      }
      // practical slot handling END

      AvailablePracWeek = AvailablePracWeek.filter(
        (element) => element.subject !== choosenSubP.subject
      );
    } catch (error) {
      choosenSubP = new PracticalSlot("_blank_");
    }
    // console.log("------", i, "-------");
    // console.log(practicalG1);
    // console.log(practicalG2);
    // console.log(practicalG3);
    // console.log(choosenSubP.practicalArray);

    alotted.splice(randomInd, 0, choosenSubP);

    [theoryArray].forEach((subjectType) => {
      subjectType.forEach((subject) => {
        subject.usedInADay = 0;
      });
    });

    week.push(alotted);
  }
  console.log("===");
  console.log(week);
  console.log("---");

  displayTable(week, pracArray);
}

// document.getElementsByTagName("button")[0].addEventListener("click", () => {
//   generateTable();
// });

//Generate Table
document.getElementsByClassName("generate")[0].addEventListener("click", () => {
  var totalSlotsForTheory = 0;
  var totalSlotsForPractical = 0;
  dayCount = document.getElementById("getDays").value.trim();
  theoryCount = document.getElementById("theorySubjects").value.trim();
  practicalCount = document.getElementById("practicalSubjects").value.trim();
  for (var i = 1; i <= theoryCount; i++) {
    totalSlotsForTheory =
      totalSlotsForTheory +
      parseInt(document.getElementById("maxInAWeekT" + i).value.trim());
    console.log(totalSlotsForTheory);
  }
  // for (var i = 1; i <= practicalCount; i++) {
  //   totalSlotsForPractical =
  //     totalSlotsForPractical +
  //     parseInt(document.getElementById("maxInAWeekP" + i).value.trim());
  // }
  console.log(practicalCount, totalSlotsForTheory);
  if (dayCount * 7 <= totalSlotsForTheory + 2 * practicalCount) {
    generateTable();
  } else {
    document.getElementsByClassName("table")[0].innerHTML =
      "Please re-check your inputs. <br> The total sum of all subjects repeations should be <br> greater than or equal to total periods in the week";
  }
});

//FOR THEORY
var theoryCardCount = 0;

//generate cards

nextStepTheory.addEventListener("click", () => {
  var val = document.getElementById("theorySubjects").value.trim();
  document.getElementsByClassName("theoryDetails")[0].remove();
  theoryCardCount = 0;

  var mainDiv = document.createElement("div");
  mainDiv.className = "theoryDetails";
  document.getElementsByClassName("theoryWrapper")[0].appendChild(mainDiv);

  for (var i = 0; i < val; i++) {
    theoryCardCount++;
    var detailCard = document.createElement("div");
    detailCard.id = "Theory" + theoryCardCount;

    detailCard.className = "detailCard";
    mainDiv.appendChild(detailCard);

    // var btn = document.createElement("button");
    // btn.innerHTML = "&times;";
    // btn.className = "close";
    // btn.id = theoryCardCount;
    // detailCard.appendChild(btn);

    var span = document.createElement("span");
    var input = document.createElement("input");
    span.innerHTML = "Theory " + theoryCardCount + " Name";
    detailCard.appendChild(span);

    input.setAttribute("type", "text");
    input.setAttribute("id", "nameT" + theoryCardCount);
    detailCard.appendChild(input);

    var span = document.createElement("span");
    var input = document.createElement("input");
    span.innerHTML = "Allowed repeatitions in a day";
    detailCard.appendChild(span);

    input.setAttribute("type", "number");
    input.setAttribute("id", "maxInADayT" + theoryCardCount);
    detailCard.appendChild(input);

    var span = document.createElement("span");
    var input = document.createElement("input");
    span.innerHTML = "Allowed repeatitions in a week";
    detailCard.appendChild(span);

    input.setAttribute("type", "number");
    input.setAttribute("id", "maxInAWeekT" + theoryCardCount);
    detailCard.appendChild(input);
  }
});

//add detail card

addTheory.addEventListener("click", () => {
  theoryCardCount++;

  document.getElementById("theorySubjects").value = theoryCardCount;

  var mainDiv = document.getElementsByClassName("theoryDetails")[0];
  var detailCard = document.createElement("div");

  detailCard.className = "detailCard";
  mainDiv.appendChild(detailCard);

  var span = document.createElement("span");
  var input = document.createElement("input");
  span.innerHTML = "Theory " + theoryCardCount + " Name";
  detailCard.appendChild(span);

  input.setAttribute("type", "text");
  input.setAttribute("id", "nameT" + theoryCardCount);
  detailCard.appendChild(input);

  var span = document.createElement("span");
  var input = document.createElement("input");
  span.innerHTML = "Allowed repeatitions in a day";
  detailCard.appendChild(span);

  input.setAttribute("type", "number");
  input.setAttribute("id", "maxInADayT" + theoryCardCount);
  detailCard.appendChild(input);

  var span = document.createElement("span");
  var input = document.createElement("input");
  span.innerHTML = "Allowed repeatitions in a week";
  detailCard.appendChild(span);

  input.setAttribute("type", "number");
  input.setAttribute("id", "maxInAWeekT" + theoryCardCount);
  detailCard.appendChild(input);
});

// remove last card

var subTheory = document.getElementsByClassName("subTheory")[0];
subTheory.addEventListener("click", () => {
  var parent = document.getElementsByClassName("theoryDetails")[0];
  if (parent.childElementCount > 0) {
    parent.removeChild(parent.lastChild);
    theoryCardCount--;
    document.getElementById("theorySubjects").value = theoryCardCount;
  }
});

//Apply to all

applyTheory.addEventListener("click", () => {
  var maxInADayT = document.getElementById("maxInADayT1").value.trim();
  var maxInAWeekT = document.getElementById("maxInAWeekT1").value.trim();
  for (var i = 2; i <= theoryCardCount; i++) {
    document.getElementById("maxInADayT" + i).value = maxInADayT;
    document.getElementById("maxInAWeekT" + i).value = maxInAWeekT;
  }
});

//Delete All
var deleteTheory = document.getElementsByClassName("deleteTheory")[0];
deleteTheory.addEventListener("click", () => {
  var parent = document.getElementsByClassName("theoryDetails")[0];
  var count = parent.childElementCount;
  console.log(count);
  for (var i = 0; i < count; i++) {
    parent.removeChild(parent.lastChild);
  }
  theoryCardCount = 0;
  document.getElementById("theorySubjects").value = theoryCardCount;
});

// Reset

var resetTheory = document.getElementsByClassName("resetTheory")[0];
resetTheory.addEventListener("click", () => {
  document.getElementById("theoryForm").reset();
});

//FOR PRACTICAL

var practicalCardCount = 0;

//generate cards

nextStepPractical.addEventListener("click", () => {
  var val = document.getElementById("practicalSubjects").value.trim();
  document.getElementsByClassName("practicalDetails")[0].remove();
  practicalCardCount = 0;

  var mainDiv = document.createElement("div");
  mainDiv.className = "practicalDetails";
  document.getElementsByClassName("practicalWrapper")[0].appendChild(mainDiv);

  for (var i = 0; i < val; i++) {
    practicalCardCount++;
    var detailCard = document.createElement("div");

    detailCard.className = "detailCard";
    mainDiv.appendChild(detailCard);

    var span = document.createElement("span");
    var input = document.createElement("input");
    span.innerHTML = "Practical " + practicalCardCount + " Name";
    detailCard.appendChild(span);

    input.setAttribute("type", "text");
    input.setAttribute("id", "nameP" + practicalCardCount);
    detailCard.appendChild(input);

    // var span = document.createElement("span");
    // var input = document.createElement("input");
    // span.innerHTML = "Allowed repeatitions in a day";
    // detailCard.appendChild(span);

    // input.setAttribute("type", "number");
    // input.setAttribute("id", "maxInADayP" + practicalCardCount);
    // detailCard.appendChild(input);

    // var span = document.createElement("span");
    // var input = document.createElement("input");
    // span.innerHTML = "Allowed repeatitions in a week";
    // detailCard.appendChild(span);

    // input.setAttribute("type", "number");
    // input.setAttribute("id", "maxInAWeekP" + practicalCardCount);
    // detailCard.appendChild(input);
  }
});

//add detail card

addPractical.addEventListener("click", () => {
  practicalCardCount++;

  document.getElementById("practicalSubjects").value = practicalCardCount;

  var mainDiv = document.getElementsByClassName("practicalDetails")[0];
  var detailCard = document.createElement("div");

  detailCard.className = "detailCard";
  mainDiv.appendChild(detailCard);

  var span = document.createElement("span");
  var input = document.createElement("input");
  span.innerHTML = "Practical " + practicalCardCount + " Name";
  detailCard.appendChild(span);

  input.setAttribute("type", "text");
  input.setAttribute("id", "nameP" + practicalCardCount);
  detailCard.appendChild(input);

  // var span = document.createElement("span");
  // var input = document.createElement("input");
  // span.innerHTML = "Allowed repeatitions in a day";
  // detailCard.appendChild(span);

  // input.setAttribute("type", "number");
  // input.setAttribute("id", "maxInADayP" + practicalCardCount);
  // detailCard.appendChild(input);

  // var span = document.createElement("span");
  // var input = document.createElement("input");
  // span.innerHTML = "Allowed repeatitions in a week";
  // detailCard.appendChild(span);

  // input.setAttribute("type", "number");
  // input.setAttribute("id", "maxInAWeekP" + practicalCardCount);
  // detailCard.appendChild(input);
});

// remove last card

var subPractical = document.getElementsByClassName("subPractical")[0];
subPractical.addEventListener("click", () => {
  var parent = document.getElementsByClassName("practicalDetails")[0];
  if (parent.childElementCount > 0) {
    parent.removeChild(parent.lastChild);
    practicalCardCount--;
    document.getElementById("practicalSubjects").value = practicalCardCount;
  }
});

//Apply to all

// applyPractical.addEventListener("click", () => {
//   var maxInADayP = document.getElementById("maxInADayP1").value.trim();
//   var maxInAWeekP = document.getElementById("maxInAWeekP1").value.trim();
//   for (var i = 2; i <= practicalCardCount; i++) {
//     document.getElementById("maxInADayP" + i).value = maxInADayP;
//     document.getElementById("maxInAWeekP" + i).value = maxInAWeekP;
//   }
// });

// Delete all

var deletePractical = document.getElementsByClassName("deletePractical")[0];
deletePractical.addEventListener("click", () => {
  var parent = document.getElementsByClassName("practicalDetails")[0];
  var count = parent.childElementCount;
  console.log(count);
  for (var i = 0; i < count; i++) {
    parent.removeChild(parent.lastChild);
  }
  practicalCardCount = 0;
  document.getElementById("practicalSubjects").value = practicalCardCount;
});

// Reset

var resetPractical = document.getElementsByClassName("resetPractical")[0];
resetPractical.addEventListener("click", () => {
  document.getElementById("practicalForm").reset();
});
