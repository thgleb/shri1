<template>
  <header class="site-header container">
    <Logotype indicator="site-header__logo"></Logotype>

    <label class="site-header__toggle" for="menu-checkbox"></label>
    <input id="menu-checkbox" type="checkbox" class="site-header__toggle-checkbox">

    <nav class="site-header__nav">
      <router-link
        :to="{ name: 'home' }"

        exact
        active-class="site-header__nav-link_active"
        class="site-header__nav-link"
      >Все школы</router-link>

      <router-link
        :to="{ name: 'school', params: { 'link': 'frontend' } }"

        exact
        active-class="site-header__nav-link_active"
        class="site-header__nav-link"
      >ШРИ</router-link>

      <router-link
        :to="{ name: 'school', params: { 'link': 'mobdev' } }"

        exact
        active-class="site-header__nav-link_active"
        class="site-header__nav-link"
      >ШМР</router-link>

      <router-link
        :to="{ name: 'school', params: { 'link': 'design' } }"

        exact
        active-class="site-header__nav-link_active"
        class="site-header__nav-link"
      >ШМД</router-link>
    </nav>

    <a href="#" class="site-header__signin">Войти</a>
  </header>
</template>

<style>
  .site-header {
    display: flex;
    flex-wrap: wrap;
    background: #FF0007;
  }
  .site-header__logo {
    line-height: 70px;
  }
  .site-header__nav {
    flex: 1;
    text-align: center;
  }
  .site-header__nav-link {
    color: #fff;
    opacity: .7;
    text-transform: uppercase;
    line-height: 70px;
    padding: 0 10px;
    transition: .2s;
  }
  .site-header__nav-link_active,
  .site-header__nav-link:hover {
    opacity: 1;
  }
  .site-header__signin {
    color: #fff;
    line-height: 70px;
  }
  .site-header__toggle {
    color: rgba(255, 255, 255, 1);

    background: linear-gradient(
      to bottom,
      currentColor 0%, currentColor 20%,
      transparent 0, transparent 40%,
      currentColor 40%, currentColor 60%,
      transparent 60%, transparent 80%,
      currentColor 80%, currentColor 100%
    );

    width: 30px;
    height: 30px;
    display: none;
    
    cursor: pointer;

    margin-top: calc(70px / 2 - 30px / 2);
  }
  .site-header__toggle-checkbox {
    display: none;
  }

  @media (max-width: 670px) {
    .site-header__nav,
    .site-header__signin {
      display: none;
    }
    .site-header__logo {
      flex: 1;
    }
    .site-header__toggle {
      display: block;
    }
    .site-header__toggle-checkbox:checked ~ .site-header__nav {
      display: inline-block;
      flex-basis: 100%;
    }
    .site-header__toggle-checkbox:checked ~ .site-header__signin {
      display: inline-block;
      margin: auto;
    }
  }
</style>

<script>
  import Logotype from "@/components/Logotype.vue";

  export default {
    components: { Logotype }
  }
</script>