import { Grid } from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'
import UsersLoading from '../loader/UsersLoading'
import {matches} from '../state/actions/MatchesAction'
import UsersCard from './UsersCard'

class ChatUsersList extends React.Component{

    componentDidMount(){
        this.props.matches()
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
                }
            </div>
        )
    }
}

const mapStateToProps = state=>({
    likes:state.authReducer.usersReducer.MatchesReducer.likes,
    loading:state.authReducer.usersReducer.MatchesReducer.loading
})

export default connect(mapStateToProps,{matches})(ChatUsersList)