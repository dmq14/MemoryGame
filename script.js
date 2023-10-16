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
const availableMobile = document.querySelector('#available-mobile');
const modalTitle = document.querySelector('#modal-title');
const modal = document.querySelector('#modal');
const modalInfoUser = document.querySelector('#modalInfoUser');
const modalSuccess = document.querySelector('#modalSuccess');
const takeGift = document.querySelector('#take-gift');

let currentCards = [...CARDS, ...CARDS];
let isPaused = false;
let counter = CARDS.length +24;
let isLose = false;
let timer;
let seconds = 1;
let minutes = 3;
let secondsDone;
let minutesDone;


function startTimer() {
    
    if (!timer) {
        setTimeout(1000)
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
    if (minutes > 0 || seconds > 0) {
        if (seconds === 0) {
            seconds = 59;
            minutes--;
        } else {
            seconds--;
        }
        if (minutes === 0 & seconds === 0){
            lose();
        }
        const timerDisplay = document.getElementById("timer");
        const timerDisplayMobile = document.getElementById("timer-mobile");
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerDisplayMobile.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}
function refresh(){
    stopTimer();
    minutes=3;
    seconds=1;
    updateTimer();
    counter=CARDS.length + 24;
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
    let p = 2 - minutes;
    let s = 60 - seconds;
    minutesDone = p;
    secondsDone = s;
    const timeTaken = `${p}phút ${s}giây`;
    modalTitle.innerHTML = `Bạn đã chiến thắng! 🙌🥳</br>Thời gian: </br>${timeTaken}`;
    modal.classList.add('modal--open');
}

function lose() {
    isLose = true;
    modalTitle.innerHTML = 'Thất bại!!! 😢😩';
    takeGift.remove();
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
        notification.innerHTML = `        <div
        class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
      >
        <button
          type="button"
          class="close font__size-18"
          data-dismiss="alert"
        >
          <span aria-hidden="true"
            ><a>
              <i class="fa fa-times greencross"></i> </a
          ></span>
          <span class="sr-only">Close</span>
        </button>
        <i class="start-icon far fa-check-circle faa-tada animated"></i>
        <strong class="font__weight-semibold">Thời gian bắt đầu!</strong> </br> Bạn có 3 phút để hoàn thành!
      </div>
    </div>`;
    setTimeout(() => {
        notification.style.opacity = 0;
        notification.classList.add('hidden');
    }, 3000);
    notificationMobile.innerHTML = `        <div
    class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
  >
    <button
      type="button"
      class="close font__size-18"
      data-dismiss="alert"
    >
      <span aria-hidden="true"
        ><a>
          <i class="fa fa-times greencross"></i> </a
      ></span>
      <span class="sr-only">Close</span>
    </button>
    <i class="start-icon far fa-check-circle faa-tada animated"></i>
    <strong class="font__weight-semibold">Thời gian bắt đầu!</strong> </br> Bạn có 3 phút để hoàn thành!
  </div>
</div>`;
setTimeout(() => {
    notificationMobile.style.opacity = 0;
    notificationMobile.classList.add('hidden');
}, 3000);
        console.log();
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
            availableMobile.innerHTML=counter;
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
    availableMobile.innerHTML=counter;
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
    counter = CARDS.length + 24;
    refresh();
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
document.querySelector('#btn-close-user-info').addEventListener('click',function (){
    modalInfoUser.classList.remove('modal--open');
    isPaused = false;
    isLose = false;
    refresh(); 
    drawCards();
})
document.querySelector('#btn-close-succsess-modal').addEventListener('click',function (){
    modalSuccess.classList.remove('modal--open');
    modalInfoUser.classList.remove('modal--open');
    isPaused = false;
    isLose = false;
    refresh();
    isPaused=true;
    drawCards();
})
function checkTime(){
    var CodeWin={
        'code':'',
        'description':''
    }
    console.log(minutesDone);
    console.log(secondsDone);
    if(minutesDone==0&&secondsDone<=30){
        
         CodeWin.code='SALE-KL12'
         CodeWin.description='Mã giảm giá 300K'
    }else if((minutesDone == 0 && secondsDone<= 59 && secondsDone >30) ){
        CodeWin.code= 'SALE-GH78';
        CodeWin.description='Mã giảm giá 200K'
    }else{
        CodeWin.code= 'SALE-CD34';
        CodeWin.description='Mã giảm giá 100K'
    }
    return CodeWin;
}
$("#dataForm").submit(function(e) {
    e.preventDefault(); // ngăn chặn việc tải lại trang
    var CodeWin=checkTime(minutes,seconds);
    checkTime(minutes,seconds)
    success.innerHTML = `Bạn đã trúng : ${CodeWin.description} </br> Đây là mã của bạn: `;
    coupon.innerHTML = `${CodeWin.code}`;
    modal.classList.remove('modal--open');
    modalSuccess.classList.add('modal--open');
  });
drawCards();

//Xét chiều cao cho 2 content-left và right bằng nhau
window.addEventListener("load", function () {
    // Lấy chiều cao của content-left
    const contentLeft = document.querySelector(".content-left");
    const contentLeftHeight = contentLeft.offsetHeight;
  
    // Gán chiều cao của content-left cho content-right
    const contentRight = document.querySelector(".content-right");
    contentRight.style.height = contentLeftHeight + "px";
  });


  const content = document.querySelector('.contentPost');
const readMoreButton = document.querySelector('#btn-viewMore');

readMoreButton.addEventListener('click', function () {
  if (content.style.maxHeight === '400px') {
    content.style.maxHeight = '700px';
    content.style.overflow = 'auto';
    readMoreButton.textContent = 'Thu gọn';
  } else {
    content.style.maxHeight = '400px';
    content.style.overflow = 'hidden';
    readMoreButton.textContent = 'Xem thêm';
  }
});

$(document).ready(function () {
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
  });