import React from 'react'
import PostCard from './widgets/PostCard'
import {connect} from 'react-redux'
import {indexPost} from './state/actions/PostAction'
import { Skeleton } from '@material-ui/lab'
import { grey } from '@material-ui/core/colors'
import SparkLoader from './loader/sparkLoader'
import withStyles from '@material-ui/core/styles/withStyles'
import postStyles from './styles/postStyles'
import {getLocation} from './state/actions/LocationAction'

class Post extends React.Component{

    componentDidMount(){
        this.props.indexPost()
    }
    render() {
        const {classes} = this.props
        return (
            <div className={classes.container}>
                {
                    this.props.loading
                    ?
                        (
                            <SparkLoader show={false}/>
                        )
                    :
                        (
                         <PostCard post={this.props.posts}/>

                        )
                }
            </div>
        )
    }
}

const mapStateToProps = state=>({
    posts:state.authReducer.usersReducer.postReducer.post,
    loading:state.authReducer.usersReducer.postReducer.loading,
    ipifyResponse:state.authReducer.usersReducer.locationReducer.ipifyResponse,
    ipifyLoading:state.authReducer.usersReducer.locationReducer.loading
})

export default withStyles(postStyles)(connect(mapStateToProps,{indexPost,getLocation})(Post))