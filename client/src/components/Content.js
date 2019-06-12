import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Schedule from './Schedule'
import {connect} from 'react-redux'
import Player from './Player'
import Replay from './Replay'

class Content extends Component {
    render() {
        if(this.props.nav === 'schedule' || this.props.nav === ''){
            return (
                <div className="content">
                    <ContentHeader />
                    <Schedule />
                </div>
            )
        }
        else if(this.props.nav === 'view'){
            return (
                <div className="content">
                    <ContentHeader />
                    <Player />
                </div>
            )
        }
        else if(this.props.nav === 'replay'){
            return (
                <div className="content">
                    <ContentHeader />
                    <Replay />
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

export default connect(mapStateToProps)(Content)