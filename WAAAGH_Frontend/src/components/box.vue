<script>
import { store } from './store';

export default {
    data() {
        return {
            store,
        }
    },
    props: {
        object: {
            type: {
                name: String,
                warboss: String,
                location: String
                // roster: Array
            },
            Required: true
        },
    }
}
</script>

<template>
    <div class="hmm">
        <div>
            <h2> {{ object.name }}</h2>
            <p>Warboss: {{ object.warboss }} <br>Location: {{ object.location }} </p>
        </div>
        <button v-if="store.isLoggedIn">Join</button>
    </div>
</template>

<style scoped>
.hmm {
    border-style: solid;
    border-radius: 5px;
    margin: 1rem 2rem;
    display: grid;
    grid-template-columns: 4fr 1fr;
    font-size: medium;
    background-color: rgb(61, 106, 66);
}

.hmm:hover {
    background-color: rgb(75, 130, 75);
}

button {
    margin: 1rem 1rem 1rem 0;
}
</style>