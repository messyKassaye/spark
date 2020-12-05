import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import createAccountStyle from './styles/createAccountStyle'
import LoadingButton from '../authentication/commons/LoadingButton'
import axios from 'axios'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { AccountCircle, PhoneAndroidRounded, PhoneCallback, PhoneCallbackSharp, PhoneCallbackTwoTone } from '@material-ui/icons'
import { API_AUTH_URL } from '../constants/constants'
import { set, setData } from '../TokenService'
import {connect} from 'react-redux'
import {showMainDialog} from '../authentication/commons/state/actions/dialogActions'
import LogoComponent from '../authentication/commons/LogoComponent'
import { withRouter } from 'react-router-dom'

class Login extends React.Component{
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
                        this.setState({errorMessage:'Incorrect email or password is used'})
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
        return (
            <div>
                
            </div>
        )
    }
}

export default Login