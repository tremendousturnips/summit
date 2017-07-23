const profiles = (state = {}, action) => {
  switch (action.type) {
  case 'SET_PROFILES':
    const profilesNormal = {};
    action.profiles.forEach((profile)=>{
      profilesNormal[profile.id] = profile;
    });
    return profilesNormal;
  default:
    return state;
  }
};

export default profiles;

