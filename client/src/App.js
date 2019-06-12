import {connect} from 'react-redux'
import SideBarNav from './components/NavComponent';
import ContentLeft from './components/ContentLeft';
import Content from './components/Content';
import Dialog from './components/Dialog'
import React, { Component } from 'react';
import Notification from './components/Notification'
import {NotificationContainer} from 'react-notifications';
// import Spinner from './components/Spinner';

class App extends Component {

  SSApp = () => {
    //console.log(this.props)
    if(this.props.fullST){
      return (
        <div className="app" style={{top: '0%', right: '0%', bottom: '0%', left: '0%'}}>
          <div className="row" style={{height: '100%', margin: 0}}>
            <SideBarNav />
            <ContentLeft />
            <Content />
            <Dialog />
            <Notification />
          </div>
        </div>
      );
    }
    else{
      return (
        <div className="app">
          <div className="row" style={{height: '100%', margin: 0}}>
            <SideBarNav />
            <ContentLeft />
            <Content />
            <Dialog />
            <Notification />
            {/* <Spinner /> */}
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <this.SSApp />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fullST: state.setting.full
  }
}

export default connect(mapStateToProps)(App)