import React, { Component } from 'react';
import {connect} from 'react-redux'
import background from '../img/premier_league_pattern.gif'

class Videojs extends Component {

    componentDidMount(){
        var player = window.videojs(this.refs.videojs, {
            techOrder: ["html5", "flash"]
        })
        setTimeout(() => {
            if(player.isReady_ === false){
                console.log(player)
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
                console.log(player)
                this.props.setNotification('error', 'Vui lòng bật Flash player!')
            }
        }, 1000)
    }

    render() {
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setNotification: (typeN, message) => {
            dispatch({type: "NOTIFICATION", typeN, message})
        }
    }
}

export default connect(null, mapDispatchToProps)(Videojs)