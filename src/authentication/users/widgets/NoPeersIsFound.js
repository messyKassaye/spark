import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import noPeersStyle from '../styles/noPeersStyle'
class NoPeersIsFound extends React.Component{

    render() {
        const {classes} = this.props
        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography color={'primary'} variant={'h6'} style={{marginBottom:25}}>
                        This is all what we have around your area ):
                        </Typography>

                        <Typography style={{marginBottom:15}}>
                            Could you try later maybe new peers could be registered
                        </Typography>
                        <Typography>
                            Thank you, meetyourspark.com
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(noPeersStyle)(NoPeersIsFound)