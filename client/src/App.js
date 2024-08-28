import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/LoginPage';
import Signup from './pages/SignUp';
import UserList from './pages/UserList';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/users" component={UserList} />
            </Switch>
        </Router>
    );
}

export default App;
