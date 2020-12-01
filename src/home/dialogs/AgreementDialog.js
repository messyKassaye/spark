import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import agreementStyle from './styles/agreementStyle'
import { Card, CardHeader, Grid, Typography } from '@material-ui/core'
import logo from '../../assets/logo.png'
import LogoComponent from '../../authentication/commons/LogoComponent'
import rules from './data/rules'
import { Check } from '@material-ui/icons'
import LoadingButton from '../../authentication/commons/LoadingButton'
import {connect} from 'react-redux'
import {showMainDialog} from '../../authentication/commons/state/actions/dialogActions'
import { ValidatorForm } from 'react-material-ui-form-validator'
class AgreementDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            submitted: false,
            loading: false,
            finished: false,
        }
    }

    agreed = ()=>{
        this.setState({
            submitted: true,
            loading: true
        })
        setTimeout(()=>{
            this.props.showMainDialog({
                show:false,
                maxWidth:'sm',
                page:null,
                title:``,
                actions:{
                    on:false,
                    path:'',
                    id:''
                }
            })
        },1000)
    }
    

    render() {
        const {classes} = this.props
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = true
        return (
            <div className={classes.container}>
                {/* agreement dialog header components */}
                <div className={classes.header}>
                <LogoComponent/>
                <Typography>
                    Welcome to Spark
                </Typography>
                <Typography color={'textSecondary'}>
                    Please follow these house rules
                </Typography>
                </div>
                {/* end of agreement dialog header component*/}

                {/* main rules */}
                <div className={classes.mainRules}>
                    <Grid container spacing={2}>
                    {
                        rules.map(rule=>(
                            <Grid item md={12} xs={12} sm={12}>
                                <Card elevation={0}>
                                    <CardHeader
                                    avatar={<Check color={'primary'}/>}
                                    title={
                                        <Typography color={'textSecondary'} style={{fontWeight:'bold'}}>
                                            {rule.name}
                                        </Typography>
                                    }
                                    subheader={
                                        <Typography color={'textSecondary'}>
                                            {rule.description}
                                        </Typography>
                                    }
                                    />
                                </Card>
                            </Grid>
                        ))
                    }
                    </Grid>
                </div>

                <div className={classes.footer}>
                <LoadingButton
                    onClick={this.agreed}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={'I Agree'}
                    done={finished}
                    >
                    {
                        'I Agree'
                    }
                    </LoadingButton>
                    </div>
            </div>
        )
    }
}

export default connect(null,{showMainDialog})(withStyles(agreementStyle)(AgreementDialog))