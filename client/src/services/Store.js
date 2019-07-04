var redux = require('redux')

const SSInitialState = {
    click: {
        nav: null,
        login: null,
        register: null,
        forgetpassword: null,
        changePassword: null
    },
    setting: {
        full: '',
        theme: 'Red',
        selected : {
            schedule : 'selected',
            view : '',
            replay : ''
        }
    },
    notification: {
        type: '',
        message: ''
    },
    session: null,
    live: null,
    replay: null,
    spinner: ''
}
const SSReducer = (state = SSInitialState, action) => {
    switch (action.type) {
        case "CLICK_NAV":
            return {...state, click: {...state.click, nav: action.nav}}
        case "CLICK_LOGIN":
            return {...state, click: {...state.click, login: action.login}}
        case "CLICK_REGISTER":
            return {...state, click: {...state.click, register: action.register}}
        case "CLICK_FORGETPASSWORD":
            return {...state, click: {...state.click, forgetpassword: action.forgetpassword}}
        case "CLICK_CHANGEPASSWORD":
            return {...state, click: {...state.click, changePassword: action.changePassword}}
        case "SETTING":
            if(action.full || action.full === false){
                return {...state, setting: {...state.setting, full: action.full}}
            }
            else if(action.theme){
                return {...state, setting: {...state.setting, theme: action.theme}}
            }
            else if(action.selected){
                return {...state, setting: {...state.setting, selected: action.selected}}
            }
            else{
                return state
            }
        case "NOTIFICATION":
            return {...state, notification: {type: action.typeN, message: action.message}}
        case "SESSION":
            return {...state, session: action.session}
        case "LIVE":
            return {...state, live: action.live}
        case "REPLAY":
            return {...state, replay: action.replay}
        case "SPINNER":
            return {...state, spinner: action.spinner}
        default:
            return state
    }
}
var store = redux.createStore(SSReducer)

export default store