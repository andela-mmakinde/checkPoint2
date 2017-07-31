const faker = require('faker');

const email = faker.internet.email();
const password = faker.internet.password();
const newEmail = faker.internet.email();
const newPassword = faker.internet.password();

module.exports = {
  'User sign up without credentials': browser =>
    browser
      .url('http://localhost:5000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=fullName]', '')
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .setValue('input[name=confirmPassword]', '')
      .click('.btn-large')
      .pause(2000)
      .assert.urlEquals('http://localhost:5000/signup'),
  'User sign up success': browser =>
    browser
      .url('http://localhost:5000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=fullName]', 'Mayowa Makinde')
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('.btn-large')
      .pause(2000)
      .assert.urlEquals('http://localhost:5000/document'),
  'User log in without credentials': browser =>
    browser
      .click('#logout')
      .pause(2000)
      .url('http://localhost:5000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .click('.btn-large')
      .pause(2000)
      .assert.urlEquals('http://localhost:5000/login'),
  'Unregistered users should not be able to login': browser =>
    browser
      .url('http://localhost:5000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'mayor@mail.com')
      .setValue('input[name=password]', 'mayor')
      .click('.btn-large')
      .pause(2000)
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'User record not found!'),
  'User login success': browser =>
    browser
      .url('http://localhost:5000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'ama@la.com')
      .setValue('input[name=password]', 'amala')
      .click('.btn-large')
      .pause(2000)
      .assert.urlEquals('http://localhost:5000/document'),
  'User should be able to update his fullname and email': browser =>
    browser
      .url('http://localhost:5000/document')
      .click('#updateProfile')
      .waitForElementVisible('body', 2000)
      .assert.urlEquals('http://localhost:5000/profile')
      .clearValue('input[name=fullName]')
      .setValue('input[name=fullName]', 'Mayowa Oriyomi')
      .clearValue('input[name=email]')
      .setValue('input[name=email]', newEmail)
      .click('.waves-light')
      .pause(2000)
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Success'),
  'User should receive an error it they try updating email to an existing mail':
  browser =>
    browser
      .url('http://localhost:5000/document')
      .click('#updateProfile')
      .waitForElementVisible('body', 2000)
      .assert.urlEquals('http://localhost:5000/profile')
      .clearValue('input[name=email]')
      .setValue('input[name=email]', 'mayowa@andela.com')
      .click('.waves-light')
      .pause(2000)
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast',
      'Another user with this email already exist'),
  'User should be able to update his password': browser =>
    browser
      .url('http://localhost:5000/document')
      .click('#updateProfile')
      .waitForElementVisible('body', 2000)
      .assert.urlEquals('http://localhost:5000/profile')
      .click('#changePassword')
      .pause(1000)
      .setValue('input[name=password]', newPassword)
      .setValue('input[name=confirmPassword]', newPassword)
      .click('#submitPassword')
      .pause(1000)
      .waitForElementVisible('.toast', 4000)
      .assert.containsText('.toast', 'Success'),
  'User should be returned to the home screen on Logout': browser =>
    browser
      .url('http://localhost:5000/document')
      .waitForElementVisible('body', 2000)
      .click('#logout')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/')
      .end()
};
