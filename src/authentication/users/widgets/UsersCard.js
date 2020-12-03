import { Avatar, Card, CardHeader, Divider, IconButton } from '@material-ui/core'
import { Chat } from '@material-ui/icons'
import React from 'react'
import {connect} from 'react-redux'
import {showMainDialog} from '../../commons/state/actions/dialogActions'
import ChatRoom from './ChatRoom'
import ChatHeader from './ChatHeader'
import {Link} from 'react-router-dom'
class UsersCard extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            startChatting:false
        }
    }

    
    render() {
        const matches = this.props.matches
        return (
            <Card style={{textDecoration:'none'}} elevation={0} component={Link} to={`/auth/messages/${matches.user.id}`}>
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