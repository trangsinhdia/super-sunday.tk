import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import ReactJWPlayer from 'react-jw-player';
import background from '../img/premier_league_pattern.gif'
import $ from 'jquery';

const displayName = 'ReactJWPlayerContainer';
 
const propTypes = {
  playlist: PropTypes.string.isRequired,
  playerScript: PropTypes.string.isRequired
};
 
class ReactJWPlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoTitle: '',
    };
 
    this.onAdPlay = this.onAdPlay.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onVideoLoad = this.onVideoLoad.bind(this);
 
    // each instance of <ReactJWPlayer> needs a unique id.
    // we randomly generate it here and assign to the container instance.
  }

  componentDidMount(){
    this.props.SetSpinner(false)
  }

  componentDidUpdate(){
    let player = $('.jw-aspect.jw-reset');
    $(player[0]).css({'padding-top': '0'})
  }

  onReady(event) {
    // interact with JW Player API here
    const player = window.jwplayer(this.playerId);
  }
  onAdPlay(event) {
    // track the ad play here
  }
  onVideoLoad(event) {
    this.setState({
      videoTitle: event.item.description // this only works with json feeds!
    });
  }
  render() {
    return (
      <div className='react-jw-player-container'>
        <ReactJWPlayer
            className='jwplayer'
            image = {background}
            playlist={this.props.playlist}
            file='https://wowzaec2demo.streamlock.net/live/bigbuckbunny/playlist.m3u8'
            onAdPlay={this.onAdPlay}
            onReady={this.onReady}
            onVideoLoad={this.onVideoLoad}
            playerId={'player-1'} // bring in the randomly generated playerId
            playerScript='https://cdn.jwplayer.com/libraries/VvDLH2vm.js'
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      spinner: state.spinner,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    SetSpinner: (spinner) => {
      dispatch({type: "SPINNER", spinner})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactJWPlayerContainer)