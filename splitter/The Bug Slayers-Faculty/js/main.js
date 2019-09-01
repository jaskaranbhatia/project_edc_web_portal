/*
    This javascript is based upon es6 principles.
*/

/*
*   This function will be called when addStudent or editStudent forms will be submitted.
*/
function my(){
    window.location="http://localhost/thebugslayers/Login/index.php";
}

const onFormSub = () => {
    let name = document.getElementById('sname').value;
    let id = document.getElementById('sid').value;
    let year = document.getElementById('syear').value;
    let stream = document.getElementById('sstream').value;
    let stream1 = document.getElementById('sstream1').value;
    

    // A utility module for editItem page- removing the record when form is submitted
    if(sessionStorage.getItem('editId')){
        let remId = sessionStorage.getItem('editId');
        sessionStorage.removeItem(remId);
        // removing the Id of the item from sessionStorage which we want to edit
        sessionStorage.removeItem('editId');
    }

    // Form validation --> the fields should not be empty.
    if (name == null || name == "" || id == null || id == "" || year == null || year == "" || stream == null || stream == "" || stream1 == null || stream1 == "") {
        alert("Please fill all required fields.");
        return false;
    }

    // Ensuring unique keys should be allowed.
    for (let i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i) == id) {
            alert("Id already exist, cannot insert more than one record using one ID.");
            return false;
        }
    }

    // Making a JSON object using the form values 
    let studentObj = { 'id': id,'name': name, 'year': year, 'stream': stream, 'stream1': stream1 };

    // Pushing record to sessionStorage after stringify JSON Object
    sessionStorage.setItem(id, JSON.stringify(studentObj));

    // Redirecting back to home page
    alert("Done. Redirect to home page!");
    window.location.href = "index.html";

    return false;
}

/* This will be called when user clicks on edit button of a record
*   Putting id in the sessionStorage so that id can be to fill data on editItem.html 
*/
const editStudentData = (editButton) => {
    // Using 'data' attribute of HTML5 to get the id of the record which we want to edit 
    let id = editButton.getAttribute('data-id')

    // Using session storage to store id of record,
    // We will use this id to fill the records data in form fields on editItem.html
    sessionStorage.setItem("editId", id);
    
    // Rendering editIten.html form webPage
    window.location.href = "editItem.html";
}

/* This will be called onload() of editItem.html ,to fill the data in the form fields. */
const fillEditFormPage = () => {
    // fetching 'editId' from the sessionStorage
    let id = sessionStorage.getItem('editId');

    let stu = sessionStorage.getItem(id);
    let obj = JSON.parse(stu);

    // filling the data in form
    document.getElementById("sname").value = obj.name;
    document.getElementById("sid").value = id;
    document.getElementById("syear").value = obj.year;
    document.getElementById("sstream").value = obj.stream;
    document.getElementById("sstream1").value = obj.stream1;
}

/* To delete a stored record. */
const deleteStudentData = (but) => {
    // Using 'data' attribute of HTML5 to get the id of the record we want to delete
    let id = but.getAttribute('data-id');

    // A confirm box to alert the user
    if (confirm('Are You Sure?')) {
        sessionStorage.removeItem(id);
    }

    // Reloading the webPage
    window.location.reload(true);
}


/* A funtion to show all the records present in the session Storage.
*   Called onload() of index.html- will all the record in session storage
*/
const showData = () =>{

    // Looping through the sessionStorage to show data in table
    for (let i = 0; i < sessionStorage.length; i++) {
        
        // To continue the loop when 'editId' is there coz thats not a record
        if(sessionStorage.key(i) == 'editId')   continue;

        let stu = sessionStorage.getItem(sessionStorage.key(i));
        let obj = JSON.parse(stu);

        let table = document.getElementById("dataTable");

        /* -1 argument will append in the table*/
        let row = table.insertRow(-1);

        let name = row.insertCell(0);
        let id = row.insertCell(1);
        let year = row.insertCell(2);
        let stream = row.insertCell(3);
        let stream1 = row.insertCell(4);
        let options = row.insertCell(5);

        /* Using 'data' attribute of HTML5 to store the Id of the record, this will make edit and delete operations easy */
        let eButton = `<button class='btn btn-success' onclick='editStudentData(this)' data-id=${sessionStorage.key(i)}><i class='fa fa-pencil' aria-hidden='true'></i> Edit</button>`;
        let dButton = `<button class='btn btn-danger' onclick='deleteStudentData(this)' data-id=${sessionStorage.key(i)}><i class='fa fa-trash' aria-hidden='true'></i> Delete</button>`;

        name.innerHTML = obj.name;
        id.innerHTML = sessionStorage.key(i);
        year.innerHTML = obj.year;
        stream.innerHTML = obj.stream;
        stream1.innerHTML = obj.stream1;
        /* USING TEMPLATE LITERALS */
        options.innerHTML = `${eButton} ${dButton}`;
    }
}

/* A function to delete all records. */
const deleteAllData = () => {
    // Clearing the sessionStorage
    sessionStorage.clear();

    // A confirm box to alert the user
    confirm('Wanna delete all the data?')
    window.location.reload(true)
}

/* The End.*/