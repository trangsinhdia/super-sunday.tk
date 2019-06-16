import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios'

class Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            table:null
        }
    }

    componentWillMount(){
        axios.get('/gettable/Premier League')
        .then((res) => {
            if(res.data.name !== 'MongoError'){
                this.setState({table: res.data})
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getDataLeague = (league) => {
        axios.get('/gettable/' + league)
        .then((res) => {
            if(res.data.name !== 'MongoError'){
                this.setState({table: res.data})
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    printData = () => {
        if(this.state.table !== null){
            return this.state.table.map((element, key) => 
                <tr key={key}>
                    <td className="pos">
                        <span className="value">{element.pos}</span>
                    </td>
                    <td className="team">
                    <a href="">
                        <span className={"logo20 " + element.abbr} />{element.teamName}
                    </a>
                    </td>
                    <td className="ST">{element.played}</td>
                    <td className="HS">{element.goalsDefference}</td>
                    <td className="Đ" style={{fontWeight: 'bold'}}>{element.points}</td>
                </tr>
            )
        }
    }

    render() {
        return (
            <div style={{height: '100%', wight: '100%'}}>
                <div className="CLContentHeader BXHHeader">
                    <span className="CLContentTitle BXHTitle">BXH</span>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons" style={{margin: '0.5rem 0 0.5rem 1rem'}}>
                        <label className={"btn active " + this.props.theme} onClick={() => {this.getDataLeague('Premier League')}}>
                            <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked />Premier League
                        </label>
                        <label className={"btn " + this.props.theme} onClick={() => {this.getDataLeague('La Liga')}}>
                            <input type="radio" name="options" id="option2" autoComplete="off"/>La liga
                        </label>
                        <label className={"btn " + this.props.theme} onClick={() => {this.getDataLeague('Serie A')}}>
                            <input type="radio" name="options" id="option3" autoComplete="off"/>Serie A
                        </label>
                    </div>
                </div>
                <div className="BXH">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                <abbr title="Thứ tự">TT</abbr>
                            </th>
                            <th className="team">
                            Club
                            </th>
                            <th title="Số trận">ST</th>
                            <th title="Hiệu số">HS</th>
                            <th title="Điểm">Đ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.printData()}
                        </tbody>
                    </table>
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

export default connect(mapStateToProps)(Table)