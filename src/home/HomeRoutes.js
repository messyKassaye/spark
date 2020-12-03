import React from 'react'
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import CreateAccount from './CreateAccount';
import HomePage from './HomePage';
import CreateAccountAndLogin from './dialogs/CreateAccountAndLogin';
class HomeRoutes extends React.Component{
    render(){

       return <Router>
            <Switch>
                <Route path='/' component={HomePage} exact/>
               
                <Route 
                 path='/create_account'
                 component={CreateAccount}
                />

                <Route 
                 path='/login'
                 component={CreateAccountAndLogin}
                />

            </Switch>
        </Router>
    }
}

export default HomeRoutes