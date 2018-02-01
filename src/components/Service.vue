<template>
<section 
  class="service hero is-fullheight" 
  :class="classes.pageBackground">
  <div class="hero-body">
    <div class="container">
      <h1 class="title service__message">
        Some service is not available :(
      </h1>
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
      classes: {
        pageBackground: 'is-danger',
      },
    };
  },
  watch: {
    services(updatedServices) {
      const servicesUnavailables = updatedServices.map(service => !service.status);
      this.classes.pageBackground = (servicesUnavailables.length > 0) ? 'is-danger' : 'is-success';
    },
  },
  methods: {
    async getServices() {
      const response = await this.axios.get('/');
      this.services = response.data;
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
