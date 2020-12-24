/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/***** FUNCTION TO CREATE & APPEND ELEMENTS, TO DISPLAY A PAGE OF NINE STUDENTS *****/

function showPage(list, page) {
  // Calculate the index for first and last student to display
  let startIndex = page * 9 - 9;
  let endIndex = page * 9;

  // Select the ul for the student list
  let studentList = document.querySelector('.student-list');
  // Set ul to an empty string to clear it
  studentList.innerHTML = '';

  // Set the variable used to construct/append DOM elements
  let studentItem = '';

  // Loop over the data
  for (let i = 0; i < list.length; i++) {
    let student = list[i];
    if (i >= startIndex && i < endIndex) {
      // Create the DOM elements
      studentItem = `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture">
           <h3>${student.name.first} ${student.name.last}</h3>
           <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">${student.registered.date}</span>
         </div>
       </li>`;

      // Insert the created elements to the page
      studentList.insertAdjacentHTML('beforeend', studentItem);
    }
  }
}

/***** FUNCTION TO CREATE & APPEND PAGINATION BUTTONS *****/

function addPagination(list) {
  // Variable to calculate the number of pages needed
  const numOfPages = Math.ceil(list.length / 9);

  // Select the ul for pagination buttons
  const linkList = document.querySelector('.link-list');
  // Clear the ul
  linkList.innerHTML = '';

  // Set variable used to construct/append DOM elements
  let button = '';
  // Loop over the number of pages needed to create the buttons
  for (let i = 1; i <= numOfPages; i++) {
    // Create button elements
    button = `<li>
    <button type="button">${[i]}</button>
  </li>
  `;

    // Insert the pagination buttons to the page
    linkList.insertAdjacentHTML('beforeend', button);
  }

  // Select Pagination Buttons
  const buttons = document.querySelectorAll('button');

  // Set the class of the first page button to "active"
  document.querySelector('.link-list button').className = 'active';

  // Add event listener to Add/Remove the 'active' class and update page
  linkList.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }
      const target = e.target;
      target.classList.add('active');
      showPage(list, target.textContent);
    }
  });
}
// Call the functions to create the page
showPage(data, 1);
addPagination(data);

/***** FUNCTION TO CREATE & INSERT SEARCH BAR ON PAGE *****/

// Select the header element
const header = document.querySelector('.header');

function searchBar() {
  // Create the search bar elements
  let searchForm = `<label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`;

  // Append the search bar to the page
  header.insertAdjacentHTML('beforeend', searchForm);
}
searchBar();

/***** FUNTION TO SEARCH/FILTER NAMES THROUGH THE SEARCH BAR *****/

// Select the search input and button
const filterInput = document.getElementById('search');
const searchButton = document.querySelector('header [type="button"]');

// Add event listeners
filterInput.addEventListener('keyup', searchNames);
searchButton.addEventListener('click', searchNames);

function searchNames() {
  // Get value of input from search
  const filterValue = filterInput.value.toLowerCase();
  // Filter the data
  const fullNames = data.filter(item => {
    const fullName = `${item.name.first} ${item.name.last}`;
    return fullName.toLowerCase().includes(filterValue);
  });

  if (fullNames.length === 0) {
    noResults();
  } else {
    showPage(fullNames, 1);
    addPagination(fullNames);
  }
}
searchNames();

/***** FUNCTION TO HANDLE NO MATCHES IN SEARCH *****/

function noResults() {
  // Get students ul and remove students if no match found
  const ul = document.querySelector('.student-list');
  ul.innerHTML = '';

  // Create no results message
  const text = `No Name Found`;
  let noNamesFound = `<li>${text}</li>`;

  // Get pagination ul and remove buttons if no match found
  const linkUL = document.querySelector('.link-list');
  linkUL.innerHTML = '';

  // Insert message to page
  ul.insertAdjacentHTML('beforeend', noNamesFound);
}
