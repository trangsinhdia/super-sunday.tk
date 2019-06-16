import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'

class LoginDialog extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: '',
            password: ''
        }
    }

    componentWillMount(){
        axios.get('/home').then((res) => {
            if(res.data.state === 'Login Success'){
                this.props.setSession(res.data.profile)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    componentWillUpdate(){
        let fb = document.getElementById('fb')
        if(fb){document.body.removeChild(fb)}
        const script = document.createElement('script')
        script.async = true
        script.defer = true
        script.id = 'fb'
        script.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.3&appId=309502326670418&autoLogAppEvents=1'
        document.body.appendChild(script);
    }

    Exit = (event) => {
        if(event.target.className === 'Dialog'){
            this.props.setLogin(false)
        }
    }

    LoginAcc = () => {
        axios.post('/login', {
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
            console.log(res)
            if(res.data.state === 'Login Success'){
                this.props.setSession(res.data.profile)
                this.props.setNotification('success', 'Đăng nhập thành công !')
                this.props.setLogin(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        if(this.props.Login && this.props.session === null){
            return (
                <div className="Dialog" onClick = {(event) => this.Exit(event)}>
                    <div className="dialogContainer">
                    <div className={"headerDialog hD" + this.props.theme}>
                        <h1 className="h1Dialog">
                            <span>Login</span>
                        </h1>
                    </div>
                    <div className="contentDialog">
                        <fieldset className="material">
                            <input style={{padding: '15px 10px 0px'}} type="text" placeholder={''} onChange={(e) => {this.setState({email: e.target.value})}} autoComplete="off" required />
                            <hr />
                            <label>Email ID</label>
                        </fieldset>
                        <fieldset className="material">
                            <input style={{padding: '15px 10px 0px'}} type="password" placeholder={''} onChange={(e) => {this.setState({password: e.target.value})}} autoComplete="off" required />
                            <hr />
                            <label>Password</label>
                        </fieldset>
                        <div style={{display: 'inline-block'}}>
                            <a className="forgetPassword" href="">Quên mật khẩu?</a>
                            <span style={{display: 'block'}}>Chưa có tài khoản?
                                <a className="register" onClick={() => this.props.setRegister(true)} style={{color: 'blue', cursor: 'pointer'}}> Đăng ký ngay!</a>
                            </span>
                            <div id="fb-root" style={{margin: '15px 0 0 15px'}}>
                                <div class="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
                            </div>
                        </div>
                        <button className="pure-material-button-contained" style={{marginTop: '25px'}} onClick={this.LoginAcc}>Đăng Nhập</button>
                    </div>
                    </div>
                </div>
            )
        }
        else{
            return null
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Login: state.click.login,
        session: state.session,
        theme: state.setting.theme
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setLogin: (login) => {
            dispatch({type:"CLICK_LOGIN", login})
        },
        setNotification: (typeN, message) => {
            dispatch({type: "NOTIFICATION", typeN, message})
        },
        setSession: (session) => {
            dispatch({type: "SESSION", session})
        },
        setRegister: (register) => {
            dispatch({type:"CLICK_REGISTER", register})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)