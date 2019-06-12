import React, { Component } from 'react';
import ScheduleToday from './ScheduleToday'
import BigScore from './BigScore'
import {connect} from 'react-redux'

class ContentHeader extends Component {
    render() {
        if(this.props.nav === 'schedule' || this.props.nav === ''){
            return (
                <div className="ContentHeader">
                    <ScheduleToday />
                </div>
            )
        }
        else if(this.props.nav === 'view'){
            return (
                <div className="ContentHeader">
                    <BigScore />
                </div>
            )
        }
        else{
            return (
                <div className="ContentHeader">
                    <BigScore />
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        nav: state.click.nav
    }
}

export default connect(mapStateToProps)(ContentHeader)