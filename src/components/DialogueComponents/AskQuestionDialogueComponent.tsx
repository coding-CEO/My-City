import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useState } from 'react';
import { LocationHandler } from '../../utils/LocationHandler';
import { Question } from '../../classes/Question';
import { Citizen } from '../../classes/Citizen';

interface Props {
    open: boolean;
    citizen: Citizen;
    onClose: (question?: Question) => void;
}

const AskQuestionDialogueComponent = (props: Props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [state, setState] = useState(0);
    const [city, setCity] = useState(0);

    const handleClose = (isSuccess: boolean): void => {
        //TODO: complete this

        if (isSuccess) {
            props.onClose(new Question(-1, props.citizen.getHashedAadharNumber(), title, description, new Date(), state, city, imageUrl));
        } else {
            props.onClose();
        }

        setTitle("");
        setDescription("");
        setImageUrl("");
        setState(0);
        setCity(0);
    }

    const onStateChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        setState(Number(event.target.value));
        setCity(0);
    }

    const onCityChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        setCity(Number(event.target.value));
    }

    return (
        <Dialog onClose={() => handleClose(false)} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">Ask Question</DialogTitle>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleClose(true);
            }}>
                <DialogContent>
                    <TextField label="Title" variant="outlined" value={title}
                        style={{ marginBottom: '15px' }} type="text" onChange={(input) => {
                            setTitle(input.target.value);
                        }} required fullWidth />
                    <div style={{
                        width: '100%',
                        minWidth: '400px',
                        borderRadius: '3px',
                        boxShadow: '0 0 2px black',
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        marginBottom: '18px',
                        padding: '10px'
                    }}>
                        {/* TODO: add src */}
                        <div className="AskQuestionImage_container" style={{
                            width: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '3px',
                            boxShadow: '0 0 2px black',
                        }}>
                            <img src={imageUrl} alt="" style={{ width: '100%' }} />
                        </div>
                        <Button
                            variant="outlined"
                            component="label"
                            color="primary"
                            style={{ marginTop: '10px' }}
                        >
                            Upload Image
                            <input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                hidden
                                onChange={(input) => {
                                    if (input.target.files && input.target.files.length > 0) {
                                        setImageUrl(URL.createObjectURL(input.target.files[0]));
                                    }
                                }}
                            />
                        </Button>
                    </div>
                    <FormControl variant="outlined" style={{
                        marginBottom: '15px',
                        marginRight: '15px'
                    }} required>
                        <InputLabel id="state-dropdown-id">State</InputLabel>
                        <Select
                            labelId="state-dropdown-id"
                            value={state}
                            onChange={onStateChange}
                            label="State"
                        >
                            {LocationHandler.getStates(false).map((stateName: string, index: number) => {
                                return <MenuItem key={stateName} value={index}>{stateName}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" required>
                        <InputLabel id="city-dropdown-id">City</InputLabel>
                        <Select
                            labelId="city-dropdown-id"
                            value={city}
                            onChange={onCityChange}
                            label="City"
                        >
                            {LocationHandler.getCities(state, false).map((cityName: string, index: number) => {
                                return <MenuItem key={cityName} value={index}>{cityName}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Description"
                        multiline
                        minRows={4}
                        value={description}
                        variant="outlined"
                        onChange={(input) => {
                            setDescription(input.target.value);
                        }}
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Ask
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    );
}

export default AskQuestionDialogueComponent;