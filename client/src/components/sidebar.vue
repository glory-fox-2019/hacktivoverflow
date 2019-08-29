<template>
    <section v-if="$store.state.loggedUser" class="columns is-fixed is-multiline is-full" >
            <div class="column is-full card columns is-multiline">
                <div class="column is-full">
                    <b-tooltip label="Your 'Personalized' list is based on watched tags"
                     position="is-right"
                     type="is-info">
                    Watched Tags:
                    </b-tooltip>
                </div>
                <div v-if="watchedTags.length>0" class="column columns is-multiline">
                    <b-taglist v-for="(tag,index) in watchedTags" :key="index" attached style="margin:10px">
                        <b-tag type="is-primary">#</b-tag>
                        <b-tag type="is-dark">{{tag}}</b-tag>
                    </b-taglist>
                </div>
            </div>
            <div class="column">
                <b-button type="is-info" @click.prevent="edit()"> Edit Watched Tags </b-button>

            </div>
            <div v-if="isEditing" class=" column columns is-multiline">
                <b-field class="column is-full"  style="margin: 0" >
                    <b-taginput
                        v-model="editTags"
                        :data="filteredTags"
                        autocomplete
                        :allow-new="allowNew"
                        field="user.first_name"
                        icon="label"
                        placeholder="Add a tag"
                        @typing="getFilteredTags"
                        @submit="submitTag()">
                    </b-taginput>
                </b-field>
                <div class="column level  is-full" style="padding:0; margin: 0">
                    <b-button  type='is-info' @click.prevent="submit()"> save</b-button>
                    <b-button  @click.prevent="edit()" is-danger>cancel</b-button>
                </div>
                


            </div>

        
        <b-notification 
            v-if="notif"
            type="is-danger"
            aria-close-label="Close notification"
            role="alert">
            no tag(s) found for "{{msg}}"
        </b-notification>
    </section>
</template>

<script>

    import axios from 'axios'
    export default {
        data() {
            return {
                filteredTags: [],
                tags: [],
                allowNew: false,
                msg:"",
                notif: false,
                isEditing: false,
                editTags:[],
            }
        },
        methods: {
            getFilteredTags(text) {
                this.filteredTags = this.existingTags.filter((option) => {
                    return option
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                })
                if(this.filteredTags.length == 0){
                    this.msg=text
                    this.notif=true
                } else {
                    this.msg=""
                    this.notif=false
                }
            },
            edit(){
                this.isEditing= !this.isEditing
            },
            submit(){
                const payload = {
                    watch_tag: this.editTags
                }
                axios({
                    method: 'PATCH',
                    url: `${this.$store.state.server}/users`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: payload
                })
                .then(({data})=>{
                    console.log('sukses')
                    this.isEditing = false
                    this.$store.dispatch('getWatchedTags')
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
        computed:{
            watchedTags(){
                return this.$store.state.watchedTags
            },
            existingTags(){
                let all = [] 
                this.$store.state.posts.forEach(e => {
                    e.tags.forEach(el => {
                        all.push(el)
                    });
                });
                var unique = all.filter((v, i, a) => a.indexOf(v) === i)

                return unique
            }
        },
        created(){
            this.editTags = [...this.watchedTags]
        },
        watch:{
            watchedTags(){
                this.editTags = [...this.watchedTags]
            }
        }
    }
</script>
