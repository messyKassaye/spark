import { Button, Typography } from '@material-ui/core'
import React from 'react'
import {showMainDialog} from '../../commons/state/actions/dialogActions'
import {connect} from 'react-redux'
class UnMatch extends React.Component{

    closeDialog = (type)=>{
        this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
    }
    render() {
        return (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <Typography>
                        {this.props.message}
                    </Typography>

                    <div style={{display:'flex',flexDirection:'row',marginTop:25}}>
                         <Button
                         onClick={()=>this.closeDialog(1)}
                         style={{marginRight:50}}
                         color={'primary'}
                         variant={'contained'}>
                             Yes
                         </Button>
                         <Button
                         onClick={()=>this.closeDialog(0)}
                         variant={'text'}>
                             No
                         </Button>
                    </div>
            </div>
        )
    }
}

export default connect(null,{showMainDialog})(UnMatch)