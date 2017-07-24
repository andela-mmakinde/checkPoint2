const faker = require('faker');

const title = faker.lorem.words(2);
const content = faker.lorem.paragraphs();
const email = faker.internet.email();
const password = faker.internet.password();
module.exports = {
  'User should be able to create document successfully': browser =>
    browser
     .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=fullName]', 'Mayowa Makinde')
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('.btn-large')
      .pause(2000)
      .assert.urlEquals('http://localhost:3000/document')
      .click('.btn-large')
      .pause(5000)
      .setValue('input[name=title]', title)
      // .click('select option[value="public"]')
      .click('.DraftEditor-editorContainer')
      .click('div.public-DraftStyleDefault-block')
      .setValue('.public-DraftEditor-content', content),
      // .click('.submit')
      // .pause(1000)
      // .waitForElementVisible('.toast', 5000)
      // .assert.containsText('.toast', 'Document Created')
      // .waitForElementVisible('.document-list-view', 5000)
      // .pause(5000)
      // .assert.containsText('.scrollable > div > a', title)

  'User should be able to retrieve all documents he/she created': browser =>
    browser
     .url('http://localhost:3000/document')
      .waitForElementVisible('body', 5000)
      .click('.dropdown-button')
      .pause(1000)
      .click('#myDocs')
      .pause(2000)
      .assert.urlEquals('http://localhost:3000/docs'),
  'User should be able to search documents': browser =>
    browser
      .url('http://localhost:3000/document')
      .waitForElementVisible('body', 3000)
      .clearValue('input[name=search]')
      .setValue('input[name=search]', 'new')
      .keys(browser.Keys.ENTER)
      .pause(5000)
      .waitForElementVisible('.documentCard', 2000)
      .pause(2000)
      .assert.containsText('.title', 'New 1'),
  'User should be able to view document details': browser =>
    browser
      .url('http://localhost:3000/document')
      .waitForElementVisible('body', 3000)
      .click('.viewDocument')
      .pause(2000)
      .waitForElementVisible('.modal', 2000)
      .pause(2000)
      .assert.containsText('.center', 'My document')
  // 'User should be able to edit a document successfully': browser =>
  //   browser
  //    .url('http://localhost:3000/docs')
  //     .waitForElementVisible('body', 5000)
  //     .click('.edit')
  //     .pause(2000)
  //     .clearValue('input[name=title]')
  //     .setValue('input[name=title]', 'new title')
  //     // .click('select option[value="public"]')
  //     .click('.DraftEditor-editorContainer')
  //     .click('div.public-DraftStyleDefault-block')
  //     .clearValue('.public-DraftEditor-content')
  //     .setValue('.public-DraftEditor-content', content)
      // .click('.submit')
      // .pause(1000)
      // .waitForElementVisible('.toast', 5000)
      // .assert.containsText('.toast', 'Document Created')
      // .waitForElementVisible('.document-list-view', 5000)
      // .pause(5000)
      // .assert.containsText('.scrollable > div > a', title),
      .end()
};

