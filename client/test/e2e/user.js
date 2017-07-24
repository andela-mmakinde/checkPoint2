const faker = require('faker');

const email = faker.internet.email();
const password = faker.internet.password();
const newEmail = faker.internet.email();
const newPassword = faker.internet.password();

module.exports = {
  'User sign up without credentials': browser =>
    browser
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=fullName]', '')
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .setValue('input[name=confirmPassword]', '')
      .click('.btn-large')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Enter all required field'),
  'User sign up success': browser =>
    browser
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=fullName]', 'Mayowa Makinde')
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('.btn-large')
      .pause(2000)
      .assert.urlEquals('http://localhost:3000/document'),
  'User sign in success': browser =>
    browser
      .url('http://localhost:3000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.btn-large')
      .pause(2000)
      .assert.urlEquals('http://localhost:3000/document'),
  'User should be able to update his fullname and email and password': browser =>
    browser
      .url('http://localhost:3000/document')
      .click('#updateProfile')
      .waitForElementVisible('body', 2000)
      .assert.urlEquals('http://localhost:3000/profile')
      .clearValue('input[name=fullName]')
      .setValue('input[name=fullName]', 'Mayowa Oriyomi')
      .clearValue('input[name=email]')
      .setValue('input[name=email]', newEmail)
      .click('.waves-light')
      .pause(2000)
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Success'),
  'User should be ableto update his password': browser =>
    browser
      .url('http://localhost:3000/document')
      .click('#updateProfile')
      .waitForElementVisible('body', 2000)
      .assert.urlEquals('http://localhost:3000/profile')
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
      .url('http://localhost:3000/document')
      .waitForElementVisible('body', 2000)
      .click('#logout')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/')
      .end()
};
