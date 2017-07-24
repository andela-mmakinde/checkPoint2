module.exports = {
  'Admin should be able to view a list of all users': browser =>
    browser
      .url('http://localhost:3000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'mayowa@andela.com')
      .setValue('input[name=password]', 'andela')
      .click('.btn-large')
      .pause(2000)
      .assert.urlEquals('http://localhost:3000/document')

      .click('.users')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .assert.urlEquals('http://localhost:3000/user'),
  'Admin should be able to delete a user': browser =>
    browser
      .url('http://localhost:3000/user')
      .waitForElementVisible('body', 5000)
      .click('.deleteModalTrigger')
      .pause(2000)
      .click('.delete')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'User deleted'),
  'Admin should be able to search users': browser =>
    browser
      .url('http://localhost:3000/user')
      .waitForElementVisible('body', 3000)
      .clearValue('input[name=userSearch]')
      .setValue('input[name=userSearch]', 'ama')
      .keys(browser.Keys.ENTER)
      .pause(5000)
      .waitForElementVisible('.userTable', 2000)
      .pause(2000)
      .assert.containsText('.userEmail', 'ama@la.com')
      .end()
};
