import { Card, CardContent, IconButton, Input, Typography } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import React from 'react'
import {connect} from 'react-redux'
import {me} from '../../state/actions/usersActions'
import Pusher from 'pusher-js'

class ChatBoard extends React.Component{

    componentDidMount(){
        this.props.me()
        console.log('Hello worldssss')
    let PUSHER_APP_KEY = "c294beff32419272612c"
    let pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: 'ap2',
      forceTLS: true
    });

    let channel = pusher.subscribe('accident-on');
    channel.bind('all-accidents',(data)=>{
        console.log(`Pusher ${data}`)
    });

    }

    render() {
        return (
            <div style={{height:'100vh'}}>
                
                <div style={{position:'absolute',bottom:0}}>
                   <Card elevation={0}>
                       <CardContent style={{padding:0}}>
                         <Input 
                          placeholder="Write your message..."
                          style={{width:'80vw'}}
                         />
                         <IconButton color={'primary'}>
                            <Send/>
                         </IconButton>
                       </CardContent>
                   </Card>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading
})

export default connect(mapStateToProps,{me})(ChatBoard)