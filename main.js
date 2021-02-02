// ** Data Types **//
const students = [

];

// ** DOM Printer  **//
const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToPrint;
};

// ** HTML Builders **//
const studentBuilder = (taco) => {
  let domString = ' ';

  for (const student of taco) {
    domString += `<div class="card m-2" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${student.name}</h5>
      <p class="card-text">${student.house}</p>
      <button type="button" class="btn btn-secondary" id="expel">Expel</button>
      </div> 
    </div>`;
  }
  printToDom('#studentDiv', domString)
}

//** Event Handlers **//

const newStudent = (e) => {
  e.preventDefault();

  const availableHouses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Huffelpuff']

  const housePicker = availableHouses[Math.floor(Math.random() * availableHouses.length)]

  // Target form values //
  const studentName = document.querySelector('#inputStudentName').value;

  // Store values in obj //
  const obj = {
    name: studentName,
    house: housePicker
  };

  // Update data // 
  students.push(obj);
  // Update DOM //
  studentBuilder(students);
  // Reset the form //
  document.querySelector('form').reset();
  // Event Listener for 'expel' button //
};

const handleButtonClick = (e) => {
  const buttonId = e.target.id;
  if (buttonId === 'starter') {
    let starterString = ' '
    starterString += `<h2 class="mb-3">Enter Student's Name:</h2>
    <form>
      <div class="row mb-3 text-center">
        <label for="inputStudentName" class="col-sm-2 col-form-label">Student:</label>
        <div class="col-sm-4">
          <input type="text" class="form-control" id="inputStudentName" style="width: 300px" required="true">
        </div>
        <button type="submit" class="btn btn-secondary col-sm-2">Submit</button>
        </form>
      </div>`;
     printToDom('#starterDiv', starterString);
     // ** Event Listener for New Student Form after 'Get Started Sorting' button is clicked. ** //
     document.querySelector('form').addEventListener('submit', newStudent); 
  }
};
const expelStudent = (e) => {
    const targetType = e.target.type;
    const targetId = e.target.id;

    if (targetType === 'button') {
    students.splice(targetId, 1)
    }
    studentBuilder(students)
}

// ** Event Listeners **//
const buttonEvents = () => {
  // Moved within handleButtonClick ** document.querySelector('form').addEventListener('submit', newStudent); //
  document.querySelector('#starter').addEventListener('click', handleButtonClick);
  document.querySelector('#studentDiv').addEventListener('click', expelStudent)
}


// ** Initializers **//
const init = () => {
  studentBuilder(students);
  buttonEvents();
}

init();
