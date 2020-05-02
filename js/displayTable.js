const displayTable = (weekArray, practicals) => {
  console.log(weekArray);
  var div = document.getElementsByClassName("timeTable")[0];
  var tableDiv = document.createElement("div");
  var oldchild = document.getElementsByClassName("table")[0];
  var table = document.createElement("table");
  var addedLunch = false;
  var practicalAlotted = false;
  var days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  div.removeChild(oldchild);
  tableDiv.className = "table";
  div.appendChild(tableDiv);
  tableDiv.appendChild(table);

  weekArray.forEach((row, ind) => {
    var tr = document.createElement("tr");
    table.appendChild(tr);
    var td = document.createElement("td");
    td.innerHTML = days[ind];
    tr.appendChild(td);
    row.forEach((col, index) => {
      var td = document.createElement("td");
      if (col.subjectType == "PracticalSlot") {
        td.setAttribute("colspan", "2");
        practicalAlotted = true;
        var grpArr = col.practicalArray;
        try {
          td.innerHTML =
            practicals[grpArr[0] - 1].subjectName +
            " / " +
            practicals[grpArr[1] - 1].subjectName +
            " / " +
            practicals[grpArr[2] - 1].subjectName +
            "<br> G1 / G2 / G3";
        } catch (error) {
          td.innerHTML = "";
        }
      } else {
        td.innerHTML = col.subjectName;
      }
      // td.innerHTML = col.subjectType + " " + col.subject;

      tr.appendChild(td);

      if (index == 3 && !addedLunch && !practicalAlotted) {
        var td = document.createElement("td");
        td.setAttribute("rowspan", weekArray.length);
        td.innerHTML = "Lunch";
        addedLunch = true;
        tr.appendChild(td);
      }
      if (index == 2 && !addedLunch && practicalAlotted) {
        var td = document.createElement("td");
        td.setAttribute("rowspan", weekArray.length);
        td.innerHTML = "Lunch";
        addedLunch = true;
        tr.appendChild(td);
      }
    });
  });
};

export default displayTable;
