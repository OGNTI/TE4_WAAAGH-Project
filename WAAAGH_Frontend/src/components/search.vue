<script>
import { store } from './store'

export default {
    data() {
        return {
            store,
            locationShow: false,
            klanShow: false
        }
    },
}
</script>

<template>
    <div class="search">
        <div class="search-field">
            <span>    
                <input type="text" v-model="store.searchValue" placeholder="Name of WAAAGH! or Warboss">
            </span>
            <button><p>Search</p></button>
        </div>

        <div class="filters">
            <div class="dropdown">
                <button class="dropdown-btn" @click="locationShow=!locationShow; if(klanShow){klanShow=!klanShow}"><span>Location </span>
                    <img src="./Icons/down-chevron.svg" alt="" v-if="!locationShow">
                    <img src="./Icons/up-chevron.svg" alt="" v-if="locationShow">
                </button>
                <div class="dropdown-content" v-show="locationShow">
                    <div class="item" v-for="location in store.locations">
                        <label :for="location">{{location}}</label>
                        <input type="checkbox" :id="location" :value="location" v-model="store.checkedLocations">
                    </div>
                </div>
            </div>
            <div class="dropdown">
                <button class="dropdown-btn" @click="klanShow=!klanShow; if(locationShow){locationShow=!locationShow}"><span>Warboss Klan </span>
                    <img src="./Icons/down-chevron.svg" alt="" v-if="!klanShow">
                    <img src="./Icons/up-chevron.svg" alt="" v-if="klanShow">
                </button>
                <div class="dropdown-content" v-show="klanShow">
                    <div class="item klan" v-for="klan in store.klans">
                        <label :for="klan">{{klan}}</label>
                        <input type="checkbox" :id="klan" :value="klan" v-model="store.checkedKlans">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search {
    box-sizing: border-box;
    width: 100%;
    padding: 2rem;
    background-color: var(--secondary-bg-colour);
}

.search-field {
    display: flex;
    place-items: center;
    height: 50px;
    box-sizing: border-box;
}

.search-field span {
    width: 100%;
    height: 100%;
    border-style: solid;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
}

span input {
    box-sizing: border-box;
    padding: 1rem;
    width: 100%;
    height: 100%;
    font-size: 20px;
    border-style: none;
}

::placeholder {
    color: gray;
}

.search-field button {
    height: 100%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

button p {
    margin: 0.5rem;
}

button img {
    width: 11px;
}

.dropdown-btn {
    margin: 0.5rem 0 0 0;
    padding: 0.5rem;
    font-size: 16px;
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
    margin: 8px;
    font-size: 20px;
}

.klan label {
    margin: 0 5px 0 0;
}

.item:hover {
    background-color: rgb(227, 227, 227);
}

</style>