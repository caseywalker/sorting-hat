// ** Data Types **//
const students = [];
const expelledStudents = [];

// Images for House Styling //
const gryffindorUrl = "https://m.media-amazon.com/images/I/71htSIb7LnL._AC_SX522_.jpg";
const slytherinUrl = "https://m.media-amazon.com/images/I/91oivAdrlwL._AC_UL1500_.jpg";
const ravenclawUrl = "https://images-na.ssl-images-amazon.com/images/I/71IgpxIE-cL._AC_SL1162_.jpg";
const huffelpuffUrl = "https://images-na.ssl-images-amazon.com/images/I/711ztwoNU2L._AC_SX522_.jpg";
const deathEaterUrl = "https://images-na.ssl-images-amazon.com/images/I/61j8BksetiL._SL1383_.jpg"


// ** DOM Printer  **//
const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToPrint;
};

// ** HTML Builders **//
const studentBuilder = (taco) => {
  let domString = ' ';

  for (const student of taco) {
    domString += `<div class="card m-2 ${student.house}" style="width: 18rem;">
    <img src=${student.logo} class="card-img-top mt-2" alt="${student.house} logo">
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
    <img src=${deathEaterUrl} class="card-img-top mt-2" alt="Death Eater logo">
    <div class="card-body">
      <h5 class="card-title">${wizard.name}</h5>
      <p class="card-text">${wizard.name} has become a Death Eater!</p>
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

  const logo = '';

  // Target form values //
  const name = document.querySelector('#inputStudentName').value;
  // Create array of unique IDs for students 
  const uniqueStudents = students.map(wizard => wizard.id).sort(function(a, b) {
    return a - b;
  })

 // Unique ID assignment. Given uniqueId array for each student, increment by 1. 
  let id = 0;
  if (uniqueStudents.length >= 1) {
    id = (uniqueStudents.length) + 1;
  } else {
    id = 1;
  }
  // Store values in obj //
  const obj = {
    name,
    house,
    id,
    logo
  };

  // Setting the student object logo to image url variable by house //
  if (obj.house === 'Gryffindor') {
    obj.logo = gryffindorUrl
  } else if (obj.house === 'Slytherin') {
    obj.logo = slytherinUrl
  } else if (obj.house === 'Ravenclaw') {
    obj.logo = ravenclawUrl
  } else if (obj.house === 'Huffelpuff') {
    obj.logo = huffelpuffUrl
  }

  if (name.length === 0) {
    warningMessage();
  } else {
  // Update data // 
  students.push(obj);
  // sort the students by name 
  students.sort(function (a, b) {
    let nameA = a.name.toUpperCase()
    let nameB = b.name.toUpperCase()
    if (nameA > nameB) {
      return 1;
    } else if (nameA < nameB) {
      return -1;
    }
  });
  // Testing sorting by house. Use this later by adding Event Listeners for sorting buttons. 
  // students.sort(function (a, b) {
  //   let houseA = a.house.toUpperCase()
  //   let houseB = b.house.toUpperCase()
  //   if (houseA > houseB) {
  //     return 1;
  //   } else if (houseA < houseB) {
  //     return -1;
  //   }
  // });
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
