// Get references to the HTML elements
let srNo = document.getElementById('sr-no'); // Serial number input field
let studName = document.getElementById('name'); // Student name input field
let studFaculty = document.getElementById('faculty'); // Faculty input field
let studRollNo = document.getElementById('rollNO'); // Roll number input field
let addBtn = document.getElementById('add-btn'); // Add button
let tBody = document.getElementById('table-body'); // Table body where student rows will be added

// Function to load existing students from localStorage and display them in the table
function loadStudents() {
    // Retrieve students data from localStorage or initialize an empty array if no data is found
    const students = JSON.parse(localStorage.getItem('students')) || [];
    
    // Iterate through each student object and create a table row for each one
    students.forEach(s => {
        const student = createStudent(s.num, s.name, s.faculty, s.rollNo);
        tBody.appendChild(student); // Append the newly created row to the table body
    });
}

// Function to save the current list of students to localStorage
function saveStudent() {
    const students = [];
    
    // Collect data from each table row and push it to the students array
    tBody.querySelectorAll('tr').forEach(tr => {
        const num = tr.querySelector('td:nth-of-type(1)').textContent; // Serial number
        const name = tr.querySelector('td:nth-of-type(2)').textContent; // Student name
        const faculty = tr.querySelector('td:nth-of-type(3)').textContent; // Faculty
        const rollNo = tr.querySelector('td:nth-of-type(4)').textContent; // Roll number
        students.push({ num, name, faculty, rollNo }); // Add the student object to the array
    });
    
    // Save the students array to localStorage
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to create a table row for a student
function createStudent(srNum, name, faculty, rollNo) {
    const tr = document.createElement('tr'); // Create a new table row

    // Create and append table cells with student data
    const td1 = document.createElement('td');
    td1.textContent = srNum; // Set serial number
    const td2 = document.createElement('td');
    td2.textContent = name; // Set student name
    const td3 = document.createElement('td');
    td3.textContent = faculty; // Set faculty
    const td4 = document.createElement('td');
    td4.textContent = rollNo; // Set roll number

    const editBtn = document.createElement('button');
    editBtn.id = 'edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
         srNo.value = tr.querySelector('td:nth-of-type(1)').textContent;
         studName.value = tr.querySelector('td:nth-of-type(2)').textContent;
         studFaculty.value = tr.querySelector('td:nth-of-type(3)').textContent;
         studRollNo.value = tr.querySelector('td:nth-of-type(4)').textContent;

         tBody.removeChild(tr);
    })

    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        tBody.removeChild(tr);
        saveStudent();
    })

    // Append cells to the table row
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    return tr; // Return the completed table row
}

// Add event listener to the 'Add' button
addBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Retrieve input values and trim any extra whitespace
    const srNum = srNo.value.trim();
    const name = studName.value.trim();
    const faculty = studFaculty.value.trim();
    const rollNo = studRollNo.value.trim();
    
    // Create a new student row and append it to the table body
    const student = createStudent(srNum, name, faculty, rollNo);
    tBody.appendChild(student);
    
    // Clear input fields
    srNo.value = '';
    studName.value = '';
    studFaculty.value = '';
    studRollNo.value = '';

    // Save the updated student list to localStorage
    saveStudent();
});

// Load existing students when the page is loaded
loadStudents();
