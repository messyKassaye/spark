import { AppBar, Avatar, Card, CardActions, CardContent, CardHeader, CssBaseline, Divider, Grid, Hidden, IconButton, Input, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core'
import { Close, Send } from '@material-ui/icons'
import React from 'react'
import {connect} from 'react-redux'
import {me} from '../../state/actions/usersActions'
import Pusher from 'pusher-js'
import DrawerProfile from './DrawerProfile'
import theme from "../../../themes/app_theme";
import withStyles from '@material-ui/core/styles/withStyles'
import authStyle from '../styles/auth_style'
import ChatUsersList from './ChatUsersList'
import ChatProfile from './ChatProfile'
import {showUser} from '../../state/actions/usersActions'
import HorizontalLoading from '../loader/HorizontalLoading'
import { Link } from 'react-router-dom'
import { isInteger } from 'lodash'
import Chats from './Chats'
class ChatBoard extends React.Component{

    constructor(props) {
        super(props);
        
    }
    

    componentDidMount(){
        this.props.me()
        let id = this.props.match.params.id
        this.props.showUser(id)
    }

    

    /*componentDidUpdate(){
        let id = this.props.match.params.id
        this.props.showUser(id)
    }*/

    handleDrawerToggle = (value,page) => event=>{
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({
            mobileOpen: value,
            currentPage:page
        })
    }

    checkInfo = ()=>{
       
    }

    showDialog = (component)=>{
        this.props.showMainDialog({
            show:true,
            style:{display:'flex',flexDirection:'row',justifyContent:'flex-start',top:-550},
            maxWidth:'sm',
            page:component,
            title:`Spark`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    render() {
        const {container} = this.props;
        const {classes} = this.props;
        const drawer = (
            <div className={classes.drawerRoot}>
                <AppBar style={{position: "relative"}} color={'primary'}>
                    <Toolbar style={{padding: 5}}>
                        <DrawerProfile showBack={true}/>
                    </Toolbar>
                </AppBar>
                <ChatUsersList/>
            </div>
        )
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <SwipeableDrawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}

                            onOpen={this.handleDrawerToggle(true,this.state.currentPage)}
                            onClose={this.handleDrawerToggle(false,this.state.currentPage)}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </SwipeableDrawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <SwipeableDrawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open={this.state.mobileOpen}
                            onOpen={this.handleDrawerToggle(true,this.state.currentPage)}
                            onClose={this.handleDrawerToggle(false,this.state.currentPage)}
                        >
                            {drawer}
                        </SwipeableDrawer>
                    </Hidden>
                </nav>
                <main style={{flexGrow:1}}>
                    <div style={{height:'100vh'}}>
                    {
                        this.props.chatLoading
                        ?
                            (
                                <Grid container spacing={2}>
                                    <Grid item md={9} xs={12} sm={12}>
                                           <HorizontalLoading/>
                                    </Grid>

                                    <Grid item md={3}>
                                        <HorizontalLoading/>
                                    </Grid>
                                </Grid>
                            )
                        :
                            (
                                <Grid container>
                                    <Grid item md={8} xs={12} sm={12}>
                                           <Card style={{height:'100vh'}}>
                                               <CardHeader
                                                title={
                                                    <Typography variant={'h6'}>
                                                        {`Your are matched with ${this.props.chatUser.attribute.name}`}
                                                    </Typography>
                                                }
                                                avatar={
                                                    <Avatar src={this.props.chatUser.attribute.profile_pic_path}/>
                                                }
                                                action={
                                                    <IconButton component={Link} to={'/auth'}>
                                                        <Close/>
                                                    </IconButton>
                                                }
                                               />
                                               <Divider/>
                                               <CardContent>
                                                <Chats user={this.props.user} chatUser={this.props.chatUser}/>
                                               </CardContent>
                                               <CardActions style={{width:'100%',top:'75%',position:'relative'}}>
                                                        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
                                                            <Input
                                                             placeholder={'Write your message...'}
                                                             style={{width:'90%'}}
                                                            />
                                                            <IconButton color={'primary'}>
                                                                <Send/>
                                                            </IconButton>
                                                       </div>
                                               </CardActions>
                                           </Card>
                                    </Grid>

                                    <Grid item md={4}>
                                        <ChatProfile user={this.props.chatUser}/>
                                    </Grid>
                                </Grid>
                            )
                    }
                    </div>
                </main>
            </div>
        )
    }
}


const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading,
    chatUser:state.userData.chatUser,
    chatLoading:state.userData.chatLoading
})

export default withStyles(authStyle)(connect(mapStateToProps,{me,showUser})(ChatBoard))