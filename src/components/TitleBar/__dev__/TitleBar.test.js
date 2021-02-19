/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { TitleBar } from '../TitleBar';

const initialProps = {
};

const setup = propOverrides => {
  const props = Object.assign({}, initialProps, propOverrides);
  const Component = shallow(<TitleBar {...props} />);

    return {
    props,
    Component,
  };
};


describe('TitleBar', () => {

  //It renders
  it('renders without crashing', () => {
    const { props } = setup();
    shallow(<TitleBar {...props} />);
  });

  //It matches its snapshot
  // it('matches its existing snapshot', () => {
  //   const { props } = setup();
  //   const snapshot = renderer.create(<TitleBar {...props} />).toJSON();
  //   expect(snapshot).toMatchSnapshot();
  // });
});
