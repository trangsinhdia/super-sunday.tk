import React, { Component } from 'react';
import background from '../img/premier_league_pattern.gif'

class Videojs extends Component {

    componentDidMount(){
        var player = window.videojs(this.refs.videojs)
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
                    poster={background}
                    data-setup='{"techorder" : ["flash","html5] }'>
                    <source src="http://supersunday.zapto.org:8000/live/tutc.flv" type="video/x-flv"></source>
                </video>
            </div>
        );
    }
}

export default Videojs;