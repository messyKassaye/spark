import { Button, Card, CardActions, CardMedia, Chip, Grid, Typography } from '@material-ui/core'
import { Person, School } from '@material-ui/icons'
import React from 'react'
import WorkIcon from '@material-ui/icons/Work';
import {showMainDialog} from '../../commons/state/actions/dialogActions'
import {connect} from 'react-redux'
import Reports from './Reports';
import UnMatch from './UnMatch';
class ChatProfile extends React.Component{

    showDialog = (component,title)=>{
        this.props.showMainDialog({
            show:true,
            maxWidth:'sm',
            page:component,
            title:title,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }
    render() {
        return <Card style={{height:'100vh'}}>
                <CardMedia
                 style={{width:'100%',height:450}}
                 image={this.props.user.attribute.profile_pic_path}
                />
                <CardActions style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                    <Typography variant={'h5'} style={{marginBottom:10}}>
                        {`${this.props.user.attribute.name} ${this.props.user.attribute.age}`}
                    </Typography>
                    {
                        this.props.user.relations.utilities!==null
                        ?
                            (
                                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                                    {
                                        this.props.user.relations.utilities.about!==null
                                        ?
                                            (
                                                <div style={{display:'flex',flexDirection:'row'}}>
                                                    <Person/>
                                                    <Typography style={{marginLeft:10,marginBottom:10}}>
                                                        {this.props.user.relations.utilities.about}
                                                    </Typography>
                                                </div>
                                            )
                                        :
                                            (null)
                                    }

                                    {
                                        this.props.user.relations.utilities.school!==null
                                        ?
                                            (
                                                <div style={{display:'flex',flexDirection:'row'}}>
                                                    <School/>
                                                    <Typography style={{marginLeft:10,marginBottom:10}}>
                                                        {this.props.user.relations.utilities.school}
                                                    </Typography>
                                                </div>
                                            )
                                        :
                                            (null)
                                    }

                                    {
                                        this.props.user.relations.utilities.company!==null
                                        ?
                                            (
                                                <div style={{display:'flex',flexDirection:'row'}}>
                                                    <WorkIcon/>
                                                    <Typography style={{marginLeft:10,marginBottom:10}}>
                                                        {this.props.user.relations.utilities.company}
                                                    </Typography>
                                                </div>
                                            )
                                        :
                                            (null)
                                    }

                                    <div style={{display:'flex',flexDirection:'row',flexWrap:"wrap"}}>
                                        {
                                            this.props.user.relations.passion.map(passion=>(
                                                <Chip
                                                key={passion.id}
                                                style={{marginRight:5}}
                                                label={passion.name}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        :
                            (null)
                    }
                </CardActions>
                <Grid container spacing={2} style={{padding:10}}>
                    <Grid item md={6} xs={6} sm={6}>
                    <Button
                    onClick={()=>this.showDialog(<UnMatch user={this.props.user} message={`Are you sure you want to unmatch with ${this.props.user.attribute.name}`}/>,'Unmatching')}
                    color={'primary'}
                    size={'large'}
                    style={{paddingLeft:25,paddingRight:25}}
                    variant={'text'}
                    >
                        UnMatch
                    </Button>
                    </Grid>

                    <Grid item md={6} xs={12} sm={12}>
                    <Button onClick={()=>this.showDialog(<Reports/>,`Tell us your report: we won't tell to ${this.props.user.attribute.name}`)} color={'primary'} size={'large'}  variant={'text'} style={{paddingLeft:25,paddingRight:25}}>
                        Report
                    </Button>
                    </Grid>
                </Grid>
            </Card>
        
    }           
}


export default connect(null,{showMainDialog})(ChatProfile)