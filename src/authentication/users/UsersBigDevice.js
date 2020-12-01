import { AppBar, CssBaseline, Divider, Hidden, IconButton, Menu, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Skeleton } from '@material-ui/lab';
import React from 'react'
import theme from "../../themes/app_theme";
import {Link} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles'
import authStyle from './styles/auth_style'
import DrawerProfile from './widgets/DrawerProfile';
import ProfileTab from './widgets/ProfileTab';
import PostCard from './widgets/PostCard';
import Post from './Post';
import { connect } from 'react-redux';
import {me} from '../state/actions/usersActions'
import {showMainDialog} from '../commons/state/actions/dialogActions'
import LookingFor from './widgets/LookingFor';
class UsersBigDevice extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            currentPage:'Dashboard'
        }
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    }

    componentDidMount(){
        this.props.me();
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
                        <DrawerProfile/>
                    </Toolbar>
                </AppBar>
                <ProfileTab/>
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
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Post/>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading
})

export default connect(mapStateToProps,{me,showMainDialog})(withStyles(authStyle)(UsersBigDevice))