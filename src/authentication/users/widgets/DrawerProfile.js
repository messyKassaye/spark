import React from "react";
import {connect} from "react-redux";
import {Link,withRouter} from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import {Menu, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import authstyle from "../styles/auth_style";
import Skeleton from "@material-ui/lab/Skeleton";
import {me} from '../../state/actions/usersActions'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
class DrawerProfile extends React.Component{
     constructor(props) {
         super(props)
         this.state = {
             anchorEl:null
         }
         this.handleOpenProfileSetting = this.handleOpenProfileSetting.bind(this)
         this.closeMenu = this.closeMenu.bind(this)
     }

     handleOpenProfileSetting = (event)=>{
         this.setState({anchorEl:event.currentTarget})
     }

     closeMenu = (event)=>{
         this.setState({
             anchorEl:null
         })
     }


     componentDidMount = ()=>{
         this.props.me()
     }

     render() {
         const {classes} = this.props;
         return (
            <div>
            {
             this.props.loading ?
                 <div className={classes.avatarLoading}>
                     <Skeleton variant='circle' style={{backgroundColor:'white'}} width={40} height={40}/>
                     <Skeleton variant='rect' style={{backgroundColor:'white',marginLeft:10,borderRadius:5}} width={120} height={10} />
                 </div>
                 :
                 <div  className={classes.avatarLayout}>
                     {
                         this.props.showBack
                         ?
                            (
                                <IconButton component={Link} to={'/auth'} color={'inherit'} style={{marginRight:25}}>
                                    <ArrowBackIosIcon style={{width:30,height:30}}/>
                                </IconButton>
                            )
                         :
                            (null)
                     }
                    <Avatar className={classes.avatarImage} 
                    component={Link}
                    to={this.props.showBack?'/auth':'/auth/profile'}
                    src={this.props.user.attribute.profile_pic_path}
                    style={{cursor:'pointer'}}></Avatar>
                     {
                         <Typography
                          variant={'h5'}
                           component={Link}
                            to={this.props.showBack?'/auth':'/auth/profile'}
                            className={classes.link}>
                             My profile
                         </Typography>
                     }
                     
                 </div>
            }
        </div>
    );
     }

 }

 const mapStateToProps = state=>({
    user: state.userData.user,
    loading:state.userData.loading
 })

 export default connect(mapStateToProps,{me})
 (withRouter(withStyles(authstyle)(DrawerProfile)))
