import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ConnectedDocuments from './components/documents/Document';
import ConnectedLoginPage from './components/auth/LoginPage';
import ConnectedUserProfile from './components/users/UserProfile';
import ConnectedSignUpPage from './components/auth/SignUpPage';
import ConnectedCreateDocument from './components/documents/CreateDocument';
import ConnectedEditDocument from './components/documents/EditDocument';
import ConnectedUsers from './components/users/Users';
import Home from './components/Home';
import ConnectedUserDocuments from './components/documents/UserDocuments';
import Protect from './components/Protect';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={ConnectedLoginPage} />
      <Route path="/signup" component={ConnectedSignUpPage} />
      <Protect path="/document" component={ConnectedDocuments} />
      <Protect path="/mydocuments" component={ConnectedUserDocuments} />
      <Protect path="/profile" component={ConnectedUserProfile} />
      <Protect path="/user" component={ConnectedUsers} />
      <Protect path="/create" component={ConnectedCreateDocument} />
      <Protect path="/edit/:id" component={ConnectedEditDocument} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
