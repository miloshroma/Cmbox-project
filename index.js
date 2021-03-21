const slides = document.querySelectorAll('.slider__item');
const dots = document.querySelectorAll('.dot');
const inputs = document.querySelectorAll('input');
const form = document.querySelector('.form');
const error = document.querySelector('.error');
const regex = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
const tegNum = /[0-9]/;
const regPas = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{6,}/g;

const phone = document.querySelector('#user-phone');
const password = document.querySelector('#user-password');

let currentItem = 0;
let isEnabled = true;

const changeCurrentItem = (n) => {
    currentItem = (n + slides.length) % slides.length;
}

const hideItem = (direction) => {
    isEnabled = false;
    slides[currentItem].classList.add(direction);
    slides[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active',direction)
    })
    dots[currentItem].classList.remove('active');
}

const showItem = (direction) => {
    slides[currentItem].classList.add('next',direction);
    slides[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next',direction);
        this.classList.add('active');
        isEnabled = true;
    })
    dots[currentItem].classList.add('active');
}

const previousItem = (n) => {
    hideItem('to-right');
    changeCurrentItem(n-1);
    showItem('from-left');
}

const nextItem = (n) => {
    hideItem('to-left');
    changeCurrentItem(n+1);
    showItem('from-right');
}

document.getElementById('prev').addEventListener('click', () => {
    if (isEnabled) {
        previousItem(currentItem);
    }
})

document.getElementById('next').addEventListener('click', () => {
    if (isEnabled) {
        nextItem(currentItem);
    }
})

dots.forEach((item,i) => {
    item.addEventListener('click', function() {
       if(i>currentItem) {
            hideItem('to-left');
            changeCurrentItem(i);
            showItem('from-right');
       } else {
            hideItem('to-right');
            changeCurrentItem(i);
            showItem('from-left');
       }
    })
})

Array.from(inputs).forEach(item => {
    item.addEventListener('keyup', function(){
        if(this.value) {
            this.classList.add('not-empty')
        }
        else {
            this.classList.remove('not-empty')
        }
    })
})

document.querySelector('#textarea-field').addEventListener('keyup', function() {
    if(this.value) {
        this.classList.add('not-empty')
    }
    else {
        this.classList.remove('not-empty')
    }
});

form.addEventListener('submit', function(event) {
    validateEmail();
    validatePhone();
    validPassword();
    event.preventDefault();
});

function validatePattern(email) {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}


function validateEmail() {
    let email = document.querySelector('#user-email').value;
    if (!validatePattern(email)) {
        error.classList.add('view-error');
        document.querySelector('#user-email').classList.add('invalid-email');
        error.innerHTML = "Введите вверный email";
    }
    else {
        error.classList.remove('view-error');
        document.querySelector('#user-email').classList.remove('invalid-email');
    }
}

document.querySelector('#user-email').addEventListener('blur', function(event) {
    event.preventDefault();
    validateEmail();
});

const validatePhone = () => {
    if(!regex.test(phone.value) || !tegNum.test(phone.value)) {
        document.querySelector("#user-phone ~ span").classList.add('view-error');
        phone.classList.add('invalid-email');
        document.querySelector("#user-phone ~ span").innerHTML = "Введите вверный номер телефона (+375...)";
    }
    else{
        document.querySelector("#user-phone ~ span").classList.remove('view-error');
        phone.classList.remove('invalid-email');
    }
}

phone.addEventListener('blur', function() {
    validatePhone();
});

phone.addEventListener('input', function() {
    this.value = this.value.replace(/[^\\+\d]/g,'');
})

const validPassword = () => {
    if(!regPas.test(password.value)) {
        document.querySelector("#user-password ~ span").classList.add('view-error');
        password.classList.add('invalid-email');
        document.querySelector("#user-password ~ span").innerHTML = "Цифра, a-A , больше 6 символов";
    }
    else{
        document.querySelector("#user-password ~ span").classList.remove('view-error');
        password.classList.remove('invalid-email');
    }
}

document.querySelector('#user-password').addEventListener('blur', function() {
    validPassword();
});


ymaps.ready(init);
    function init(){
        let myMap = new ymaps.Map("map", {
            center: [53.838528, 27.471479],
            zoom: 17,
            controls: ['routePanelControl']
        });

       let control = myMap.controls.get('routePanelControl');


       document.querySelector('#from1to2').addEventListener('click', () => {
        control.routePanel.state.set({
        
            from:  [53.837752, 27.471155],
            
             to: [53.838092, 27.476617],
  
             type: "pedestrian", 
         });
       });

       document.querySelector('#from2to3').addEventListener('click', () => {
        control.routePanel.state.set({
        
            from:  [53.838092, 27.476617],
            
             to: [53.839649, 27.477021],
  
             type: "pedestrian",
         });
       });

       document.querySelector('#from3to1').addEventListener('click', () => {
        control.routePanel.state.set({
        
            from:  [53.839649, 27.477021],
            
             to: [53.837752, 27.471155],
  
             type: "pedestrian", 
         });
       })

        const myPlacemark1 = new ymaps.Placemark(
            [53.837752, 27.471155],
            {
                balloonContentHeader:'Точка 1',
                hintContent:'Точка 1',
            }
        );
        const myPlacemark2 = new ymaps.Placemark(
            [53.838092, 27.476617],
            {
                balloonContentHeader:'Точка 2',
                hintContent:'Точка 2',
            }
        );
        const myPlacemark3 = new ymaps.Placemark(
            [53.839649, 27.477021],
            {
                balloonContentHeader:'Точка 3',
                hintContent:'Точка 3',
            }
        );
        myMap.geoObjects.add(myPlacemark1).add(myPlacemark2).add(myPlacemark3);
    }
