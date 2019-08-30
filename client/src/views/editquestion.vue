<template>
  <div class="container">
    <p
      class="title-atas mt-4"
    >Your description gives people the information they need to help you answer your question.</p>
    <p class="title-bawah">
      <strong>more help?</strong> Check out these examples of great question descriptions: Example 1, Example 2
    </p>
    <div class="container">
      <form class="form-question" @submit.prevent="editQuestion" >
         <input type="text" v-model="title" placeholder="  add Title" class="add-title mt-2"/> 
        <textarea class="textz mt-3" placeholder="  Add Your Question Here !!" v-model="description"></textarea>
        <div class="hastag-list d-flex flex-row mt-3">
          <!-- <div v-for="(tag , index) in hastagList" :key="index" class="row ml-4" style="background-color : whitesmoke;">
            <button class="buttonX" @click="deleteTag(index)">X</button>
            <a href="#">{{tag}}</a>
          </div> -->
        </div>
        <!-- <input type="text" v-model="hastag" class="add-hastag mt-3" placeholder="  add your hastag here" /> -->
        <input type="submit" class="buttonadd" value="Create" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
   created (){
    axios({
      method: "GET",
      url: `http://34.87.7.44/question/${this.$route.params.id}`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
          this.title = data.title
          this.description = data.description
          this.id = data._id
          console.log(data);
      })
      .catch(console.log);
   },
  data() {
    return {
      hastag: "",
      hastagList: [],
      title : '',
      description : '',
      id : ''
    };
  },
  watch: {
    hastag(val) {
      if (val[val.length - 1] == " ") {
        this.hastagList.push( val);
        this.hastag = "";
      }
    }
  },
  methods : {
      deleteTag (index){
        //   console.log(index)
        this.hastagList.splice(index , 1)
      }
      ,
      editQuestion (){
          let {   title , description , id } = this
          this.$store.dispatch('editQuestion' , {   title , description , id})
          .then(data=>{
            this.$router.push('/')
          })
          .catch(err=>{
            console.log(err)
          })
      },
  }
};
</script>

<style>
.title-atas {
  font-size: 23px;
}

.title-bawah {
  font-size: 19px;
  padding-top: 16px;
}

.form-question {
  width: 100%;
  height: 340px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.textz {
  width: 100%;
  height: 215px;
  border: none;
  margin: 0;
  padding: 0;
}

.text-down {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 229px;
  background-color: #fafafb;
}

.add-hastag {
  width: 100%;
  border: none;
  height: 40px;
}

.hastag-list {
  width: 100%;
  height: 20px;
}

.buttonX {
    background-color : whitesmoke; width : 20px; height : 24px; padding : 0; margin : 0; border : none; color : black;
}

.add-title {
    border: none;
     height: 34px;
}

.buttonadd {
    margin-top: 20px;
    width:  100px;
    background-color: black;
    border: none;
    color: pink;
}
</style>