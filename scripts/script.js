const product = {
    crazy: {
        name: 'Crazy',
        img: 'img/crazy.png',
        price: 31000,
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        img: 'img/light.png',
        price: 26000,
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        img: 'img/cheeseBurger.png',
        price: 29000,
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        img: 'img/dBurger.png',
        price: 24000,
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

let productBtns = document.querySelectorAll('.card__item_btn'),
    basketBtn = document.querySelector('.basket'),
    productMenu = document.querySelector('.basket__inner '),
    closeBasket = document.querySelector('.close'),
    menuList = document.querySelector('.basket__list'),
    totalPriceMenu = document.querySelector('.basket__down_price'),
    productCount = document.querySelector('.basket__span');
menuList.innerHTML = ''
    
    
let body = document.querySelector('.body');  
let wrapper =document.querySelector('.wrapper'),
    allcards =document.querySelector('.allcards');

basketBtn.addEventListener('click', () => {
    productMenu.classList.toggle('active')
})

closeBasket,allcards.addEventListener('click', () => {
    productMenu.classList.remove('active')
})
wrapper.addEventListener('click', () => {
    productMenu.classList.remove('active')
})

// allcards.addEventListener('click', () => {
//     productMenu.classList.remove('active')
// })


productBtns.forEach((item) => {
    item.addEventListener('click', function () {
        plusOrMinus(this)
    })
})


function plusOrMinus(btn) {

    let parent = btn.closest('.card'),
        parentId = parent.getAttribute('id');

    product[parentId].amount++;

    basket()
}

function basket() {

    let productArray = []
    let totalCount = 0;
    menuList.innerHTML = ''
    for (const key in product) {

        const pk = product[key]

        const productCard = document.querySelector(`#${pk.name.toLowerCase()}`),
            productIndicator = productCard.querySelector('.card__span');

        if (pk.amount) {
            productArray.push(pk)
            productIndicator.classList.add('active')
            productCount.classList.add('active')
            productIndicator.innerHTML = pk.amount
            totalCount += pk.amount
            // totalCount = totalCount + pk.amount
        } else {
            productIndicator.classList.remove('active')
            productIndicator.innerHTML = 0
        }
        productCount.innerHTML = totalCount

    }

    for (let i = 0; i < productArray.length; i++) {

        menuList.innerHTML += menuItemBurger(productArray[i])

    }
    totalPriceMenu.innerHTML = totalSumProduct()

}

function menuItemBurger(productItem) {

    const {
        name,
        img,
        amount,
        totalSum: price
    } = productItem

    return `
    <div class="basket__list">
    <div class="basket__list_item">
        <div class="basket__list_left">
            <img src="${img}" alt="crazy">
            <div class="basket__list_desc">
                <h4 class="basket__list_desc-title">${name}</h4>
                <p class="basket__list_desc-text">${price} сум</p>
            </div>
        </div>
        <div class="basket__btns" id="${name.toLowerCase()}__card"> 
            <button class="basket__btn minus" data-symbol="-">-</button>
            <output class="basket__count">${amount}</output>
            <button class="basket__btn plus" data-symbol="+">+</button>
        </div>
    </div>
</div>
    `
}

function totalSumProduct() {
    let totalPrice = 0;
    for (const key in product) {
        totalPrice += product[key].totalSum
    }
    return totalPrice
}

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('basket__btn')) {
        let attr = e.target.getAttribute('data-symbol')
        let parent = e.target.closest('.basket__btns')
        if (parent) {
            let idProduct = parent.getAttribute('id').split('__')[0]
            attr == '+' ? product[idProduct].amount++ : attr == '-' ? product[idProduct].
            amount--: ''
        }
        basket()
    }
})