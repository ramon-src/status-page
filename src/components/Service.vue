<template>
<section class="service hero is-danger is-fullheight ">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Full Height title
      </h1>
      <h2 class="subtitle">
        Full Height subtitle
      </h2>
      <div>
        <ul class="service__list">
          <li v-for="(service, index) in services" :key="index"
            class="service__list-item">
            <span class="service__list-item-status">{{ service.status }}</span>
            <span class="service__list-item-name">{{ service.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

</template>

<script>
export default {
  name: 'service-page',
  created() {
    this.getServices();
  },
  data() {
    return {
      services: [],
    };
  },
  methods: {
    getServices() {
      this.axios.get('/').then((response) => {
        this.services = response.data;
      });
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*       */
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}
</style>
