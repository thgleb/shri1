<template>
  <div :class="className">
    <router-link :to="{ name: 'class', params: { id } }">
      <a class="schedule__class-name">
        <span class="schedule__class-type">{{ type }}</span>

        {{ title }}
      </a>
    </router-link>

    <ul class="schedule__class-loc">
      <li class="schedule__class-loc-dt">
        {{ date | fDate }},
        {{ timePeriod.start | fTime }}-{{ timePeriod.end | fTime }}
      </li>
      <li class="schedule__class-loc-place">
        {{ location.name }}
      </li>
    </ul>

    <ul class="schedule__info">
      <li class="schedule__info-teachers">
        <span v-if="teachers.length === 1">Преподаватель:</span>
        <span v-if="teachers.length > 1">Преподаватели:</span>

        <span v-for="(t, i) in teachers">
          <router-link :to="{ name: 'teacher', params: { id: t.id } }">
            <a class="link">{{ t.firstName | shortify }}. {{ t.lastName }}</a>
          </router-link><span v-if="(i + 1) !== teachers.length">, </span>
        </span>
      </li>
      <li class="schedule__info-schools">
        <span v-if="schools.length === 1">Школа:</span>
        <span v-if="schools.length > 1">Школы:</span>

        <span v-for="(s, i) in schools">
          <router-link :to="{ name: 'school', params: { link: s.link } }">
            <a class="link">{{ s.shortName }}</a>
          </router-link><span v-if="(i + 1) !== schools.length">, </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style>
  .schedule__class {
    --schedule-class-width: 100% / 3;

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    position: relative;
    flex-basis: calc(var(--schedule-class-width) - 5px * 2);

    margin: 5px;
    padding: 15px;
    color: #fff;

    background: #8c8c8c;
  }
  .schedule__class_red {
    background: #F32830;
  }
  .schedule__class_blue {
    background: #3B5A6A;
  }
  .schedule__class_dark-blue {
    background: #243640;
  }
  .schedule__class_finished::after {
    content: "\f00c";
    font: 18px FontAwesome;
    display: inline-block;
    position: absolute;
    right: 15px;
    top: 15px;
    opacity: .6;
  }
  .schedule__class-name {
    font-size: 15px;
    font-weight: bold;
    color: #fff;
  }
  .schedule__class-type {
    font-weight: normal;
    display: block;
    margin-bottom: 10px;
  }
  .schedule__class-loc,
  .schedule__info {
    list-style: none;
    margin-left: -40px;
    line-height: 26px;
    font-weight: 200;
    font-size: 13px;
    margin-bottom: 0;
  }
  .schedule__class-loc-dt::before,
  .schedule__class-loc-place::before {
    font-size: 16px;
    opacity: .8;
    font-family: FontAwesome;
    position: relative;
    top: 1px;
  }
  .schedule__class-loc-dt::before {
    content: "\f017";
    padding-right: 5px;
  }
  .schedule__class-loc-place::before {
    content: "\f041";
    padding-right: 10px;
  }

  @media (max-width: 670px) {
    .schedule__class {
      --schedule-class-width: 50%;
    }
  }
  @media (max-width: 530px) {
    .schedule__class {
      --schedule-class-width: 100%; 
    }
  }
</style>

<script>
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const colors = [
    "schedule__class_red",
    "schedule__class_blue",
    "schedule__class_dark-blue",
  ];

  export default {
    name: "Class",
    data() {
      return {
        className: "schedule__class "
      };
    },
    props: [
      "id", "type", "title",
      "date", "location", "timePeriod",
      "teachers", "schools"
    ],
    beforeMount() {
      // Stylish a class
      this.className += colors[getRandom(0, colors.length)];

      // Is Class Finished?
      const classFinishes = new Date(this.date + " " + this.timePeriod.end);

      if (classFinishes.getTime() - (new Date()).getTime() < 0)
        this.className += " schedule__class_finished";
    }
  }
</script>