import axios from 'axios';

/*
 * action types
 */
export const SET_PROFILE_VARIABLES = 'SET_PROFILE_VARIABLES';
export const SET_STANDARD_PROFILE_SWITCH_DATA =
  'SET_STANDARD_PROFILE_SWITCH_DATA';
export const SET_STANDARD_PROFILE_SWITCH_UPDATE_URL =
  'SET_STANDARD_PROFILE_SWITCH_UPDATE_URL';
export const UPDATE_PROFILE_VARIABLES = 'UPDATE_PROFILE_VARIABLES';

/*
 * action creators
 */
export function getMemberProfileData() {
  return (dispatch) => {
    //this is where the network request would normally live
    dispatch(setProfileVariables(window.memberProfileData));
    dispatch(
      setStandardProfileSwitchUpdateURL(window.memberProfileData.targetURL)
    );
  };
}

function setProfileVariables(profileVariables) {
  return {
    type: SET_PROFILE_VARIABLES,
    profileVariables,
  };
}

export function parseMemberProfileData(memberProfileData) {
  const standardProfileFieldSwitchData = parseSwitchData(memberProfileData);
  return (dispatch) => {
    dispatch(setStandardProfileSwitchData(standardProfileFieldSwitchData));
  };
}

function parseSwitchData(memberProfileData) {
  const {
    allowChildMemberEmails,
    category,
    childMemberEmailsFeatureEnabled,
    collectChildMobileNumberDuringReg,
    collectMemberMobileNumberDuringReg,
    isAllRequiredFieldsComplete,
    isAlternateEmailEnabled,
    isAlternateEmailRequired,
    isHideMemberName,
    isHideMemberProfile,
    isMemberAddressRequired,
    isMemberBirthdateRequired,
    isMemberMobileNumberRequired,
    isParentBirthdateRequired,
    minAge,
    siteMode,
  } = memberProfileData;
  const isAdult = siteMode === 'ADULT';
  const targetIdentifier = isAdult ? 'Member' : 'Parent/Adult';
  const standardProfileFieldData = [];
  standardProfileFieldData.push(
    // Require Member Address
    {
      label: 'Require Member Address',
      id: 'isMemberAddressRequired',
      isChecked: isMemberAddressRequired,
    }
  );

  if (!isAdult) {
    standardProfileFieldData.push(
      // Require Parent Birth Date
      {
        label: 'Require Parent Birth Date',
        id: 'isParentBirthdateRequired',
        isChecked: isParentBirthdateRequired,
      },

      // Require Child Birth Date
      {
        label: 'Require Child Birth Date',
        id: 'isMemberBirthdateRequired',
        isChecked: isMemberBirthdateRequired,
      }
    );
  }

  if (isAdult) {
    standardProfileFieldData.push(
      // Require Member Birth Date
      {
        label: 'Require Member Birth Date',
        id: 'isMemberBirthdateRequired',
        isChecked: isMemberBirthdateRequired,
      }
    );
  }

  if (childMemberEmailsFeatureEnabled) {
    standardProfileFieldData.push({
      // Allow Child Member Emails
      label: 'Allow Child Member Emails',
      id: 'allowChildMemberEmails',
      isChecked: allowChildMemberEmails,
    });
  }

  standardProfileFieldData.push(
    // Collect [targetIdentifier] Mobile Number During Registration
    {
      label: `Collect ${targetIdentifier} Mobile Number During Registration`,
      id: 'collectMemberMobileNumberDuringReg',
      isChecked: collectMemberMobileNumberDuringReg,
    }
  );

  if (!collectMemberMobileNumberDuringReg) {
    standardProfileFieldData.push(
      // Require [targetIdentifier] Mobile Number During Registration
      {
        label: `Require ${targetIdentifier} Mobile Number During Registration`,
        id: 'isMemberMobileNumberRequired',
        isChecked: isMemberMobileNumberRequired,
      }
    );

    if (!isAdult) {
      standardProfileFieldData.push(
        // Collect Child Mobile Number During Registration
        {
          label: 'Collect Child Mobile Number During Registration',
          id: 'collectChildMobileNumberDuringReg',
          isChecked: collectChildMobileNumberDuringReg,
        }
      );
    }
  }

  standardProfileFieldData.push(
    // Prompt Members To Fill In Any Empty Required Fields When They Login
    {
      label:
        'Prompt Members To Fill In Any Empty Required Fields When They Login',
      id: 'isAllRequiredFieldsComplete',
      isChecked: isAllRequiredFieldsComplete,
    },
    // Hide Member Names On All Publicly Accessible Web Pages
    {
      label: 'Hide Member Names On All Publicly Accessible Web Pages',
      id: 'isHideMemberName',
      isChecked: isHideMemberName,
    },
    // Show Member Profile Only To Logged In Members
    {
      label: 'Show Member Profile Only To Logged In Members',
      id: 'isHideMemberProfile',
      isChecked: isHideMemberProfile,
    }
  );

  if (isAdult) {
    standardProfileFieldData.push(
      // Collect {targetIdentifier} Secondary Email Address
      {
        label: `Collect ${targetIdentifier} Secondary Email Address`,
        id: 'isAlternateEmailEnabled',
        isChecked: isAlternateEmailEnabled,
      }
    );
  }

  if (!isAlternateEmailEnabled) {
    standardProfileFieldData.push(
      // Require {targetIdentifier} Secondary Email Address
      {
        label: `Require ${targetIdentifier} Secondary Email Address`,
        id: 'isAlternateEmailRequired',
        isChecked: isAlternateEmailRequired,
      }
    );
  }

  return standardProfileFieldData;
}

function setStandardProfileSwitchData(standardProfileFieldSwitchData) {
  return {
    type: SET_STANDARD_PROFILE_SWITCH_DATA,
    standardProfileFieldSwitchData,
  };
}

function setStandardProfileSwitchUpdateURL(profileSwitchUpdateURL) {
  return {
    type: SET_STANDARD_PROFILE_SWITCH_UPDATE_URL,
    profileSwitchUpdateURL,
  };
}

export function updateSwitchData(targetSwitch, newValue) {
  return (dispatch) => {
    dispatch(updateLocalProfileVariables(targetSwitch, newValue));
    dispatch(updateRemoteProfileVariables(targetSwitch, newValue));
  };
}

function updateLocalProfileVariables(valueToUpdate, newValue) {
  return {
    type: UPDATE_PROFILE_VARIABLES,
    valueToUpdate,
    newValue,
  };
}

function updateRemoteProfileVariables(targetSwitch, newValue) {
  return (dispatch, getState) => {
    const formData = new FormData();
    formData.append('action', 'toggle_reg_field');
    formData.append('value', newValue);
    formData.append('regField', targetSwitch);
    const targetURL = getState().MemberProfileData.profileSwitchUpdateURL;

    axios({
      method: 'post',
      url: targetURL,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        //handle success
        console.log('success:', response);
      })
      .catch(function (response) {
        //handle error
        console.log('error: ', response);
      });
  };
}

// export function requestMemberProfileData() {
//   // return (dispatch) => {
//   //   axios
//   //     .get(
//   //       `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}&units=${scale}`
//   //     )
//   //     .then((resp) => {
//   //       const dailyForecast = parseWeatherData_Daily(resp.data);
//   //       dispatch(setDailyForecast(dailyForecast));
//   //     })
//   //     .catch((err) => console.log(err));
//   // };
// }
//
// export function updateMemberProfileData() {
//   // return (dispatch) => {
//   //   axios
//   //     .get(
//   //       `https://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipCode}&appid=${API_KEY}&units=${scale}&cnt=6`
//   //     )
//   //     .then((resp) => {
//   //       const fiveDayForecast = parseWeatherData_SixDay(resp.data);
//   //       dispatch(setFiveDayForecast(fiveDayForecast));
//   //     })
//   //     .catch((err) => console.log(err));
//   // };
// }
//
// function setDailyForecast(dailyForecast) {
//   return {
//     type: SET_DAILY_FORECAST,
//     dailyForecast,
//   };
// }
//
// function setFiveDayForecast(fiveDayForecast) {
//   return {
//     type: SET_FIVE_DAY_FORECAST,
//     fiveDayForecast,
//   };
// }
//
// function setTitleCase(str) {
//   if (str === "sky is clear") {
//     return "Clear Skies";
//   }
//
//   const strArr = str.split(" ");
//   return strArr
//     .map((word) => {
//       return word === "and" ? "&" : capitalizeFirstLetterOfWord(word);
//     })
//     .join(" ");
// }
//
// function capitalizeFirstLetterOfWord(word) {
//   const characterArray = word.split("");
//   characterArray[0] = characterArray[0].toUpperCase();
//   return characterArray.join("");
// }
