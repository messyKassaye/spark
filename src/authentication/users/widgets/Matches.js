import React from 'react'
import {matches} from '../state/actions/MatchesAction'
import {connect} from 'react-redux'
import UsersLoading from '../loader/UsersLoading'
import { Grid, Typography } from '@material-ui/core'
import UsersCard from './UsersCard'
import matches_icon from '../../../assets/matches_icon.png'
import MatchesCard from './MatchesCard'
class Matches extends React.Component{

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
                            <div>
                                
                                {
                                    this.props.likes.length>0
                                    ?
                                        (
                                            <Grid container spacing={2}>
                                                {
                                                    this.props.likes.map(like=>(
                                                        <Grid key={like.id} item md={6} xs={6} sm={6}>
                                                            <MatchesCard matches={like}/>
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>
                                        )
                                    :
                                        (
                                            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                                <img src={matches_icon} width={150} height={200}/>
                                                <Typography component={'span'} variant={'h5'}>
                                                    Start Matching
                                                </Typography>
                                                <Typography component={'span'}  style={{textAlign:'center',textJustify:'inter-word'}}>
                                                    Matches will apear here once you start Like people.
                                                    You can message them directly here when you are ready to 
                                                    spark up the conversation
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

export default connect(mapStateToProps,{matches})(Matches)