import {InterviewInterface} from "../../interfaces/interview.interface";
import * as CONSTANTS from "../main/constants";

export function addInterview(interview:InterviewInterface) {
    return {
        type: CONSTANTS.ACTION_ADD_INTERVIEW,
        ...interview
    };
}
