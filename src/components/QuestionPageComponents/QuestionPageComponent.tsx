import * as React from 'react';
import './QuestionPageComponent.css';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
    questionId: string,
}

interface Props extends RouteComponentProps<MatchParams> { }

const QuestionPageComponent = (props: Props) => {

    const componentDidMount = async () => {
        const questionId = props.match.params.questionId;
        //TODO: fetch question data using question id here...
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    return (
        <div>
            <h2>This is QuestionPageComponent</h2>
        </div>
    );
}

export default QuestionPageComponent;