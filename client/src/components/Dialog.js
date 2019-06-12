import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'

class Dialog extends Component {
    constructor(props){
        super(props)
        this.state ={
            register: false,
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

    Exit = (event) => {
        if(event.target.className === 'Dialog'){
            this.props.setLogin(false)
        }
    }

    Register = (event) => {
        if(this.state.register){
            return (
                <div className="Dialog" onClick={(e) => {
                    if(e.target.className === 'Dialog'){
                        this.setState({register: false})
                        this.props.setLogin(false)
                    }
                }}>
                    <div className="dialogContainer" style={{height: '400px'}}>
                        <div className={"headerDialog hD" + this.props.theme}>
                            <h1 className="h1Dialog">
                            <span>Register</span>
                            </h1>
                        </div>
                        <div className="contentDialog">
                            <fieldset className="material">
                                <input type="text" placeholder={''} autoComplete="off" required />
                                <hr />
                                <label>Email ID</label>
                            </fieldset>
                            <fieldset className="material">
                                <input type="password" placeholder={''} autoComplete="off" required />
                                <hr />
                                <label>Password</label>
                            </fieldset>
                            <fieldset className="material">
                                <input type="password" placeholder={''} autoComplete="off" required />
                                <hr />
                                <label>Nhập lại Password</label>
                            </fieldset>
                            <p>Bằng việc tạo một tài khoản, bạn đồng ý với <span className="dieukhoan" style={{color: '#e90052'}}>Điều khoản dịch vụ</span> và <span className="chinhsach" style={{color: '#e90052'}}>Chính sách về Quyền riêng tư.</span>
                            </p>
                            <button className="pure-material-button-contained">Đăng Ký</button>
                            <span>Đã có tài khoản?
                                <a className="forgetPassword" onClick={() => this.setState({register: false})} style={{color: 'blue', cursor: 'pointer'}}> Đăng nhập ngay!</a>
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return null
        }
    }

    Information = () => {
        if(this.props.session && this.props.clickLogin === true){
            return (
                <div className="Dialog" onClick = {(event) => this.Exit(event)}>
                    <div className="dialogContainer" style={{height: '467px', width: '360px'}}>
                    <div className={"headerDialog hD" + this.props.theme}>
                        <h1 className="h1Dialog">
                        <span>Thông tin</span>
                        </h1>
                    </div>
                    <div className="contentDialog" style={{padding: 0}}>
                        <div className="profilePhoto">
                            <img className="avatar" />
                            <div><div className="usname">{this.props.session.username}</div></div>
                        </div>
                        <div className="profileGroup">
                            <div className="mobile">
                                <span>Điện thoại:</span>
                                <span>{'+84' + this.props.session.phone}</span>
                            </div>
                            <div className="gender">
                                <span>Giới tính:</span>
                                <span>Nam</span>
                            </div>
                            <div className="birthday">
                                <span>Ngày sinh:</span>
                                <span>{this.props.session.birthday}</span>
                            </div>
                        </div>
                    </div>
                    <div className="edit">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACKgAAAioBtyI5mwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJrSURBVEiJxdXNS1RhFMfx77mj9oIvtStaNUTRG9F9rjIgpOkigjZG2yIozEXUwn+gVfRPiGBkMdImQjfauGmh88xl0l5op9CmTRujQfQ+p81M3MzsOjM3z/JeDh9+5zk8D+xRSdpAoVDY39nZeXJjY+NbLpf7UvvupQWqqoRheKGjo2NZVd+1tLSsWGtHU4Xz+XwmDMNJ51wZ+LC2tnZARK4Bj5eWlg6nAufz+Uw2m32qqr3ABNDb1dV1SlUt0FapVA41Ha6hwCURGTDG3AbyzrlZVX0JvO3p6VkBaEkBvQ58j6KoXURUVe+XSqV2EbkVRVFWRBSatNUxtA8YBEaBIc/zBkXkRxRFBWA6CILhWk/DiavoBNCnqgPd3d2fVfVeqVRS59wssA5MG2NG4n0NnXEM7a+hACLiVPUJcBCYMcaMiIiL99Y9amttq6q+EJGLnudd9n1/tfYvDMMzzrk5YMoY87B2rvGqK3EC9M1OKNSROCGa3wmFXS6XtbZVRJ4DDaGwi8Q1VFWN53n9jaCJ4WajieAkqIhM+b7/ICn6TzgtdEc4TfSvcNrotrC1thWYBIK0UNhyc6mqJyJjQC9wNY4Wi8Wsc25GVad930+8vYlga+2Qqt4ExkTk1zSKxWJWRAqqOhcEwd2tF3499duorbWvgSPAeaDNOXdORCoiMq+qs81CIZbYWnsUuAIMB0GwD1jPZDI3RGQeaFrSP+DqiFeDIAgXFxfPquqyqj4C5owxd5qJQmzU1tqPwGngE3BCRGZUddwY86rZKFRfp4WFheNV9D0wvrm5+SyXy31tNrZtlcvlY/8F2uv6Ca5gm2UeyvOGAAAAAElFTkSuQmCC" />
                        <div>Chỉnh sửa thông tin</div>
                    </div>
                    </div>
                </div>
            )
        }
        else{
            return null
        }
    }

    Login = () => {
        if(this.props.clickLogin === true && this.props.session === null){
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
                            <input type="text" placeholder={''} onChange={(e) => {this.setState({email: e.target.value})}} autoComplete="off" required />
                            <hr />
                            <label>Email ID</label>
                        </fieldset>
                        <fieldset className="material">
                            <input type="password" placeholder={''} onChange={(e) => {this.setState({password: e.target.value})}} autoComplete="off" required />
                            <hr />
                            <label>Password</label>
                        </fieldset>
                        <div style={{display: 'inline-block'}}>
                            <a className="forgetPassword" href="">Quên mật khẩu?</a>
                            <span style={{display: 'block'}}>Chưa có tài khoản?
                                <a className="register" onClick={() => this.setState({register: !this.state.register})} style={{color: 'blue', cursor: 'pointer'}}> Đăng ký ngay!</a>
                            </span>
                        </div>
                        <button className="pure-material-button-contained" onClick={this.LoginAcc}>Đăng Nhập</button>
                    </div>
                    </div>
                </div>
            )
        }
        else{
            return null
        }
    }

    render() {
        return (
            <React.Fragment>
                <this.Login />
                <this.Register />
                <this.Information />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        clickLogin: state.click.login,
        theme: state.setting.theme,
        session: state.session
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)