import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

export const state = () => ({
    appName: "Para.Guru",
    domainName: "para.guru",
    addr: process.env.VUE_APP_CLIENT_URL,
    api: process.env.VUE_APP_API_URL,
    admin: process.env.VUE_APP_ADMIN_URL,
    websocket: process.env.VUE_APP_WEBSOCKET_CHANNEL,
    port: "4000",
    tdFontSize: "12px",
    // token: localStorage.getItem('jwt') || '',
    status: '',
    commentDrawer: false,
    buyselldialog: false,
    cookiepopup: false,
    activatealert: false,
    userwalletdialog: false,
    userinfo: null,
    wallet: null,
    userorderdialog: false,
    // isLight: localStorage.getItem("light") == "true",
    login: false,
    dolar: 1,
    isEmailSending: false,
    device: {}
})


export const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    commentDrawer: state => state.commentDrawer,
    buyselldialog: state => state.buyselldialog,
    cookiepopup: state => state.cookiepopup,
    activatealert: state => state.activatealert,
    userwalletdialog: state => state.userwalletdialog,
    userinfo: state => state.userinfo,
    wallet: state => state.wallet,
    userorderdialog: state => state.userorderdialog,
    isLight: state => state.isLight,
    // login: state => state.login || !!localStorage.getItem("user"),
    dolar: state => state.dolar,
    isEmailSending: state => state.isEmailSending,
    device: state => state.device
}

export const mutations = {
    buyselldialog(state) {
        console.log(state.buyselldialog);
        state.buyselldialog = !state.buyselldialog;
        console.log(state.buyselldialog);
    },
    cookiepopup(state, s) {
        state.cookiepopup = s;
    },
    activatealert(state) {
        state.activatealert = !state.activatealert;
    },
    userwalletdialog(state) {
        state.userwalletdialog = !state.userwalletdialog;
    },
    userinfo(state) {
        // state.userinfo = JSON.parse(localStorage.getItem("user"));
    },
    wallet(state) {
        // state.userinfo = JSON.parse(localStorage.getItem("wallet"));
    },
    userorderdialog(state) {
        state.userorderdialog = !state.userorderdialog;
    },
    setDevice(state, value){
        state.device = value
      }
}









/*
Vue.use(Vuex);
new Vuex.Store({
    state: () => ({
        appName: "Para.Guru",
        domainName: "para.guru",
        addr: process.env.VUE_APP_CLIENT_URL,
        api: process.env.VUE_APP_API_URL,
        admin: process.env.VUE_APP_ADMIN_URL,
        websocket: process.env.VUE_APP_WEBSOCKET_CHANNEL,
        port: "4000",
        tdFontSize: "12px",
        // token: localStorage.getItem('jwt') || '',
        status: '',
        commentDrawer: false,
        buyselldialog: false,
        cookiepopup: false,
        activatealert: false,
        userwalletdialog: false,
        userinfo: null,
        wallet: null,
        userorderdialog: false,
        // isLight: localStorage.getItem("light") == "true",
        login: false,
        dolar: 1,
        isEmailSending: false
    }),
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
        commentDrawer: state => state.commentDrawer,
        buyselldialog: state => state.buyselldialog,
        cookiepopup: state => state.cookiepopup,
        activatealert: state => state.activatealert,
        userwalletdialog: state => state.userwalletdialog,
        userinfo: state => state.userinfo,
        wallet: state => state.wallet,
        userorderdialog: state => state.userorderdialog,
        isLight: state => state.isLight,
        // login: state => state.login || !!localStorage.getItem("user"),
        dolar: state => state.dolar,
        isEmailSending: state => state.isEmailSending,
    },
    mutations: {
        commentDrawer(state) {
            state.commentDrawer = !state.commentDrawer;
        },
        buyselldialog(state) {
            state.buyselldialog = !state.buyselldialog;
        },
        cookiepopup(state, s) {
            state.cookiepopup = s;
        },
        activatealert(state) {
            state.activatealert = !state.activatealert;
        },
        userwalletdialog(state) {
            state.userwalletdialog = !state.userwalletdialog;
        },
        userinfo(state) {
            // state.userinfo = JSON.parse(localStorage.getItem("user"));
        },
        wallet(state) {
            // state.userinfo = JSON.parse(localStorage.getItem("wallet"));
        },
        userorderdialog(state) {
            state.userorderdialog = !state.userorderdialog;
        },
        login(state, loading) {
            state.login = loading;
        },
        isLight(state) {
            if (state.isLight) {
                // localStorage.setItem("light", false);
                state.isLight = false;
            } else {
                state.isLight = true;
                // localStorage.setItem("light", true);
            }
        },
        dolar(state) {
            let connection = new WebSocket(`${state.websocket}`);
            connection.onmessage = function (event) {
                state.dolar = parseFloat(event.data);
            }
        },
        isEmailSending(state, yesOrNo) {
            state.isEmailSending = yesOrNo
        },
    },
    actions: {

    },
    modules: {}
});
*/