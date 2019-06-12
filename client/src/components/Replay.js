import React, { Component } from 'react';
import {connect} from 'react-redux'

class Replay extends Component {
    render() {
        if(this.props.replay){
            return (
                <div className='replayPlayer'><iframe src={this.props.replay.link} frameBorder={0} width="100%" height="100%" allowFullScreen allow="autoplay; fullscreen" style={{width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden'}} /></div>
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

export default connect(mapStateToProps)(Replay)