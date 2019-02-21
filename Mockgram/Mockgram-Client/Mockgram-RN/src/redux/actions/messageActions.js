import * as ActionTypes from './ActionTypes';

import baseUrl from '../../common/baseUrl';
import { parseIdFromObjectArray } from '../../utils/idParser';

export const getMessage = (token) => dispatch => {
    if (token) {
        return fetch(`${baseUrl.api}/message/new`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token
            }
        }).then(res => res.json()).then(resJson => {
            if (resJson.status === 200) {
                let messages = resJson.data;
                dispatch(addMessage(messages));
            } else {
                let errMsg = resJson.msg;
                dispatch(addMessageFailed(errMsg));
            }
        })
    }
    return;
}

export const addMessage = (messages) => ({
    type: ActionTypes.RECEIVE_MESSAGE,
    payload: messages
})

export const addMessageFailed = (err) => ({
    type: ActionTypes.MESSAGE_ERROR,
    payload: err
})