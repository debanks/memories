// src/routes.js
import React from 'react';
import {Router, Route} from 'react-router';

import App from './app';
import Home from './home';
import Splash from './global/components/Splash/SplashScreen';

/**
 * Checks if user is logged in, if not shifts to login page
 */
function requireAuth(nextState, replace) {
    if (!localStorage.getItem('date') || localStorage.getItem('date') !== '2015-06-28') {
        replace({
            pathname: '/splash',
            state: {nextPathname: nextState.location.pathname, search: nextState.location.search}
        })
    }
}

/**
 * The routing information for the app
 */
const Routes = (props) => (
    <Router {...props}>
        <Route component={App}>
            <Route path="/" component={Home} onEnter={requireAuth}/>
            <Route path="/splash" component={Splash}/>
        </Route>
    </Router>
);

export default Routes;