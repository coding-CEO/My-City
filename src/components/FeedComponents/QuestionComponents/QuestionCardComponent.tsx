import * as React from 'react';
import './QuestionCardComponent.css';

import { Question } from '../../../classes/Question';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Chip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory } from 'react-router-dom';

interface Props {
    question: Question;
}

const QuestionCardComponent = (props: Props) => {

    const history = useHistory();

    const handleOpenQuestion = (): void => {
        history.push(`/question/${props.question.questionId}`);
    }

    const getAnswerChipView = (): JSX.Element => {
        if (props.question.isAnswered()) return (
            <Chip
                icon={<DoneIcon />}
                label="Answered"
                color="primary"
                size="small"
                variant="outlined"
            />
        );
        return (
            <Chip
                icon={<CancelIcon />}
                label="Unanswered"
                color="secondary"
                size="small"
                variant="outlined"
            />
        )
    }

    const getTimeDiff = (): string => {
        let diff: number = (new Date()).getTime() - props.question.timestamp.getTime();
        let minutes = diff / 60000;
        let hours = minutes / 60;
        let days = hours / 24;
        if (days >= 1) return `${Math.trunc(days)} Days Ago`;
        if (hours >= 1) return `${Math.trunc(hours)} Hrs Ago`;
        if (minutes >= 1) return `${Math.trunc(minutes)} Mins Ago`;
        return `1 Mins Ago`;
    }

    const getCardImageView = (): JSX.Element => {
        if (!props.question.img_url || props.question.img_url.length <= 0) return <React.Fragment />;
        return (
            <CardMedia
                className="questionCard_img_container"
                image={props.question.img_url}
            />
        );
    }

    return (
        <Card className="questionCard_container" onClick={handleOpenQuestion}>
            <CardActionArea>
                {getCardImageView()}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.question.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.question.description}...
                    </Typography>
                    <div className="questionCard_info_container">
                        {getAnswerChipView()}
                        <Typography variant="body2" color="textSecondary" component="p"
                            style={{ textAlign: 'end', fontSize: '13px' }}>
                            {getTimeDiff()}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default QuestionCardComponent;