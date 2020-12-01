import { AppBar, Card, CardContent, CardHeader, Container, Divider, InputAdornment, TextField, Toolbar } from '@material-ui/core'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import createAccountStyle from './styles/createAccountStyle'
import LoadingButton from '../../authentication/commons/LoadingButton'
import axios from 'axios'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { AccountCircle, PhoneAndroidRounded, PhoneCallback, PhoneCallbackSharp, PhoneCallbackTwoTone } from '@material-ui/icons'
import { API_AUTH_URL } from '../../constants/constants'
import { set, setData } from '../../TokenService'
import {connect} from 'react-redux'
import {showMainDialog} from '../../authentication/commons/state/actions/dialogActions'
import LogoComponent from '../../authentication/commons/LogoComponent'
import { withRouter } from 'react-router-dom'
class CreateAccountAndLogin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            formData:{
                email:'',
                password:'',
                phone:''
            },
            submitted: false,
            loading: false,
            finished: false,
            errorMessage: ''
        }
    }

    handleChange = (event)=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    closeDialog = ()=>{
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
    }

    handleSubmit = (event)=>{
        this.setState({
            submitted: true,
            loading: true
        })

        const {formData} =this.state

        axios.post(`${API_AUTH_URL}login`, formData, {
            headers: {
                'content-type': 'Application/json'
            },
            timeout:1000*5,
        })
            .then((res) => res.data)
            .then((response) => {
                set(response.token)
                this.props.history.push('/auth')
                window.location.reload()
            })
            .catch(onerror=>{
                if(!onerror.response){
                    this.setState({errorMessage:'networkError'})
                    this.setState({
                        loading: false,
                        finished: false,
                        submitted: false,
                    })
                }else {
                    let code = onerror.response.status
                    if(code===403){
                        setData(formData)
                        this.props.history.push('/auth')
                        window.location.reload()
                    }
                    this.setState({
                        loading: false,
                        finished: false,
                        submitted: false,
                    })
                }

            })
    }
    
  
    render() {
        const {classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.email.length > 0 && formData.password.length > 0
        return (
            <div className={classes.container}>
                <AppBar style={{backgroundColor:'white'}} elevation={0}>
                    <Toolbar>
                        <Container maxWidth={'lg'}>
                        <LogoComponent/>
                        </Container>
                    </Toolbar>
                    <Divider/>
                </AppBar>

                <Card elevation={0} className={classes.card}>
                <CardContent>
                    <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        className={classes.text_input}
                        label={'Email'}
                        onChange={this.handleChange}
                        name="email"
                        type='email'
                        value={this.state.formData.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['Please enter your email', 'is not valid email']}

                    />

                    <TextValidator
                        className={classes.text_input}
                        label={'Password'}
                        onChange={this.handleChange}
                        name="password"
                        type='password'
                        value={this.state.formData.password}
                        validators={['required']}
                        errorMessages={['Please enter your password']}

                    />
                    <LoadingButton
                    className={classes.text_input}
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={'Login'}
                    done={finished}
                    >
                    {
                        'Login'
                    }
                    </LoadingButton>
                    </ValidatorForm>

                    <div className={classes.otherWay}>
                        <Divider className={classes.divider}/> 
                        <span className={classes.label}>Or</span>
                        <Divider className={classes.divider}/>
                    </div>
                    <TextField
                    className={classes.phone}
                    label="Login via phone number"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <PhoneCallbackSharp />
                        </InputAdornment>
                    ),
                    }}
                />
                </CardContent>
            </Card>
            </div>
        )
    }
}

export default withStyles(createAccountStyle)(CreateAccountAndLogin)