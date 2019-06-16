import React, { Component } from 'react';
import Register from './RegisterDialog'
import {connect} from 'react-redux'
import Login from './LoginDialog'
import Information from './InformationDialog'

class Dialog extends Component {

    render() {
        return (
            <React.Fragment>
                <Login />
                <Register />
                <Information />
            </React.Fragment>
        );
    }
}

export default Dialog