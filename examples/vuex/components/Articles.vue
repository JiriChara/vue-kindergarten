<template>
  <main>
    <article v-for="article in articles" :class="`article-${article.id}`">
      <h1>{{ article.title }}</h1>

      <ul>
        <li v-show="$isAllowed('update', article)" class="edit">
          <a href="javascript:void(0)">Edit Article</a>
        </li>

        <li v-show="$base.isAllowed('destroy', article)" class="remove">
          <a href="javascript:void(0)">Remove Article</a>
        </li>
      </ul>

      <p>{{ article.content }}</p>
    </article>
  </main>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: mapState([
      'articles'
    ])
  };
</script>
