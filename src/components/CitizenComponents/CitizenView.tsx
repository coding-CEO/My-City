import * as React from 'react';
import { useState } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Citizen } from '../../classes/Citizen';
import FeedPage from '../FeedComponents/FeedPage';
import LoginPage from '../Login_Components/LoginPage';

const CitizenView = () => {

    const [citizen, setCitizen] = useState(new Citizen());

    return (
        <Router>
            <Switch>
                <Route path='/' exact render={(props) => {
                    if (citizen.getAadharNumber().length > 0) return <Redirect to="/feed" {...props} />;
                    return <LoginPage setCitizen={setCitizen} />;
                }} />
                <Route path='/feed' exact render={(props) => {
                    if (citizen.getAadharNumber().length <= 0) return <Redirect to="/" {...props} />;
                    return <FeedPage />;
                }} />
                <Route render={() => {
                    return <h2>Page Not Found 404</h2>;
                }} />
            </Switch>
        </Router>
    );
}

export default CitizenView;