import { Button, Chip, Typography } from '@material-ui/core'
import React from 'react'
import {indexPassion,storePassion} from '../state/actions/PassionAction'
import {connect} from 'react-redux'
import { Skeleton } from '@material-ui/lab'
import { grey } from '@material-ui/core/colors'
import {showMainDialog} from '../../commons/state/actions/dialogActions'
class OptionComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            selectedPassion:[],
            showButton:false,
            addingPassion:false
        }
    }
    

    componentDidMount(){
        this.props.indexPassion()
    }

    handlePassion =(passion)=>{
        const {selectedPassion} = this.state
        selectedPassion.push(passion)
        this.setState({
            selectedPassion,
            showButton:true
        })
    }

    addMyPassion = ()=>{
        const formData = {
            passions:JSON.stringify(this.state.selectedPassion)
        }
        this.props.storePassion(formData)
        this.setState({addingPassion:true})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                addingPassion:true
            })
            setTimeout(()=>{
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})

            },2000)
        }

    }

    render() {
        return (
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
               <Typography color={'textSecondary'} style={{marginBottom:15}}>
                   Select passions that you'd like to share with the people you connect with. 
                   Choose a minimum of 3
               </Typography>
                {
                    this.props.loading
                    ?
                        (
                            <Skeleton
                             variant={'rect'}
                             width="100%"
                             height={50}
                             style={{backgroundColor:grey[500]}}
                            />
                        )
                    :
                        (
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <div>
                                {
                                    this.props.passions.map(passion=>(
                                        <Chip 
                                        color={this.state.selectedPassion.indexOf(passion.id)>-1?'primary':'inherit'}
                                        onClick={()=>this.handlePassion(passion.id)}
                                        label={passion.name}
                                        variant="outlined"
                                        style={{margin:5}} />
                                    ))
                                }
                                </div>

                                {
                                    this.state.showButton
                                    ?
                                        (
                                            <div style={{marginTop:25,display:'flex',flexDirection:'column',alignItems:'center'}}>
                                                {
                                                    this.state.addingPassion
                                                    ?
                                                        (
                                                            <Typography color={'primary'}>
                                                                    {this.props.response.message}
                                                            </Typography>
                                                        )
                                                    :
                                                        (
                                                            <Button
                                                                onClick={this.addMyPassion}
                                                                color={'primary'}
                                                                variant={'contained'}>
                                                                    Add my passion
                                                            </Button>
                                                        )
                                                }
                                            </div>
                                        )
                                    :
                                        (null)
                                }
                            </div>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = state=>({
 passions:state.authReducer.usersReducer.passionReducer.passions,
 response:state.authReducer.usersReducer.passionReducer.response,
 loading:state.authReducer.usersReducer.passionReducer.loading
})

export default connect(mapStateToProps,{indexPassion,storePassion,showMainDialog})(OptionComponent)