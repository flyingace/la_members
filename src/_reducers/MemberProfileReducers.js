import {
  SET_PROFILE_VARIABLES,
  SET_STANDARD_PROFILE_SWITCH_DATA,
  SET_STANDARD_PROFILE_SWITCH_UPDATE_URL,
  UPDATE_PROFILE_VARIABLES,
} from '../_actions/MemberProfileActions';

const initialState = {
  standardProfileFieldSwitchData: [],
  profileSwitchUpdateURL: '',
  profileVariables: {
    allowChildMemberEmails: false,
    category: undefined,
    childMemberEmailsFeatureEnabled: false,
    collectChildMobileNumberDuringReg: false,
    collectMemberMobileNumberDuringReg: false,
    isAllRequiredFieldsComplete: false,
    isAlternateEmailEnabled: false,
    isAlternateEmailRequired: false,
    isHideMemberName: false,
    isHideMemberProfile: false,
    isMemberAddressRequired: false,
    isMemberBirthdateRequired: false,
    isMemberMobileNumberRequired: false,
    isParentBirthdateRequired: false,
    minAge: '13',
    siteId: undefined,
    siteMode: 'ADULT',
    targetURL: '',
  },
};

export default function MemberProfileReducers(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE_VARIABLES:
      return Object.assign({}, state, {
        profileVariables: action.profileVariables,
      });
    case SET_STANDARD_PROFILE_SWITCH_DATA:
      return Object.assign({}, state, {
        standardProfileFieldSwitchData: action.standardProfileFieldSwitchData,
      });
    case SET_STANDARD_PROFILE_SWITCH_UPDATE_URL:
      return Object.assign({}, state, {
        profileSwitchUpdateURL: action.profileSwitchUpdateURL,
      });
    case UPDATE_PROFILE_VARIABLES:
      const updatedProfileVariables = { ...state.profileVariables };
      updatedProfileVariables[action.valueToUpdate] = action.newValue;
      return Object.assign({}, state, {
        profileVariables: updatedProfileVariables,
      });
    default:
      return state;
  }
}
