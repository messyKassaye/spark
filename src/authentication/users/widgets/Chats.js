import React from 'react'
import Pusher from 'pusher-js'
import { Typography } from '@material-ui/core';

class Chats extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            chats:[]
        }
    }
    

    componentDidMount(){

        let PUSHER_APP_KEY = "52d240141d3de6310e4e"
        let pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: 'ap2',
        forceTLS: true
        });
        
        let channel = pusher.subscribe(`channel-${this.sumId(this.props.user.attribute.id,this.props.chatUser.attribute.id)}`);
        channel.bind(`broadcast-${this.sumId(this.props.user.attribute.id,this.props.chatUser.attribute.id)}`,(data)=>{
        this.showData(data)
        console.log(`message:${data.id}`)

        });
    }

    sumId = (id1,id2)=>{
        return Number(id1)+Number(id2);
    }

    showData = (data)=>{
        const {chats} = this.state
        chats.push(data)
        this.setState(chats)
    }

    render() {
        return (
            <div>
                {
                    this.state.chats.map(chat=>(
                    <Typography>{chat.message}</Typography>
                    ))
                }
            </div>
        )
    }
}

export default Chats