/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';

import { Switch, Route } from 'react-router-dom';

import UsersPage from 'containers/Users/Loadable';
import LoginPage from 'containers/Login/Loadable';
import SignupPage from 'containers/Signup/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import AuthRoute from '../../components/AuthRoute'

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default class App extends React.Component {
  render() {
    let authToken = localStorage.getItem("token") ? true : false;
    return (
      <AppWrapper>  
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
        </Helmet>
        <Header />
        {authToken ? (
          <Switch>
            <Route path="/users" component={UsersPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>) : (
          <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          </Switch>
        )}
        <Footer />
        <GlobalStyle />
      </AppWrapper>
    );
  }
}
