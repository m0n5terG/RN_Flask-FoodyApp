import axios from 'axios';
import { API, API_GET, API_IMAGE_URL } from './API';

import { logOutAction } from '../redux/ducks/blogAuth';
import { 
    uploadUserIDAction, 
    uploadUsernameAction, 
    uploadProfileImageAction, 
    uploadDateJoinedAction,
    uploadBlogsAction,
    uploadCountAction
} from '../redux/ducks/accountPref';

const [posts, setPosts] = useState([]);

// useEffect(() => {
//     console.log("Setting up nav listener");
//     // Check for when we come back to this screen
//     const removeListener = navigation.addListener("focus", () => {
//         console.log("Running nav listener");
//         getPosts();
//     });
//     getPosts();
//     return removeListener;
// }, []);

async function getPosts(dispatch, token) {    
    try {
        const response = await axios.get(API + API_GET, {
            headers: { Authorization: `JWT ${token}` },
        });
        console.log(response.data);
        // dispatch({ ...uploadUserIDAction(), payload: response.data.user_id })
        // dispatch({ ...uploadUsernameAction(), payload: response.data.username })
        // dispatch({ ...uploadProfileImageAction(), payload: API_IMAGE_URL + response.data.profileImage })
        // dispatch({ ...uploadDateJoinedAction(), payload: response.data.date_joined })
        // dispatch({ ...uploadBlogsAction(), payload: response.data.blogs})
        // dispatch({ ...uploadCountAction(), payload: response.data.count})


    } catch (error) {
        console.log(error)
        console.log(error.response.data);
        
        if (error.response.data.error = "Invalid token");
        
        dispatch({ ...logOutAction()})
    }
}