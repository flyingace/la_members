/*
 * action types
 */
export const SET_STANDARD_PROFILE_SWITCH_DATA =
  'SET_STANDARD_PROFILE_SWITCH_DATA';
export const SET_STANDARD_PROFILE_SWITCH_UPDATE_URL =
  'SET_STANDARD_PROFILE_SWITCH_UPDATE_URL';

/*
 * action creators
 */
export function getMemberProfileData() {
  //this is where the network request would normally live
  parseMemberProfileData(window.memberProfileData);
}

function parseMemberProfileData(memberProfileData) {
  const { siteId } = memberProfileData;
  const standardProfileFieldSwitchData = parseSwitchData(memberProfileData);
  const profileSwitchUpdateURL = `/ajax/console/sites/${siteId}/siteOptionsAjaxSubmit`;
  setStandardProfileSwitchData(standardProfileFieldSwitchData);
  setStandardProfileSwitchUpdateURL(profileSwitchUpdateURL);
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
    siteId,
    siteMode,
    targetURL,
  } = memberProfileData;
  const isAdult = siteMode === 'ADULT';
  const targetIdentifier = (isAdult) ? 'Member' : 'Parent/Adult';
  const standardProfileFieldData = [];
  if (isMemberAddressRequired) {
    standardProfileFieldData.push({
      label: 'Require Member Address',
      id: 'isMemberAddressRequired',
      isChecked: isMemberAddressRequired,
    });
  }
  if (!isAdult) {
    standardProfileFieldData.push(
      {
        label: 'Require Parent Birth Date',
        id: 'isParentBirthdateRequired',
        isChecked: isParentBirthdateRequired,
      },
      {
        label: 'Require Child Birth Date',
        id: 'isMemberBirthdateRequired',
        isChecked: isMemberBirthdateRequired,
      },
    );
  }
  if (isAdult) {
    standardProfileFieldData.push({
      label: 'Require Member Birth Date',
      id: 'isMemberBirthdateRequired',
      isChecked: isMemberBirthdateRequired,
    });
  }
  if (childMemberEmailsFeatureEnabled) {
    standardProfileFieldData.push({
      label: 'Allow Child Member Emails',
      id: 'allowChildMemberEmails',
      isChecked: allowChildMemberEmails,
    });
  }
    standardProfileFieldData.push({
      label: `Collect ${targetIdentifier} Mobile Number During Registration`,
      id: 'collectMemberMobileNumberDuringReg',
      isChecked: collectMemberMobileNumberDuringReg,
    });

  if (!isAdult) {
    standardProfileFieldData.push({
      label: 'Collect Parent/Adult Mobile Number During Registration',
      id: 'isMemberMobileNumberRequired',
      isChecked: isMemberMobileNumberRequired,
    });
  }
  if (!collectMemberMobileNumberDuringReg) {
    if (isAdult) {
      standardProfileFieldData.push(
        {
          label: 'Require Member Mobile Number During Registration',
          id: 'isMemberMobileNumberRequired',
          isChecked: isMemberMobileNumberRequired,
        });
    } else {
      standardProfileFieldData.push(
        {
          label:
            'Require Parent/Adult Mobile Number When Collecting During' +
            ' Registration',
          id: 'isMemberMobileNumberRequired',
          isChecked: isMemberMobileNumberRequired,
        },
        {
          label: 'Collect Child Mobile Number During Registration',
          id: 'collectChildMobileNumberDuringReg',
          isChecked: collectChildMobileNumberDuringReg,
        },
      );
    }
  }
  standardProfileFieldData.push(
    {
      label:
        'Prompt Members To Fill In Any Empty Required Fields When They Login',
      id: 'isAllRequiredFieldsComplete',
      isChecked: isAllRequiredFieldsComplete,
    },
    {
      label: 'Hide Member Names On All Publicly Accessible Web Pages',
      id: 'isHideMemberName',
      isChecked: isHideMemberName,
    },
    {
      label: 'Show Member Profile Only To Logged In Members',
      id: 'isHideMemberProfile',
      isChecked: isHideMemberProfile,
    },
  );
  if (isAdult) {
    standardProfileFieldData.push(
      {
        label: 'Collect Member Secondary Email Address',
        id: 'isAlternateEmailEnabled',
        isChecked: isAlternateEmailEnabled,
      },
    );
  }
  if (!isAdult) {
    standardProfileFieldData.push(
      {
        label: 'Collect Parent/Adult Secondary Email Address',
        id: 'isAlternateEmailEnabled',
        isChecked: isAlternateEmailEnabled,
      });
  }
  if (isAdult) {
    standardProfileFieldData.push(
      {
        label: 'Require Member Secondary Email Address',
        id: 'isAlternateEmailRequired',
        isChecked: isAlternateEmailRequired,
      },
    );
  }
  if (!isAdult) {
    standardProfileFieldData.push(
      {
        label: 'Require Parent/Adult Secondary Email Address',
        id: 'isAlternateEmailRequired',
        isChecked: isAlternateEmailRequired,
      },
    );
  }
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
