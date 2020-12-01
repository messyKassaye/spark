import { Button, Card, CardContent, CardHeader, CardMedia, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Slider, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import accountSettingStyle from '../styles/accountSettingStyle'
import {me} from '../../state/actions/usersActions'
import {logout} from '../../../TokenService'
class AccountSetting extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ageValue:[18,27]
        }
    }
    

    componentDidMount(){
        this.props.me()
    }

   handleChange = (event, newValue) => {
        this.setState({
            ageValue:newValue
        })
      }

  logout = ()=>{
     logout()
     window.location.reload()
     this.props.history.push('/')
  }

    render() {
        const {classes} = this.props
        return (
            <div className={classes.container}>
               {
                   this.props.loading
                   ?
                        (
                            <Skeleton
                             width={'60%'}
                             height={100}
                             style={{backgroundColor:grey[500]}}
                            />
                        )
                   :
                        (
                            <Grid item md={12} sm={12} xs={12}>
                    <Typography>
                        Account settings
                    </Typography>
                                                
                    <div style={{backgroundColor:'white',marginBottom:20,width:350}}>
                    <List style={{width:'90%'}}>
                                                    <ListItem button>
                                                        <ListItemText
                                                        primary={'Email'}
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <Button 
                                                            variant={'text'}
                                                            color={"primary"}
                                                            style={{textTransform:'none'}}>
                                                                Verify now
                                                            </Button>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>

                                                    <ListItem button>
                                                        <ListItemText
                                                        primary={'Phone number'}
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <Button 
                                                            variant={'text'}
                                                            color={"inherit"}
                                                            style={{textTransform:'none'}}>
                                                                {
                                                                    this.props.user.attribute.phone
                                                                }
                                                            </Button>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>

                                                    <ListItem button>
                                                        <ListItemText
                                                        primary={'Promo code'}
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <Button 
                                                            variant={'text'}
                                                            color={"inherit"}
                                                            style={{textTransform:'none'}}>
                                                                
                                                            </Button>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                    
                                                    </List>
                                                </div>

                                                <Typography>
                                                    Discovery settings
                                                </Typography>
                                                <div style={{backgroundColor:'white', marginBottom:20}}>

                                                    <List>
                                                    
                                                    <ListItem button>
                                                        <ListItemText
                                                        primary={'Age range'}
                                                        secondary={
                                                            <Slider
                                                            value={this.state.ageValue}
                                                            onChange={this.handleChange}
                                                            valueLabelDisplay="auto"
                                                            aria-labelledby="range-slider"/>
                                                            
                                                        }
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <Button 
                                                            variant={'text'}
                                                            color={"inherit"}
                                                            style={{textTransform:'none'}}>
                                                                {this.state.ageValue.map((value,index)=>{
                                                                    if(index===0){
                                                                    return <span>{`${value} -`}</span>
                                                                    }else{
                                                                    return <span>{value}</span>
                                                                    }
                                                                })}
                                                            </Button>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                    </List>
                                                </div>


                                                <div style={{backgroundColor:'white'}}>
                                                <List>
                                                <ListItem button onClick={this.logout}>
                                                        <ListItemText
                                                        primary={'Logout'}
                                                        />
                                                        
                                                </ListItem>
                                                </List>
                                                </div>                    
                                 </Grid>
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

export default withStyles(accountSettingStyle)(connect(mapStateToProps,{me})(AccountSetting))