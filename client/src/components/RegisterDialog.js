import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios'

class Register extends Component {
    constructor(props){
        super(props)
        this.state ={
            username: null,
            email: null,
            password1: null,
            password2: null,
        }
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

    CheckEmpty = () => {
        if(this.state.username && this.state.email && (this.state.password1 || this.state.password2)){
            return true
        }
        this.props.setNotification('error', 'Vui lòng nhập đầy đủ thông tin!')
        return false
    }

    Register = () => {
        if(this.CheckEmpty() && this.CheckVaild()){
            axios.post('/register', {
                username: this.state.username,
                password: this.state.password1,
                email: this.state.email,
                phone: '',
                avatar: '',
                reference: '',
            })
            .then((response) => {
                if(response.data === 'Register Success'){
                    this.props.setNotification('success', 'Đăng ký thành công!')
                    this.props.setRegister(false)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    render() {
        if(this.props.register){
            return (
                <div className="Dialog" onClick={(e) => {
                    if(e.target.className === 'Dialog'){
                        this.props.setRegister(false)
                        this.props.setLogin(false)
                    }
                }}>
                    <div className="dialogContainer" style={{height: '475px'}}>
                        <div className={"headerDialog hD" + this.props.theme}>
                            <h1 className="h1Dialog">
                            <span>Register</span>
                            </h1>
                        </div>
                        <div className="contentDialog">
                            <fieldset className="material">
                                <input type="text" placeholder={''} onChange={(e) => {this.setState({username: e.target.value})}} autoComplete="off" required />
                                <hr />
                                <label>Username</label>
                            </fieldset>
                            <fieldset className="material">
                                <input type="text" placeholder={''} onChange={(e) => {this.setState({email: e.target.value})}} autoComplete="off" required />
                                <hr />
                                <label>Email ID</label>
                            </fieldset>
                            <fieldset className="material">
                                <input type="password" placeholder={''} onChange={(e) => {this.setState({password1: e.target.value})}} autoComplete="off" required />
                                <hr />
                                <label>Password</label>
                            </fieldset>
                            <fieldset className="material">
                                <input type="password" placeholder={''} onChange={(e) => {this.setState({password2: e.target.value})}} autoComplete="off" required />
                                <hr />
                                <label>Nhập lại Password</label>
                            </fieldset>
                            <p>Bằng việc tạo một tài khoản, bạn đồng ý với <span className="dieukhoan" style={{color: '#e90052'}}>Điều khoản dịch vụ</span> và <span className="chinhsach" style={{color: '#e90052'}}>Chính sách về Quyền riêng tư.</span>
                            </p>
                            <button className="pure-material-button-contained" onClick={this.Register}>Đăng Ký</button>
                            <span>Đã có tài khoản?
                                <a className="forgetPassword" onClick={() => this.props.setRegister(false)} style={{color: 'blue', cursor: 'pointer'}}> Đăng nhập ngay!</a>
                            </span>
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
        register: state.click.register,
        theme: state.setting.theme
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setNotification: (typeN, message) => {
            dispatch({type: "NOTIFICATION", typeN, message})
        },
        setLogin: (login) => {
            dispatch({type:"CLICK_LOGIN", login})
        },
        setRegister: (register) => {
            dispatch({type:"CLICK_REGISTER", register})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)