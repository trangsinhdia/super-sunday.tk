import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {connect} from 'react-redux'
 
class App extends React.Component {
  createNotification = (type) => {
    setTimeout(() => {
        switch (this.props.notification.type) {
            case 'info':
              NotificationManager.info('Info message');
              break;
            case 'success':
              NotificationManager.success(this.props.notification.message, 'Success');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
        }
    }, 0);
  };
 
  render() {
    return (
      <div>
        <NotificationContainer/>
        {this.createNotification()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notification: state.notification
    }
}
 
export default connect(mapStateToProps)(App)