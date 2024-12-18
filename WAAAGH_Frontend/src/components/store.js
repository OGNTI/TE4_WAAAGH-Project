import { reactive } from 'vue'

export const store = reactive({
    checkedLocations: [],
    checkedKlans: [],
    searchValue: '',
    isLoggedIn: false,
    user: {},
    currentPath: window.location.hash,
    locations: ['Segmentum Solar', 'Segmentum Obscurus', 'Ultima Segmentum', 'Segmentum Tempestus', 'Segmentum Pacificus', 'Unknown'],
    roles: ['Warboss', 'Big Mek', 'Mek', 'Painboy', 'Weirdboy', 'Nob', 'Burna boy', 'Kommando', 'Tankbusta', 'Warbiker', 'Flyboy', 'Stormboy', 'Deffkopta', 'Dakkajet', 'Burna-Boomer', 'Ork Boy', 'Runtherd', 'Gretchin', 'Gorkanaut', 'Morkanaut', 'Deff Dread', 'Killa Kan', 'Flash Git', 'Loota'],
    klans: ['Bad Moons', 'Blood Axes', 'Goffs', 'Deathskulls', 'Evil Sunz', 'Snakebites'],
})