"use strict";

/*
    This javascript is based upon es6 principles.
*/

/* Putting id in the sessionStorage so that id can be to fill data on editItem.html */
var editStudentData = function editStudentData(editButton) {
    var id = editButton.getAttribute('data-id');
    // Using local storage to store id of record which we want to edit */
    sessionStorage.setItem("editId", id);
    window.location.href = "editItem.html";
};

/* To fill the data in the form fields when we want to edit an item | Called onload() of editItem page's body*/
var fillEditPage = function fillEditPage() {
    var id = sessionStorage.getItem('editId');

    var stu = sessionStorage.getItem(id);
    var obj = JSON.parse(stu);

    document.getElementById("sname").value = obj.name;
    document.getElementById("sid").value = id;
    document.getElementById("syear").value = obj.year;
    document.getElementById("sstream").value = obj.stream;

    /* Have to remove record here beacuse the utility module in addStudentData() in not working */
    sessionStorage.removeItem(id);
    sessionStorage.removeItem('editId');
};

//const toggleAddDetails = () =>{

/* To add/edit a student record to sessionStorage */
//function addStudentData() {
var addStudentData = function addStudentData() {
    var name = document.getElementById('sname').value;
    var id = document.getElementById('sid').value;
    var year = document.getElementById('syear').value;
    var stream = document.getElementById('sstream').value;

    /* 
    // A utility module for editItem page : I DONT KNOW WHY IT'S NOT WORKING
    if(sessionStorage.getItem('editId')){
        let remId = sessionStorage.getItem('editId');
        console.log(remId);
        sessionStorage.removeItem(remId);
        consle.log('here!!!!!!!!!!!!!!');
        // removing the Id of the item from sessionStorage which we want to edit
        sessionStorage.removeItem('editId');
    } */

    // Form validation --> the fields should not be empty.
    if (name == null || name == "" || id == null || id == "" || year == null || year == "" || stream == null || stream == "") {
        alert("Please fill all required fields.");
        return false;
    }

    /* Ensuring unique keys should be allowed. */
    for (var i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i) == id) {
            alert("Id already exist, cannot insert more than one record using one ID.");
            return false;
        }
    }

    // Making a JSON object using the form values 
    var studentObj = { 'name': name, 'year': year, 'stream': stream };

    // Pushing record to sessionStorage after stringify JSON Object
    sessionStorage.setItem(id, JSON.stringify(studentObj));

    // Redirecting back to home page
    alert("Done. Redirect to home page!");

    window.location.href = "index.html";
    return false;
};

/* To delete a stored record. */
var deleteStudentData = function deleteStudentData(but) {

    var id = but.getAttribute('data-id');
    if (confirm('Are You Sure?')) {
        sessionStorage.removeItem(id);
    }
    window.location.reload(true);
};

// A funtion to show all the records present in the session Storage.
var showData = function showData() {

    for (var i = 0; i < sessionStorage.length; i++) {

        var stu = sessionStorage.getItem(sessionStorage.key(i));
        var obj = JSON.parse(stu);

        var table = document.getElementById("dataTable");

        /* -1 argument will append in the table*/
        var row = table.insertRow(-1);

        var name = row.insertCell(0);
        var id = row.insertCell(1);
        var year = row.insertCell(2);
        var stream = row.insertCell(3);
        var options = row.insertCell(4);

        /* Using dataId attribute of HTML5 to store the Id of the record, this will make edit and delete operations easy */
        var eButton = "<button class='btn btn-success' onclick='editStudentData(this)' data-id=" + sessionStorage.key(i) + "><i class='fa fa-pencil' aria-hidden='true'></i> Edit</button>";
        var dButton = "<button class='btn btn-danger' onclick='deleteStudentData(this)' data-id=" + sessionStorage.key(i) + "><i class='fa fa-trash' aria-hidden='true'></i> Delete</button>";

        name.innerHTML = obj.name;
        id.innerHTML = sessionStorage.key(i);
        year.innerHTML = obj.year;
        stream.innerHTML = obj.stream;

        /* USING TEMPLATE LITERALS */
        options.innerHTML = eButton + " " + dButton;
    }
};

/* A function to delete all data, but adding the dummy data AS PER REQUIREMENTS. */
var deleteAllData = function deleteAllData() {
    sessionStorage.clear();

    confirm('Wanna delete all the data?');
    window.location.reload(true);
};