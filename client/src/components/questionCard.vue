<template>
  <div @click="toDetails()" class="card">
  <header class="card-header">
    <p class="level card-header-title">
      {{post.title}}
    </p>

    
  </header>
  <div class="card-content" >
    <div class="content" style="height:100%" >
      <p id="card-content">
       <froalaView v-model="post.content"></froalaView>
      </p>
      <br>
      <div class="columns is-multiline" >
        <b-taglist v-for="(tag,index) in post.tags" :key="index" attached style="margin:10px">
            <b-tag type="is-primary">#</b-tag>
            <b-tag type="is-dark">{{tag}}</b-tag>
        </b-taglist>
      </div>
      
    </div>
  </div>
  <footer class="card-footer ">
    <div class="column is-one-third card-footer-item">
      <div class="columns is-multiline" >
        <div class="column is-half">
          <div>
            Upvotes
          </div>        
          <span> {{post.upvotes.length}} </span>
        </div>
        <div class="column is-half">
          <div>
            Answers
          </div>        
          <span> {{post.answers.length}} </span>
        </div>

      </div>
    </div>

    <div class="column">
        <time datetime="2016-1-1">{{date}}</time>
        <div>
          <strong style="color:blue">
            {{post.owner.name}}
          </strong>
        </div>
    </div>

  </footer>
</div>
</template>

<script>
export default {
  props: ['post'],
  methods:{
    toDetails(){
      this.$router.push(`/detail/${this.post._id}`)
    }
  },
  computed:{
    date(){
      let dt = new Date(this.post.created_at)
      return dt.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
      })
    }
  }

}
</script>

<style scoped>
  #card-content{
  display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
   overflow: hidden;
   text-overflow: ellipsis;
   margin-bottom: 0;
  }

</style>