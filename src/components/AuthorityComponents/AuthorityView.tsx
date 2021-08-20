import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Authority } from '../../classes/Authority';
import FeedPage from '../FeedComponents/FeedPage';
import LoginPage from '../Login_Components/LoginPage';
import QuestionPageComponent from '../QuestionPageComponents/QuestionPageComponent';

const AuthorityView = () => {

    const [authority, setAuthority] = useState(new Authority());

    const handleLogin = (authoritySpecialId: string): void => {
        //TODO: handle login
        setAuthority(new Authority(authoritySpecialId));
    }

    return (
        <Router>
            <Switch>
                <Route path='/' exact render={(props) => {
                    if (authority.authoritySpecitalId.length > 0) return <Redirect to="/feed" {...props} />;
                    return <LoginPage userNameTitle="Authority Special ID" handleLogin={handleLogin}
                        userNameType="string" />;
                }} />
                <Route path='/feed' exact render={(props) => {
                    if (authority.authoritySpecitalId.length <= 0) return <Redirect to="/" {...props} />;
                    return <FeedPage authority={authority} />;
                }} />
                <Route path='/question/:questionId' exact render={(props) => {
                    if (authority.authoritySpecitalId.length <= 0) return <Redirect to="/" {...props} />;
                    return <QuestionPageComponent {...props} authority={authority} />;
                }} />
                <Route render={() => {
                    return <h2>Page Not Found 404</h2>;
                }} />
            </Switch>
        </Router>
    );
}

export default AuthorityView;