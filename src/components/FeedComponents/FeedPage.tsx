import * as React from 'react';
import './FeedPage.css';

import { useEffect } from 'react';

const FeedPage = () => {

    const componentDidMount = async () => {

    }

    useEffect(() => {
        componentDidMount();
    }, []);

    return (
        <div>
            <h2>This is FeedPage</h2>
        </div>
    );
}

export default FeedPage;