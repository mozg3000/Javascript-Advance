const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];

const renderProduct = (title = "Нонейм", price = 0) => {

    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {

    let products_container = document.querySelector('.products');
    list.forEach(item => {

        products_container.innerHTML += renderProduct(item.title, item.price)
    });
};

document.querySelector('.products').innerHTML += renderProduct();
document.querySelector('.products').innerHTML += renderProduct("Девайс");
document.querySelector('.products').innerHTML += renderProduct("", 999);

renderPage(products);