import React from 'react'
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import CreateAccount from './CreateAccount';
import HomePage from './HomePage';
import history from './history/history'
import CreateAccountAndLogin from './dialogs/CreateAccountAndLogin';
class HomeRoutes extends React.Component{
    render(){

       return <Router>
            <Switch>
                <Route path='/' component={HomePage} exact/>
               
                <Route 
                 path='/create_account'
                 render={ props => <CreateAccount {...props} />}
                />

                <Route 
                 path='/login'
                 render={ props => <CreateAccountAndLogin {...props} />}
                />

            </Switch>
        </Router>
    }
}

export default HomeRoutes