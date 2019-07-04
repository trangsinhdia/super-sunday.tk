import React, { Component } from 'react';
import {connect} from 'react-redux'

class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: null,
        }
    }

    User = () => {
        if(this.props.session === null){
            return (
                <button type="button" className={"btnUserName btn dropdown-toggle " + this.props.theme} aria-haspopup="true" aria-expanded="false">
                    {'Hi Guest!'}
                </button>
            )
        }
        else{
            return (
                <button type="button" className={"btnUserName btn dropdown-toggle " + this.props.theme} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.session.username}
                </button>
            )
        }
    }

    ChangePassword = () => {
        console.log('sfasfsdfas')
        this.props.SetChangePassword(true)
    }

    render() {
        return (
            <div className="User">
                <div className="btn-group">
                    <this.User />
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Thông tin</a>
                        <a className="dropdown-item" href="#" onClick={this.ChangePassword}>Đổi mật khẩu</a>
                        <a className="dropdown-item" href="#">Đổi Email</a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">Đăng Xuất</a>
                    </div>
                </div>
                <div style={{marginTop: '14px', marginBottom: '3px'}}>
                    <fieldset className="inputChat">
                        <input style={{background: 'white'}} type="text" placeholder="Tìm kiếm" autoComplete="off" required />
                        <hr />
                    </fieldset>
                    <div className="material-icons right">search</div>
                </div>
                {/* <span class="titleBXH"></span> */}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        theme: state.setting.theme,
        session: state.session
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SetChangePassword: (changePassword) => {
            dispatch({type: "CLICK_CHANGEPASSWORD", changePassword})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)