import React from 'react'
import {connect} from 'react-redux'
import {me} from '../state/actions/usersActions'
import withStyles from '@material-ui/core/styles/withStyles'
import authStyle from './styles/auth_style'
import theme from "../../themes/app_theme";
import { AppBar, Button, Card, CardActionArea, CardActions, CardMedia, CssBaseline, Divider, Hidden, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core'
import DrawerProfile from './widgets/DrawerProfile'
import { Skeleton } from '@material-ui/lab'
import { grey } from '@material-ui/core/colors'
import AccountSetting from './widgets/AccountSetting'
import SmallDeviceProfile from './widgets/SmallDeviceProfile'
class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            currentPage:'Dashboard',
            doneEditing:false
        }
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    }

    componentDidMount(){
        this.props.me();
    }

    handleEditInfo = ()=>{
        this.setState({
            editInfo:!this.state.editInfo
        })
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
                <AccountSetting/>
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
                    {
                        this.props.loading
                        ?
                            (
                                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                    <Skeleton
                                    variant={'rect'}
                                    width={400}
                                    height={600}
                                    style={{backgroundColor:grey[500]}}
                                    />
                                </div>
                            )

                        :
                            (
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:-50}}>
                                    <Card elevation={5}>
                                        {
                                            this.state.editInfo
                                            ?
                                                (
                                                    <div style={{display:'flex',flexDirection:'column',padding:10}}>
                                                       <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                                            <Button onClick={this.handleEditInfo} variant={'text'} color={'primary'} style={{textTransform:"none"}}>
                                                                Done
                                                            </Button>
                                                       </div>
                                                       <SmallDeviceProfile/>
                                                    </div>
                                                )
                                            :
                                                (
                                                    <div>
                                                        <CardMedia
                                        style={{height:500,width:400}}
                                        image={this.props.user.attribute.profile_pic_path}
                                        />
                                        <div style={{padding:20,display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                                             <Typography variant={'h5'}>
                                                 {`${this.props.user.attribute.name} ${this.props.user.attribute.age}`}
                                             </Typography>
                                        </div>

                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:10}}>
                                             <Button
                                             color={'primary'}
                                             onClick={this.handleEditInfo}
                                             size={"small"}
                                             variant={"contained"}
                                             style={{textAlign:'center'}}>
                                                 Edit info
                                             </Button>
                                             </div>
                                                    </div>
                                                )
                                        }
                                    </Card>
                                </div>
                            )
                    }
                </main>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading
})

export default connect(mapStateToProps,{me})(withStyles(authStyle)(Profile))