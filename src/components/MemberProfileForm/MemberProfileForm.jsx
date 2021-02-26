import React, { useEffect } from 'react';
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MemberProfileActions from '../../_actions/MemberProfileActions';
import './MemberProfileForm.scss';

/* MemberProfileForm */
function MemberProfileForm(props) {
  const {
    getMemberProfileData,
    parseMemberProfileData,
    profileVariables,
    standardProfileFieldSwitchData,
    updateSwitchData,
  } = props;

  useEffect(() => {
    getMemberProfileData();
  }, [getMemberProfileData]);

  useEffect(() => {
    if (profileVariables && profileVariables !== {}) {
      parseMemberProfileData(profileVariables);
    }
  }, [parseMemberProfileData, profileVariables]);

  const generateFormControls = () => {
    return standardProfileFieldSwitchData.map((formControlData, idx) => {
      return (
        <FormControlLabel
          id={formControlData.id}
          control={
            <Switch
              checked={formControlData.isChecked}
              onChange={toggleChecked}
              value={formControlData.id}
            />
          }
          label={formControlData.label}
          key={`key_${idx}`}
        />
      );
    });
  };

  const toggleChecked = (evt) => {
    console.log(evt.target.value);
    console.log(evt.target.checked);
    updateSwitchData(evt.target.value, evt.target.checked);
    // console.log(evt.target);
    // const params = {
    //   action: 'toggle_reg_field',
    //   value: true,
    //   regField: id,
    // };
    // liveTableUpdate(evt.target, targetURL, params);
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
    profileVariables: state.MemberProfileData.profileVariables,
    standardProfileFieldSwitchData:
      state.MemberProfileData.standardProfileFieldSwitchData,
  };
}

function mapDispatchToProps(dispatch) {
  const combinedActions = Object.assign({}, MemberProfileActions);
  return bindActionCreators(combinedActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberProfileForm);
