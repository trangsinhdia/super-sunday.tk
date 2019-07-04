import React, { Component } from 'react';
import Register from './RegisterDialog'
import Login from './LoginDialog'
import Information from './InformationDialog'
import ForgetPassword from './ForgetPassword'
import ChangePassword from './ChangePassword'

class Dialog extends Component {

    render() {
        return (
            <React.Fragment>
                <Login />
                <Register />
                <Information />
                <ForgetPassword />
                <ChangePassword />
            </React.Fragment>
        );
    }
}

export default Dialog