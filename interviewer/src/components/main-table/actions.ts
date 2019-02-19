import * as CONSTANTS from "../main-table-row/constants";

export function getInterview(interviews: any) {
    return {
        type: CONSTANTS.ACTION_GET_INTERVIEW,
        interviews
    };
}

