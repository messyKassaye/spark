import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import RightLeftMessagesStyles from '../styles/RightLeftMessagesStyle'
import RightLeftMessageStyle from '../styles/RightLeftMessagesStyle'

class RightMessage extends React.Component{
    render() {

        const {classes} = this.props
        return (
            <div className={classes.right}>
                <div className={classes.innerRight}>
                {this.props.chat.message}
                </div>
            </div>
        )
    }
}

export default withStyles(RightLeftMessageStyle)(RightMessage)