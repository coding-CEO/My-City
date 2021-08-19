import * as React from 'react';
import './QuestionComponent.css';

import { useEffect } from 'react';
import { Question } from '../../../classes/Question';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';

interface Props {
    question: Question;
}

const QuestionComponent = (props: Props) => {

    const componentDidMount = async () => {

    }

    useEffect(() => {
        componentDidMount();
    }, []);

    return (
        <Card className="questionCard_container">
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

export default QuestionComponent;