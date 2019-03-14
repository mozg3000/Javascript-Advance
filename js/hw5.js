const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        filtered_products: [],
        cart: {},
        searchLine: "",
        isVisibleCart: false,
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/60x80'
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            console.log(product.id_product);
        },
        doFilter(){

            this.filtered_products.length = 0;
            this.products.forEach((x) => {

                if((x.product_name).toLowerCase().includes(this.searchLine.toLowerCase())){

                    this.filtered_products.push(x);
                }
            })
        }
    },
    computed:{

        showCart(){

            return {
                "drop-box-cart": !this.isVisibleCart,
                "drop-box-cart-show": this.isVisibleCart
            }
        }
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                console.log(data);
                for(let el of data){
                    this.products.push(el);
                    this.filtered_products.push(el)
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                    this.cart = Object.create(data);
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered_products.push(el)
                }
            })
    }
});