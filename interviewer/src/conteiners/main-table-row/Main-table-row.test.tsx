import * as actions from './actions';
import * as CONSTANTS from './constants';

/*-------------------------- Redux tests -------------------------------*/
describe('main-table-row actions', () => {
    let id ='13';
    it('should create an action to remove interview', () => {
        const expectedAction = {
            type: CONSTANTS.ACTION_REMOVE_INTERVIEW,
            id
        };
        expect(actions.removeInterview(id)).toEqual(expectedAction)
    })
});