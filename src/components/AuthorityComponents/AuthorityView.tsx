import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Authority } from '../../classes/Authority';
import axiosInstance from '../../utils/axiosInstance';
import { ErrorHandler } from '../../utils/ErrorHandler';
import FeedPage from '../FeedComponents/FeedPage';
import LoginPage from '../Login_Components/LoginPage';
import QuestionPageComponent from '../QuestionPageComponents/QuestionPageComponent';

const AuthorityView = () => {

    const [authority, setAuthority] = useState(new Authority());

    const handleLogin = async (authoritySpecialId: string) => {
        try {
            const result = await axiosInstance.post(`/login/authority`, { authoritySpecialId: authoritySpecialId });
            setAuthority(new Authority(result.data));
        } catch (error) {
            ErrorHandler.handle(error);
        }

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