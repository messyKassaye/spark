import { Avatar, Button, Card, CardHeader, Typography } from '@material-ui/core'
import React from 'react'
import logo from '../../../assets/logo.png'
import {showMainDialog} from '../../commons/state/actions/dialogActions'
import {connect} from 'react-redux'
class ChatHeader extends React.Component{

    closeDialog = ()=>{
        this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
    }
    render() {
        return (
            <Card elevation={0}>
                <CardHeader
                 title={
                     <Typography variant={'h5'}>
                         {this.props.user.name}
                     </Typography>
                 }
                 avatar={
                     <Avatar src={this.props.user.profile_pic_path}/>
                 }
                 action={
                    <Button
                     onClick={this.closeDialog}
                     style={{marginTop:10}}
                     variant={'text'}
                     color={'primary'}
                    >
                        close
                    </Button>
                 }
                />
            </Card>
        )
    }
}

export default connect(null,{showMainDialog})(ChatHeader)