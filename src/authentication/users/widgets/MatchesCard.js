import { Card, CardActions, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import matchesCardStyle from '../styles/matchesCard'
class MatchesCard extends React.Component{

    render() {
        const matches = this.props.matches
        const {classes} = this.props
        return (
            <Card>
                <CardMedia
                 style={{width:'100%',height:120}}
                 image={matches.user.profile_pic_path} 
                >
                <CardActions className={classes.names} >
                    <Typography variant={'h5'} style={{color:'white'}}>
                        {matches.user.name}
                    </Typography>
                </CardActions>
                </CardMedia>
            </Card>
        )
    }
}

export default withStyles(matchesCardStyle)(MatchesCard)