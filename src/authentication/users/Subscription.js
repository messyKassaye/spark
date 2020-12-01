import React,{useQuery} from 'react'
import {connect} from 'react-redux'
import {me} from '../state/actions/usersActions'
import withStyles from '@material-ui/core/styles/withStyles'
import authStyle from './styles/auth_style'
import theme from "../../themes/app_theme";
import { AppBar, Avatar, Button, Card, CardActionArea, CardActions, CardMedia, CssBaseline, Divider, Grid, Hidden, IconButton, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core'
import DrawerProfile from './widgets/DrawerProfile'
import { Skeleton } from '@material-ui/lab'
import { grey, red } from '@material-ui/core/colors'
import AccountSetting from './widgets/AccountSetting'
import {showProduct} from './state/actions/ProductAction'
import HorizontalLoading from './loader/HorizontalLoading'
import CheckOut from './widgets/CheckOut'

class Subscription extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            currentPage:'Dashboard',
            product:''
        }
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    }

    componentDidMount(){
        this.props.me();
       const id = this.props.match.params.id
       this.props.showProduct(id)
       
    }

    componentDidUpdate(prevProps) {
        const id = this.props.match.params.id
        if (prevProps.match.params.id !== id){
          this.props.showProduct(this.props.match.params.id)
        }
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
                        <DrawerProfile/>
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
                    <div style={{margin:10,backgroundColor:'white'}}>
                    <Grid container spacing={2}>

                        <Grid item md={6} xs={12} sm={12}>
                            {
                                this.props.showLoading
                                ?
                                    (
                                        <HorizontalLoading height={100}/>
                                    )
                                :
                                    (
                                        <div>
                                            <Typography variant={'h5'} style={{textTransform:'capitalize',padding:15,textAlign:'center'}}>
                                                {`Subscription for ${this.props.product.name} includes`}
                                            </Typography>
                                            <Divider/>
                                            {
                                                this.props.product.subscription
                                                .map(subscribe=>(
                                                    <div style={{display:'flex',flexDirection:'column'}}>
                                                        <div style={{display:'flex',flexDirection:'row',padding:20,justifyContent:'flex-start',marginBottom:10}}>
                                                        <IconButton>
                                                            <Avatar
                                                            style={{width:70,height:70}}
                                                            src={subscribe.image_path}
                                                            />
                                                        </IconButton>
                                                         <div style={{marginLeft:20,display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center'}}>
                                                         <Typography variant={'h5'}>{subscribe.name}</Typography>
                                                        <Typography>{subscribe.description}</Typography>
                                                         </div>
                                                        </div>
                                                        <Divider/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                            }
                            
                        </Grid>
                        <Grid item md={6} xs={12} sm={12}>
                           <div style={{position:'fixed',width:'30%',display:'flex',flexDirection:'row',
                           justifyContent:'center',marginLeft:25}}>
                                {
                                    this.props.showLoading
                                    ?
                                        (
                                            <Skeleton
                                            width={'100%'}
                                            height={150}
                                            variant={'rect'}
                                            style={{backgroundColor:grey[500]}}/>
                                        )
                                    :
                                        (
                                            <CheckOut product={this.props.product}/>
                                        )
                                }
                           </div>
                        </Grid>
                    </Grid>
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading,
    product:state.authReducer.usersReducer.ProductReducer.product,
    showLoading:state.authReducer.usersReducer.ProductReducer.showLoading
})

export default connect(mapStateToProps,{me,showProduct})(withStyles(authStyle)(Subscription))