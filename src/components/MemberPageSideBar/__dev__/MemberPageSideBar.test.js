/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemberPageSideBar } from '../MemberPageSideBar';

const initialProps = {
};

const setup = propOverrides => {
  const props = Object.assign({}, initialProps, propOverrides);
  const Component = shallow(<MemberPageSideBar {...props} />);

    return {
    props,
    Component,
  };
};


describe('MemberPageSideBar', () => {

  //It renders
  it('renders without crashing', () => {
    const { props } = setup();
    shallow(<MemberPageSideBar {...props} />);
  });

  //It matches its snapshot
  // it('matches its existing snapshot', () => {
  //   const { props } = setup();
  //   const snapshot = renderer.create(<MemberPageSideBar {...props} />).toJSON();
  //   expect(snapshot).toMatchSnapshot();
  // });
});
