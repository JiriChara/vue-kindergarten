<template>
  <div id="app">
    <p class="secret" v-show="$isAllowed('view')">Secret</p>

    <button class="login" v-show="$base.isNotAllowed('view')" @click="onLogin">Login</button>
    <button class="logout" v-show="$base.isAllowed('view')" @click="onLogout">Logout</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    methods: {
      onLogin() {
        this.login();
      },

      onLogout() {
        this.logout();
      },

      ...mapActions([
        'login',
        'logout'
      ])
    }
  };
</script>
