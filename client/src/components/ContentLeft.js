import React, { Component } from 'react';
import User from './User';
import CLContent from './CLContent';

class ContentLeft extends Component {
    render() {
        return (
            <div className="ContentLeft">
                <User />
                <CLContent />
            </div>
        );
    }
}

export default ContentLeft;