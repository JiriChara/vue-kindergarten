module.exports = {
  vuex(browser) {
    browser
      .url('http://localhost:8080/vuex/')
      .waitForElementVisible('#app', 1000)

      .assert.visible('.article-1')
      .assert.visible('.article-1 .edit')
      .assert.visible('.article-1 .remove')

      .assert.visible('.article-2')
      .assert.notVisible('.article-2 .edit')
      .assert.notVisible('.article-2 .remove')

      .assert.visible('.article-3')
      .assert.visible('.article-3 .edit')
      .assert.visible('.article-3 .remove')

      .assert.visible('.comments')
      .assert.visible('.update-comment')

      .end();
  }
};
