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
import Protect from './components/Protect';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Layout>
        <Protect path="/document" component={Documents} />
        <Protect path="/docs" component={UserDocuments} />
        <Protect path="/profile" component={UserProfile} />
        <Protect path="/user" component={Users} />
        <Protect path="/create" component={CreateDocument} />
        <Protect path="/edit/:id" component={EditDocument} />
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
