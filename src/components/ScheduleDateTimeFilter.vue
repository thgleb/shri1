<template>
  <form action="#" method="post" class="container schedule-filter form">
    <select class="form__select" v-model="year" v-on:change="change">
      <option value="2016">2016</option>
      <option value="2015">2015</option>
      <option value="2014">2014</option>
    </select>

    <span class="form__sep schedule-filter__year-sep">/</span>

    <div class="form__group">
      <input type="number" class="form__input form__input_sm-num" v-model="start.day" v-on:change="change">

      <select class="form__select" v-model="start.month" v-on:change="change">
        <option value="1">Января</option>
        <option value="2">Февраля</option>
        <option value="3">Марта</option>
        <option value="4">Апреля</option>
        <option value="5">Мая</option>
        <option value="6">Июня</option>
        <option value="7">Июля</option>
        <option value="8">Августа</option>
        <option value="9">Сентября</option>
        <option value="10">Октября</option>
        <option value="11">Ноября</option>
        <option value="12">Декабря</option>
      </select>
    </div>

    <span class="form__sep">-</span>

    <div class="form__group">
      <input type="number" class="form__input form__input_sm-num" v-model="end.day" v-on:change="change">

      <select class="form__select" v-model="end.month" v-on:change="change">
        <option value="1">Января</option>
        <option value="2">Февраля</option>
        <option value="3">Марта</option>
        <option value="4">Апреля</option>
        <option value="5">Мая</option>
        <option value="6">Июня</option>
        <option value="7">Июля</option>
        <option value="8">Августа</option>
        <option value="9">Сентября</option>
        <option value="10">Октября</option>
        <option value="11">Ноября</option>
        <option value="12">Декабря</option>
      </select>
    </div>
  </form>
</template>

<style>
  .schedule-filter {
    margin-top: 50px;
  }

  @media (max-width: 670px) {
    .schedule-filter__year-sep {
      display: block;
      height: 10px;
      visibility: hidden;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        year: "",
        start: { day: "", month: "" },
        end: { day: "", month: "" }
      };
    },
    methods: {
      change() {
        this.$parent.$emit("filterChanged", {
          year: this.year,
          start: this.start,
          end: this.end
        });
      }
    },
    mounted() {
      this.$on("setFilter", (config) => {
        // year
        if (config.year)
          this.year = config.year;

        // start
        if (config.start && config.start.day)
          this.start.day = config.start.day;

        if (config.start && config.start.month)
          this.start.month = config.start.month;

        // end
        if (config.end && config.end.day)
          this.end.day = config.end.day;

        if (config.end && config.end.month)
          this.end.month = config.end.month;
      });
    }
  }
</script>