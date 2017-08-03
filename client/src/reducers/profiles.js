import { ADD_PROFILE } from '../actions/actionTypes';

const profiles = (state = {}, action) => {
  switch (action.type) {
  case 'SET_PROFILES':
    const profilesNormal = {};
    action.profiles.forEach((profile)=>{
      profilesNormal[profile.id] = profile;
    });
    return {...state, ...profilesNormal};
  case 'ADD_PROFILE': 
<<<<<<< HEAD
    return {...state, [action.profile.id]: action.profile};
=======
    //state[action.profile.id] = action.profile;
    return {...state,[action.profile.id]: action.profile} 
>>>>>>> ef9bdb1ba65b16421cb5ff85ec806882dbda706d
  default:
    return state;
  }
};

export default profiles;

