<script>
import Content from './content.vue'
import Search from './search.vue'
import { store } from './store'

export default {
  components: {
    Content,
    Search
  },
  data() {
    return {
      store,
      WAAAGHs: [],
    }
  },
  methods: {
    async GetWaaaghs() {
      const url = "http://localhost:3030/waaaghs";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        this.WAAAGHs = json;
      } catch (error) {
        console.error(error.message);
      }
    }   
  },
  computed: {
    filterWAAAGHs: function(){
      let search = store.searchValue
      let filters = store.checkedLocations.concat(store.checkedKlans)

      if (filters.length == 0 && !search) { //if no filters and no search
        return this.WAAAGHs
      }

      if (filters.length == 0 && search) { // if no filters but search value
        return this.WAAAGHs.filter((w) => 
          w.name.toLowerCase().includes(search.toLowerCase()) || w.warboss.name.toLowerCase().includes(search.toLowerCase())
        )
      }

      if (store.checkedLocations.length && store.checkedKlans.length){ // if both filters, location and klan
        return this.WAAAGHs.filter((w) => {
          return (store.checkedLocations.some((l) => l.toLowerCase() === w.location.toLowerCase()) && 
                  store.checkedKlans.some((k) => k.toLowerCase() === w.warboss.klan.toLowerCase())
          )
        })
      }

      // if filter and search value
      return this.WAAAGHs.filter((w) => {
        return filters.some((f) => {
          return (
            (f.toLowerCase() === w.location.toLowerCase() || f.toLowerCase() === w.warboss.klan.toLowerCase()) 
            && (w.name.toLowerCase().includes(search.toLowerCase()) || w.warboss.name.toLowerCase().includes(search.toLowerCase()))
          )
        })
      })
    }
  },
  created() {
    this.GetWaaaghs();
  }
}
</script>

<template>
    <Search />
    <Content :contentArray="filterWAAAGHs"/>
</template>

<style scoped>

</style>