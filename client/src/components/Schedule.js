import React, { Component } from 'react';
import {connect} from 'react-redux'
import Red from '../img/Red.jpg'
import Blue from '../img/Blue.jpg'
import Green from '../img/Green.jpg'
import Yellow from '../img/Yellow.jpg'
import axios from 'axios'

class Schedule extends Component {
    constructor(props){
        super(props)
        this.state = {
            schedule:null
        }
    }

    componentWillMount(){
        axios.get('/getschedule/12-5-2019')
        .then((res) => {
            if(res.data.length > 0){
                this.setState({schedule: res.data})
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    GetMacth = (key) => {
        this.props.SendScheduleData(this.state.schedule[key])
        this.props.SetSelected({
            schedule : '',
            view : 'selected',
            replay : ''
        })
        this.props.SetNavSelected('view')
    }

    printDataLeft = () => {
        if(this.state.schedule !== null){
            var schedule = [];
            for (let i = 0; i < 5; i++) {
                if((new Date().getHours() - (new Date(this.state.schedule[i].date + ', ' + this.state.schedule[i].time)).getHours() >= 0) && (new Date().getHours() - (new Date(this.state.schedule[i].date + ', ' + this.state.schedule[i].time)).getHours() <= (1))){
                    schedule.push(
                        <div className={"match " + this.props.theme} style={{width: '100%'}} onClick={() => this.GetMacth(i)}>
                            <div style={{display: 'inline-block', width: 'calc((100% - 43.5px) / 2)', textAlign: 'right'}}>
                                <span className="teamHome">{this.state.schedule[i].teamHome}</span>
                                <span className={"logo50 " + this.state.schedule[i].abbrTeamHome + '50'} />
                            </div>
                            <span className="time" style={{border: '1px solid red', color: 'red', backgroundColor: 'white'}}>{'LIVE'}</span>
                            <div style={{display: 'inline-block', width: 'calc((100% - 43.5px) / 2)'}}>
                                <span className={"logo50 " + this.state.schedule[i].abbrTeamWay + '50'} />
                                <span className="teamWay">{this.state.schedule[i].teamWay}</span>
                            </div>
                        </div>
                    );
                }
                else{
                    schedule.push(
                        <div className={"match " + this.props.theme} style={{width: '100%'}} onClick={() => this.GetMacth(i)}>
                            <div style={{display: 'inline-block', width: 'calc((100% - 43.5px) / 2)', textAlign: 'right'}}>
                                <span className="teamHome">{this.state.schedule[i].teamHome}</span>
                                <span className={"logo50 " + this.state.schedule[i].abbrTeamHome + '50'} />
                            </div>
                            <span className="time">{this.state.schedule[i].time}</span>
                            <div style={{display: 'inline-block', width: 'calc((100% - 43.5px) / 2)'}}>
                                <span className={"logo50 " + this.state.schedule[i].abbrTeamWay + '50'} />
                                <span className="teamWay">{this.state.schedule[i].teamWay}</span>
                            </div>
                        </div>
                    );
                }
            }
            return schedule;
        }
    }

    printDataRight = () => {
        if(this.state.schedule !== null){
            var schedule = [];
            for (let i = 5; i < 10; i++) {
                if((new Date().getHours() - (new Date(this.state.schedule[i].date + ', ' + this.state.schedule[i].time)).getHours() >= 0) && (new Date().getHours() - (new Date(this.state.schedule[i].date + ', ' + this.state.schedule[i].time)).getHours() <= (1))){
                    schedule.push(
                        <div className={"match " + this.props.theme} style={{width: '100%'}} onClick={() => this.GetMacth(i)}>
                            <div style={{display: 'inline-block', width: 'calc((100% - 43.5px) / 2)', textAlign: 'right'}}>
                                <span className="teamHome">{this.state.schedule[i].teamHome}</span>
                                <span className={"logo50 " + this.state.schedule[i].abbrTeamHome + '50'} />
                            </div>
                            <span className="time" style={{border: '1px solid red', color: 'red', backgroundColor: 'white'}}>{'LIVE'}</span>
                            <div style={{display: 'inline-block', width: 'calc((100% - 43.5px) / 2)'}}>
                                <span className={"logo50 " + this.state.schedule[i].abbrTeamWay + '50'} />
                                <span className="teamWay">{this.state.schedule[i].teamWay}</span>
                            </div>
                        </div>
                    );
                }
                else{
                    schedule.push(
                        <div className={"match " + this.props.theme} style={{width: '100%'}} onClick={() => this.GetMacth(i)}>
                            <div style={{display: 'inline-block', width: 'calc((100% - 43.5px) / 2)', textAlign: 'right'}}>
                                <span className="teamHome">{this.state.schedule[i].teamHome}</span>
                                <span className={"logo50 " + this.state.schedule[i].abbrTeamHome + '50'} />
                            </div>
                            <span className="time">{this.state.schedule[i].time}</span>
                            <div style={{display: 'inline-block', width: 'calc((100% - 43.5px) / 2)'}}>
                                <span className={"logo50 " + this.state.schedule[i].abbrTeamWay + '50'} />
                                <span className="teamWay">{this.state.schedule[i].teamWay}</span>
                            </div>
                        </div>
                    );
                }
            }
            return schedule;
        }
    }

    render() {

        var styleBackGround
        if(this.props.theme === 'Blue'){
            styleBackGround = {backgroundImage: `url(${Blue})`, backgroundSize: 'cover'}
        }
        else if(this.props.theme === 'Green'){
            styleBackGround = {backgroundImage: `url(${Green})`, backgroundSize: 'cover'}
        }
        else if(this.props.theme === 'Yellow'){
            styleBackGround = {backgroundImage: `url(${Yellow})`, backgroundSize: 'cover'}
        }
        else{
            styleBackGround = {backgroundImage: `url(${Red})`, backgroundSize: 'cover'}
        }

        return (
            <div className="CContent" style={styleBackGround}>
                <div className="allMatch Left">
                    {this.printDataLeft()}
                </div>
                <div className="allMatch Right">
                    {this.printDataRight()}
                </div>
                <marquee style={{position: 'absolute', bottom: '0', backgroundColor: 'white'}} ><a href={'http://Fabet.com'}>Fabet.com</a> - Nhà cái hàng đầu khu vực. Truy cập ngay để nhận thưởng hấp dẫn !</marquee>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        theme: state.setting.theme
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SendScheduleData: (live) => {
            dispatch({type: "LIVE", live})
        },
        SetNavSelected: (nav) => {
            dispatch({type:"CLICK_NAV", nav})
        },
        SetSelected: (selected) => {
            dispatch({type:"SETTING", selected})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)