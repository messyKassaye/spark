import React from 'react'
import { getData, setData } from '../TokenService';
import {showMainDialog} from '../authentication/commons/state/actions/dialogActions'
import {connect} from 'react-redux'
import CreateAccountAndLogin from './dialogs/CreateAccountAndLogin';
import AgreementDialog from './dialogs/AgreementDialog';
import history from './history/history'
import withStyles from '@material-ui/core/styles/withStyles'
import createAccountStyle from './styles/createAccountStyle'
import { AppBar, Button, Container, Divider, Grid, TextField, Toolbar, Typography } from '@material-ui/core';
import LogoComponent from '../authentication/commons/LogoComponent';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import gender from './gender'
import birthDates from './birthDate'
import { grey } from '@material-ui/core/colors';
import {uploadFile} from './state/actions/FileUploadAction'
import { Skeleton } from '@material-ui/lab';
import LoadingButton from '../authentication/commons/LoadingButton';
import axios from 'axios'
import { API_AUTH_URL } from '../constants/constants';
import { set } from '../TokenService';
import logo from '../assets/logo.png'
import {Link} from 'react-router-dom'
class CreateAccount extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            formData:{
                name:'',
                email:"",
                password:'',
                phone:'',
                profile_pic_path:'',
                gender_id:'',
                birth_date:'',
            },

            birthDateForm:{
                MM:'',
                DD:"",
                YY:""
            },
            fileFormData:{
                file:''
            },
            birthDateError:'',
            submitted: false,
            loading: false,
            finished: false,
            uploadingFile:false,
            uploadDone:false,
            uploadStatus:false,
            filePath:'',
            bigFile:false
        }
        this.inputOpenFileRef = React.createRef()
        
    }
    
    componentDidMount(){
        this.showDialog(<AgreementDialog/>)
    }

 
    showDialog = (component)=>{

        this.props.showMainDialog({
            show:true,
            maxWidth:'sm',
            top:-20,
            showTitle:false,
            page:component,
            title:`Spark`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    onFileChange = event => { 
     
        // Update the state 
        const file = event.target.files[0]
        let FileSize = file.size / 1024 / 1024; // in MB
        if (FileSize >=1) {
            this.setState({
                bigFile:true
            })
        } else {
       
        const formData = new FormData()
        formData.append('file', file);
        this.setState({uploadingFile:true})
        this.props.uploadFile(formData)

        }
        
      }
      
      componentWillReceiveProps(nextProps, nextContext) {
          const {formData} = this.state
          formData['profile_pic_path'] =nextProps.response.path;
        this.setState({
            formData,
            uploadDone:true,
            uploadStatus:nextProps.response.status,
            filePath:nextProps.response.path
        })
    }

    // On file upload (click the upload button) 
    onFileUpload = () => { 
        this.inputOpenFileRef.current.click()
      }

      genderSelection = (gender)=>{
          const {formData} = this.state
          formData['gender_id'] = gender.id
          this.setState(formData)
      }

      handleChange = (event)=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    handleBirthDateChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value
        if(name==='MM'&&value>12){
            this.setState({
                birthDateError:"Month can't be greater than 12"
            })
        }else if(name==='DD'&&value>31){
            this.setState({
                birthDateError:"Birth date can't be greater than 31"
            })
        }else{

            const {birthDateForm} = this.state
            birthDateForm[event.target.name] = event.target.value
            this.setState(birthDateForm)
        }
        
    }

    handleSubmit = event=>{
        this.setState({
            submitted: true,
            loading: true
        })

        const {formData} = this.state
        const {birthDateForm} = this.state

        formData['birth_date'] = `${birthDateForm.MM}/${birthDateForm.DD}/${birthDateForm.YY}`
        console.log(formData)

        axios.post(`${API_AUTH_URL}signup`,formData)
        .then(response=>response.data)
        .then((response)=>{
               set(response.token)
               history.push('/auth')
               window.location.reload()
        })
        .catch(onerror=>{
            if(!onerror.status){
                this.setState({errorMessage:'networkError'})
            }else {
                let code = onerror.response.status
                if(code===409){
                    this.setState({errorMessage:onerror.response.data.message})
                }
                this.setState({
                    loading:false,
                    finished:true,
                    submitted:false
                })
            }
        })

    }
      
    render() {
        const {classes} =this.props

        const {formData} = this.state
        const {birthDateForm} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.email.length > 0 && formData.name.length > 0
            &&formData.profile_pic_path.length>0&&birthDateForm.DD.length>0
            &&birthDateForm.MM.length>0&&birthDateForm.YY.length>0&&formData.phone.length>0

        return (
            <div className={classes.container}>
                {/* create account app bar  */}
                <AppBar style={{backgroundColor:'white'}} elevation={0}>
                    <Toolbar>
                        <Container maxWidth={'lg'}>
                            <Typography component={Link} to={'/'}>
                              <img   width={150} height={100} src={logo}/>
                            </Typography> 
                        </Container>
                    </Toolbar>
                    <Divider/>
                </AppBar>

                {/* create account form container */}
                <div className={classes.formContainer}>
                <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>

                    <Typography 
                    variant={'h4'} 
                    color={'textSecondary'} 
                    className={classes.info}>
                        Create account
                    </Typography>

                    <Grid container spacing={2}>

                        {/*name input and gender  layout */}
                        <Grid item md={8} xs={12} sm={12} className={classes.grid}>
                            <TextField
                            variant={'outlined'}
                            className={classes.text_input}
                            label={'name'}
                            onChange={this.handleChange}
                            name="name"
                            type='text'
                            value={this.state.formData.name}
                            validators={['required']}
                            errorMessages={['Please enter your name']}

                            />
                        </Grid>

                        <Grid item md={4} xs={12} sm={12}>
                                <div className={classes.gender}>
                                <Typography style={{marginBottom:10}}>
                                    Gender
                                </Typography>
                                <div className={classes.genderInnerLayout}>
                                    {
                                        gender.map(gender=>(
                                            <Button
                                            onClick={()=>this.genderSelection(gender)}
                                            key={gender.id}
                                            variant={'outlined'}
                                            color={
                                                this.state.formData.gender_id===gender.id?'primary':'inherit'
                                            }
                                            style={{textTransform:'none',marginRight:15}}>
                                                {gender.name}
                                            </Button>
                                        ))
                                    }
                                </div>
                                </div>
                        </Grid>
                        {/*end of name input and gender  layout */}


                        {/*name input and gender  layout */}
                        


                        {/*email and birth date layour starts here */}
                        <Grid item md={8} xs={12} sm={12}>
                            <TextField
                                variant={'outlined'}
                                className={classes.text_input}
                                label={'email'}
                                onChange={this.handleChange}
                                name="email"
                                type='email'
                                value={this.state.formData.email}
                                validators={['required']}
                                errorMessages={['Please enter your email']}
                            />
                        </Grid>

                        <Grid item md={4} xs={12} sm={12}>
                        <div className={classes.birthDate}>
                            <Typography style={{marginBottom:5}}>
                                Birth date
                            </Typography>
                            <Typography color={'secondary'}>
                                {this.state.birthDateError}
                            </Typography>
                            <div className={classes.genderInnerLayout}>
                                <TextField
                                    onChange={this.handleBirthDateChange}
                                    style={{marginRight:15}}
                                    name={'DD'}
                                    value={this.state.birthDateForm.DD}
                                    label={'DD'}
                                    type={'number'}
                                    variant="outlined"
                                />
                                <TextField
                                    onChange={this.handleBirthDateChange}
                                    style={{marginRight:15}}
                                    name={'MM'}
                                    type={'number'}
                                    value={this.state.birthDateForm.MM}
                                    label={'MM'}
                                    variant="outlined"
                                />
                                <TextField
                                    onChange={this.handleBirthDateChange}
                                    style={{marginRight:15}}
                                    name={"YY"}
                                    type={'number'}
                                    value={this.state.birthDateForm.YY}
                                    label={'YY'}
                                    variant="outlined"
                                />
                             
                            </div>
                        </div>
                        </Grid>
                        {/*end of email and birth date input layout */}

                        {/*phone input */}
                        <Grid item md={8} xs={12} sm={12}>
                        <TextField
                                variant={'outlined'}
                                className={classes.text_input}
                                label={'Phone'}
                                onChange={this.handleChange}
                                name="phone"
                                type='text'
                                value={this.state.formData.phone}
                                validators={['required']}
                                errorMessages={['Please enter your email']}
                            />
                        </Grid>

                        <Grid item md={8} xs={12} sm={12} className={classes.grid}>
                            <TextField
                            variant={'outlined'}
                            className={classes.text_input}
                            label={'Password'}
                            onChange={this.handleChange}
                            name="password"
                            type='password'
                            value={this.state.formData.password}
                            validators={['required']}
                            errorMessages={['Please enter your password']}

                            />
                        </Grid>

                        {/* profile picture selector start here */}
                        <Grid item md={6} xs={12} sm={12}>
                            {
                                this.state.uploadingFile
                                ?
                                    (
                                        <div>
                                            {
                                                this.state.uploadDone
                                                ?
                                                    (
                                                        <img
                                                        width={150}
                                                        height={100}
                                                        src={this.state.filePath}/>
                                                    )
                                                :
                                                    (
                                                        <div style={{display:"flex",
                                                        flexDirection:'row',
                                                        justifyContent:'flex-start'}}>
                                                            <Skeleton
                                                            variant={'rect'}
                                                            height={50}
                                                            width={150}
                                                            style={{backgroundColor:grey[500],marginRight:20}}
                                                            />
                                                            <Typography color={'textSecondary'}>
                                                                Working on it. please wait...
                                                            </Typography>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    )
                                :
                                    (
                                        <div className={classes.profile_pic}>
                                                {
                                                    this.state.bigFile
                                                    ?
                                                        (
                                                            <Typography color={'primary'}>
                                                                Your file is too big. Please upload image less than 1MB
                                                            </Typography>
                                                        )
                                                    :
                                                        (
                                                            <Typography  color={'textSecondary'}>
                                                                Profile photo. Size must be less than 1MB
                                                            </Typography>
                                                        )
                                                }
                                                <input 
                                                style={{display:"none"}}
                                                onChange={this.onFileChange}
                                                type="file" 
                                                ref={this.inputOpenFileRef}/> 

                                                <Button
                                                    onClick={this.onFileUpload}
                                                    variant="outlined"
                                                    style={{color:grey[600],marginTop:10}}      
                                                >
                                                    Upload from computer
                                                </Button>
                                        </div>
                                    )
                            }
                        </Grid>
                        {/* end of profile picture selector*/}
                    </Grid>

                    <LoadingButton
                    className={classes.create_btn}
                    color="primary"
                    variant="outlined"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={'CREATE ACCOUNT'}
                    done={finished}
                    >
                    {
                        'CREATE ACCOUNT'
                    }
                    </LoadingButton>
                    
                </ValidatorForm>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    response:state.homeReducer.fileUploadReducer.response
})

export default withStyles(createAccountStyle)(connect(mapStateToProps,{showMainDialog,uploadFile})(CreateAccount))