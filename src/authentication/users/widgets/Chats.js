import React from 'react'
import Pusher from 'pusher-js'
import { CardContent, IconButton, Input, Typography } from '@material-ui/core';
import RightMessage from './RightMessage';
import LeftMessage from './LeftMessage';
import { Send } from '@material-ui/icons';
import {storeChats} from '../state/actions/ChatAction'
import {connect} from 'react-redux'
class Chats extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            chats:[],
            scrollTop:2,
            formData:{
                'sender':'',
                'message':'',
                'receiver':''
            }
        }

        this.inputRef = React.createRef()
    }
    

    componentDidMount(){
        this.scrollToTop()
        const {chats} = this.state
        chats.push.apply(this.state.chats,this.props.chats)
        this.setState(chats)
        
        let PUSHER_APP_KEY = "52d240141d3de6310e4e"
        let pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: 'ap2',
        forceTLS: true
        });
        
        let channel = pusher.subscribe(`channel-${this.sumId(this.props.user.attribute.id,this.props.chatUser.attribute.id)}`);
        channel.bind(`broadcast-${this.sumId(this.props.user.attribute.id,this.props.chatUser.attribute.id)}`,(data)=>{
          this.showData(data)
        });
    }

    componentDidUpdate(){
        this.scrollToTop()
    }

    handleClick = ()=>{
        this.scrollToTop()

        const currentMessage = {
            sender: this.props.user.attribute.id,
            receiver: this.props.chatUser.attribute.id,
            message:this.state.formData.message
        }
        this.props.storeChats(currentMessage)

        const {formData} = this.state
        formData['message'] = ''
        this.setState(formData)

    }

    handleChange = event=>{
        const{formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    scrollToTop = ()=>{
        this.container.scrollTop +=500;
    }
    sumId = (id1,id2)=>{
        return Number(id1)+Number(id2);
    }

    showData = (data)=>{
       this.props.chats.push(data)
    }

    handleOnKeyDown = event=>{
        if (event.keyCode === 13) {
            this.handleClick()
          }
    }

    render() {
        return (
            <CardContent>
                <div style={{height:'80vh',overflowY:'scroll'}} ref={ el => this.container = el}>
                {
                    this.props.chats.map(chat=>{
                        return chat.sender===this.props.user.attribute.id
                        ?
                            (
                                 <RightMessage chat={chat}/>
                            )
                        :
                            (
                                 <LeftMessage chat={chat}/>
                            )
                    })
                }
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <Input
                    autoComplete={'off'}
                    onKeyUp={this.handleOnKeyDown}
                    ref={this.inputRef}
                    style={{width:'90%'}}
                    onChange={this.handleChange}
                    name={'message'}
                    value={this.state.formData.message}
                    placeholder={'Write your message...'}
                    />
                    <IconButton onClick={this.handleClick} color={'primary'}>
                        <Send/>
                    </IconButton>
                </div>
            </CardContent>
        )
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.usersReducer.chatReducer.response
})

export default connect(mapStateToProps,{storeChats})(Chats)