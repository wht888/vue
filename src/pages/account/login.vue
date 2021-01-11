<template>
  <div>
    login
  </div>
</template>
<script lang="ts">
/**
 * @author wht
 */

import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Login extends Vue {
  str = '12';

  created() {
    this.str = '';
    document.title = 'login';
  }
}
</script>
