import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios'

class SideBarNav extends Component {

    constructor(props){
        super(props)
        this.state = {
            full: {
                value: false,
                name: 'Full màn hình',
            }
        }
    }

    GetClick = (nav) => {
        if(nav !== 'user'){
            this.props.SetSelected({[nav]:'selected'})
            this.props.SetNavSelected(nav)
        }
        else{
            this.props.setClickLogin(true);
        }
    }

    componentWillMount(){
        axios.get('/home').then((res) => {
            if(res.data.state === 'Login Success'){
                this.props.setSession(res.data.profile)
                this.props.SetTheme(this.props.session.reference.theme)
            }
        }).catch((err) => {
            console.log(err)
        })
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

    SaveSetting = (event, color) => {
        this.props.SetTheme(color)
        if(this.props.session){
            axios.post('/users', {
                email: this.props.session.email,
                setting: {
                    theme: color
                }
            })
            .then((response) => {
                console.log(response)
                if(response.data === 'Setting saved'){
                    this.props.setNotification('success', 'Lưu cài đặt thành công!')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    LogOut = () => {
        axios.get('/logout').then((res) => {
            if(res.data === 'Logout'){
                this.props.setSession(null)
                this.props.SetTheme('Red')
                this.props.setNotification('success', 'Đăng xuất thành công!')
            }
        })
    }

    render() {
        return (
            <div className={"sideBarNav " + this.props.theme + "Nav"} >
                <div className="nav user" >
                    <span className="img avatar" onClick={() => this.GetClick('user')}/>
                </div>
                <div className={"nav LTD " + this.props.selected.schedule}>
                    <span className="img schedule" onClick={() => this.GetClick('schedule')}/>
                </div>
                <div className={"nav view " + this.props.selected.view}>
                    <span className="img TV" onClick={() => this.GetClick('view')}/>
                </div>
                <div className={"nav replay " + this.props.selected.replay}>
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
                        <a className="dropdown-item" onClick={(event) => this.SaveSetting(event, 'Red')}>Đỏ</a>
                        <a className="dropdown-item" onClick={(event) => this.SaveSetting(event, 'Green')}>Xanh</a>
                        <a className="dropdown-item" onClick={(event) => this.SaveSetting(event, 'Yellow')}>Vàng</a>
                        <a className="dropdown-item" onClick={(event) => this.SaveSetting(event, 'Blue')}>Xanh Dương</a>
                    </div>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" onClick={this.LogOut}>Đăng Xuất</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        status: state.click.nav,
        selected: state.setting.selected,
        session: state.session,
        theme: state.setting.theme
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
        },
        SetSelected: (selected) => {
            dispatch({type:"SETTING", selected})
        },
        setSession: (session) => {
            dispatch({type: "SESSION", session})
        },
        setNotification: (typeN, message) => {
            dispatch({type: "NOTIFICATION", typeN, message})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarNav)