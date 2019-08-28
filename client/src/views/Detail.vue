<template>
<div>
    <Card :question="oneQuestion"></Card>
</div>
</template>

<script>
import Card from '../components/Card'
import { mapState } from 'vuex'
export default {
    components: {
        Card
    },
    created() {
        this.$store.dispatch('findOneQuestion', this.$route.params.id)
    },
    computed: {
        ...mapState(['oneQuestion'])
    }
}
</script>

<style>

</style>