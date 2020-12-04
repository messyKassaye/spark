import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import RightLeftMessageStyle from '../styles/RightLeftMessagesStyle'
import { Typography } from '@material-ui/core'
class LeftMessage extends React.Component{

    render() {
        const {classes} = this.props
        return (
            <div className={classes.left}>
                <div className={classes.innerLeft}>
                <Typography>
                    {this.props.chat.message}
                </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(RightLeftMessageStyle)(LeftMessage)