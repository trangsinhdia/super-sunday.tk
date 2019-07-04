import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios'

class InformationDialog extends Component {
    constructor(props){
        super(props)
        this.state ={
            edit: false,
            phone: null,
            email: null
        }
    }

    Exit = (event) => {
        if(event.target.className === 'Dialog'){
            this.props.setLogin(false)
            this.setState({edit: false})
        }
    }

    EditProfile = () => {
        this.setState({edit: true})
    }

    SaveProfile = () => {
        console.log(this.state)
        if(this.state.phone && this.state.email){
            axios.post('/users', {editProfile:{
                username: this.props.session.username,
                phone: this.state.phone,
                email: this.state.email
            }}).then((res) => {
                if(res.data === 'Changed Profile'){
                    this.props.setNotification('success', 'Đổi thông tin thành công !')
                    axios.get('/home').then((res) => {
                        if(res.data.state === 'Login Success'){
                            this.props.setSession(res.data.profile)
                            this.setState({edit: false})
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            })
        }
        else{
            this.props.setNotification('error', 'Không được để trống! Vui lòng nhập đủ thông tin')
        }
    }
    
    render() {
        if(this.props.session && this.props.Login && !this.state.edit){
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
                                <span>{this.props.session.phone}</span>
                            </div>
                            <div className="gender">
                                <span>Email:</span>
                                <span>{this.props.session.email}</span>
                            </div>
                            <div className="birthday">
                                <span>Mật khẩu:</span>
                                <span>******</span>
                            </div>
                        </div>
                    </div>
                    <div className="edit" onClick={this.EditProfile}>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACKgAAAioBtyI5mwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJrSURBVEiJxdXNS1RhFMfx77mj9oIvtStaNUTRG9F9rjIgpOkigjZG2yIozEXUwn+gVfRPiGBkMdImQjfauGmh88xl0l5op9CmTRujQfQ+p81M3MzsOjM3z/JeDh9+5zk8D+xRSdpAoVDY39nZeXJjY+NbLpf7UvvupQWqqoRheKGjo2NZVd+1tLSsWGtHU4Xz+XwmDMNJ51wZ+LC2tnZARK4Bj5eWlg6nAufz+Uw2m32qqr3ABNDb1dV1SlUt0FapVA41Ha6hwCURGTDG3AbyzrlZVX0JvO3p6VkBaEkBvQ58j6KoXURUVe+XSqV2EbkVRVFWRBSatNUxtA8YBEaBIc/zBkXkRxRFBWA6CILhWk/DiavoBNCnqgPd3d2fVfVeqVRS59wssA5MG2NG4n0NnXEM7a+hACLiVPUJcBCYMcaMiIiL99Y9amttq6q+EJGLnudd9n1/tfYvDMMzzrk5YMoY87B2rvGqK3EC9M1OKNSROCGa3wmFXS6XtbZVRJ4DDaGwi8Q1VFWN53n9jaCJ4WajieAkqIhM+b7/ICn6TzgtdEc4TfSvcNrotrC1thWYBIK0UNhyc6mqJyJjQC9wNY4Wi8Wsc25GVad930+8vYlga+2Qqt4ExkTk1zSKxWJWRAqqOhcEwd2tF3499duorbWvgSPAeaDNOXdORCoiMq+qs81CIZbYWnsUuAIMB0GwD1jPZDI3RGQeaFrSP+DqiFeDIAgXFxfPquqyqj4C5owxd5qJQmzU1tqPwGngE3BCRGZUddwY86rZKFRfp4WFheNV9D0wvrm5+SyXy31tNrZtlcvlY/8F2uv6Ca5gm2UeyvOGAAAAAElFTkSuQmCC" />
                        <div >Chỉnh sửa thông tin</div>
                    </div>
                    </div>
                </div>
            );
        }
        else if(this.props.session && this.props.Login && this.state.edit){
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
                                <fieldset className="material" style={{width: 'calc(100% - 150px)', display: 'inline-block', margin: '0'}}>
                                    <input style={{padding: '0', fontSize: '15px', color: '#6d7379'}} value={this.state.phone} type="text" placeholder={''} onChange={(e) => {this.setState({phone: e.target.value})}} autoComplete="off" required />
                                    <hr />
                                    <label></label>
                                </fieldset>
                            </div>
                            <div className="gender">
                                <span>Email:</span>
                                <fieldset className="material" style={{width: 'calc(100% - 150px)', display: 'inline-block', margin: '0'}}>
                                    <input style={{padding: '0', fontSize: '15px', color: '#6d7379'}} value={this.state.email} type="text" placeholder={''} onChange={(e) => {this.setState({email: e.target.value})}} autoComplete="off" required />
                                    <hr />
                                    <label></label>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div className="edit" onClick={this.SaveProfile}>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACKgAAAioBtyI5mwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJrSURBVEiJxdXNS1RhFMfx77mj9oIvtStaNUTRG9F9rjIgpOkigjZG2yIozEXUwn+gVfRPiGBkMdImQjfauGmh88xl0l5op9CmTRujQfQ+p81M3MzsOjM3z/JeDh9+5zk8D+xRSdpAoVDY39nZeXJjY+NbLpf7UvvupQWqqoRheKGjo2NZVd+1tLSsWGtHU4Xz+XwmDMNJ51wZ+LC2tnZARK4Bj5eWlg6nAufz+Uw2m32qqr3ABNDb1dV1SlUt0FapVA41Ha6hwCURGTDG3AbyzrlZVX0JvO3p6VkBaEkBvQ58j6KoXURUVe+XSqV2EbkVRVFWRBSatNUxtA8YBEaBIc/zBkXkRxRFBWA6CILhWk/DiavoBNCnqgPd3d2fVfVeqVRS59wssA5MG2NG4n0NnXEM7a+hACLiVPUJcBCYMcaMiIiL99Y9amttq6q+EJGLnudd9n1/tfYvDMMzzrk5YMoY87B2rvGqK3EC9M1OKNSROCGa3wmFXS6XtbZVRJ4DDaGwi8Q1VFWN53n9jaCJ4WajieAkqIhM+b7/ICn6TzgtdEc4TfSvcNrotrC1thWYBIK0UNhyc6mqJyJjQC9wNY4Wi8Wsc25GVad930+8vYlga+2Qqt4ExkTk1zSKxWJWRAqqOhcEwd2tF3499duorbWvgSPAeaDNOXdORCoiMq+qs81CIZbYWnsUuAIMB0GwD1jPZDI3RGQeaFrSP+DqiFeDIAgXFxfPquqyqj4C5owxd5qJQmzU1tqPwGngE3BCRGZUddwY86rZKFRfp4WFheNV9D0wvrm5+SyXy31tNrZtlcvlY/8F2uv6Ca5gm2UeyvOGAAAAAElFTkSuQmCC" />
                        <div>Lưu thông tin</div>
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
        theme: state.setting.theme,
        Login: state.click.login,
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

export default connect(mapStateToProps, mapDispatchToProps)(InformationDialog)