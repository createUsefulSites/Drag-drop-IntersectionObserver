"use strict"

// 1
document.getElementById('contents').addEventListener('click', function(event) {
    let link = event.target.closest('a');
    if (link) {
        let confirmation = confirm('Вы уверены, что хотите покинуть страницу?');
        if (!confirmation)
            event.preventDefault();
    }
});


//2
const active = document.querySelector('.active');
const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('click', () => {
        active.style.background = window.getComputedStyle(item).background;
    })
});



// 3
const list = document.getElementById('list');
list.addEventListener('mousedown', event => {
    event.preventDefault();
});

const listItems = document.querySelectorAll('#list li');

function select(event) {
    if (!(event.ctrlKey || event.metaKey))
        listItems.forEach(item => item.classList.remove('selected'));
    event.target.classList.add('selected');
}

listItems.forEach(item => {
    item.addEventListener('click', select);
});

document.addEventListener('click', event => {
    if (!event.target.closest('#list'))
         listItems.forEach(item => item.classList.remove('selected'));
});



// 4
const slider = document.querySelector('.slider');
const hand = document.querySelector('.slider-hand');

let isDragging = false;
hand.addEventListener('mousedown', () => {
    isDragging = true;
    hand.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    hand.style.cursor = 'grab';
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) 
        return;

    const sliderRect = slider.getBoundingClientRect();
    let leftPosition = event.clientX - sliderRect.left;

    if (leftPosition < 0)
        leftPosition = 0;
    else if (leftPosition > sliderRect.width)
        leftPosition = sliderRect.width;

    hand.style.left = `${leftPosition}px`;
});



// 5
const basket = document.querySelector('.basket');
const total = document.querySelector('.total');

function drag(event) {
    event.target.classList.add('dragged');
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let draggedElement = document.querySelector('.dragged');

    basket.appendChild(draggedElement);
    let totalPrice = calculateTotalPrice();
    total.innerHTML = 'Итого: P' + totalPrice;
}

function calculateTotalPrice() {
    const products = basket.querySelectorAll('.products');
    let totalPrice = 0;
    for (let i = 0; i < products.length; ++i) {
        let itemText = products[i].innerText;
        let price = parseInt(itemText.split('P')[1]);
        totalPrice += price;
    }
    return totalPrice;
}

const anim = document.querySelectorAll('.anim')

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("anim");
      observer.unobserve(entry.target);
    }
  })
}

const options = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0.5,
}

const observer = new IntersectionObserver(callback, options)

anim.forEach((image) => observer.observe(image))
