import * as React from 'react';
import './QuestionCardComponent.css';

import { Question } from '../../../classes/Question';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

interface Props {
    question: Question;
}

const QuestionCardComponent = (props: Props) => {

    const history = useHistory();

    const handleOpenQuestion = (): void => {
        history.push(`/question/${props.question.id}`);
    }

    //TODO: add extra fields like, isAnswerd status
    return (
        <Card className="questionCard_container" onClick={handleOpenQuestion}>
            <CardActionArea>
                <CardMedia
                    className="questionCard_img_container"
                    image={props.question.img_url}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.question.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.question.description}...
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p"
                        style={{ marginTop: '16px', textAlign: 'end' }}>
                        {props.question.timestamp.toDateString()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default QuestionCardComponent;