import React from 'react';
// import { Switch, Route } from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import App from './components/Index.jsx';
import Documents from './components/documents/Document.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import UserProfile from './components/users/UserProfile.jsx';
import SignUpPage from './components/auth/SignUpPage.jsx';
import CreateDocument from './components/documents/CreateDocument.jsx';
import Layout from './components/Layout.jsx';
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
        <Route path="/document/create" component={CreateDocument} />
        {/*<Route path="*" render={() => <h1>Page not found</h1>} />*/}
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
