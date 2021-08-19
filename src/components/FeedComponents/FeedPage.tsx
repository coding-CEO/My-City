import * as React from 'react';
import './FeedPage.css';

import LoadingIcon from '../../static/main_loading.gif';

import { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { Question } from '../../classes/Question';
import QuestionCardComponent from './QuestionComponents/QuestionCardComponent';
import { LocationHandler } from '../../utils/LocationHandler';

const FeedPage = () => {

    const [tabValue, setTabValue] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [filterState, setFilterState] = useState(0);
    const [filterCity, setFilterCity] = useState(0);

    const componentDidMount = async () => {
        console.log(window.location.search);
        //TODO: fetch questions accordingly
        fetchAllQuestions();
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    const fetchAllQuestions = (): void => {
        setTimeout(() => {
            setQuestions([new Question(1, 'Jane is Running', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
                new Date(),
                'https://i.picsum.photos/id/781/300/500.jpg?hmac=HyDr7W7aw9LRkzQ3eYgKrLjjO0gXFYF_0VY0oAxM1bE')]);
        }, 2000);
    }

    const fetchMyQuestions = (): void => {
        setTimeout(() => {
            setQuestions([new Question(1, 'Turned On Laptop', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
                new Date(),
                'https://i.picsum.photos/id/180/200/300.jpg?hmac=EC8Kweq0GgryGedfHPQFsFTXsZ8NgHaYU5ZnhoGkPLA')]);
        }, 2000);
    }

    const getQuestionCards = (): JSX.Element[] => {
        if (questions.length <= 0) return [<img src={LoadingIcon} key="$" alt="loading" style={{ width: '50px' }} />];
        return questions.map((question: Question, index: number) => {
            return <QuestionCardComponent key={question.id} question={question} />;
        });
    }

    const onFilterStateChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        //TODO: completet this (maybe filter directly)
        setFilterState(Number(event.target.value));
        setFilterCity(0);
    }

    const onFilterCityChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        //TODO: completet this (maybe filter directly)
        setFilterCity(Number(event.target.value));
    }

    const getFilteringView = (): JSX.Element => {
        return (
            <div className="filter_container">
                <h4>Filter Options</h4>
                <div className="filter_dropdown_container">
                    <FormControl variant="outlined">
                        <InputLabel id="state-dropdown-id">State</InputLabel>
                        <Select
                            labelId="state-dropdown-id"
                            value={filterState}
                            onChange={onFilterStateChange}
                            label="State"
                        >
                            {LocationHandler.getStates().map((stateName: string, index: number) => {
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
                            {LocationHandler.getCities(filterState).map((cityName: string, index: number) => {
                                return <MenuItem key={cityName} value={index}>{cityName}</MenuItem>;
                            })}
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

    return (
        <div className="feedPage_container">
            <div className="feedContent_container">
                {getFilteringView()}
                <Typography variant="h4">{getTitle()}</Typography>
                <div className="feedContentCards_container">
                    {getQuestionCards()}
                </div>
            </div>
            <BottomNavigation
                value={tabValue}
                onChange={(event, newValue: number) => {
                    setTabValue(newValue);
                    setQuestions([]);
                    //TODO: think about this later
                    switch (newValue) {
                        case 0:
                            fetchAllQuestions();
                            break;
                        case 1:
                            fetchMyQuestions();
                            break;
                    }
                }}
                showLabels
            >
                <BottomNavigationAction label="Main Feed" icon={<DynamicFeedIcon />} />
                <BottomNavigationAction label="My Questions" icon={<QuestionAnswerIcon />} />
            </BottomNavigation>
        </div>
    );
}

export default FeedPage;