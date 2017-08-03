const faker = require('faker');

const title = faker.lorem.words(2);
const newTitle = faker.lorem.words(1);
const content = faker.lorem.paragraphs(2);
const email = faker.internet.email();
const password = faker.internet.password();
module.exports = {
  'User should receive an error message if any field is left unfilled':
  browser =>
    browser
     .url('http://localhost:5000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=fullName]', 'Mayowa Makinde')
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('.btn-large')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/document')
      .click('.btn-large')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/create')
      .setValue('input[name=title]', title)
      .click('.DraftEditor-editorContainer')
      .click('div.public-DraftStyleDefault-block')
      .setValue('.public-DraftEditor-content', content)
      .click('.submit')
      .pause(1000)
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Please fill out all fields'),
  'User should be able to create document successfully': browser =>
    browser
      .assert.urlEquals('http://localhost:5000/create')
      .pause(1000)
      .click('select option[value="Role"]')
      .click('.submit')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/mydocuments'),
  'User should be able to retrieve all documents he/she created': browser =>
    browser
     .url('http://localhost:5000/document')
      .waitForElementVisible('body', 5000)
      .click('.dropdown-button')
      .pause(1000)
      .click('#myDocs')
      .pause(2000)
      .assert.urlEquals('http://localhost:5000/mydocuments'),
  'User should be able to search documents': browser =>
    browser
      .url('http://localhost:5000/document')
      .waitForElementVisible('body', 5000)
      .clearValue('input[name=search]')
      .setValue('input[name=search]', 'Mayowa')
      .keys(browser.Keys.ENTER)
      .pause(5000)
      .waitForElementVisible('.documentCard', 5000),
  'User should be able to edit a document successfully': browser =>
    browser
     .url('http://localhost:5000/mydocuments')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .click('.edit')
      .pause(2000)
      .clearValue('input[name=title]')
      .setValue('input[name=title]', newTitle)
      .click('select option[value="Public"]')
      .click('.DraftEditor-editorContainer')
      .click('div.public-DraftStyleDefault-block')
      .clearValue('.public-DraftEditor-content')
      .setValue('.public-DraftEditor-content', content)
      .click('.edit-Document')
      .pause(2000)
      .url('http://localhost:5000/mydocuments')
      .waitForElementVisible('.documentCard', 5000)
      .assert.containsText('.title', newTitle),
  'User should be able to view document details': browser =>
    browser
      .url('http://localhost:5000/mydocuments')
      .pause(1000)
      .waitForElementVisible('body', 5000)
      .click('#documentView')
      .waitForElementVisible('.viewModal', 5000)
      .pause(2000)
      .assert.containsText('.center', newTitle),
  'User should be able to delete a document successfully': browser =>
    browser
     .url('http://localhost:5000/mydocuments')
      .waitForElementVisible('body', 5000)
      .click('.deleteModalTrigger')
      .pause(2000)
      .click('.delete')
      .waitForElementVisible('.toast', 10000)
      .assert.containsText('.toast', 'Document deleted')
      .end()
};

