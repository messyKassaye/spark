import { Button, Grid, Typography } from '@material-ui/core'
import { RadioButtonChecked } from '@material-ui/icons'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import checkOutStyle from '../styles/checkOutStyle'

class CheckOut extends React.Component{

    render() {
        const {classes} =this.props
        return (
            <Grid container spacing={2}>
                {
                    this.props.product.prices.map(price=>(
                        <Grid item md={12} xs={12} sm={12}>
                            <div className={classes.container}>
                                <div className={classes.innerContainer}>
                                    <RadioButtonChecked className={classes.radio}/>
                                    <Typography variant={'h4'} className={classes.label}>
                                        {
                                            price.package.name
                                        }
                                     </Typography>
                                </div>
                                <Typography variant={'h5'} className={classes.label}>
                                    {
                                        `${price.price} ETB`
                                    }
                                </Typography>
                            </div>
                        </Grid>
                    ))
                }
                <Grid item md ={12} xs={12} sm={12}>
                    <Button
                    variant={'outlined'}
                    color={'primary'}
                    style={{paddingRight:50,paddingLeft:50,marginLeft:150}}>
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(checkOutStyle)(CheckOut)