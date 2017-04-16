<template>
  <div>
    <ScheduleDateTimeFilter />
    <div class="schedule container">
      <p v-if="classes.length === 0">Нет занятий.</p>

      <Class
        v-for="c in classes"
        v-bind:key="c.id"

        :id="c.id"
        :type="c.type"
        :title="c.title"
        :date="c.date"
        :location="c.location"
        :timePeriod="c.timePeriod"
        :teachers="c.teachers"
        :schools="c.schools"
        />
    </div>
  </div>
</template>

<style>
  .schedule {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px; 
  }
</style>

<script>
  import ScheduleDateTimeFilter from "@/components/ScheduleDateTimeFilter.vue";
  import Class from "@/components/Class.vue";

  function filter(sch, school, start, end) {
    let classes = sch.data; 

    if (school)
      classes = sch.filterBySchool(school);

    if (start && end)
      classes = sch.filterByDate(start, end, classes);

    return classes;
  }

  function init() {
    if (this.$root.$children[0].sch.data.length > 0)
      load.apply(this);
    else
      this.$root.$on("scheduleFetched", load.bind(this));

    this.$on("filterChanged", (c) => {
      this.classes = filter(
        this.$root.$children[0].sch,
        this.$route.params.link,
        new Date(c.year, c.start.month - 1, c.start.day),
        new Date(c.year, c.end.month - 1, c.end.day)
      );
    });
  }

  function load() {
    this.classes = filter(
      this.$root.$children[0].sch,
      this.$route.params.link
    );

    // setup the filters
    let firstClass = new Date(this.classes[0].date);
    let lastClass = new Date(this.classes[this.classes.length - 1].date);

    this.$children[0].$emit("setFilter", {
      year: 2016,
      start: { day: firstClass.getDate(), month: firstClass.getMonth() + 1 },
      end: { day: lastClass.getDate(), month: lastClass.getMonth() + 1 },
    });
  }

  export default {
    data() {
      return { classes: [] };
    },
    components: {
      ScheduleDateTimeFilter,
      Class
    },
    mounted: init,
    watch: {
      $route: init
    }
  };
</script>