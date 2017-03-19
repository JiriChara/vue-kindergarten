# vue-kindergarten

[![Build Status](https://travis-ci.org/JiriChara/vue-kindergarten.svg?branch=master)](https://travis-ci.org/JiriChara/vue-kindergarten)
[![Test Coverage](https://lima.codeclimate.com/github/JiriChara/vue-kindergarten/badges/coverage.svg)](https://lima.codeclimate.com/github/JiriChara/vue-kindergarten/coverage)
[![NPM Version](https://img.shields.io/npm/v/vue-kindergarten.svg)](https://www.npmjs.com/package/vue-kindergarten)
[![NPM Dowloads](https://img.shields.io/npm/dm/vue-kindergarten.svg)](https://www.npmjs.com/package/vue-kindergarten)
[![Dependency Status](https://gemnasium.com/badges/github.com/JiriChara/vue-kindergarten.svg)](https://gemnasium.com/github.com/JiriChara/vue-kindergarten)

## Introduction

**vue-kindergarten** is a plugin for VueJS 2.0 that integrates [kindergarten](https://github.com/JiriChara/kindergarten) into your VueJS applications. It helps you to authorize your components, routes and the rest of your application in very modular way. If you are not familiar with **kindergarten** yet, I highly recommend you to check out [the README](https://github.com/JiriChara/kindergarten) first.

## Installation

```
yarn add vue-kindergarten
# or
npm add vue-kindergarten
```

And you can register the plugin like this:

```js
import Vue from 'vue';
import VueKindergarten from 'vue-kindergarten';

import App from './App';
import router from './router';
import store from './store';

Vue.use(VueKindergarten, {
  // Getter of your current user.
  // If you use vuex, then store will be passed
  child: (store) => {
    return store.state.user;
    // or
    // return decode(localStorage.getItem('jwt'));
    // or your very own logic..
  }
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
```

## Usage

First we need to define our perimeters. Perimeter is a module that represents some part of your applications or a business domain. It defines rules that has to be respected and can additionally expose some methods that you can use in your application.

```js
import { createPerimeter } from 'vue-kindergarten';

createPerimeter({
  purpose: 'article',

  govern: {
    // everybody can read articles
    'can read': () => true,

    // only admin or moderator can update articles
    'can update': function (article) {
      return this.isAmin() || (this.isCreator(article) && this.isModerator());
    },

    // if user can update articles then she can also destroy them
    'can destroy': function (article) {
      return this.isAllowed('update', article);
    }
  },

  secretNotes(article) {
    this.guard('update', article);

    return article.secretNotes;
  },

  isAdmin() {
    return this.child.role === 'admin';
  },

  isModerator() {
    return this.child.role === 'moderator';
  },

  isCreator(article) {
    return this.child.id === article.author.id;
  },

  expose: [
    'secretNotes'
  ]
});
```

```vue
<template>
  <main>
    <article v-for="article in articles.items" v-show="$isAllowed('read')">
      <h1>{{ article.title }}</h1>

      <router-link :to="`/article/${article.id}/edit`" v-show="$article.isAllowed('update', article)">
        Edit Article
      </router-link>

      <p>{{ article.content }}</p>

      <p>{{ $article.secretNotes() }}</p>
    </article>
  </main>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState([
        'articles'
      ])
    },

    // add your perimeters
    perimeters: [
      articlesPerimeter
    ]
  }
</script>
```

In example above we have injected our `articlesPerimeter` into our component. Our component act as sandbox now. We can call all the methods that are available in the Sandbox directly on our component.

## More About Vue-Kindergarten

[Role Based Authorization for your Vue.js and Nuxt.js Applications Using vue-kindergarten](https://medium.com/@JiriChara/role-based-authorization-for-your-vue-js-and-nuxt-js-applications-using-vue-kindergarten-fd483e013ec5#.y0xnnidl6)

## License

The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright

Copyright © 2017 Jiří Chára. All Rights Reserved.
