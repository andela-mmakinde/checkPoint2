/* global expect window*/

import React from 'react';
import { shallow } from 'enzyme';
import Protect from '../../components/Protect';
import mockLocalStorage from '../utils/mockLocalStorage';

window.localStorage = mockLocalStorage;

describe('Protect component', () => {
  it('renders as a footer', () => {
    const wrapper = shallow(<Protect />);
    expect(typeof wrapper.node.type).toEqual('function');
  });
});
