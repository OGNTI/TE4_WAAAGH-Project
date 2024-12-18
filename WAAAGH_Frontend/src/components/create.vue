<script>
import { store } from './store';

export default {
    data() {
        return {
            store,
            name: '',
            location: '',
            msg: '',
            locationShow: false
        }
    },
    methods: {
        async PostWaaagh() {
            this.msg = ''
            if (this.name && this.location && store.isLoggedIn) {
                const request = new Request("http://localhost:3030/waaaghs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({name: this.name, warboss_id: store.user.ork._id, location: this.location}),
                });
                
                try {
                    const response = await fetch(request);
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    else store.currentPath = '#/waaagh'
                } catch (error) {
                    console.error(error.message);
                }
            } else {
                if (!store.isLoggedIn) {
                    this.msg = 'Not logged in'
                }
                else this.msg = 'Not all fields have been filled'
            }
        }
    }
}
</script>

<template>
    <div class="thing">
        <div class="waaagh">
            <input type="text" placeholder="name of WAAAGH!" v-model="name">
            <div class="dropdown">
                <button @click="locationShow=!locationShow">Location <span v-if="location">- {{ location + " " }}</span>
                    <img src="./Icons/down-chevron.svg" alt="" v-if="!locationShow">
                    <img src="./Icons/up-chevron.svg" alt="" v-if="locationShow">
                </button>
                <div class="dropdown-content" v-show="locationShow">
                    <div class="item" v-for="local in store.locations">
                        <label :for="local">{{local}}</label>
                        <input type="radio" name="location" :id="local" :value="local" v-model="location">
                    </div>
                </div>
            </div>
        </div>
        <button @click="PostWaaagh()" class="create">Create WAAAGH!</button>
        <p v-if="msg">{{ msg }}</p>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
}

.thing {
    margin: 3rem 10rem;
    min-width: 200px;
    width: 20vw;
}

.waaagh {
    margin: 1rem 0 0 0;
    width: 100%;
}

input[type="text"] {
    width: 100%;
    margin: 0.5rem 0 0 0;
}

.create {
    margin: 1rem 0 0;
}

p {
    margin: 0.5rem 0;
    color: red;
}

button img {
    width: 11px;
}

.dropdown {
    margin: 0.5rem 0 0 0;
    width: 100%;
}

.dropdown button {
    width: 100%;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: block;
  position: absolute;
  background-color: #f1f1f1;
  width: max-content;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  padding: 1rem 0.5rem;
}

.item {
    display: grid;
    grid-template-columns: 4fr 1fr;
    margin: 3px;
}

.item:hover {
    background-color: rgb(227, 227, 227);
}
</style>