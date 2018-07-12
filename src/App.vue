<template>
  <div id="app">
    <main>
      <service-page></service-page>
    </main>
  </div>
</template>

<script>
import ServicePage from '@/components/Service';

export default {
  name: 'app',
  components: {
    ServicePage,
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'Raleway', sans-serif;
  font-weight: 200;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
}
</style>
