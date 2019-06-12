import React, { Component } from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux'

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: ''
        }
    }

    componentWillMount() {
        this.socket = io('localhost:3002');
        this.socket.on('id', res => console.log(res)) // lắng nghe event có tên 'id'
        this.socket.on('newMessage', (response) => {
            const messages = this.state.messages
            messages.push(response)
            this.setState(messages)
        }); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
    }

    componentDidMount() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate(){
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    
    NewMessage = () => {
        console.log(this.state.messages)
        if(this.state.messages.length > 0){
            return this.state.messages.map((element, key) =>
                <div key={key}>
                    <div>
                        <div className="img avatarChat"></div>
                        <div className="usernameChat">{element.username}</div>
                    </div>
                    <span className={"message " + this.props.theme}>{element.message}</span>
                </div>
            )
        }
        else{
            return null
        }
    }

    sendnewMessage = () => {
        if (this.state.message) {
            this.socket.emit("newMessage", this.state.message, this.props.session.username); //gửi event về server
        }
    }

    FooterChat = () => {
        if(this.props.session === null){
            return (
                <div className="footerChat">
                    <div className="profileChat">
                        <span className="img avatarChat" />
                        <span className="usernameChat">trangsinhdia</span>
                    </div>
                    <div style={{width: '100%'}}>
                        <div className="loginToChat">Đăng nhập để trò chuyện!</div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="footerChat">
                    <div className="profileChat">
                        <span className="img avatarChat" />
                        <span className="usernameChat">trangsinhdia</span>
                    </div>
                    <div style={{height: '22px'}}>
                        <fieldset className="inputChat">
                            <input type="text" placeholder="Hãy nói điều gì đó...!" onChange={(event) => {this.setState({message: event.target.value})}} autoComplete="off" required />
                            <hr />
                        </fieldset>
                        <div className="material-icons right" onClick={this.sendnewMessage}>send</div>
                    </div>
                    <div className="chatHidden">Ẩn Chat</div>
                </div>
            )
        }
    }

    render() {
        return (
            <div style={{height: '100%', wight: '100%'}}>
                <div className="CLContentHeader ChatHeader">
                    <span className="CLContentTitle ChatTitle">Chat</span>
                </div>
                <div className="chat">
                    <div className="chatContent">
                        {this.NewMessage()}
                    </div>
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
                <this.FooterChat />
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

export default connect(mapStateToProps)(Chat)