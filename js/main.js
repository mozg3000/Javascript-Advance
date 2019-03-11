const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {

    constructor(cart, container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.cart = cart;
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.init();
                this._setButtonsListener();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _setButtonsListener() {

        let btns = document.querySelectorAll(".buy-btn");
        Array.from(btns).forEach((el) => {

            el.addEventListener("click", (e) => {

                this._addToCart(e.target.dataset.id);
            })
        })
    }

    _addToCart(id) {

        let new_product = this.allProducts.find(x => x.id === parseInt(id));
        this.cart.add(new_product);
    }
    init() {

        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    render(){

    }
    // Сумма ценн товаров в коталоге
    getTotal(){

        let res = this.allProducts.reduce(((total, item) => total + item.price), 0);
        return res;
    }
}


class ProductItem {

    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {

        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn" data-id="${this.id}">Купить</button>
                </div>
            </div>`
    }
}

class Cart {

    constructor(container, products = []) {

        this.container = container;
        this.allProducts = products;
        this.goods = [];
        this.amount = 0;
        this.countGoods = 0;
        this._getProducts()
            .then(data => {
                this.goods = data.contents;
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this.init();
            });
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    _setCancelButtonListener(id){

        if(id){

            let undo_btn = document.getElementById(id);
            undo_btn.addEventListener("click", (e) => {

                this.remove(e.currentTarget.dataset.id);
            })
        }else{

            let undo_btns = document.querySelectorAll(".cart-undo-cont > button");
            Array.from(undo_btns).forEach((el) => {
                el.addEventListener("click", (e) => {

                    this.remove(e.currentTarget.dataset.id);
                })
            });
        }
    }
    getProductById() {

    }

    add(product) {

        let index = this.allProducts.findIndex(x => x.id === product.id);
        if(index === -1){

            let last = this.allProducts.push({
                title : product.title,
                price : product.price,
                id : product.id,
                img : product.img,
                quantity: 1
            });
            this.render();
            this._setCancelButtonListener(product.id_product);
        }else{

            this.allProducts[index].quantity++;
            this.render();
        }

    }

    remove(id) {

        let index = this.allProducts.findIndex(x => x.id === parseInt(id));
        if(this.allProducts[index].quantity === 1){

            this.allProducts.splice(index, 1);
        }else{

            this.allProducts[index].quantity--;
        }
        this.render()
    }

    submit() {
        // Отправить данные на сервер
    }

    clear() {

        document.querySelector(this.container).innerHTML = "";
    }

    _hasProduct(id) {

        let index = this.allProducts.findIndex(x => x.id === parseInt(id));

        return index === -1 ? false : true;
    }


    init(){

        const block = document.querySelector(this.container);
        this.goods.forEach(el => {
            const productObj = new CartItem(el);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        });
        this._setCancelButtonListener();
    }

    render() {

        const block = document.querySelector(this.container);
        this.clear();
        if(this.allProducts.length === 0){

            block.innerHTML = "Корзина пуста";
        }else{

            this.allProducts.forEach(el => {

                const productObj = new CartItem({
                    product_name: el.title,
                    price: el.price,
                    id_product: el.id,
                    quantity: el.quantity
                });
                block.insertAdjacentHTML('beforeend', productObj.render());
            });
        }
        this._setCancelButtonListener();
    }
}

class CartItem {

    constructor(product, img = "https://placehold.it/40x60") {

        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="drop-flex-cart">
                        <a href="#">
                            <img src="${this.img}" alt="">
                        </a>
                        <div class="drop-block">
                            <h3 class="drop-heading-cart">
                                <a href="#">
                                    ${this.title}
                                </a>
                            </h3>
                            <p class="cart-p">
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star-half-alt"></i>
                            </p>
                            <p class="cart-price pink">
                                ${this.quantity} x ${this.price}
                            </p>

                        </div>
                        <div class="cart-undo-cont">
                            <button id="undo-btn2" data-id="${this.id}">
                                <i class="cart-undo fas fa-times-circle"></i>
                            </button>
                            <!--<label for="undo-btn2"></label>-->
                        </div>
                    </div>`
    }
}

let cart_logo = document.getElementById("cart-head");

cart_logo.addEventListener("click", () => {

    let drop_box_cart = document.getElementById("drop-box-cart");
    drop_box_cart.classList.toggle("drop-box-cart-show")
});

let cart = new Cart("#drop-box-cart");

let list = new ProductsList(cart);
list.render();
