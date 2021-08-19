import * as React from 'react';
import './LoginPage.css';

import { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Citizen } from '../../classes/Citizen';
import { useHistory } from 'react-router-dom';

interface Props {
    setCitizen: (citizen: Citizen) => void;
}

const LoginPage = (props: Props) => {

    const [aadharNumber, setAadharNumber] = useState("");
    const history = useHistory();

    const handleLogin = (e: any): void => {
        e.preventDefault();
        //TODO: verify aadhar number and login
        props.setCitizen(new Citizen(aadharNumber));
        history.push("/feed");
    }

    return (
        <div className="login_page_container">
            <h3>Log In</h3>
            <form onSubmit={handleLogin}>
                <TextField label="Aadhar Number" variant="outlined" type="number" required
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