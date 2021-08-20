import * as React from 'react';
import './LoginPage.css';

import { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface Props {
    userNameTitle: string;
    userNameType: string;
    handleLogin: (userName: string) => void;
}

const LoginPage = (props: Props) => {

    const [aadharNumber, setAadharNumber] = useState("");

    const handleLogin = (e: any): void => {
        e.preventDefault();
        props.handleLogin(aadharNumber);
    }

    return (
        <div className="login_page_container">
            <h3>Log In</h3>
            <form onSubmit={handleLogin}>
                <TextField label={props.userNameTitle} variant="outlined" type={props.userNameType} required
                    onChange={(input) => {
                        setAadharNumber(input.target.value.toString());
                    }} />
                <TextField label="Password (Optional)" variant="outlined" type="password" />
                <Button type="submit" variant="contained" color="primary">LogIn</Button>
            </form>
        </div>
    );
}

export default LoginPage;