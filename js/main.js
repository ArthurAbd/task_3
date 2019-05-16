'use strict'

let timer;
let min = 0;
let sec = 0;
let ms = 0;
const btn = document.getElementById('btn');

// создаем функцию таймер 
function goTime () {    
    timer = setInterval(function time() {
        ms = ms + 1;
        if(ms > 9) {
            ms = 0;
            sec++;
            if(sec > 59) {
                sec = 0;
                min++;
            } 
        }
        
        document.getElementById('time').innerText = (`${min}.${sec}.${ms}`);
    }, 100);
};


btn.addEventListener('click', function() {
    // при клике по кнопке старт обнуляем таймер и поле
    min = 0;
    sec = 0;
    ms = 0;
    document.getElementById('field').innerHTML = " ";

    // задаем переменную с номерами цветов
    let colorsCode = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    goTime (); // запускаем таймер 
        
    function randomColorsCode(a, b) { // перемешиваем номера цветов
        return Math.random() - 0.5;
    }
    colorsCode.sort(randomColorsCode);

    {for(let j = 0; j < 16; j++) {
        document.getElementById('field').innerHTML += `<a color="${colorsCode[j]}" class="color${colorsCode[j]}  hidden">&nbsp;</a>`;
        // закидываем по порядку клеточки с атрибутом color и классом соответствующего цвета
    }};
});

let check = false; // индикатор открытой клетки
let color = 0; // номер цета
let elPrev; // предыдущая клетка
let open = 0; // количество открытых пар клеток
    
document.addEventListener('click', function(e) {
    if(e.target.classList.contains('hidden')) { // считываем клик если только клетка закрыта
        let el = e.target; // записываем выбраную клетку
        el.classlist = el.classList.remove('hidden'); // и открываем ее
    
        setTimeout(function() { 
            // устанавливаем таймер для задержки отображения открытой клетки
            if(check) { // эта часть исполняется при открытой клетке, изначально false
                check = false;
                if(el.getAttribute('color') == color) { //сравниваем цвета настоящий и предыдущий
                    open++; // считаем количество открытых пар
                    if(open == 8) { 
                        // если пар 8, игра закончилась, таймер остановился, выходит сообщение
                        clearTimeout(timer);
                        alert(`Вы выйграли \nЗатраченное время: ${min}.${sec}.${ms}`);
                        
                    }
                }
                else { // если нет, предыдущий и настоящий элемент скрываются
                    elPrev.classList.add('hidden');
                    el.classList.add('hidden');
                }
            }
            else {
                color = el.getAttribute('color'); // запоминаем цвет 
                elPrev = el; // запоминаем настоящий элемент
                check = true; // запоминаем что клетка открыта
            }
        }, 500); // время задержки функции
    }
});