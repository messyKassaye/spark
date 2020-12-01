import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import dashboardStyle from './styles/dashboardStyle'
import UsersBigDevice from './UsersBigDevice'
import UsersSmallDevice from './UsersSmallDevice'
class UsersDashboard extends React.Component{

    componentDidMount(){

    }

    render(){
        const {classes} = this.props
        return <div>
            <div className={classes.bigDevice}>
                <UsersBigDevice/>
            </div>

            <div className={classes.smallDevice}>
                <UsersSmallDevice/>
            </div>
        </div>
    }
}

export default withStyles(dashboardStyle)(UsersDashboard)