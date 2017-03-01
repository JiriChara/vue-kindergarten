# vue-kindergarten

**Work In Progress**: this plugin is under active development and is not published yet!

## Introduction

**vue-kindergarten** is a plugin for VueJS 2.0 that integrates [kindergarten](https://github.com/JiriChara/kindergarten) into your Vue applications. It helps you to authorize your components, routes and actions in very modular way. If you are not familiar with **kindergarten** yet, I highly recommend you to check out [the README](https://github.com/JiriChara/kindergarten) first.

## Installation

```
yarn add vue-kindergarten
# or
npm add vue-kindergarten
```

And use it in your application like this:

```js
import Vue from 'vue';
import VueKindergarten from 'vue-kindergarten';

import App from './App';
import router from './router';

Vue.use(VueKindergarten, {
  // Getter for your current user.
  // If you use vuex, then store will be available
  child: (store) => {
    return store.state.user;
    // or
    // return decode(localStorage.getItem('jwt'));
    // etc..
  }
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
```

## Usage

Define your perimeter(s):

```js
import { createPerimeter } from 'vue-kindergarten';

createPerimeter({
  purpose: 'articles',

  govern: {
    // everybody can read articles
    'can read': () => true,

    // only admin or moderator can update articles
    'can update': function (article) {
      return (this.child && this.child.role === 'admin') ||
        (this.child === article.author && this.child.role === 'moderator');
    },

    // if user can update articles then she can also destroy them
    'can destroy': function (article) {
      return this.isAllowed('update', article);
    }
  }
});
```

And you can use them in your components like this:

```vue
<template>
  <div>
    <article v-for="article in articles.items" v-show="$isAllowed('read')">
      <h1>{{ article.title }}</h1>

      <router-link :to="`/article/${article.id}/edit`" v-show="$isAllowed('update', article)">
        Edit Article
      </router-link>

      <p>{{ article.content }}</p>
    </article>
  </div>
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

Copyright © 2017 Jiří Chára. All Rights Reserved.
