import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginOne from './pages/Login';
import Signup from './pages/Register';
import UserTableList from './pages/UserTableData';
import UserProfile from './pages/UserProfile';
import PrivateRoute from '././components/PrivateRoute'; 

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginOne} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={LoginOne} />
                
                <PrivateRoute path="/users" component={UserTableList} />
                <PrivateRoute path="/user/:userId" component={UserProfile} />
                <Redirect to="/login" />
            </Switch>
        </Router>
    );
}

export default App;
