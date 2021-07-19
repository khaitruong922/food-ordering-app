import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />

            </Switch>
        </BrowserRouter>
    )
}