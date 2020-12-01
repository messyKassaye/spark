import React from 'react'
import {indexMedia} from '../state/actions/AddMediaAction'
import {connect} from 'react-redux'
import { Button, Card, CardActions, CardMedia, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { grey } from '@material-ui/core/colors'
import {showMainDialog} from '../../commons/state/actions/dialogActions'
import {changeProfilePicture} from '../../state/actions/usersActions'
import {uploadFile} from '../../../home/state/actions/FileUploadAction'
class ChangeProfilePicture extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            changing:false,
            uploading:false
        }
        this.inputOpenFileRef = React.createRef()
    }
    

    componentDidMount(){
        this.props.indexMedia()

    }

    changeProfile = (mediaPath)=>{
        
        const formData = {
            path:mediaPath
        }
        console.log(formData)
        this.props.changeProfilePicture(formData)
        this.setState({
            changing:true
        })

    }

    onFileUpload = () => { 
        this.inputOpenFileRef.current.click()
      }

   onFileChange = event => { 
     
        this.setState({
            uploading:true
        })
        // Update the state 
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file);
        this.setState({uploading:true})
        this.props.uploadFile(formData)

        
      }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            setTimeout(()=>{
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})

            },2000)
        }

        if(nextProps.fileResponse.status){
            this.changeProfile(nextProps.fileResponse.path)
        }

    }
    render() {
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <div>
                                <Skeleton
                                 variant={'rect'}
                                 width={'100%'}
                                 height={100}
                                 style={{backgroundColor:grey[500],marginBottom:15}}
                                />
                                <Skeleton
                                 variant={'rect'}
                                 width={'100%'}
                                 height={100}
                                 style={{backgroundColor:grey[500]}}
                                />
                            </div>
                        )
                    :
                        (
                            <div>
                                {
                                    this.state.changing
                                    ?
                                        (
                                            <Typography color={'primary'}>
                                                {this.props.response.message}
                                            </Typography>
                                        )
                                    :
                                        (
                                            <div>
                                                <Grid container spacing={2}>
                                                {
                                                    this.props.medias.map(media=>(
                                                        <Grid item md={4} xs={3} sm={3}>
                                                                        <Card>
                                                                            <CardMedia
                                                                            style={{width:'100%',height:150}}
                                                                            image={media.media_path}
                                                                            />
                                                                            <CardActions>
                                                                                <Button
                                                                                variant={'text'}
                                                                                color={'primary'}
                                                                                onClick={()=>this.changeProfile(media.media_path)}
                                                                                >
                                                                                    Select
                                                                                </Button>
                                                                            </CardActions>
                                                                        </Card>
                                                                    </Grid>
                                                                ))
                                                            }
                                                    </Grid>

                                                    <div style={{marginTop:25,display:"flex",flexDirection:'column',alignItems:'center'}}>
                                                   
                                                    <input 
                                                    style={{display:"none"}}
                                                    onChange={this.onFileChange}
                                                    type="file" 
                                                    ref={this.inputOpenFileRef}/> 

                                                       {
                                                           this.state.uploading||this.state.changing
                                                           ?
                                                            (
                                                                <Typography>
                                                                    Changing your profile picture
                                                                </Typography>
                                                            )
                                                           :
                                                            (
                                                                <Button
                                                                onClick={this.onFileUpload}
                                                                color={'primary'}
                                                                variant={"contained"}>
                                                                    Add new picture
                                                                </Button>
                                                            )
                                                       }
                                                    </div>
                                            </div>
                                        )
                                }
                            </div>
                        )
                }
            </div>
        )
    }
}
const mapStateToProps = state=>({
    medias:state.authReducer.usersReducer.addMediaReducer.medias,
    loading:state.authReducer.usersReducer.addMediaReducer.loading,
    response:state.userData.response,
    fileResponse:state.homeReducer.fileUploadReducer.response

})

export default connect(mapStateToProps,{indexMedia,changeProfilePicture,showMainDialog,uploadFile})(ChangeProfilePicture)