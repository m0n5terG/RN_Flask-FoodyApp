import axios from 'axios';
import { API, API_WHOAMI, API_IMAGE_URL } from './API';

import { logOutAction } from '../redux/ducks/blogAuth';
import { 
    uploadUserIDAction, 
    uploadUsernameAction, 
    uploadProfileImageAction, 
    uploadDateJoinedAction,
    uploadBlogsAction,
    uploadCountAction
} from '../redux/ducks/accountPref';

async function loggedInUser(dispatch, token) {
    try {
        const response = await axios.get(API + API_WHOAMI, {
            headers: { Authorization: `JWT ${token}`},
        });
        // console.log(response.data.blogs);
        dispatch({ ...uploadUserIDAction(), payload: response.data.user_id })
        dispatch({ ...uploadUsernameAction(), payload: response.data.username })
        dispatch({ ...uploadProfileImageAction(), payload: API_IMAGE_URL + response.data.profileImage })
        dispatch({ ...uploadDateJoinedAction(), payload: response.data.date_joined })
        dispatch({ ...uploadBlogsAction(), payload: response.data.blogs})
        dispatch({ ...uploadCountAction(), payload: response.data.count})
        console.log(response.data.count)
    }
    catch (error) {
        if (error.response)
            console.log(error.response.data);

        dispatch({ ...logOutAction()})
    }
  }

export default loggedInUser;
