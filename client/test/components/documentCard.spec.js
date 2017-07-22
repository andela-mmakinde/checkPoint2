/* global jest expect */
import React from 'react';
import { shallow } from 'enzyme';
import DocumentCard from '../../components/documents/DocumentCard';

describe('Create Document component', () => {
  const props = {
    deleteDocument: jest.fn(),
    currentUser: {},
    document: {
      title: 'mayowa',
      access: 'Private',
      ownerId: 2,
      content: 'mayowa again'
    },
    id: 2,
  };
  const wrapper = shallow(<DocumentCard {...props} />);

  it('renders as a div', () => {
    expect(wrapper.node.type).toEqual('div');
  });
});
