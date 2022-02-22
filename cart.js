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
        };
    },
    methods: {
        getProducts() {
            axios.get(`${apiUrl}/api​/${apiPath}​/products​/all`)
            .then((res) => {
            this.products = res.data.products;
            });
        },
        openProductModal() {
            this.$refs.productModal.openModal();
        },
    },
    mounted() {
        this.getProducts();
    },
});

app.component('product-modal', {
    template: '#userProductModal',
    fata() {

    },
    methods: {
        openModal() {

        }
    },
    mounted() {
        const myModal = new bootstrap.Modal(this.$refs.modal);
    },
});

app.mount('#app');