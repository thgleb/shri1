<template>
  <div class="teacher container">
    <h1 v-if="teacher" class="teacher__name">
      {{ teacher.firstName }} {{ teacher.lastName }}
      
      <div class="teacher__work-place" v-if="teacher.company">
        <a :href="teacher.company.link" class="link link_dark" target="_blank">
          {{ teacher.company.name }}
        </a>
      </div>
    </h1>

    <p class="teacher__description" v-if="teacher.description">{{ teacher.description }}</p>
    
    <div class="schedule">
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
  .teacher__name {
    margin: 50px 0 30px 0;
    text-align: center;
  }
  .teacher__work-place {
    font-size: 16px;
    font-weight: normal;
    margin-top: 10px;
  }
  .teacher__description {
    padding: 0 30%;
    line-height: 24px;
  }
  .teacher__description::before {
    content: "“";
    margin-left: -17px;
    position: absolute;
  }
  .teacher__description::after {
    content: "”";
  }
  .teacher__description::before,
  .teacher__description::after {
    font-size: 24px;
    font-weight: bold;
    color: #ddd;
  }
  @media (max-width: 820px) {
    .teacher__description {
      padding: 0 10%;
    }
  }
</style>

<script>
  import Class from "@/components/Class.vue";

  function init() {
    if (this.$root.$children[0].sch.data.length > 0)
      load.apply(this);
    else
      this.$root.$on("scheduleFetched", load.bind(this));
  }

  function load() {
    let teacherId = this.$route.params.id;

    this.classes = this.$root.$children[0].sch.filterByTeacher(
      teacherId
    );

    if (this.classes.length > 0) {
      this.teacher = this.classes[0].teachers.filter((t) => {
        return parseInt(t.id) === parseInt(teacherId);
      })[0];
    }
  }

  export default {
    data() {
      return { teacher: [], classes: [] };
    },
    components: { Class },
    mounted: init,
    watch: { "$route": init }
  };
</script>