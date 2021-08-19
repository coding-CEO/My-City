import * as React from 'react';
import { useEffect } from 'react';

const CitizenView = () => {

    const componentDidMount = async () => {

    }

    useEffect(() => {
        componentDidMount();
    }, []);

    return (
        <div>
            <h2>This is CitizenView</h2>
        </div>
    );
}

export default CitizenView;