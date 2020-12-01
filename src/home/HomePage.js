import React from 'react'
import { AppBar, Button, IconButton,Toolbar, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import homeStyle from './styles/homeStyle'
import {Link} from 'react-router-dom'
import { red } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import {showMainDialog} from '../authentication/commons/state/actions/dialogActions'
import {connect} from 'react-redux'
import CreateAccountAndLogin from './dialogs/CreateAccountAndLogin'
import {withRouter} from 'react-router-dom'
import logo from '../assets/logo.png'
class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            small:false
        }
    }

    componentDidMount(){
        let deviceWidth = window.innerWidth;
        if(deviceWidth<=760){
            this.setState({
                small:true,
            })
        }else {
            this.setState({
                small:false
            })
        }
    }

    accountAndLogin = ()=>{
        this.props.showMainDialog({
            show:true,
            maxWidth:'sm',
            page:<CreateAccountAndLogin/>,
            title:`Spark`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }
    render() {

        {/*initializing props */}
        const {classes} = this.props

        return (
            <div className={classes.container}>
               
                {/* app bar is created here */}
                <AppBar className={classes.appBar} elevation={0}>
                  <Toolbar>
                    
                    {/* our logo goes here. This is temporary logo*/}
                    <div className={classes.logo}>
                        <img width={160} height={110} src={logo}/>
                    </div>

                    {/*this will create a space between our logo and our menu */}
                    <div style={{display:'flex',flex:1}}></div>

                    {/* right side menus*/}
                    <Button onClick={this.accountAndLogin} variant={'contained'} className={classes.loginButton} size={'large'}>
                        Log in
                    </Button>
                  </Toolbar>
                </AppBar>
                {/*end of appBar creation */}

                {/* center container */}
                <div className={classes.center}>
                    <div className={classes.centerContainer}>
                    <Typography variant={this.state.small?'h2':'h1'} style={{color:'white'}}>
                        Find. Your. Spark.
                    </Typography>

                    <Button 
                    onClick={this.accountAndLogin}
                    component={Link}
                    to={'/create_account'}
                    variant={'contained'} 
                    color={'primary'} 
                    size={'large'} 
                    className={classes.createButton}>
                        Create account
                    </Button>

                    <Button 
                    component={Link}
                    to={'/login'}
                    variant={'outlined'} 
                    size={'large'} 
                    className={classes.loginSmallDeviceBTN}>
                        Login
                    </Button>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(connect(null,{showMainDialog})(withStyles(homeStyle)(HomePage)))