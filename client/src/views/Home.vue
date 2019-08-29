<template>
  <div class="columns is-multiline" >
    <div class="column is-one-fifth" style="margin: 20px 0 0 20px">
      <sidebar style="padding: 15px"></sidebar>
    </div>
    <div class="column is-three-fifths columns is-multiline" style="margin: 30px">
      <div class="column is-full" >
        
        <qForm v-if="$store.state.loggedUser" ></qForm>
        <b-tooltip v-else label="Please log in to ask a question" type="is-dark"> 
        <b-button   type="is-info" disabled>ASK A QUESTION</b-button>
        </b-tooltip>
      </div>
      <b-tabs class="column is-full">
        <b-tab-item  label="All Post" icon="home">
          <div class="column is-full" > 
          <p class="control has-icons-left" style="width:100%">
          <input v-model="search" class="input is-small" type="text" placeholder="search">
          <span class="icon is-small is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
          </span>
          </p>
      </div>
      <div class="column is-full" >
        <questionCard 
        class="qCard"
        v-for="post in allPosts"
        :key="post._id"
        :post="post"        
        ></questionCard>
      </div>

        </b-tab-item>
        
         <b-tab-item v-if="!$store.state.loggedUser" disabled label="Personalized" icon="star"></b-tab-item>
        <b-tab-item v-else label="Personalized" icon="star">
          <div class="column is-full" > 
              <p class="control has-icons-left" style="width:100%">
              <input v-model="searchPersonalized" class="input is-small" type="text" placeholder="search">
              <span class="icon is-small is-left">
                  <i class="fas fa-search" aria-hidden="true"></i>
              </span>
              </p>
          </div>
          <div class="column is-full" >
            <questionCard 
            class="qCard"
            v-for="post in personalizedPosts"
            :key="post._id"
            :post="post"        
            ></questionCard>
          </div>
        </b-tab-item>
        
    </b-tabs>
      
      
    </div>
    
  </div>
</template>

<script>
import sidebar from '@/components/sidebar'
import questionCard from '@/components/questionCard'
import qForm from '@/components/questionForm'
export default {
  name: 'home',
  data(){
    return {
      search: '',
      searchPersonalized: ''
    }
  },
  created(){
    this.$store.dispatch('getAllPosts')
    console.log('triggered')
  }
  ,
  components: {
    sidebar,
    questionCard,
    qForm,
  },
  methods:{
  },
  computed:{
    allPosts(){
      return this.$store.state.posts.filter(post => {
          return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    personalizedPosts(){
      return this.$store.state.posts.filter(post =>{
        return post.tags.some(t=> this.$store.state.watchedTags.includes(t))
      })
      .filter(post => {
          return post.title.toLowerCase().includes(this.searchPersonalized.toLowerCase())
      })
    }
  }
}
</script>

<style>
.qCard{
  transition: transform .2s;
  margin-bottom: 20px;
}
.qCard:hover{
  transform: scale(1.05);
  box-shadow: 0 0 10px #86608E ;
}
</style>
