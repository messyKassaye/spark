import { Typography } from '@material-ui/core'
import React from 'react'

class SparkProductLogo extends React.Component{

    render() {
        return (
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <Typography style={{marginRight:10}}>
                    Spark
                </Typography>
                <span style={{textAlign:'center',paddingLeft:15,paddingRight:15,backgroundColor:this.props.color,paddingBottom:0,color:'#242424'}}>
                    {
                        this.props.product_name
                    }
                </span>
            </div>
        )
    }
}

export default SparkProductLogo