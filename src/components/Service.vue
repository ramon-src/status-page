<template>
  <section class="service section" :class="classes.textColor">
      <div class="container">
        <h1 class="title is-1 has-text-center service__message">
          <span :class="classes.textColor" v-if="hasAnyServiceOffline">Some service is not available <i class="far fa-frown"></i></span>
          <span :class="classes.textColor" v-else>All services available! <i class="far fa-smile"></i></span>
        </h1>
        <div class="service__status-container">
          <a v-for="(service, index) in services"
            :key="index"
            :href="service.url"
            target="_blank"
            class="service__list-item tags has-addons">
            <span class="tag">{{service.name}}</span>
            <span class="tag service__list-item-version" :class="tagColor(service.online)">{{service.version}}</span>
          </a>
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
      hasAnyServiceOffline: true,
      classes: {
        pageBackground: 'is-danger',
        textColor: 'has-text-danger',
      },
    };
  },
  computed: {
    unavailables() {
      return this.services.filter(service => !service.online);
    }
  },
  watch: {
    unavailables(unavailables) {
      if(unavailables.length > 0) {
        this.classes.textColor = 'has-text-danger';
        this.hasAnyServiceOffline = true;
        return;
      }
      this.hasAnyServiceOffline = false;
      this.classes.textColor = 'has-text-success';
    }
  },
  methods: {
    tagColor(isOnline) {
      return (isOnline) ? 'is-success' : 'is-danger';
    },
    getServices() {
      this.axios.get('http://localhost:3000/approval').then(response => {
        this.services = response.data.services;
      });
    },
  },
};
</script>


<style lang="scss">
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

.service__message {
  margin-top: 30px;
}
.service__status-container {
  margin-top: 70px;
}

.service__list {
  margin: 0px;
}

.service__list-item {
  // display: block;
  text-align: left;
  padding: 5px 25px;
  margin: 5px;
  font-weight: 400;
  // border: 1px solid #444;
  // border-radius: 50px;
}
.service__list-item {
  display: inline-flex;
  .tag {
    font-size: 1.2rem;
  }
}

.service__list-item-status {
  margin-right: 5px;
}

.service__list-item-version {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
