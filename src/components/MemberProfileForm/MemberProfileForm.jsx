import React, { useEffect, useState } from "react";
import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { liveTableUpdate } from "../../utility";
import * as MemberProfileActions from "../../_actions/MemberProfileActions";
import "./MemberProfileForm.scss";

/* MemberProfileForm */
function MemberProfileForm(props) {
  const { getMemberProfileData } = props;

  useEffect(() => {
    getMemberProfileData();
  }, [getMemberProfileData]);

  const generateFormControlsData = () => {
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
    const isAdult = siteMode === "ADULT";
    return [
      {
        label: "Require Member Address",
        id: isMemberAddressRequired,
        isRendered: true,
      },
      {
        label: "Require Parent Birth Date",
        id: isParentBirthdateRequired,
        isRendered: !isAdult,
      },
      {
        label: "Require Child Birth Date",
        id: isMemberBirthdateRequired,
        isRendered: !isAdult,
      },
      {
        label: "Require Member Birth Date",
        id: isMemberBirthdateRequired,
        isRendered: isAdult,
      },
      {
        label: "Allow Child Member Emails",
        id: allowChildMemberEmails,
        isRendered: childMemberEmailsFeatureEna
        bled,
      },
      //TODO: You need to get this id sorted out
      {
        label: "Collect Member Mobile Number During Registration",
        id: collectMemberMobileNumberDuringReg,
        isRendered: isAdult,
      },
      {
        label: "Collect Parent/Adult Mobile Number During Registration",
        id: isMemberMobileNumberRequired,
        isRendered: !isAdult,
      },
      {
        label: "Require Member Mobile Number During Registration",
        id: isMemberMobileNumberRequired,
        isRendered: isAdult && !collectMemberMobileNumberDuringReg,
      },
      {
        label:
          "Require Parent/Adult Mobile Number When Collecting During" +
          " Registration",
        id: isMemberMobileNumberRequired,
        isRendered: !isAdult && !collectMemberMobileNumberDuringReg,
      },
      {
        label: "Collect Child Mobile Number During Registration",
        id: collectChildMobileNumberDuringReg,
        isRendered: !isAdult && !collectMemberMobileNumberDuringReg,
      },
      {
        label:
          "Prompt members to fill in any empty required fields when they login",
        id: isAllRequiredFieldsComplete,
        isRendered: true,
      },
      {
        label: "Hide member names on all publicly accessible web pages",
        id: isHideMemberName,
        isRendered: true,
      },
      {
        label: "Show member profile only to logged in members",
        id: isHideMemberProfile,
        isRendered: true,
      },
      {
        label: "Collect Member Secondary Email Address",
        id: isAlternateEmailEnabled,
        isRendered: isAdult,
      },
      {
        label: "Collect Parent/Adult Secondary Email Address",
        id: isAlternateEmailEnabled,
        isRendered: !isAdult,
      },
      {
        label: "Require Member Secondary Email Address",
        id: isAlternateEmailRequired,
        isRendered: isAdult,
      },
      {
        label: "Require Parent/Adult Secondary Email Address",
        id: isAlternateEmailRequired,
        isRendered: !isAdult,
      },
    ];
  };

  const generateFormControls = () => {
    const formControlsData = generateFormControlsData();
    return formControlsData.map((formControlData, idx) => {
      return formControlData.isRendered ? (
        <FormControlLabel
          control={
            <Switch
              checked={formControlData.checked}
              onChange={toggleChecked}
            />
          }
          label={formControlData.label}
          key={`key_${idx}`}
        />
      ) : null;
    });
  };

  const toggleChecked = (evt) => {
    const { targetURL } = memberProfileData;
    console.log(evt.target);
    const params = {
      action: "toggle_reg_field",
      value: true,
      regField: id,
    };
    liveTableUpdate(evt.target, targetURL, params);
    // liveTableUpdate($(this).parent().parent().parent().find('.iToggle-item'), targetUrl, {'action':'toggle_reg_field','value':$(this).is(':checked'), 'regField':'isMemberAddressRequired'});" <c:if test="${site.isMemberAddressRequired}">checked="checked"</c:if> />
  };

  return (
    <div className="form-elements">
      <FormGroup>{generateFormControls()}</FormGroup>
    </div>
  );
}

MemberProfileForm.propTypes = {};

MemberProfileForm.defaultProps = {};
/* */

function mapStateToProps(state) {
  return {
    switchData: state.MemberProfileData.switchData,
  };
}

function mapDispatchToProps(dispatch) {
  const combinedActions = Object.assign({}, MemberProfileActions);
  return bindActionCreators(combinedActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberProfileForm);
