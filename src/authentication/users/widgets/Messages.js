import React from 'react'
import messages from '../../../assets/messages.png'
import {matches} from '../state/actions/MatchesAction'
import {connect} from 'react-redux'
import UsersLoading from '../loader/UsersLoading'
import { Grid, Typography } from '@material-ui/core'
import UsersCard from './UsersCard'

class Messages extends React.Component{

    componentDidMount(){

    }

    render() {
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (<UsersLoading/>)
                    :
                        (
                            <div>
                                {
                                    this.props.likes.length>0
                                    ?
                                        (
                                            <Grid container spacing={2}>
                                                {
                                                    this.props.likes.map(like=>(
                                                        <Grid key={like.id} item md={12} xs={12} sm={12}>
                                                            <UsersCard matches={like}/>
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>
                                        )
                                    :
                                        (
                                            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            
                                            <img src={messages}/>
                                                <Typography component={'span'}  variant={'h5'}>
                                                    Say Hi
                                                </Typography>
                                                <Typography component={'span'}  style={{textAlign:'center',textJustify:'inter-word'}}>
                                                    Looking to strike up the conversation? When you match with others
                                                    you can send them a message under "Matches"
                                                </Typography>
                                            </div>
                                        )
                                }
                            </div>
                        )
                }
            </div>
        )
    }
}


const mapStateToProps = state=>({
    likes:state.authReducer.usersReducer.MatchesReducer.likes,
    loading:state.authReducer.usersReducer.MatchesReducer.loading
})

export default connect(mapStateToProps,{matches})(Messages)