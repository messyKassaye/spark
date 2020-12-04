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
import Chats from './Chats'
import {showChats} from '../state/actions/ChatAction'
class ChatRoom extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            mobileOpen: false,
            currentPage:'Dashboard'
        }
        
    }
    

    componentDidMount(){
        this.props.me()
        let id = this.props.match.params.id
        this.props.showUser(id)
        this.props.showChats(id)
    }

   

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
                        this.props.chatLoading&&this.props.chatsLoading
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

                                               <Chats chats={this.props.chats} user={this.props.user} chatUser={this.props.chatUser}/>
                                           
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
    chatLoading:state.userData.chatLoading,
    chats:state.authReducer.usersReducer.chatReducer.prevChats,
    chatsLoading:state.authReducer.usersReducer.chatReducer.loading
})

export default withStyles(authStyle)(connect(mapStateToProps,{me,showUser,showChats})(ChatRoom))