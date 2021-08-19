import * as React from 'react';
import './QuestionPageComponent.css';

import LoadingIcon from '../../static/main_loading.gif';

import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Question } from '../../classes/Question';

interface MatchParams {
    questionId: string,
}

interface Props extends RouteComponentProps<MatchParams> { }

const QuestionPageComponent = (props: Props) => {

    const [question, setQuestion] = useState<Question>();
    const history = useHistory();

    useEffect(() => {
        const questionId = Number(props.match.params.questionId);
        if (isNaN(questionId)) {
            history.push('/404');
            return;
        }
        //TODO: fetch question data using question id here...
        setTimeout(() => {
            setQuestion(new Question(1, 'Jane is Running', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
                new Date(), 5, 1,
                'https://i.picsum.photos/id/781/300/500.jpg?hmac=HyDr7W7aw9LRkzQ3eYgKrLjjO0gXFYF_0VY0oAxM1bE'));
        }, 2000);
    }, [props.match.params.questionId, history]);

    const getQuestionPageView = (): JSX.Element => {
        if (question === undefined) return <img src={LoadingIcon} alt="loading" style={{ width: '50px' }} />;
        //TODO: complete this page content properly
        return (
            <div className="questionPageContent_container">
                <h2>This is QuestionPageComponent</h2>
            </div>
        );
    }

    return (
        <div className="questionPage_container">
            {getQuestionPageView()}
        </div>
    );
}

export default QuestionPageComponent;