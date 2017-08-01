/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import SearchUsers from '../../components/users/SearchUsers';

describe('Users component', () => {
  const props = {
    currentUser: {},
    searchUserDb: jest.fn()
  };
  const wrapper = shallow(<SearchUsers {...props} />);
  it('renders as a div', () => {
    expect(wrapper.node.type).toEqual('form');
  });

  const spy = jest.spyOn(wrapper.instance(), 'onChange');
  wrapper.instance().onChange({
    target: {
      value: 'mayowa', name: 'searchQuery'
    }
  });
  expect(wrapper.state('searchQuery')).toEqual('mayowa');
  expect(spy).toHaveBeenCalledTimes(1);
});
