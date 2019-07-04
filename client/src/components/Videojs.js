import React, { Component } from 'react';
import {connect} from 'react-redux'
import background from '../img/premier_league_pattern.gif'

class Videojs extends Component {
    constructor(props){
        super(props)
        this.state = {
            live:null
        }
    }

    componentDidMount(){
        var player = window.videojs(this.refs.videojs, {
            techOrder: ["html5", "flash"]
        })
        setTimeout(() => {
            if(player.isReady_ === false){
                this.props.setNotification('error', 'Vui lòng bật Flash player!')
            }
        }, 1000)
    }

    componentDidUpdate(){
        var player = window.videojs(this.refs.videojs, {
            techOrder: ["html5", "flash"]
        })
        setTimeout(() => {
            if(player.isReady_ === false){
                this.props.setNotification('error', 'Vui lòng bật Flash player!')
            }
        }, 1000)
    }

    render() {
        if(this.props.live){
            return (
                <div className="videojsContainer">
                    <video
                        ref="videojs"
                        id="my-player"
                        class="video-js vjs-default-skin vjs-big-play-centered"
                        controls
                        autoplay
                        preload="auto"
                        poster={background}>
                        <source src={this.props.live.link} type="rtmp/mp4"></source>
                    </video>
                </div>
            );
        }
        else{
            return (
                <div className="videojsContainer">
                    <video
                        ref="videojs"
                        id="my-player"
                        class="video-js vjs-default-skin vjs-big-play-centered"
                        controls
                        autoplay
                        preload="auto"
                        poster={background}>
                        <source src="http://supersunday.zapto.org:8000/live/tutc.flv" type="video/x-flv"></source>
                    </video>
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        live: state.live
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setNotification: (typeN, message) => {
            dispatch({type: "NOTIFICATION", typeN, message})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Videojs)