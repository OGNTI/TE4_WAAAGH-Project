<script>
import { store } from './store'

export default {
    data() {
        return {
            store,
            username: '',
            password: '',
            msg: ''
        }
    },
    methods: {
        async GetUser() {
            this.msg = ''
            const url = "http://localhost:3030/users/?username=" + this.username;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    this.msg = 'Username does not exist'
                }

                const json = await response.json();
                if (this.username == json.username && this.password == json.password) {
                    store.user = json
                    store.isLoggedIn = true
                    store.currentPath = '#/'
                }
                else {
                    this.msg = 'Wrong password'
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }
}
</script>

<template>
    <div class="thing">
        <div class="account">
            <input type="text" placeholder="username" v-model="username">
            <input type="password" placeholder="password" v-model="password">
        </div>
        <button @click="GetUser()" class="log-in">Log in</button>
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

.account {
    margin: 1rem 0 0 0;
    width: 100%;
}

input[type="text"] {
    width: 100%;
    margin: 0.5rem 0 0 0;
}

input[type="password"] {
    width: 100%;
    margin: 0.5rem 0 0 0;
}

.log-in {
    margin: 1rem 0 0;
}

p {
    margin: 0.5rem 0;
    color: red;
}
</style>