import * as React from 'react';
import './QuestionPageComponent.css';

import LoadingIcon from '../../static/main_loading.gif';

import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Question } from '../../classes/Question';
import { Button, Typography } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Answer } from '../../classes/Answer';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';
import { Authority } from '../../classes/Authority';
import AnswerQuestionDialogueComponent from '../DialogueComponents/AnswerQuestionDialogueComponent';
import { LocationHandler } from '../../utils/LocationHandler';

interface MatchParams {
    questionId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
    authority?: Authority;
}

const QuestionPageComponent = (props: Props) => {

    const [question, setQuestion] = useState<Question>();
    const [answer, setAnswer] = useState<Answer>();
    const [isAnswerQuestionDialogueOpen, setAnswerQuestionDialogueOpen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const questionId = Number(props.match.params.questionId);
        if (isNaN(questionId)) {
            history.push('/404');
            return;
        }
        //TODO: If (no authority || Authority has permission to view this question) only then fetch it



        setTimeout(() => {
            setQuestion(new Question(1, '2', 'Jane is Running',
                `Lorem ipsum dolor, sit amet consectetur
    adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur
adipisicing elit.`,
                new Date(), 0, 0,
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

    const handleAnswerQuestionDialogueOpen = (): void => {
        setAnswerQuestionDialogueOpen(true);
    }

    const handleAnswerQuestion = (answer?: Answer): void => {
        setAnswerQuestionDialogueOpen(false);
        if (!answer) return;
        //TODO: complete this
        console.log(answer);
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
        if (props.authority) return (
            <div className="authorityAnswerQuestionView">
                <Chip
                    icon={<CancelIcon />}
                    label="Unanswered"
                    color="secondary"
                    variant="outlined"
                    style={{ marginBottom: '20px', marginTop: '20px' }}
                />
                <Button variant="contained" color="primary" size="small"
                    startIcon={<CreateIcon />} style={{ marginLeft: '15px' }}
                    onClick={handleAnswerQuestionDialogueOpen}>
                    Answer
                </Button>
                <AnswerQuestionDialogueComponent open={isAnswerQuestionDialogueOpen}
                    onClose={handleAnswerQuestion} />
            </div>
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

    const getLocationView = (): JSX.Element => {
        if (question === undefined) return <React.Fragment />;
        return (
            <div className="questionPage_location_conat">
                <Typography variant="subtitle2" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    State: <Typography variant="body2" component="p" style={{ marginLeft: '10px' }}>
                        {LocationHandler.getState(question.stateIndex)}
                    </Typography>
                </Typography>
                <Typography variant="subtitle2" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    City: <Typography variant="body2" component="p" style={{ marginLeft: '10px' }}>
                        {LocationHandler.getCity(question.stateIndex, question.cityIndex)}
                    </Typography>
                </Typography>
                <Typography variant="subtitle2" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    Area: <Typography variant="body2" component="p" style={{ marginLeft: '10px' }}>
                        {question.area}
                    </Typography>
                </Typography>
            </div>
        );
    }

    return (
        <div className="questionPage_container">
            <Typography variant="h4" style={{ marginBottom: '20px' }}>Question</Typography>
            {getLocationView()}
            {getQuestionView()}
            {getAnswerChipView()}
            {getAnswerView()}
        </div>
    );
}

export default QuestionPageComponent;