Vue.component('cart', {
    data(){
        return {
            imgCart: 'https://placehold.it/50x100',
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
            
            <div  class="cart-chb-c-lbl">
                
                <searchform>
                             
                </searchform>
                <a id="cart-head" href="#" @click="showCart = !showCart">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                         width="32" height="29" viewBox="0 0 32 29">
                        <defs>
                            <path id="cart-chb-svg1" class="cart-chb-svg" d="M1181 41.182c0-.65.533-1.182 1.184-1.182h4.28c.533 0
                                    1.007.354 1.145.867l4.833 17.455h13.178l4.379-10.048H1195.4a1.186 1.186 0
                                    0 1-1.184-1.182c0-.65.533-1.182 1.184-1.182h16.413c.394 0 .77.197.986.532.217.335.257.749.099
                                    1.123l-5.405 12.412c-.198.433-.612.709-1.085.709h-14.855a1.184 1.184 0 0
                                    1-1.144-.867l-4.833-17.455h-3.393a1.186 1.186 0 0 1-1.184-1.182zm6.747 25.138a2.684
                                    2.684 0 0 1 5.365 0 2.684 2.684 0 0 1-5.365 0zm16.788.178c-.1-1.458 1.006-2.758 2.485-2.857
                                    1.48-.098 2.762 1.025 2.86 2.483.04.728-.177 1.418-.65 1.95a2.678 2.678 0 0
                                    1-1.835.926h-.197c-1.401 0-2.565-1.103-2.663-2.502z"/>
                        </defs>
                        <g>
                            <g transform="translate(-1181 -40)">
                                <use fill="#222" xlink:href="#cart-chb-svg1"/>
                            </g>
                        </g>
                    </svg>
                </a>
                <div id="drop-box-cart" class="drop-box-cart drop-box-account  drop-box-romb-cart"
                    v-show="showCart">
                        <p v-if="!cartItems.length">
                            Добавте товар в корзину
                        </p>
                        <cart-item class="drop-flex-cart"
                             v-for="item of cartItems" 
                             :key="item.id_product"
                             :cart-item="item" 
                             :img="imgCart"
                             @remove="remove">
                             
                        </cart-item>
                </div>
            </div>
    `


});
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
               <div >
                            <a href="#">
                                <img :src="img" alt="">
                            </a>
                            <div class="drop-block">
                                <h3 class="drop-heading-cart">
                                    <a href="#">
                                        {{cartItem.product_name}}
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
                                    {{cartItem.quantity}} x {{cartItem.price}}
                                </p>

                            </div>
                            <div class="cart-undo-cont">
                                <button id="undo-btn2"@click="$emit('remove', cartItem)">
                                    <i class="cart-undo fas fa-times-circle"></i>
                                </button>
                            </div>
                </div>
                            
               
                <!--<div class="cart-item">-->
                    <!--<div class="product-bio">-->
                        <!--<img :src="img" alt="Some image">-->
                        <!--<div class="product-desc">-->
                            <!--<p class="product-title">{{cartItem.product_name}}</p>-->
                            <!--<p class="product-quantity">Quantity: {{cartItem.quantity}}</p>-->
                            <!--<p class="product-single-price">$ {{cartItem.price}} each</p>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="right-block">-->
                        <!--<p class="product-price">{{cartItem.quantity*cartItem.price}}</p>-->
                        <!--<button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>-->
                    <!--</div>-->
                <!--</div>-->
    `
});
Vue.component('searchform',{

    data(){
        return {
            searchLine: ""
        }
    },
    template: `
        <form action="#" class="search-form">

                <input type="text" class="search-field" v-model="searchLine">

                <button class="btn-search" type="submit" @click.prevent="$parent.$parent.$refs.products.filter(searchLine)">

                    <i class="fas fa-search"></i>

                </button>

        </form>`
})