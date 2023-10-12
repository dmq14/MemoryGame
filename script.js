const CARDS = [
    {
        id: 1,
        name: 'javascript',
        img: 'https://khoavang.vn/resources/cache/195x195x3/A-Khoi-Hinh-anh/IMG_3400-1695272268.jpg'
    },
    {
        id: 2,
        name: 'css3',
        img: 'https://khoavang.vn/resources/cache/195x195x3/data/banner_home/san-pham/msi-katana-15-rtx-4070/msi-katana-15-rtx-4070-ben-1696927588.jpg'
    },
    {
        id: 3,
        name: 'html5',
        img: 'https://khoavang.vn/resources/cache/195x195x3/Toan/Other/7b19a43069693d55940f5ba2e2b3c710-1689235893.png'
    },
    {
        id: 4,
        name: 'safari',
        img:
            'https://khoavang.vn/resources/cache/195x195x3/EDIFIER/Loa-Q35D/Loa-EDIFIER-Q35D---Khoa-Vang--1-1684645297.jpg'
    },
    {
        id: 5,
        name: 'rails',
        img: 'https://khoavang.vn/resources/cache/195x195x3/DuongPV/PC/May-rap/Case-Jonsbo-D31/Case-Jonsbo-D31---Khoa-Vang--1-1681888993.jpg'
    },
    {
        id: 6,
        name: 'node',
        img: 'https://khoavang.vn/resources/cache/195x195x3/A-Khoi-Hinh-anh/IMG_2608-1694326918.jpg'
    }

];
const cardContainer = document.querySelector('.card-container');
const available = document.querySelector('#available');
const modalTitle = document.querySelector('#modal-title');
const modal = document.querySelector('#modal');
const modalInfoUser = document.querySelector('#modalInfoUser');
const modalSuccess = document.querySelector('#modalSuccess');
let currentCards = [...CARDS, ...CARDS];
let isPaused = false;
let counter = CARDS.length -5;
let isLose = false;
let timer;
let seconds = 0;
let minutes = 0;

function startTimer() {
    if (!timer) {
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
function refresh(){
    stopTimer();
    minutes=0;
    seconds=0;
    updateTimer();
    counter=CARDS.length + 94;
}

window.onload = function () {
    updateTimer();
};

function shuffle(array) {
    let counter = array.length,
        temp,
        index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function win() {
    isPaused = true;
    stopTimer(); 
    const timeTaken = `${minutes}' ${seconds}s`;
    modalTitle.innerHTML = `You win! 🙌🥳\nTime taken: ${timeTaken}`;
    modal.classList.add('modal--open');
}

function lose() {
    isLose = true;
    modalTitle.innerHTML = 'You lose 😢😩';
    modal.classList.add('modal--open');
    refresh();
}
function handleClick(e) {
    const { target } = e;
    if (
        !isPaused &&
        !isLose &&
        !target.classList.contains('card--guessed') &&
        !target.classList.contains('card--picked') 
    ) {
        startTimer()
        isPaused = true;
        const picked = cardContainer.querySelector('.card--picked');
        if (picked) {
            if (picked.dataset.id === target.dataset.id) {
                target.classList.remove('card--picked');
                picked.classList.remove('card--picked');
                target.classList.add('card--guessed');
                picked.classList.add('card--guessed');
                isPaused = false;
            } else {
                target.classList.add('card--picked');
                setTimeout(() => {
                    target.classList.remove('card--picked');
                    picked.classList.remove('card--picked');
                    isPaused = false;
                }, 1500);
            }
            console.log('counter', counter);
            counter -= 1;
            available.innerHTML = counter;
            if (counter === 0) {
                lose();
            }
        } else {
            target.classList.add('card--picked');
            isPaused = false;
        }

        // Validate is already win
        const isWin = cardContainer.querySelectorAll('.card--guessed').length === currentCards.length;
        if (isWin) {
            win();

        }
    }
}

function drawCards() {
    cardContainer.innerHTML = '';
    available.innerHTML = counter;

    shuffle(currentCards).forEach((el) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', el.id);
        card.innerHTML = `
          <div class="card__front">
            <img
              class="front__img"
              src="${el.img}"
              alt="${el.name}"
            />
            <h6 class="card__name">${el.name}</h6>
          </div>
          <div class="card__back">
            <img
              class="back__img"
              src="https://dev.khoavang.vn/resources/uploads/black-friday/logo1-1697097986.png"
              alt="Thought"
            />
          </div>
        `;
        card.addEventListener('click', handleClick);
        cardContainer.appendChild(card);
    });
}

// document.querySelector('#play-again').addEventListener('click', function () {
//     modal.classList.remove('modal--open');
//     isPaused = false;
//     isLose = false;
//     counter = CARDS.length + 10;
//     drawCards();
// });
document.querySelector('#play-again').addEventListener('click', function () {
    modal.classList.remove('modal--open');
    isPaused = false;
    isLose = false;
    counter = CARDS.length + 10;
    drawCards();
});
document.querySelector('#take-gift').addEventListener('click', function () {
    modal.classList.remove('modal--open');
    modalInfoUser.classList.add('modal--open');
    isPaused = false;
    isLose = false;
    refresh();
    drawCards();
});
document.querySelector('#btn-close').addEventListener('click',function (){
    modalInfoUser.classList.remove('modal--open');
    isPaused = false;
    isLose = false;
    refresh(); 
    drawCards();
})
$("#dataForm").submit(function(e) {
    e.preventDefault(); // ngăn chặn việc tải lại trang

    // Get values from the input fields
    var name = $("#name").val();
    var phone = $("#phone").val();

    // Perform data processing here (e.g., send data to server, etc.)
    modal.classList.remove('modal--open');
    modalSuccess.classList.add('modal--open');
  });

drawCards();


