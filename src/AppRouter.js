import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import MainAppBar from "./component/MainAppBar";
import SignUpPage from "./component/SignUpPage";
import Home from "./Home";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <MainAppBar />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/signup' component={SignUpPage} />
            </Switch>
        </BrowserRouter>
    )
}