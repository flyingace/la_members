import React from 'react';
import './MemberPageSideBar.scss';

/* MemberPageSideBar */
export default function MemberPageSideBar(props) {
  const {} = props;

  return (
    <div className="side-bar">
      <dl className="basic-data">
        <dt className="header"><strong>What are Custom Member Profile
          Fields?</strong></dt>
        <dt>&nbsp;</dt>
        <dd>These are <strong>additional</strong> fields your members will fill
          out when creating new accounts.

        </dd>
      </dl>

      <dl className="basic-data">
        <dt>Standard vs Custom Fields</dt>

        <dd>Custom fields added on this page will be included in addition to the
          following standard profile fields:
          <ul>
            <li>Username</li>
            <li>Password</li>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Email Address</li>
            <li>Address</li>
            <li>City</li>
            <li>State</li>
            <li>Postal Code</li>
          </ul>
        </dd>
      </dl>
      <dl className="basic-data">
        <dt>Profile vs Registration Fields</dt>
        <dd>Remember that these <strong>member profile</strong> fields are
          different from <strong>registration</strong> fields.
          <br /><br />
          Registration fields are used on the league and event registration
          forms - not the member signup form. Even returning members must fill
          out registration fields when registering for new leagues or events.
          <br /><br />
          You can edit your default registration fields <a
            href="/console/sites/${site.id}/registrationProperties">here</a>.

        </dd>
      </dl>
    </div>
  );
};

MemberPageSideBar.propTypes = {};

MemberPageSideBar.defaultProps = {};
/* */

