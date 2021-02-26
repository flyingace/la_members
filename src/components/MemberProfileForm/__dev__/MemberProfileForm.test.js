/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemberProfileForm } from '../MemberProfileForm';

const initialProps = {
};

const setup = propOverrides => {
  const props = Object.assign({}, initialProps, propOverrides);
  const Component = shallow(<MemberProfilePage {...props} />);

    return {
    props,
    Component,
  };
};


describe('MemberProfileForm', () => {

  //It renders
  it('renders without crashing', () => {
    const { props } = setup();
    shallow(<MemberProfilePage {...props} />);
  });

  //It matches its snapshot
  // it('matches its existing snapshot', () => {
  //   const { props } = setup();
  //   const snapshot = renderer.create(<MemberProfileForm {...props} />).toJSON();
  //   expect(snapshot).toMatchSnapshot();
  // });
});
