import React from 'react'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Profile from './profile';
import Subscription from './Subscription';
import UsersDashboard from './UsersDashboard';
import ChatRoom from './widgets/ChatRoom';

class usersRoute extends React.Component{

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={'/auth'} component={UsersDashboard} exact/>
                    <Route path={'/auth/profile'} component={Profile}/>
                    <Route path={'/auth/subscription/products/:id'} component={Subscription}/>
                    <Route path={'/auth/messages/:id'} component={ChatRoom}/>
                </Switch>
            </Router>
        )
    }
}

export default usersRoute