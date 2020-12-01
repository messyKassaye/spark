import { Typography } from '@material-ui/core'
import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo.png'
class LogoComponent extends React.Component{

    render() {
        return (
            <div>
               <img  component={Link} to={'/'} width={150} height={100} src={logo}/> 
            </div>
        )
    }
}

export default LogoComponent