<template>
  <main>
    <article v-if="$base.isAllowed('view')" v-for="article in articles" :class="`article-${article.id}`">
      <h1>{{ article.title }}</h1>

      <ul>
        <li v-show="$base.isAllowed('update', article)" class="edit">
          <a href="javascript:void(0)">Edit Article</a>
        </li>

        <li v-show="$isAllowed('destroy', article)" class="remove">
          <a href="javascript:void(0)">Remove Article</a>
        </li>
      </ul>

      <p>{{ article.content }}</p>

      <p v-if="$comments.isAllowed('view')" class="comments">Comments Section</p>
      <p v-if="$comments.isAllowed('update')" class="update-comment">Update Comment</p>
    </article>
  </main>
</template>

<script>
  /* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
  import { mapState } from 'vuex';
  /* eslint-enable */

  export default {
    computed: mapState([
      'articles'
    ])
  };
</script>
