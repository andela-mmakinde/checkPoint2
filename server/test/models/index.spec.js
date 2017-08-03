/* eslint-disable no-unused-expressions */

import chai from 'chai';
import db from '../../models';

const expect = chai.expect;

describe('Created MODELS:', () => {
  it('should have User Model Created', () => {
    expect(db.User).to.exist;
  });
  it('should have Role Model Created', () => {
    expect(db.Role).to.exist;
  });
  it('should have Document Model Created', () => {
    expect(db.Document).to.exist;
  });
});
