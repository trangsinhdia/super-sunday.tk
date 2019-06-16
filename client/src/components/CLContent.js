import React, { Component } from 'react';
import {connect} from 'react-redux'
import Table from './Table'
import Chat from './Chat'
import ReplayList from './ReplayList'

class CLContent extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    render() {
        if(this.props.nav === 'schedule' || this.props.nav === null){
            return (
                <div className="CLContent">
                    <Table />
                </div>
            )
        }
        else if(this.props.nav === 'view'){
            return (
                <div className="CLContent">
                    <Chat />
                </div>
            )
        }
        else if(this.props.nav === 'replay'){
            return (
                <div className="CLContent">
                    <ReplayList />
                </div>
            )
        }
        else{
            return(null)
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        nav: state.click.nav,
    }
}

export default connect(mapStateToProps)(CLContent)