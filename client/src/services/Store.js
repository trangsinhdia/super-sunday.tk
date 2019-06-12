var redux = require('redux')

const SSInitialState = {
    click: {
        nav: '',
        login: ''
    },
    setting: {
        full: '',
        theme: 'Red'
    },
    notification: {
        type: '',
        message: ''
    },
    session: null,
    replay: null,
    spinner: ''
}
const SSReducer = (state = SSInitialState, action) => {
    switch (action.type) {
        case "CLICK_NAV":
            return {...state, click: {...state.click, nav: action.nav}}
        case "CLICK_LOGIN":
            return {...state, click: {...state.click, login: action.login}}
        case "SETTING":
            if(action.full || action.full === false){
                return {...state, setting: {...state.setting, full: action.full}}
            }
            else if(action.theme){
                return {...state, setting: {...state.setting, theme: action.theme}}
            }
            else{
                return state
            }
        case "NOTIFICATION":
            return {...state, notification: {type: action.typeN, message: action.message}}
        case "SESSION":
            return {...state, session: action.session}
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