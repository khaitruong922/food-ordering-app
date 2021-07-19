import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./component/Login";
import NavBar from "./component/NavBar";
import SignUp from "./component/SignUp";
import Home from "./Home";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
            </Switch>
        </BrowserRouter>
    )
}