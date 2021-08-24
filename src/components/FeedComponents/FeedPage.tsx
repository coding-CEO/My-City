import * as React from 'react';
import './FeedPage.css';

import { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { Question } from '../../classes/Question';
import QuestionCardComponent from './QuestionComponents/QuestionCardComponent';
import { LocationHandler } from '../../utils/LocationHandler';
import CreateIcon from '@material-ui/icons/Create';
import AskQuestionDialogueComponent from '../DialogueComponents/AskQuestionDialogueComponent';
import { Citizen } from '../../classes/Citizen';
import { Authority } from '../../classes/Authority';
import { ErrorHandler } from '../../utils/ErrorHandler';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';
import { compressImage } from '../../utils/imageCompressor';

interface Props {
    citizen?: Citizen;
    authority?: Authority;
}

const FeedPage = (props: Props) => {

    const [tabValue, setTabValue] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    //Filter states are 1 based indexed
    const [filterState, setFilterState] = useState(0);
    const [filterCity, setFilterCity] = useState(0);
    const [filterQuestionType, setFilterQuestionType] = useState(0);
    const [isAskQuestionDialogueOpen, setAskQuestionDialogueOpen] = useState(false);

    useEffect(() => {
        fetchAllQuestions();
        return () => {
            setQuestions([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabValue, props.citizen, filterState, filterCity, filterQuestionType]);

    const fetchAllQuestions = (): void => {
        setQuestions([]);
        if (tabValue === 0) {
            if (props.citizen)
                fetchAllCitizenQuestions();
            else
                fetchAllAuthorityQuestions();
        } else {
            fetchMyQuestions();
        }
    }

    const fetchAllCitizenQuestions = async () => {
        try {
            const result = await axiosInstance.get(`/questions?stateIndex=${filterState}&cityIndex=${filterCity}&question_type=${filterQuestionType}`);
            setQuestionsUtil(result.data);
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    const fetchAllAuthorityQuestions = async () => {
        if (!props.authority) return;
        try {
            const result = await axiosInstance.get(`/questions?stateIndex=${props.authority.stateIndex}&cityIndex=${props.authority.cityIndex}&question_type=0`);
            setQuestionsUtil(result.data);
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    const fetchMyQuestions = async () => {
        if (!props.citizen) return;
        try {
            const result = await axiosInstance.get(`/questions?hashedAadharNumber=${props.citizen.getHashedAadharNumber()}&stateIndex=${filterState}&cityIndex=${filterCity}&question_type=${filterQuestionType}`);
            setQuestionsUtil(result.data);
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    const setQuestionsUtil = (questions: any[]): void => {
        const main_questions: Question[] = [];
        questions.forEach((tempQuestion) => {
            main_questions.push(new Question(tempQuestion.questionId, tempQuestion.hashedAadharNumber,
                tempQuestion.title, tempQuestion.description, new Date(tempQuestion.timestamp),
                tempQuestion.stateIndex, tempQuestion.cityIndex, tempQuestion.img_url, tempQuestion.area,
                tempQuestion.answerId));
        });
        setQuestions(main_questions);
    }

    const getQuestionCards = (): JSX.Element[] => {
        return questions.map((question: Question, index: number) => {
            return <QuestionCardComponent key={question.questionId} question={question} />;
        });
    }

    const onFilterStateChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        setFilterState(Number(event.target.value));
        setFilterCity(0);
    }

    const onFilterCityChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        setFilterCity(Number(event.target.value));
    }

    const onFilterQuestionTypeChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        setFilterQuestionType(Number(event.target.value));
    }

    const getFilteringView = (): JSX.Element => {
        return (
            <div className="filter_container">
                <h4>Filter Questions</h4>
                <div className="filter_dropdown_container">
                    <FormControl variant="outlined">
                        <InputLabel id="state-dropdown-id">State</InputLabel>
                        <Select
                            labelId="state-dropdown-id"
                            value={filterState}
                            onChange={onFilterStateChange}
                            label="State"
                        >
                            {LocationHandler.getStates(true).map((stateName: string, index: number) => {
                                return <MenuItem key={stateName} value={index}>{stateName}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel id="city-dropdown-id">City</InputLabel>
                        <Select
                            labelId="city-dropdown-id"
                            value={filterCity}
                            onChange={onFilterCityChange}
                            label="City"
                        >
                            {LocationHandler.getCities(filterState, true).map((cityName: string, index: number) => {
                                return <MenuItem key={cityName} value={index}>{cityName}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" style={{ minWidth: '104px' }}>
                        <InputLabel id="question-type-dropdown-id">Question Type</InputLabel>
                        <Select
                            labelId="question-type-dropdown-id"
                            value={filterQuestionType}
                            onChange={onFilterQuestionTypeChange}
                            label="Question Type"
                        >
                            <MenuItem value={0}>Both</MenuItem>;
                            <MenuItem value={1}>Answered</MenuItem>;
                            <MenuItem value={2}>Unanswered</MenuItem>;
                        </Select>
                    </FormControl>
                </div>
            </div>
        );
    }

    const getTitle = (): string => {
        switch (tabValue) {
            case 0:
                return "Feed";
            default:
                return "My Questions";
        }
    }

    const handleAskQuestionDialogueOpen = (): void => {
        setAskQuestionDialogueOpen(true);
    }

    const handleAskQuestion = async (question?: Question) => {
        setAskQuestionDialogueOpen(false);
        if (!question) return;
        let formConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        let data = new FormData();

        if (question.img_url.length > 0) {
            try {
                const imageRes = await axios.get(question.img_url, { responseType: 'blob' });
                const imageBlob = await compressImage(imageRes.data, 0.3);
                data.append("questionImg", imageBlob);
            } catch (error) {
                ErrorHandler.handle(error);
            }
        }

        data.append("citizenHashedAadharNumber", question.citizenHashedAadharNumber);
        data.append("title", question.title);
        data.append("description", question.description);
        data.append("timestamp", question.timestamp.getTime().toString());
        data.append("stateIndex", question.stateIndex.toString());
        data.append("cityIndex", question.cityIndex.toString());
        data.append("area", question.area);

        try {
            const result = await axiosInstance.post('/questions', data, formConfig);
            question.questionId = result.data.questionId;
            setQuestions([question, ...questions]);
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    const isCitizenExist = (): boolean => {
        return props.citizen !== undefined;
    }

    return (
        <div className="feedPage_container">
            <div className="feedContent_container" style={{ marginTop: (isCitizenExist() ? "56px" : "0px") }}>
                {isCitizenExist() && getFilteringView()}
                <Typography variant="h4">{getTitle()}</Typography>
                {isCitizenExist() && (
                    <React.Fragment>
                        <Button variant="contained" startIcon={<CreateIcon />} color="primary" style={{
                            alignSelf: 'flex-end',
                        }} size="small" onClick={handleAskQuestionDialogueOpen}>
                            Ask Question
                        </Button>
                        {/* @ts-ignore */}
                        <AskQuestionDialogueComponent open={isAskQuestionDialogueOpen} citizen={props.citizen}
                            onClose={handleAskQuestion} />
                    </React.Fragment>
                )}
                <div className="feedContentCards_container">
                    {getQuestionCards()}
                </div>
            </div>
            {isCitizenExist() && (
                <BottomNavigation
                    value={tabValue}
                    onChange={(event, newValue: number) => {
                        setTabValue(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction label="Main Feed" icon={<DynamicFeedIcon />} />
                    <BottomNavigationAction label="My Questions" icon={<QuestionAnswerIcon />} />
                </BottomNavigation>
            )}
        </div>
    );
}

export default FeedPage;