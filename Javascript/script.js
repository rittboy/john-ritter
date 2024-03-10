// const body = document.querySelector('body');
// const modeToggle = document.getElementById('mode-toggle');
// const modeStatus = document.querySelector('.mode-status');

// function toggleMode() {
//     body.classList.toggle('dark-mode');

//     const modeMessage = body.classList.contains('dark-mode') ? 'Dark Mode' : "Light Mode"

//     modeStatus.innerText = "Currently in " + modeMessage;
// }
//modeToggle.addEventListener('click', toggleMode);
//Image Slideshow Code
const images = document.querySelectorAll('#slide img');
const prevImage = document.getElementById('prev');
const nextImage = document.getElementById('next');

let curIndex = 0;

function reset() {
    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove('active');
    }
}

function initSlider() {
    reset();
    images[curIndex].classList.add('active');
}

function prevSlide() {
    reset();
    currentIndex--;
    if (curIndex < 0) {
        curIndex = images.length - 1;
    }

    images[curIndex].classList.add('active');
}

function nextSlide() {
    reset();
    curIndex++;
    if (curIndex >= images.length) {
        curIndex = 0;
    }

    images[curIndex].classList.add('active');
}

initSlider();

prevImage.addEventListener('click', function () {
    prevSlide();
});

nextImage.addEventListener('click', function () {
    nextSlide();
})

//ToDo List code
// DOM Elements and Global Variables
const addTaskBtn = document.getElementById('add-task');
const input = document.querySelector('input');
const taskList = document.querySelector('#task-list');

let taskId = 0;
let randomImgId = 1;

// Add a new task to the list
const addTask = (task) => {
  const taskItem = document.createElement('div');
  taskItem.classList.add('form-check', 'd-flex', 'align-items-center', 'gap-3');
  taskItem.innerHTML = `
    <input class="task-check" type="checkbox" id="task-${taskId}">
    <label class="task-check-label" for="task-${taskId}">${task}</label>
    <button type="button" class="btn-close" aria-label="Close" data-task-id="${taskId}"></button>
  `;
  taskList.appendChild(taskItem);
  taskId++;
}

// Remove a task from the list
const removeTask = (taskId) => {
  const taskItem = document.querySelector(`#task-${taskId}`).parentNode;
  taskList.removeChild(taskItem);
}

// Handle Add Task button click
addTaskBtn.addEventListener('click', () => {
  const task = input.value.trim();
  const taskWithImg = `<img class="me-3" src="https://picsum.photos/50/50?random=${randomImgId}"> <span>${task}</span>`;


  if (task !== '') {
    addTask(taskWithImg);
    input.value = '';
    randomImgId++;
  }
});

taskList.addEventListener('click', (e) => {
  const target = e.target;
  if (target.matches('.task-check')) {
    const label = target.parentNode.querySelector('label');
    if (target.checked) {
      label.classList.add('text-decoration-line-through');
    } else {
      label.classList.remove('text-decoration-line-through');
    }
  } else if (target.matches('.btn-close')) {
    const taskId = target.getAttribute('data-task-id');
    removeTask(taskId);
  }
});
//Form Validation Script
const form = document.getElementById('contact-form');
const submitButton = document.querySelector('.submit')
const successMessage = document.getElementById('form-submitted-msg')

// Store all form elements in an array by spreading the elements property of the form
const formElements = [ ...form.elements ]

// Create function to check if all form elements are valid
const allInputsValid = () => {
  const valid = formElements.every((element) => {
    if (element.nodeName === 'SELECT') {
      return element.value !== 'Please select an option'
    } else {
      return element.checkValidity()
    }
  })
//  console.log(valid);

  return valid
}

// Define a function to handle changes to any form element
const handleChange = () => {
  // console.log("handle change");
  // Use the forEach() function to execute the provided function once for each element in the formElements array
  formElements.forEach((element) => {
    // If the element is invalid and is not a button, a select dropdown, a checkbox, or a radio button, style it with a red border and red text
    if (!element.checkValidity()
          && element.nodeName !== 'BUTTON'
          && element.nodeName !== 'SELECT'  
          && element.type !== 'checkbox'
          && element.type !== 'radio'
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
      element.nextElementSibling.style.display = 'block'
      element.previousElementSibling.style.color = 'red'
    }

    // If the element is valid, reset its style to the original colors
    // The conditions are the same as above for excluding certain elements
    if (element.checkValidity()
          && element.nodeName !== 'BUTTON'
          && element.nodeName !== 'SELECT'
          && element.type !== 'checkbox'
          && element.type !== 'radio'
    ) {
      element.style.borderColor = '#CED4DA'
      element.nextElementSibling.style.color = '#CED4DA'
      element.nextElementSibling.style.display = 'none'
      element.previousElementSibling.style.color = '#212529'
    }

    // If the element is a checkbox or a radio button and is invalid, style it with a red border and red text
    if (!element.checkValidity()
          && (element.type === 'checkbox'
              || element.type === 'radio')
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
    }

    // If the checkbox or radio button is valid, reset its style to the original colors
    if (element.checkValidity()
          && (element.type === 'checkbox'
              || element.type === 'radio')
    ) {
      element.style.borderColor = '#CED4DA'
      element.nextElementSibling.style.color = '#212529'
    }

    // If the element is a select dropdown and the default option is selected, style it with a red border and red text
    if (element.nodeName === 'SELECT'
          && element.value === 'Please select an option'
    ) {
      element.style.borderColor = 'red';
      // element.nextElementSibling.style.color = 'red';
      // element.nextElementSibling.style.display = 'block';
      element.previousElementSibling.style.color = 'red';
    }

    // If an option other than the default is selected in the dropdown, reset its style to the original colors
    if (element.nodeName === 'SELECT'
          && element.value !== 'Please select an option'
    ) {
      element.style.borderColor = '#CED4DA';
      // element.nextElementSibling.style.color = '#CED4DA';
      // element.nextElementSibling.style.display = 'none';
      element.previousElementSibling.style.color = '#212529';
    }
  })

  // If all form elements are valid, enable the submit button; otherwise, disable it
  if (allInputsValid()) {
    submitButton.removeAttribute('disabled', '')
  } else {
    submitButton.setAttribute('disabled', '')
  }
}

// Define a function to handle form submission
const handleSubmit = (e) => {
  // Prevent the default form submission behavior
  e.preventDefault()
  // console.log("handle Submit");

  // If all form elements are valid after the form submission, display a success message, reset the form, and disable the submit button
  if (allInputsValid()) {
    successMessage.style.display = 'block'
    form.reset()
    submitButton.setAttribute('disabled', '')

    // Hide the success message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = 'none'
    }, 3000)
  }
}

// Add event listener to each form element
formElements.forEach((element) => {
  element.addEventListener('change', handleChange)
})

// Add submit listener to the form
form.addEventListener('submit', (e) => handleSubmit(e))


// /*Time and Date Display logic */
// setInterval(currentTime, 1000);

// function currentTime(){
//   let time = new Date();
//   let dayName = time.getDay();
//   let month = time.getMonth();
//   let year = time.getFullYear();
//   let date = time.getDate();
//   let hour = time.getHours();
//   let min = time.getMinutes();
//   let sec = time.getSeconds();
  
//   var am_pm = "AM";
//   if(hour == 12){
//     am_pm = "PM";
//   }
//   if(hour > 12){
//     hour -= 12;
//     am_pm = "PM";
//   }
//   if(hour == 0){
//     hour = 12;
//     am_pm = "AM";
//   }
//   hour = hour < 10 ? "0" + hour : hour;
//   min = min < 10 ? "0" + min : min;
//   sec = sec < 10 ? "0" + sec : sec;

//   let currentTime = hour + ":" + min + ":" + sec + " " + am_pm;
//   var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//   var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   var presentDay = week[dayName]+ ", " + months[month] + " " + date + ", " + year;
//   const clock = document.getElementById("time");
//   const dayIntro = document.getElementById("dayName");

//   clock.innerHTML = currentTime;
//   dayIntro.innerHTML = presentDay;
// }
// currentTime();