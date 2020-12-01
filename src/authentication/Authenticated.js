import React, {Suspense} from "react";
import {getRole} from "../TokenService";
import Loading from "../helpers/Loading";
import {BrowserRouter as Router} from "react-router-dom";
let Component = null
class Authenticated extends React.Component{

    constructor(props){
        super(props);
    }


    render() {
        Component = React.lazy(()=>import("./users/usersRoute"))
        return (
            <Suspense fallback={<Loading/>}>
                <Router>
                    <Component/>
                </Router>
            </Suspense>
        )
    }
}

export default Authenticated
