import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios'

class ReplayList extends Component {
    constructor(props){
        super(props)
        this.state = {
            replayList:null
        }
    }

    componentWillMount(){
        axios.get('/getreplay')
        .then(res => {
            this.setState({replayList: res.data})
            this.props.SendReplayData(res.data[0])
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    GetMatch =(key) => {
        console.log(this.state.replayList[key])
        this.props.SendReplayData(this.state.replayList[key])
    }

    printData = () => {
        if(this.state.replayList !== null){
            return this.state.replayList.map((element, key) => 
                <div style={{cursor: 'pointer'}} className={"pvp " + this.props.theme} onClick={() => {this.GetMatch(key)}} key={key}>
                    <div style={{width: '100%'}}>
                        <div className="teamName" style={{display: 'inline-block', width: 'calc((100% - 38px) / 2)', textAlign: 'right'}}>
                            <abbr title="Souhamton">{element.teamHome}</abbr>
                            <span className={"logo20 " + element.abbrTeamHome} />
                        </div>
                        <span className="score">{element.score.teamHome}<span> - </span>{element.score.teamWay}</span>
                        <div className="teamName" style={{display: 'inline-block', width: 'calc((100% - 38px) / 2)'}}>
                        <span className={"logo20 " + element.abbrTeamWay} />
                            <abbr title="Liverpool">{element.teamWay}</abbr>
                        </div>
                    </div>
                    {/* <div className="arrow-right" /> */}
                </div>
            )
        }
    }

    render() {
        return (
            <div style={{height: '100%', wight: '100%'}}>
                <div className="CLContentHeader ReplayHeader">
                    <span className="CLContentTitle ReplayTitle">Highlight trận đấu</span>
                </div>
                <div className="replayList">
                    {this.printData()}
                </div>
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
        SendReplayData: (replay) => {
            dispatch({type: "REPLAY", replay})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplayList)