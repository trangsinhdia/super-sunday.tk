import React, { Component } from 'react';

class LoginDialog extends Component {
    render() {
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
        );
    }
}

export default LoginDialog;