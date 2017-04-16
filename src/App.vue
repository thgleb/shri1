<template>
  <div id="app">
    <SiteHeader></SiteHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader";
import Schedule from "@/libs/Schedule";

export default {
  data() {
    return {
      sch: new Schedule()
    }
  },
  components: { SiteHeader },
  created() {
    this.sch.fetch()
      .catch(e => console.error(e))
      .then(() => {
        this.$root.$emit("scheduleFetched");
      });
  }
};
</script>

<style>
  @import "/static/styles/normalize.min.css";
  @import "/static/styles/font-awesome.min.css";
  @import "/static/styles/main.css";
</style>