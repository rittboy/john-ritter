// const body = document.querySelector('body');
// const modeToggle = document.getElementById('mode-toggle');
// const modeStatus = document.querySelector('.mode-status');

// function toggleMode(){
//   body.classList.toggle('dark-mode');

//   const modeMessage = body.classList.contains('dark-mode') ? 'Dark Mode' : "Light Mode"

//   modeStatus.innerText = "Currently in " + modeMessage;
// }

// modeToggle.addEventListener('click', toggleMode);

const images = document.querySelectorAll('#slider img');
const prevImage = document.getElementById('prev');
const nextImage = document.getElementById('next');

let curIndex = 0;

function reset(){
    for(let i = 0; i < images.length; i++){
        images[i].classList.remove('active');
    }
}

function initSlider(){
    reset();
    images[curIndex].classList.add('active');
}

function prevSlide(){
    reset();
    currentIndex--;
    if(curIndex < 0){
        curIndex = images.length - 1;
    }

    images[curIndex].classList.add('active');
}

function nextSlide(){
    reset();
    curIndex++;
    if(curIndex >= images.length){
        curIndex = 0;
    }

    images[curIndex].classList.add('active');
}

initSlider();

prevImage.addEventListener('click', function(){
    prevSlide();
});

nextImage.addEventListener('click', function(){
    nextSlide();
})

