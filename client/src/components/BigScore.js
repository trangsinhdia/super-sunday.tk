import React, { Component } from 'react';
import {connect} from 'react-redux'

class BigScore extends Component {
    render() {
        if(this.props.replay){
            return (
                <div className="teamContainer">
                    <span className={"logo50 " + this.props.replay.abbrTeamHome + '50'} />
                    <span className="teamHome">{this.props.replay.teamHome}</span>
                    <span className="time">{this.props.replay.score.teamHome + ' - ' + this.props.replay.score.teamWay}</span>
                    <span className="teamWay">{this.props.replay.teamWay}</span>
                    <span className={"logo50 " + this.props.replay.abbrTeamWay + '50'} />
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
        replay: state.replay
    }
}

export default connect(mapStateToProps)(BigScore)