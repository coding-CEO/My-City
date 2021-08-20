import * as React from 'react';
import { TextField } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useState } from 'react';
import { Answer } from '../../classes/Answer';

interface Props {
    open: boolean;
    onClose: (answer?: Answer) => void;
}

const AnswerQuestionDialogueComponent = (props: Props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleClose = (isSuccess: boolean): void => {
        if (isSuccess) {
            props.onClose(new Answer(-1, title, description, new Date(), imageUrl));
        } else {
            props.onClose();
        }

        setTitle("");
        setDescription("");
        setImageUrl("");
    }

    return (
        <Dialog onClose={() => handleClose(false)} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">Answer Question</DialogTitle>
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
                        <div style={{
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
                        Answer
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    );
}

export default AnswerQuestionDialogueComponent;