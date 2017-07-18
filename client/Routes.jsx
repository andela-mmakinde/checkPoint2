import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Documents from './components/documents/Document';
import LoginPage from './components/auth/LoginPage';
import UserProfile from './components/users/UserProfile';
import SignUpPage from './components/auth/SignUpPage';
import CreateDocument from './components/documents/CreateDocument';
import Layout from './components/Layout';
import EditDocument from './components/documents/EditDocument';
import Users from './components/users/Users';
import Home from './components/Home';
import UserDocuments from './components/documents/UserDocuments';

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
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
