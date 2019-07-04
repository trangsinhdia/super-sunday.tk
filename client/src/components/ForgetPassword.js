import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'

class ForgetPassword extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: '',
            verification: false,
            changePassword: false,
            code: '',
            password1: null,
            password2: null
        }
    }

    ForgetPassword = () => {
        if(this.state.email){
            axios.post('/forgetpassword', {
                email: this.state.email
            }).then((res) => {
                if(res.data === 'Code sent OK'){
                    this.setState({verification: true})
                }
                else if(res.data === 'Invaild email'){
                    this.props.setNotification('error', 'Email không hợp lệ !')
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        else{
            this.props.setNotification('error', 'Bạn chưa nhập email !')
        }
    }

    CheckEmpty = () => {
        if(this.state.password1 && this.state.password2){
            return true
        }
        this.props.setNotification('error', 'Vui lòng nhập mật khẩu!')
        return false
    }

    CheckVaild = () => {
        if(this.state.password1.length >= 6){
            if(this.state.password1 === this.state.password2){
                return true
            }
            else{
                this.props.setNotification('error', 'Mật khẩu không trùng khớp!')
                return false
            }
        }
        this.props.setNotification('error', 'Mật khẩu phải từ 6 ký tự trở lên!')
        return false
    }

    Vetification = () => {
        axios.post('/forgetpassword', {
            code: Number(this.state.code)
        }).then((res) => {
            if(res.data === 'Verified'){
                this.setState({changePassword: true})
            }
            else{
                this.props.setNotification('error', 'Mã xác nhận không chính xác !')
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    ChangePassword = () => {
        if(this.CheckEmpty() && this.CheckVaild()){
            axios.post('/forgetpassword', {
                email: this.state.email,
                password: this.state.password1,
                code: Number(this.state.code)
            }).then((res) => {
                console.log(res)
                if(res.data === 'Change password success'){
                    this.props.setNotification('success', 'Đổi mật khẩu thành công !')
                    this.setState({changePassword: false, verification: false})
                    this.props.setForgetPassword(false)
                }
                else{
                    this.props.setNotification('error', 'Đã có lỗi xảy ra !')
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        if(this.props.forgetpassword && !this.state.verification){
            return (
                <div className="Dialog" onClick={(event) => {
                    if(event.target.className === 'Dialog'){
                        this.props.setForgetPassword(false)
                    }
                }}>
                    <div className="dialogContainer" style={{height: '255px'}}>
                    <div className={"headerDialog hD" + this.props.theme}>
                        <h1 className="h1Dialog">
                            <span>Quên mật khẩu</span>
                        </h1>
                    </div>
                    <div className="contentDialog">
                        <fieldset className="material">
                            <input style={{padding: '15px 10px 0px'}} type="text" placeholder={''} onChange={(e) => {this.setState({email: e.target.value})}} autoComplete="off" required />
                            <hr />
                            <label>Email ID</label>
                        </fieldset>
                        <div style={{display: 'inline-block'}}>
                            <a className="forgetPassword" style={{color: 'blue', cursor: 'pointer', display: 'block'}}> Đăng nhập ngay!</a>
                            <span>Chưa có tài khoản?
                                <a className="forgetPassword" onClick={() => {this.props.setRegister(true); this.props.setForgetPassword(false)}} style={{color: 'blue', cursor: 'pointer'}}> Đăng ký ngay!</a>
                            </span>
                            <div id="fb-root" style={{margin: '15px 0 0 15px'}}>
                                <div class="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
                            </div>
                        </div>
                        <button className="pure-material-button-contained" onClick={() => {this.ForgetPassword()}} style={{marginTop: '25px'}}>Lấy lại mật khẩu</button>
                    </div>
                    </div>
                </div>
            );
        }
        else if(this.state.verification && !this.state.changePassword){
            return (
                <div className="Dialog" onClick={(event) => {
                    if(event.target.className === 'Dialog'){
                        this.setState({verification: false})
                        this.props.setForgetPassword(false)
                    }
                }}>
                    <div className="dialogContainer" style={{height: '374px'}}>
                        <div className={"headerDialog hD" + this.props.theme}>
                            <h1 className="h1Dialog">
                                <span>Quên mật khẩu</span>
                            </h1>
                        </div>
                        <div className="contentDialog" style={{padding: '0'}}>
                            <div id="wrapper">
                                <div id="dialog">
                                    <h3 style={{margin: '0 0 10px', padding: '0', lineHeight: '1.25'}}>Please enter the 4-digit verification code we sent via Email:</h3>
                                    <span style={{fontSize: '0.8rem'}}>(we want to make sure it's you before we contact our movers)</span>
                                    <div id="form">
                                        <input class="input" type="text" onChange={(e) => {this.setState({code: this.state.code + e.target.value})}} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                        <input class="input" type="text" onChange={(e) => {this.setState({code: this.state.code + e.target.value})}} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                        <input class="input" type="text" onChange={(e) => {this.setState({code: this.state.code + e.target.value})}} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                        <input class="input" type="text" onChange={(e) => {this.setState({code: this.state.code + e.target.value})}} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                        <button id="verify" class="btn btn-primary btn-embossed" onClick={() => {this.Vetification()}}>Verify</button>
                                    </div>
                                    <div>
                                        Didn't receive the code?<br />
                                        <a href="#">Send code again</a><br />
                                        <a href="#">Change phone number</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.state.changePassword){
            return (
                <div className="Dialog" onClick={(event) => {
                    if(event.target.className === 'Dialog'){
                        this.setState({changePassword: false, verification: false})
                        this.props.setForgetPassword(false)
                    }
                }}>
                    <div className="dialogContainer" style={{height: '275px'}}>
                    <div className={"headerDialog hD" + this.props.theme}>
                        <h1 className="h1Dialog">
                            <span>Quên mật khẩu</span>
                        </h1>
                    </div>
                    <div className="contentDialog">
                        <fieldset className="material">
                            <input style={{padding: '15px 10px 0px'}} type="text" placeholder={''} onChange={(e) => {this.setState({password1: e.target.value})}} autoComplete="off" required />
                            <hr />
                            <label>Mật khẩu mới</label>
                        </fieldset>
                        <fieldset className="material" style={{marginBottom: '0'}}>
                            <input style={{padding: '15px 10px 0px'}} type="text" placeholder={''} onChange={(e) => {this.setState({password2: e.target.value})}} autoComplete="off" required />
                            <hr />
                            <label>Nhập lại mật khẩu mới</label>
                        </fieldset>
                        <button className="pure-material-button-contained" onClick={() => {this.ChangePassword()}} style={{marginTop: '25px'}}>Lưu</button>
                    </div>
                    </div>
                </div>
            );
        }
        else{
            return null
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        forgetpassword: state.click.forgetpassword,
        theme: state.setting.theme
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setForgetPassword: (forgetpassword) => {
            dispatch({type: "CLICK_FORGETPASSWORD", forgetpassword})
        },
        setRegister: (register) => {
            dispatch({type:"CLICK_REGISTER", register})
        },
        setNotification: (typeN, message) => {
            dispatch({type: "NOTIFICATION", typeN, message})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)