import React from 'react'
import {me} from '../../state/actions/usersActions'
import {connect} from 'react-redux'
import { Button, Card, CardActions, CardMedia, Grid, IconButton, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { grey } from '@material-ui/core/colors'
import {uploadFile} from '../../../home/state/actions/FileUploadAction'
import {uploadMedia} from '../state/actions/AddMediaAction'
import { Close } from '@material-ui/icons'
class AddMedia extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            medias:[],
            uploading:false
        }
        this.inputOpenFileRef = React.createRef()
    }
    

    componentDidMount(){
        this.props.me()
        const {medias} = this.state
        medias.push(this.props.user.attribute.profile_pic_path);
        this.setState(medias)
    }

    onFileUpload = () => { 
        this.inputOpenFileRef.current.click()
      }

   onFileChange = event => { 
     
        // Update the state 
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file);
        this.setState({uploading:true})
        this.props.uploadMedia(formData)
        
      }

      componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.path!==''){

            const responses = {
                media_path:nextProps.response.path
            }
            this.props.medias.push(responses)
            this.setState({
                uploading:false,
            })

        }

    }

    removeIndex = media=>{
        let index = this.props.medias.indexOf(media);
        if(index>-1){
            this.props.medias.splice(index,1)
        }
        console.log(this.props.medias.length)
    }

    render() {
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <Skeleton
                            variant={'rect'}
                            width={400}
                            height={200}
                            style={{backgroundColor:grey[500]}}/>
                        )
                    :
                        (
                            <div style={{display:'flex',flexDirection:'column',marginBottom:30}}>
                                
                                <Grid container spacing={2}>
                                    {
                                        this.props.medias
                                        .map(media=>(
                                            <Grid item md={4} xs={4} sm={4}>
                                                <Card style={{padding:0}}>
                                                    <CardMedia
                                                    style={{width:'100%',height:150}}
                                                     image={media.media_path}
                                                    >

                                                    </CardMedia>
                                                    <CardActions style={{padding:0,display:"flex",flexDirection:'row',justifyContent:'flex-end'}}>
                                                        <IconButton color={'primary'} onClick={()=>this.removeIndex(media)}>
                                                            <Close/>
                                                        </IconButton>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <div style={{display:"flex",flexDirection:'column',
                                alignItems:"center",marginTop:20}}>
                                    <input 
                                    style={{display:"none"}}
                                    onChange={this.onFileChange}
                                    type="file" 
                                    ref={this.inputOpenFileRef}/> 

                                    {
                                        this.state.uploading
                                        ?
                                            (
                                                <Typography color={'primary'} variant={'h4'}>
                                                    Uploading...
                                                </Typography>
                                            )
                                        :
                                            (
                                                <Button 
                                                variant={'contained'} 
                                                color={'primary'} 
                                                onClick={()=>this.onFileUpload()}
                                                size={'medium'}>
                                                    Add new media
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
}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading,
    response:state.authReducer.usersReducer.addMediaReducer.response
})

export default connect(mapStateToProps,{me,uploadMedia})(AddMedia)