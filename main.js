// ** Data Types **//
const students = [];
const expelledStudents = [];

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
      <button type="button" class="btn btn-secondary" id="${student.id}">Expel</button>
      </div> 
    </div>`;
  };
  printToDom('#studentDiv', domString)
}

const voldemortBuilder = (taco) => {
  let domString = ''
  let voldemortIntro = `<h2>Voldemort's Army!</h2>`

  for (const wizard of taco) {
    domString += `<div class="card m-2" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${wizard.name}</h5>
      <p class="card-text">Gryffindor</p>
      <button type="submit" class="btn btn-secondary">Expel</button>
    </div>  
  </div>`
  }
  printToDom('#voldemortIntro', voldemortIntro)
  printToDom('#voldemortArmy', domString)
}

const warningMessage = () => {
  messageString = '<h3>Please type in a name</h3>'
  printToDom('#warningMessage', messageString)
};
//** Event Handlers **//

const newStudent = (e) => {
  e.preventDefault();

  const availableHouses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Huffelpuff']

  const house = availableHouses[Math.floor(Math.random() * availableHouses.length)]

  // Target form values //
  const name = document.querySelector('#inputStudentName').value;
  // Create unique ID for students 
  const studentIds = students.map(student => student.id).sort((a,b) => a - b);

  const id = studentIds.length ? studentIds[(studentIds.length - 1)] + 1 : 1;
  // Store values in obj //
  const obj = {
    name,
    house,
    id
  };
  if (name.length === 0) {
    warningMessage();
  } else {
  // Update data // 
  students.push(obj);
  // Update DOM //
  studentBuilder(students);
  };
  // Reset the form //
  document.querySelector('form').reset();
  // Updating DOM with header for Student Section //
  let houseIntro = `<h2>Hoggish Roggish Students</h2>`
  printToDom('#houseIntro', houseIntro)
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
          <input type="text" class="form-control" id="inputStudentName" style="width: 300px">
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
    const targetId = Number(e.target.id);
    if (targetType === 'button') {
    const studentIndex = students.findIndex(student => student.id === targetId);
    let expelled = students.splice(studentIndex, 1);
    expelledStudents.push(...expelled)
    }
    studentBuilder(students);
    voldemortBuilder(expelledStudents);
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
