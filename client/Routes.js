import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Documents from './components/Document.jsx';
import Home from './components/Homepage.jsx';
import LoginPage from './components/LoginPage.jsx';
import App from './components/App.jsx';
import SignUpPage from './components/SignUpPage.jsx';


const Routes = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/index" component={App} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/document" component={Documents} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="*" render={() => <h1>Page not found</h1>} />
      </Switch>
    </Router >
);


export default Routes;
