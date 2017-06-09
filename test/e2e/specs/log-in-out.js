module.exports = {
  logInOut(browser) {
    browser
      .url('http://localhost:8080/log-in-out/')
      .waitForElementVisible('#app', 1000)

      .assert.visible('.login')
      .assert.notVisible('.logout')
      .assert.notVisible('.secret')

      .click('.login')
      .assert.notVisible('.login')
      .assert.visible('.logout')
      .assert.visible('.secret')

      .click('.logout')
      .assert.visible('.login')
      .assert.notVisible('.logout')
      .assert.notVisible('.secret')

      .end();
  }
};
