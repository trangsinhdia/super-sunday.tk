import React, { Component } from 'react';
import {connect} from 'react-redux'

class ChangePassword extends Component {
    constructor(props){
        super(props)
        this.state ={
        }
    }

    render() {
        if(this.props.changePassword){
            return (
                <div className="Dialog" onClick={(event) => {
                    if(event.target.className === 'Dialog'){
                        this.props.SetChangePassword(false)
                    }}}>
                    <div className="dialogContainer" style={{height: '340px'}}>
                    <div className={"headerDialog hD" + this.props.theme}>
                        <h1 className="h1Dialog">
                            <span>Quên mật khẩu</span>
                        </h1>
                    </div>
                    <div className="contentDialog">
                        <fieldset className="material">
                            <input style={{padding: '15px 10px 0px'}} type="text" placeholder={''} onChange={(e) => {this.setState({email: e.target.value})}} autoComplete="off" required />
                            <hr />
                            <label>Mật khẩu cũ</label>
                        </fieldset>
                        <fieldset className="material">
                            <input style={{padding: '15px 10px 0px'}} type="text" placeholder={''} onChange={(e) => {this.setState({email: e.target.value})}} autoComplete="off" required />
                            <hr />
                            <label>Mật khẩu mới</label>
                        </fieldset>
                        <fieldset className="material" style={{marginBottom: '0'}}>
                            <input style={{padding: '15px 10px 0px'}} type="text" placeholder={''} onChange={(e) => {this.setState({email: e.target.value})}} autoComplete="off" required />
                            <hr />
                            <label>Nhập lại mật khẩu mới</label>
                        </fieldset>
                        <button className="pure-material-button-contained" onClick={() => {this.setState({verification: true}); console.log(this.state.verification)}} style={{marginTop: '25px'}}>Lưu</button>
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
        changePassword: state.click.changePassword,
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
        SetChangePassword: (changePassword) => {
            dispatch({type: "CLICK_CHANGEPASSWORD", changePassword})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)