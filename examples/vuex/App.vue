<template>
  <div id="app">
    <article-list></article-list>
  </div>
</template>

<script>
  import Articles from './components/Articles.vue';

  export default {
    components: {
      'article-list': Articles
    }
  };
</script>
