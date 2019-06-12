import React, { Component } from 'react';
import {connect} from 'react-redux'

class SideBarNav extends Component {

    constructor(props){
        super(props)
        this.state = {
            theme : 'Red',
            selected : {
                schedule : 'selected',
                view : '',
                replay : ''
            },
            full: {
                value: false,
                name: 'Full màn hình',
            }
        }
    }

    GetClick = (nav) => {
        if(nav !== 'user'){
            this.setState({selected : {[nav]:'selected'}})
            //console.log(this.state)
            this.props.SetNavSelected(nav)
        }
        else{
            this.props.setClickLogin(true);
        }
    }

    GetSetting = () => {
        this.props.SetSetting(!this.state.full.value)
        if(this.state.full.value === true){
            this.setState({full: {name: 'Full màn hình', value: !this.state.full.value}})
        }
        else{
            this.setState({full: {name: 'Thu nhỏ màn hình', value: !this.state.full.value}})
        }
    }

    GetTheme = (event, color) => {
        this.setState({theme: color})
        this.props.SetTheme(color)
    }

    render() {
        return (
            <div className={"sideBarNav " + this.state.theme + "Nav"} >
                <div className="nav user" >
                    <span className="img avatar" onClick={() => this.GetClick('user')}/>
                </div>
                <div className={"nav LTD " + this.state.selected.schedule}>
                    <span className="img schedule" onClick={() => this.GetClick('schedule')}/>
                </div>
                <div className={"nav view " + this.state.selected.view}>
                    <span className="img TV" onClick={() => this.GetClick('view')}/>
                </div>
                <div className={"nav replay " + this.state.selected.replay}>
                    <span className="img RP" onClick={() => this.GetClick('replay')}/>
                </div>
                <div className="nav setting dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="img ST" />
                </div>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Ping</a>
                    <a className="dropdown-item" href="#" onClick={() => this.GetSetting()}>{this.state.full.name}</a>
                    <a className="dropdown-item dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">Đổi Giao Diện</a>
                    <div className="dropdown-menu" style={{left: '145px'}}>
                        <a className="dropdown-item" onClick={(event) => this.GetTheme(event, 'Red')}>Đỏ</a>
                        <a className="dropdown-item" onClick={(event) => this.GetTheme(event, 'Green')}>Xanh</a>
                        <a className="dropdown-item" onClick={(event) => this.GetTheme(event, 'Yellow')}>Vàng</a>
                        <a className="dropdown-item" onClick={(event) => this.GetTheme(event, 'Blue')}>Xanh Dương</a>
                    </div>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#">Đăng Xuất</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        status: state.click.nav
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SetNavSelected: (nav) => {
            dispatch({type:"CLICK_NAV", nav})
        },
        setClickLogin: (login) => {
            dispatch({type:"CLICK_LOGIN", login})
        },
        SetSetting: (full) => {
            dispatch({type:"SETTING", full})
        },
        SetTheme: (theme) => {
            dispatch({type:"SETTING", theme})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarNav)