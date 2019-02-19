import * as CONSTANTS from './constants';
import {InterviewInterface} from "../../interfaces/interview.interface";

export function addInterview(interview:InterviewInterface) {
    return {
        type: CONSTANTS.ACTION_ADD_INTERVIEW,
        ...interview
    };
}
