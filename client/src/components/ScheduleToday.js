import React, { Component } from 'react';

class ScheduleToday extends Component {
    render() {
        return (
            <div style={{height: '100%', wight: '100%', display: 'flex'}}>
                <span className="ContentHeaderLogo"></span>
                <div>
                    <span className="HeaderContentTitle">Lịch Thi Đấu Hôm Nay</span>
                    <span className="HeaderContentTime">T7 - 28/4/2019</span>
                </div>
            </div>
        );
    }
}

export default ScheduleToday;