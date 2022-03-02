import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';


const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

// 啟用規則
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

// 載入 zh_TW 中文系語言
loadLocaleFromURL(
    "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json");


// 本地化
configure({
    generateMessage: localize("zh_TW")});


const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'will-hexschool';


const app = Vue.createApp({
    data() {
        return {
            cartData: {},
            products: [],
            productId: '',
            isLoadingItem: '',
        };
    },
    methods: {
        getProducts() {
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then((res) => {
            this.products = res.data.products;
            });
        },
        openProductModal(id) {
            this.productId = id;
            this.$refs.productModal.openModal();
        },
        getCart() {
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
            .then((res) => {
            this.cartData = res.data.data;
            });
        },
        addToCart(id, qty = 1) {
            const data = {
                product_id: id,
                qty,
            };
            this.isLoadingItem = id;
            axios.post(`${apiUrl}/api/${apiPath}/cart`, { data })
            .then((res) => {
                this.getProduct();
                this.$refs.productModal.closeModal();
                this.isLoadingItem = '';
            });
        },
        remobeCartItem(id) {
            this.isLoadingItem = id;
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
            .then((res) => {
                this.getCart();
                this.isLoadingItem = '';
            });
        },
        updateCartItem(item) {
            const data = {
                product_id: item.id,
                qty: item.qty,
            };
            this.isLoadingItem = item.id;
            axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data })
            .then((res) => {
                this.getProduct();
                this.isLoadingItem = '';
            });
        },
    },
    mounted() {
        this.getProducts();
        this.getCart();
    },
});

app.component('product-modal', {
    props: ['id'],
    template: '#userProductModal',
    data() {
        return {
modal: {},
product: {},
qty: 1,
        };
    },
    watch: {
id() {
this.getProduct();
},
    },
    methods: {
        openModal() {
this.modal.show();
        },
        closeModal() {
            this.modal.hide();
        },
        getProduct() {
            axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
            .then((res) => {
            this.product = res.data.product;
            });
        },
        addToCart() {
            this.$emit('add-cart', this.product.id, this.qty);
        },
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal);
    },
});

app.mount('#app');