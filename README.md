# vue-kindergarten

[![Build Status](https://travis-ci.org/JiriChara/vue-kindergarten.svg?branch=master)](https://travis-ci.org/JiriChara/vue-kindergarten)
[![Test Coverage](https://lima.codeclimate.com/github/JiriChara/vue-kindergarten/badges/coverage.svg)](https://lima.codeclimate.com/github/JiriChara/vue-kindergarten/coverage)
[![codecov](https://codecov.io/gh/JiriChara/vue-kindergarten/branch/master/graph/badge.svg)](https://codecov.io/gh/JiriChara/vue-kindergarten)
[![NPM Version](https://img.shields.io/npm/v/vue-kindergarten.svg)](https://www.npmjs.com/package/vue-kindergarten)
[![NPM Dowloads](https://img.shields.io/npm/dm/vue-kindergarten.svg)](https://www.npmjs.com/package/vue-kindergarten)
[![Dependency Status](https://gemnasium.com/badges/github.com/JiriChara/vue-kindergarten.svg)](https://gemnasium.com/github.com/JiriChara/vue-kindergarten)

## Introduction

**vue-kindergarten** is a plugin for VueJS 2.0 that integrates [kindergarten](https://github.com/JiriChara/kindergarten) into your VueJS applications. It helps you to authorize your components, routes and the rest of your application in very modular way. If you are not familiar with **kindergarten** yet, I highly recommend you to check out [the README](https://github.com/JiriChara/kindergarten) first.

## Installation

```
yarn add vue-kindergarten
# or
npm install vue-kindergarten
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

  can: {
    read: () => true

    // only admin or moderator can update articles
    update(article) {
      return this.isAdmin() || (this.isCreator(article) && this.isModerator());
    },

    // if user can update articles then she can also destroy them
    destroy(article) {
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

### Protecting Routes

```js
import Router from 'vue-router';
import { createSandbox } from 'vue-kindergarten';

import Home from '@/components/Home';
import Articles from '@/components/Articles';
import EditArticle from '@/components/EditArticle';
import RouteGoverness from '@/governesses/RouteGoverness';

import articlesPerimeter from '@/perimeters/articlesPerimeter';

import child from '@/child';

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      meta: {
        perimeter: articlesPerimeter,
        perimeterAction: 'read',
      }
    },

    {
      path: '/articles/:id/edit',
      name: 'edit-article',
      component: EditArticle,
      meta: {
        perimeter: articlesPerimeter,
        perimeterAction: 'update',
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  to.matched.some((routeRecord) => {
    const perimeter = routeRecord.meta.perimeter;
    const Governess = routeRecord.meta.governess || RouteGoverness;
    const action = routeRecord.meta.perimeterAction || 'route';

    if (perimeter) {
      const sandbox = createSandbox(child(), {
        governess: new Governess(),

        perimeters: [
          perimeter,
        ],
      });

      return sandbox.guard(action, { to, from, next });
    }

    return next();
  });
});

export default router;
```

#### Route Governess

```js
import { HeadGoverness } from 'vue-kindergarten';

export default class RouteGoverness extends HeadGoverness {
  guard(action, { next }) {
    // or your very own logic to redirect user
    // see. https://github.com/JiriChara/vue-kindergarten/issues/5 for inspiration
    return this.isAllowed(action) ? next() : next('/');
  }
}
```

## Usage with Nuxt.js

Register plugin in `plugins/vue-kindergarten.js`:

```js
import Vue from 'vue';
import VueKindergarten from 'vue-kindergarten';

import child from '~/child';

Vue.use(VueKindergarten, {
  child
});
```

Implement your `child` getter in `child.js`:

```js
export default (store) => store && store.state.user;
```

Add reference to your plugin inside of `nuxt.config.js`:

```js
module.exports = {
  plugins: ['~/plugins/vue-kindergarten']
};
```

You can now use `vue-kindergarten` in your Nuxt templates.

To protect our routes we need to create a Nuxt middleware in `middleware/vue-kindergarten`:

```js
import { createSandbox } from 'vue-kindergarten';
import RouteGoverness from '~/governesses/RouteGoverness';

import child from '~/child';

export default (context) => {
  const { route, error, redirect, store, isServer } = context;
  route.matched.some((routeRecord) => {
    const options = isServer ? routeRecord.components.default : routeRecord.components.default.options;
    const perimeter = options.routePerimeter;
    const Governess =  options.routeGoverness || RouteGoverness;
    const action = options.routePerimeterAction || 'route';

    if (perimeter) {
      const sandbox = createSandbox(child(store), {
        governess: new Governess(context),

        perimeters: [
          perimeter,
        ],
      });

      return sandbox.guard(action, { redirect });
    }
  });
}
```

and again register your middleware in you Nuxt config:

```js
module.exports = {
  plugins: [
    '~/plugins/vue-kindergarten'
  ],

  router: {
    middleware: 'vue-kindergarten'
  },
};
```

This middleware will look in you component for `routePerimeter` and for `routePerimeterAction` and will check if the condition passes with the currently logged-in user.

```js
import { createPerimeter } from 'vue-kindergarten';

import articlesPerimeter from '~/perimeters/articles';

// This component will only be accessible if user can update articles
export default {
  routePerimeter: articlesPerimeter,
  routePerimeterAction: 'update'
}
```

The implementation of your default routing governess might look like this:

```js
import { HeadGoverness } from 'vue-kindergarten';

export default class RouteGoverness extends HeadGoverness {
  guard(action, { redirect }) {
    if (this.isNotAllowed(action)) {
      redirect('/');
    }
  }
}
```

You can also implement you own governess per each component to define a different redirect logic based on context:

```js
import { createPerimeter } from 'vue-kindergarten';

import articlesPerimeter from '~/perimeters/articles';
import ArticlesRoutingGoverness from '~/governesses/ArticlesRoutingGoverness';

// This component will only be accessible if user can update articles
export default {
  routePerimeter: articlesPerimeter,
  routePerimeterAction: 'update',
  routeGoverness: ArticlesRoutingGoverness
}
```


## More About Vue-Kindergarten

[Role Based Authorization for your Vue.js and Nuxt.js Applications Using vue-kindergarten](https://medium.com/@JiriChara/role-based-authorization-for-your-vue-js-and-nuxt-js-applications-using-vue-kindergarten-fd483e013ec5#.y0xnnidl6)

## License

The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright

Copyright © 2017 Jiří Chára. All Rights Reserved.
