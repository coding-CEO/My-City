import * as React from 'react';
import './QuestionPageComponent.css';

import LoadingIcon from '../../static/main_loading.gif';

import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Question } from '../../classes/Question';
import { Typography } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Answer } from '../../classes/Answer';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

interface MatchParams {
    questionId: string,
}

interface Props extends RouteComponentProps<MatchParams> { }

const QuestionPageComponent = (props: Props) => {

    const [question, setQuestion] = useState<Question>();
    const [answer, setAnswer] = useState<Answer>();
    const history = useHistory();

    useEffect(() => {
        const questionId = Number(props.match.params.questionId);
        if (isNaN(questionId)) {
            history.push('/404');
            return;
        }
        //TODO: fetch question data using question id here...
        setTimeout(() => {
            setQuestion(new Question(1, '2', 'Jane is Running',
                `Lorem ipsum dolor, sit amet consectetur
    adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur
adipisicing elit.`,
                new Date(), 5, 1,
                'https://i.picsum.photos/id/781/300/500.jpg?hmac=HyDr7W7aw9LRkzQ3eYgKrLjjO0gXFYF_0VY0oAxM1bE'));
            setTimeout(() => {
                setAnswer(new Answer(1, 'This is why she is running',
                    `Lorem ipsum dolor, sit amet consectetur
    adipisicing elit. Lorem i`,
                    new Date(),
                    'https://i.picsum.photos/id/180/200/300.jpg?hmac=EC8Kweq0GgryGedfHPQFsFTXsZ8NgHaYU5ZnhoGkPLA'));
            }, 2000);
        }, 2000);
    }, [props.match.params.questionId, history]);

    const getQuestionView = (): JSX.Element => {
        if (question === undefined) return <img src={LoadingIcon} alt="loading" style={{
            width: '50px',
            alignSelf: 'center'
        }} />;
        return (
            <div className="questionPageContent_container">
                <Typography variant="h5">{question.title}</Typography>
                <CardMedia
                    className="questionContent_img_container"
                    image={question.img_url}
                />
                <Typography variant="body2" component="pre" style={{ width: '100%', whiteSpace: 'pre-wrap' }}>
                    {question.description}
                </Typography>
            </div>
        );
    }

    const getAnswerView = (): JSX.Element => {
        if (answer === undefined) return <img src={LoadingIcon} alt="loading" style={{
            width: '30px',
            alignSelf: 'center'
        }} />;
        if (!answer.isAnswered()) return <React.Fragment />;
        return (
            <div className="questionPageContent_container">
                <Typography variant="h5">{answer.title}</Typography>
                <CardMedia
                    className="questionContent_img_container"
                    image={answer.img_url}
                />
                <Typography variant="body2" component="pre" style={{ width: '100%', whiteSpace: 'pre-wrap' }}>
                    {answer.description}
                </Typography>
            </div>
        );
    }

    const getAnswerChipView = (): JSX.Element => {
        if (question === undefined) return (
            <Chip
                label="Answer Loading"
                style={{ marginBottom: '20px', marginTop: '20px' }}
            />
        );
        if (question.isAnswered()) return (
            <Chip
                icon={<DoneIcon />}
                label="Answered"
                color="primary"
                style={{ marginBottom: '20px', marginTop: '20px' }}
            />
        );
        return (
            <Chip
                icon={<CancelIcon />}
                label="Unanswered"
                color="secondary"
                style={{ marginBottom: '20px', marginTop: '20px' }}
            />
        )
    }

    return (
        <div className="questionPage_container">
            <Typography variant="h4" style={{ marginBottom: '20px' }}>Question</Typography>
            {getQuestionView()}
            {getAnswerChipView()}
            {getAnswerView()}
        </div>
    );
}

export default QuestionPageComponent;