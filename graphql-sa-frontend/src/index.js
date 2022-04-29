/**
 * @fileoverview This file contains the application index code.
 */

// import ApolloClient from 'apollo-boost-upload';
// import { ApolloProvider } from "react-apollo";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createHttpLink } from 'apollo-link-http';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { HttpLink } from "apollo-boost";
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import OnlineServices from './views/OnlineServices.js';
import DriverServices from './views/DriverServices.js';
import VehicleServices from './views/VehicleServices.js';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'uswds/dist/css/uswds.min.css';

const cache = new InMemoryCache();
let client;

client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache,
})


ReactDOM.render((
    <Provider>
        <ApolloProvider client={client}>
            <HashRouter>
                <Switch>
                <Route exact path="/" name="Default Landing Page" component={App} />
                    <Route exact path="/OnlineServices" name="OnlineServices" component={OnlineServices} />
                    <Route exact path="/DriverServices" name="DriverServices" component={DriverServices} />
                    <Route exact path="/VehicleServices" name="VehicleServices" component={VehicleServices} />
                </Switch>
            </HashRouter>
        </ApolloProvider>
    </Provider>
), document.getElementById('root'));