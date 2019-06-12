import React, { Component } from 'react';

class RegisterDialog extends Component {
    render() {
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
        );
    }
}

export default RegisterDialog;