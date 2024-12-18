<script>
import Box from './box.vue'

export default {
    components: {
        Box
    },
    props: {
        contentArray: {
            type: [
                {
                    name: String,
                    warboss: String,
                    location: String
                }
            ],
            Required: true
        }
    }
}
</script>

<template>
    <div class="content">
        <Box 
        v-for="i in contentArray" 
        :object="{
            name: i.name,
            warboss: i.warboss.name,
            location: i.location
        }"/>             
    </div>
</template>

<style scoped>
.content {
    box-sizing: border-box;
    grid-auto-rows: auto;
    padding-bottom: 1rem;
    width: 100%;
}
</style>