<template>
  <router-link to="/" class="logotype site-header__logo">
    Мобилизация.<span class="logotype__hl">Расписание</span>
  </router-link>
</template>

<style scoped>
  /**
   * Logotype
   */
  .logotype {
    font-family: Open Sans, Helvetica, Arial, sans-serif;
    font-weight: 200;
    font-size: 18px;
    color: #fff;
  }
  .logotype__hl {
    font-weight: bold;
    text-transform: uppercase;
  }
</style>

<script>
  export default {
    name: "Logotype",
    props: ["indicator"],

    ready() {
      if (!this.$props.indicator)
        return;

      this.$el.classList.add(this.$props.indicator);
    }
  }
</script>