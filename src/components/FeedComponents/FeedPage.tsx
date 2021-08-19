import * as React from 'react';
import './FeedPage.css';

import { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Typography } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Question } from '../../classes/Question';
import QuestionComponent from './QuestionComponents/QuestionComponent';

const FeedPage = () => {

    const [tabValue, setTabValue] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);

    const componentDidMount = async () => {
        console.log(window.location.search);
        //TODO: fetch questions according to search argument in url
        setQuestions([new Question(1, 'Jane is Running', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.', new Date(), 'https://i.picsum.photos/id/781/300/500.jpg?hmac=HyDr7W7aw9LRkzQ3eYgKrLjjO0gXFYF_0VY0oAxM1bE')]);
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    const getQuestionCards = (): JSX.Element[] => {
        //TODO: add loading icon if possible
        if (questions.length <= 0) return [<h3 key="$">Loading</h3>];
        return questions.map((question: Question, index: number) => {
            return <QuestionComponent key={question.id} question={question} />;
        });
    }

    return (
        <div className="feedPage_container">
            <div className="feedContent_container">
                <Typography variant="h4">Feed</Typography>
                <div className="feedContentCards_container">
                    {getQuestionCards()}
                </div>
            </div>
            <BottomNavigation
                value={tabValue}
                onChange={(event, newValue) => {
                    setTabValue(newValue);
                }}
                showLabels
            >
                {/* TODO: change icon later */}
                <BottomNavigationAction label="Main Feed" icon={<RestoreIcon />} />
                <BottomNavigationAction label="My Questions" icon={<FavoriteIcon />} />
            </BottomNavigation>
        </div>
    );
}

export default FeedPage;