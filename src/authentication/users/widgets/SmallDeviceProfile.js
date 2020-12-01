import { Avatar, Button, Icon, IconButton, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Add, Edit, PhotoCamera, Settings } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import React from  'react'
import {connect} from 'react-redux'
import {me} from '../../state/actions/usersActions'
import smallDeviceProfileStyle from '../styles/smallDeviceProfileStyle'
import withStyles from '@material-ui/core/styles/withStyles'
import EditInfo from '../dialogs/EditInfo'
import {showMainDialog} from '../../commons/state/actions/dialogActions'
import SettingsPage from './SettingsPage'
import OptionComponent from '../dialogs/OptionComponent'
import ChangeProfilePicture from '../dialogs/ChangeProfilePicture'
import AccountSetting from './AccountSetting'
class SmallDeviceProfile extends React.Component{

    openDialog = (components,titles)=>{
        this.props.showMainDialog({
            show:true,
            maxWidth:'sm',
            page:components,
            title:titles,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }
    render() {

        const {classes} = this.props
        return (
            <div style={{display:'flex',flexDirection:'column'}}>
               {
                   this.props.loading
                   ?
                        (
                            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                              <Skeleton
                                variant={'circle'}
                                width={100}
                                height={100}
                                style={{backgroundColor:grey[500]}}
                                />

                            </div>
                        )
                   :
                        (
                            <div style={{display:'flex',flexDirection:'column'}}>
                                
                                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                    <Avatar
                                    src={this.props.user.attribute.profile_pic_path}
                                    style={{width:100,height:100}}
                                    />
                                    <Typography variant={'h4'} style={{marginTop:15}}>
                                        {
                                            `${this.props.user.attribute.name} ${this.props.user.attribute.age}`
                                        }
                                    </Typography>
                                </div>

                                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
                                   
                                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                        <Button onClick={()=>this.openDialog(<AccountSetting/>,"Settings")}>
                                            <Settings/>
                                        </Button>
                                        <Typography style={{textTransform:'uppercase'}}>
                                            Settings
                                        </Typography>
                                    </div>

                                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>

                                    
                                    <label style={{marginTop:150}}>
                                        <IconButton 
                                        color={'primary'}
                                        onClick={()=>this.openDialog(<ChangeProfilePicture/>,'Change profile picture')}
                                        component="span">
                                        <PhotoCamera />
                                        </IconButton>
                                    </label>
                                        <Typography>
                                            Change Profile picture
                                        </Typography>

                                        <Button 
                                        onClick={()=>this.openDialog(<OptionComponent/>,'Edit passions')}
                                        color={'primary'} 
                                        style={{marginTop:25}}>
                                            <Add/>
                                        </Button>
                                        <Typography>
                                            Add your passions
                                        </Typography>
                                    </div>

                                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                        <Button onClick={()=>this.openDialog(<EditInfo/>,"Edit info")}>
                                            <Edit/>
                                        </Button>
                                        <Typography style={{textTransform:'uppercase'}}>
                                            Edit info
                                        </Typography>
                                    </div>
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
    loading:state.userData.loading
})

export default withStyles(smallDeviceProfileStyle)(connect(mapStateToProps,{me,showMainDialog})(SmallDeviceProfile))