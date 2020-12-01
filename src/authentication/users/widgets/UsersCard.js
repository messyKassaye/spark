import { Avatar, Card, CardHeader, Divider, IconButton } from '@material-ui/core'
import { Chat } from '@material-ui/icons'
import React from 'react'
import {connect} from 'react-redux'
import {showMainDialog} from '../../commons/state/actions/dialogActions'
import ChatBoard from './ChatBoard'
import ChatHeader from './ChatHeader'
class UsersCard extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            startChatting:false
        }
    }

    chatsOn = (user)=>{
        this.props.showMainDialog({
            show:true,
            maxWidth:'sm',
            page:<ChatBoard/>,
            headers:true,
            headerComponent:<ChatHeader user={user}/>,
            title:null,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }
    
    render() {
        const matches = this.props.matches
        return (
            <Card style={{backgroundColor:'transparent'}} elevation={0} onClick={()=>this.chatsOn(matches.user)}>
                <CardHeader
                 avatar={<Avatar src={matches.user.profile_pic_path}></Avatar>}
                 title={matches.user.name}
                 subheader={`Say hi to ${matches.user.name}`}
                />
                <Divider/>
            </Card>
        )
    }
}

export default connect(null,{showMainDialog})(UsersCard)