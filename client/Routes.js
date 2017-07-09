import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Documents from './components/documents/Document.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import UserProfile from './components/users/UserProfile.jsx';
import SignUpPage from './components/auth/SignUpPage.jsx';
import CreateDocument from './components/documents/CreateDocument.jsx';
import Layout from './components/Layout.jsx';
import EditDocument from './components/documents/EditDocument.jsx';
import Users from './components/users/Users.jsx';
import Home from './components/Home.jsx';
import UserDocuments from './components/documents/UserDocuments.jsx';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Layout>
        <Route path="/document" component={Documents} />
        <Route path="/docs" component={UserDocuments} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/user" component={Users} />
        <Route path="/create" component={CreateDocument} />
        <Route path="/edit/:id" component={EditDocument} />
        {/*<Route path="*" render={() => <h1>Page not found</h1>} />*/}
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
