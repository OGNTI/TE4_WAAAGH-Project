<script>
import { store } from './store';

export default {
    data() {
        return {
            store,
            msg: '',
            user: {
                username: '',
                password: '',
                ork: {
                    name: '',
                    role: '',
                    klan: ''
                }
            },
            roleShow: false,
            klanShow: false,
            waaaghShow: false,
            exists: false,
        }
    },
    methods: {
        async PostUser() {
            this.msg = ''
            if (this.user.username && this.user.password && this.user.ork.name && this.user.ork.role && this.user.ork.klan) {
                // Check if username already exists
                const url = "http://localhost:3030/users/?username=" + this.user.username; 
                try {
                    const response = await fetch(url);
                    const contentType = response.headers.get("content-type");
                    if (contentType.includes("application/json")) {
                        this.exists = true
                    }
                } catch (error) {
                    console.error(error.message);
                }

                if (!this.exists) { // if it doesn't exist
                    const request = new Request("http://localhost:3030/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({username: this.user.username, password: this.user.password, ork: this.user.ork}),
                    });
                    
                    try {
                        const response = await fetch(request);
                        if (!response.ok) {
                            throw new Error(`Response status: ${response.status}`);
                        }
                        
                        const url = "http://localhost:3030/users/?username=" + this.user.username;
                        try {
                            const response = await fetch(url);
                            const json = await response.json();
                            store.user = json
                            store.isLoggedIn = true
                            store.currentPath = '#/'
                        } catch (error) {
                            console.error(error.message);
                        }
                    } catch (error) {
                        console.error(error.message);
                    }
                } else {
                    this.msg = 'Username already exists'
                }
            } else {
                this.msg = 'Not all fields have been filled'
            }
        }
    }
}
</script>

<template>
    <div class="thing">
        <div class="account">
            <input type="text" placeholder="username" v-model="user.username">
            <input type="password" placeholder="password" v-model="user.password">
        </div>
        <div class="ork">
            <input type="text" placeholder="ork name" v-model="user.ork.name">

            <div class="dropdown">
                <button @click="roleShow=!roleShow; if(klanShow){klanShow=!klanShow}">Role <span v-if="user.ork.role">- {{ user.ork.role + " " }}</span>
                    <img src="./Icons/down-chevron.svg" alt="" v-if="!roleShow">
                    <img src="./Icons/up-chevron.svg" alt="" v-if="roleShow">
                </button>
                <div class="dropdown-content roles" v-show="roleShow">
                    <div class="item" v-for="role in store.roles">
                        <label :for="role">{{role}}</label>
                        <input type="radio" name="role" :id="role" :value="role" v-model="user.ork.role">
                    </div>
                </div>
            </div>

            <div class="dropdown">
                <button @click="klanShow=!klanShow; if(roleShow){roleShow=!roleShow}">Klan <span v-if="user.ork.klan">- {{ user.ork.klan + " " }}</span>
                    <img src="./Icons/down-chevron.svg" alt="" v-if="!klanShow">
                    <img src="./Icons/up-chevron.svg" alt="" v-if="klanShow">
                </button>
                <div class="dropdown-content" v-show="klanShow">
                    <div class="item" v-for="klan in store.klans">
                        <label :for="klan">{{klan}}</label>
                        <input type="radio" name="klan" :id="klan" :value="klan" v-model="user.ork.klan">
                    </div>
                </div>
            </div>
        </div>
        <button class="sign-up" @click="PostUser()">Sign up</button>
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

.ork {
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

.sign-up {
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

.roles {
    overflow-y: scroll;
  min-height: 150px;
  height: 30vh;
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