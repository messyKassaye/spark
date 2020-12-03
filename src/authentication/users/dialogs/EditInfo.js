import { TextField, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import {connect} from 'react-redux'
import LoadingButton from '../../commons/LoadingButton'
import {me} from '../../state/actions/usersActions'
import {storeUtitlity} from '../../state/actions/userUtilityAction'
import {showMainDialog} from '../../commons/state/actions/dialogActions'
import AddMedia from '../widgets/AddMedia'
import {indexMedia} from '../state/actions/AddMediaAction'
class EditInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            formData:{
                about:'',
                job_title:'',
                company:'',
                school:''
            },
            submitted: false,
            loading: false,
            finished: false,
        }
    }


    componentDidMount(){
        this.props.me()
        this.props.indexMedia()


            const {formData} = this.state
            const utility = this.props.user.relations.utilities
            if(utility!==null){
                formData['about'] = this.props.user.relations.utilities.about
                formData['company'] = utility.company
                formData['job_title'] = utility.job_title
                formData['school'] = utility.school
                this.setState(formData)
            }
    }
    

    handleChange = (event)=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    handleSubmit = (event)=>{
        this.setState({
            submitted: true,
            loading: true
        })

        const {formData} = this.state
        this.props.storeUtitlity(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.response.status) {
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
            })
          setTimeout(()=>{
              this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
          },2000)
        }
    }

    render() {

        
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.about.length > 0 && formData.job_title.length > 0
            &&formData.company.length>0&&formData.school.length>0
        return (
            <div style={{height:'auto',overflowY:'scroll'}}>
                {
                    this.props.loading&&this.props.mediaLoading
                    ?
                        (
                            <Skeleton
                             variant={'rect'}
                             width={'100%'}
                             height={150}
                             style={{backgroundColor:grey[500]}}
                            />
                        )
                    :
                        (
                            <div style={{display:'flex',flexDirection:'column',overflowY:'scroll',height:800}}>
                                
                            <AddMedia medias={this.props.medias}/>
                            <ValidatorForm 
                            onSubmit={this.handleSubmit}
                            style={{display:'flex',flexDirection:'column',padding:10}}>
                                <Typography color={'primary'}>
                                    {this.props.response.message}
                                </Typography>
                                
                                <TextField
                                 style={{marginBottom:25}}
                                 variant={'outlined'}
                                 label={'About me'}
                                 onChange={this.handleChange}
                                 name="about"
                                 value={this.state.formData.about}
                                />

                                <TextField
                                 style={{marginBottom:25}}
                                 variant={'outlined'}
                                 label={'Job title'}
                                 onChange={this.handleChange}
                                 name="job_title"
                                 value={this.state.formData.job_title}
                                />

                                <TextField
                                 style={{marginBottom:25}}
                                 variant={'outlined'}
                                 label={'Company'}
                                 onChange={this.handleChange}
                                 name="company"
                                 value={this.state.formData.company}
                                />
                                <TextField
                                 variant={'outlined'}
                                 label={'School'}
                                 onChange={this.handleChange}
                                 name="school"
                                 value={this.state.formData.school}
                                />

                                <LoadingButton
                                style={{marginTop:50,padding:10}}
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={!isEnabled || this.state.submitted}
                                loading={setLoading}
                                text={'Edit info'}
                                done={finished}
                                >
                                {
                                    'Edit info'
                                }
                                </LoadingButton>

                            </ValidatorForm>
                            </div>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading,
    response:state.authReducer.utilityReducer.response,
    medias:state.authReducer.usersReducer.addMediaReducer.medias,
    mediaLoading:state.authReducer.usersReducer.addMediaReducer.loading
})

export default connect(mapStateToProps,{me,storeUtitlity,showMainDialog,indexMedia})(EditInfo)