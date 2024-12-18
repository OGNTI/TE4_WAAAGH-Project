<script>
import { store } from './components/store';
import waaagh from './components/waaagh.vue';
import ork from './components/ork.vue';
import signUp from './components/signUp.vue';
import logIn from './components/logIn.vue';
import create from './components/create.vue';

const routes = {
  '/': waaagh,
  '/ork': ork,
  '/signup': signUp,
  '/login': logIn,
  '/create': create
}

export default {
  data() {
    return {
      store
    }
  },
  computed: {
    currentView() {
      return routes[store.currentPath.slice(1) || '/']
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  store.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <header>
    <div class="top">
      <h1><a href="#/">WAAAGH!</a></h1>
      <div class="log-in">
        <a href="#/signup" v-if="!store.isLoggedIn">Sign up</a>
        <a href="#/login" v-if="!store.isLoggedIn">Log in</a>
        <a href="#/" @click="store.user={}; store.isLoggedIn=false" v-if="store.isLoggedIn">Log Out</a>
        <a href="#/create" v-if="store.isLoggedIn">Create WAAAGH!</a>
      </div>
    </div>
    <div class="account" v-if="store.isLoggedIn">
      <p>User: <span>{{ store.user.username }}</span></p>
      <p>Ork: <span>{{ store.user.ork.role + ' ' + store.user.ork.name }} of the {{ store.user.ork.klan }}</span></p>
    </div>
    <nav>
      <a href="#/">waaagh</a>
      <a href="#/ork">ork</a>
    </nav>
  </header>
  <main>
    <component :is="currentView"></component>
  </main>
  <footer>
    <p>Contact info here</p>
  </footer>
</template>

<style scoped>
header {
  background-color: rgb(55, 116, 61);
}

nav {
  display: flex;
  border-bottom-style: double;
  padding: 0 2rem;
}

main {
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: black;
  color: white;
}

.top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem 2rem;
  border-bottom-style: solid;
  font-size: large;
  background-color: var(--primary-bg-colour);
}

.account {
  display: flex;
  border-bottom-style: solid;
  padding: 5px 2rem;
  font-size: smaller;
}

.account p {
  margin: 0 0 0 1rem;
  font-weight: bolder;
}

p span {
  font-style: italic;
  font-weight: normal;
}

.log-in {
  display: flex;
  flex-direction: row-reverse;
}

a {
  text-decoration: none;
  margin: 0 1rem;
  padding: 0.5rem 0;
  color: black;
}
</style>