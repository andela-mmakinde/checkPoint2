/* global jest expect */
import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../components/Pagination';

describe('Pagination component', () => {
  const props = {
    pageCount: 3,
    handlePageClick: jest.fn()
  };
  it('renders as Pagination function', () => {
    const wrapper = shallow(<Pagination {...props} />);
    expect(typeof wrapper.node.type).toEqual('function');
  });
});
