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
import { ErrorHandler } from '../../utils/ErrorHandler';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';
import { compressImage } from '../../utils/imageCompressor';

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
        fetchQuestionAndAnswer(questionId);

    }, [props.match.params.questionId, history]);

    const fetchQuestionAndAnswer = async (questionId: number) => {
        try {
            const questionResult = await axiosInstance.get(`/questions/${questionId}`);
            const tempQuestion = questionResult.data[0];
            setQuestion(new Question(tempQuestion.questionId, tempQuestion.hashedAadharNumber,
                tempQuestion.title, tempQuestion.description, new Date(tempQuestion.timestamp),
                tempQuestion.stateIndex, tempQuestion.cityIndex, tempQuestion.img_url, tempQuestion.area,
                tempQuestion.answerId));

            if (!tempQuestion.answerId || tempQuestion.answerId < 0) return;

            const answerResult = await axiosInstance.get(`/answers/${tempQuestion.answerId}`);
            const tempAnswer = answerResult.data[0];
            setAnswer(new Answer(tempAnswer.answerId, tempAnswer.title, tempAnswer.description,
                new Date(tempAnswer.timestamp), tempAnswer.img_url));
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    const getQuestionView = (): JSX.Element => {
        if (question === undefined) return <img src={LoadingIcon} alt="loading" style={{
            width: '50px',
            alignSelf: 'center'
        }} />;
        return (
            <div className="questionPageContent_container">
                <Typography variant="h5" style={{ marginBottom: '20px' }}>{question.title}</Typography>
                {(question.img_url.length > 0) && (
                    <CardMedia
                        className="questionContent_img_container"
                        image={question.img_url}
                    />
                )}
                <Typography variant="body2" component="pre" style={{ width: '100%', whiteSpace: 'pre-wrap' }}>
                    {question.description}
                </Typography>
            </div>
        );
    }

    const getAnswerView = (): JSX.Element => {
        if (question === undefined) return <img src={LoadingIcon} alt="loading" style={{
            width: '30px',
            alignSelf: 'center'
        }} />;
        if (!question.isAnswered()) return <React.Fragment />;
        if (answer === undefined) return <img src={LoadingIcon} alt="loading" style={{
            width: '30px',
            alignSelf: 'center'
        }} />;
        return (
            <React.Fragment>
                <div className="questionPage_location_conat">
                    <Typography variant="subtitle2" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}>
                        Answer Date: <Typography variant="body2" component="p" style={{ marginLeft: '10px' }}>
                            {answer.timestamp.toLocaleString()}
                        </Typography>
                    </Typography>
                </div>
                <div className="questionPageContent_container">
                    <Typography variant="h5" style={{ marginBottom: '20px' }}>{answer.title}</Typography>
                    {(answer.img_url.length > 0) && (
                        <CardMedia
                            className="questionContent_img_container"
                            image={answer.img_url}
                        />
                    )}
                    <Typography variant="body2" component="pre" style={{ width: '100%', whiteSpace: 'pre-wrap' }}>
                        {answer.description}
                    </Typography>
                </div>
            </React.Fragment>
        );
    }

    const handleAnswerQuestionDialogueOpen = (): void => {
        setAnswerQuestionDialogueOpen(true);
    }

    const handleAnswerQuestion = async (answer?: Answer) => {
        setAnswerQuestionDialogueOpen(false);
        if (!answer || !question) return;

        let formConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        let data = new FormData();

        if (answer.img_url.length > 0) {
            try {
                const imageRes = await axios.get(answer.img_url, { responseType: 'blob' });
                const imageBlob = await compressImage(imageRes.data, 0.3);
                data.append("answerImg", imageBlob);
            } catch (error) {
                ErrorHandler.handle(error);
            }
        }

        data.append("title", answer.title);
        data.append("description", answer.description);
        data.append("timestamp", answer.timestamp.getTime().toString());
        data.append("questionId", question.questionId.toString());

        try {
            const result = await axiosInstance.post('/answers', data, formConfig);
            answer.answerId = result.data.answerId;
            question.answerId = result.data.answerId;
            setAnswer(Answer.deepCopy(answer));
            setQuestion(Question.deepCopy(question));
        } catch (error) {
            ErrorHandler.handle(error);
        }
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
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    State: <Typography variant="body2" component="p" style={{ marginLeft: '10px' }}>
                        {LocationHandler.getState(question.stateIndex)}
                    </Typography>
                </Typography>
                <Typography variant="subtitle2" style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    City: <Typography variant="body2" component="p" style={{ marginLeft: '10px' }}>
                        {LocationHandler.getCity(question.stateIndex, question.cityIndex)}
                    </Typography>
                </Typography>
                <Typography variant="subtitle2" style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    Area: <Typography variant="body2" component="p" style={{ marginLeft: '10px' }}>
                        {question.area}
                    </Typography>
                </Typography>
                <Typography variant="subtitle2" style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    Upload Date: <Typography variant="body2" component="p" style={{ marginLeft: '10px' }}>
                        {question.timestamp.toLocaleString()}
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