<template>
  <div>
    <headerPage />
    <div id="app"><router-view></router-view></div>
    <footerPage />
  </div>
</template>
<script>
import headerPage from '@/components/layouts/headerPage.vue';
import footerPage from '@/components/layouts/footerPage.vue';
import '@/assets/sass/style.scss';

export default {
  components: {
    headerPage,
    footerPage,
  },
  name: 'app',
  data: () => ({
    layout: '',
  }),
};
</script>
