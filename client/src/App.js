import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import Login from './pages/LoginPage';
import LoginOne from './pages/Login';
import Signup from './pages/Register';
// import Signup from './pages/SignUp';
// import UserList from './pages/UserList';
import UserTableList from './pages/UserTableData';
import PrivateRoute from '././components/PrivateRoute'; 

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginOne} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={LoginOne} />
                
                <PrivateRoute path="/users" component={UserTableList} />
                <Redirect to="/login" />
            </Switch>
        </Router>
    );
}

export default App;
