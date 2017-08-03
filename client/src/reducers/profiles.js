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
    return {...state, [action.profile.id]: action.profile};
  default:
    return state;
  }
};

export default profiles;

