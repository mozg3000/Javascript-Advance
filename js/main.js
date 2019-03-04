

class Cart{

    constructor(container, products = []){

        this.container = container;
        this.products = products;

    }
    add(){
        // Добавить товар в корзину
    }
    remove(){
        // Удалить товар из корзины
    }
    submit(){
        // Отправить данные на сервер
    }
    clear(){

    }
    render(){

    }

}
class CartRow {

    constructor(product, quantity = 1, img = 'https://placehold.it/200x150'){

        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.quantity = quantity;
        this.img = img;
    }
}
class CartRowItem extends CartRow{

    constructor(product, quantity = 1, img = 'https://placehold.it/200x150'){
        super(product, quantity, img);
    }
    render(){

        let cart_row = document.createElement("div");
        cart_row.insertAdjacentHTML('beforeend', new CartColumnTitle().render());

        return cart_row;
    }
}
class CartColumn{

    constructor(element){

        this.element = element;
    }
}
class CartColumnTitle extends CartColumn{

    constructor(element){
        super(element);
    }

    render(){

        return `<div>
                    <img src="${this.element.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.element.title}</h3>
                    </div>
                </div>`;
    }
}

class ProductsList {

    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts()
    }
    _fetchProducts(){

        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
            {id: 5, title: 'Chair', price: 150},
        ];
    }
    render(){

        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    // Сумма ценн товаров в коталоге
    getTotal(){

        let res = this.allProducts.reduce(((total, item) => total + item.price),0);
        return res;
    }
}


class ProductItem {

    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }
    render(){

        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();
list.render();
// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50},
// ];
//
// const renderProduct = (title = "Нонейм", price = 0) => {
//
//     return `<div class="product-item">
//                 <h3>${title}</h3>
//                 <p>${price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
//
// const renderPage = list => {
//
//     let products_container = document.querySelector('.products');
//     list.forEach(item => {
//
//         products_container.innerHTML += renderProduct(item.title, item.price)
//     });
// };
//
// document.querySelector('.products').innerHTML += renderProduct();
// document.querySelector('.products').innerHTML += renderProduct("Девайс");
// document.querySelector('.products').innerHTML += renderProduct("", 999);
//
// renderPage(products);