<template>
<div class="class" v-if="data.id">
  <div class="class__video" v-if="data.video">
    <iframe :src="data.video" frameborder="0" allowfullscreen></iframe>
  </div>

  <div class="container class__info">
    <header class="class__header">
      <button class="class__return-back form__btn" @click="returnBack">Назад</button>

      <h1 class="class__title">
        {{ data.title }}
        <span class="class__type">{{ data.type }}</span>
      </h1>
    </header>

    <p class="class__description" v-if="data.description">{{ data.description }}</p>

    <div class="class__teachers">
      <span v-for="(t, i) in data.teachers">
        <router-link :to="{ name: 'teacher', params: { id: t.id } }" class="link link_dark">{{ t.firstName }} {{ t.lastName }}</router-link><span v-if="(i + 1) !== data.teachers.length">, </span>
      </span>
    </div>

    <div class="class__schools">
      <router-link
        :key="s.id"
        v-for="s in data.schools"
        :to="{ name: 'school', params: { link: s.link } }"
        class="class__school">
        {{ s.name }}
      </router-link>
    </div>

    <footer>
      <h3>Место и время проведения:</h3>
      <p>
        {{ data.date | fDate }},
        {{ data.timePeriod.start | fTime }}-{{ data.timePeriod.end | fTime }}
      </p>
      <p>{{ data.location.site }}</p>
      <img :src="mapImage" :alt="data.location.site" class="class__map-image">
    </footer>
  </div>
</div>
</template>

<style>
  .class {
    margin-bottom: 50px;
  }
  .class__info {
    margin: 0 15px;
  }
  .class__header {
    display: flex;
    align-items: center;
    margin-top: 50px;
  }
  .class__return-back {
    margin-right: 20px;
  }
  .class__type {
    display: block;
    font-size: 14px;
    font-weight: normal;
    margin-top: 15px;
  }
  .class__video {
    padding: 15px;
    background: #43455d;
    height: calc(100vmin - 70px); /* site-header height */
    max-height: 1080px;
    box-sizing: border-box;
  }
  .class__video iframe {
    width: 100%;
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: block;
  }
  .class__description {
    line-height: 20px;
    color: #413e56;
  }
  .class__teachers {
    margin-bottom: 16px;
  }
  .class__teachers::before {
    content: "— by ";
    color: #b5b5b5;
  }
  .class__schools {
    display: flex;
    flex-wrap: wrap;
  }
  .class__school {
    padding: 0 10px;
    color: #fff;
    border-radius: 3px;
    margin-right: 5px;
    margin-bottom: 1px;
    line-height: 30px;
  }
  .class__school:nth-child(n + 1) { background: #d35400; }
  .class__school:nth-child(2n + 2) { background: #2980b9; }
  .class__school:nth-child(3n + 3) { background: #2c3e50; }
  .class__map-image {
    max-width: 100%;
  }

  @media (max-width: 560px) {
    .class__header { display: block; }
  }
</style>

<script>
  function init() {
    if (this.$root.$children[0].sch.data.length > 0)
      load.apply(this);
    else
      this.$root.$on("scheduleFetched", load.bind(this));
  }

  function load() {
    this.data = this.$root.$children[0].sch.getById(
      this.$route.params.id
    )[0];

    this.locationImageUrl();
  }

  export default {
    data() {
      return { "data": [], mapImage: "" };
    },
    methods: {
      returnBack() {
        history.back();
      },
      locationImageUrl() {
        let lat, long;

        if (this.data.location && this.data.location.coords) {
          lat = this.data.location.coords[1];
          long = this.data.location.coords[0];
        }

        this.mapImage = `https://static-maps.yandex.ru/1.x/?ll=${lat},${long}&pt=${lat},${long}&z=17&l=map`;
      }
    },
    mounted: init,
    watch: { "$route": init }
  }
</script>