<template>
  <div>
    <div class="iklan border border-dark">
      <h5>THE MOST VOTES</h5>
      <h6> <strong>  {{this.most}} </strong> </h6>
    </div>
    <div class="iklan border border-dark mt-3">
      <h5>Enter Your adverstisement HERE</h5>
    </div>
  </div>
</template>

<script>
import { CronJob } from "cron";
import axios from 'axios';
export default {
  props: ["cols"],
  data (){
    return {
      most : ''
    }
  },
  created (){
    // new CronJob(
    //   "0 0 */1 * * *",
    //   function() {
    //     // console.log("You will see this message every second");
    //     axios({
    //             method : 'GET',
    //             url : 'http://localhost:3000/vote',
    //             headers : {
    //                 token : localStorage.getItem('token')
    //             }
    //         })
    //         .then(({data})=>{
    //             // this.$store.commit('MOSTVOTES' ,  data.name)
    //             this.most = data
    //             console.log('sdfdsfdsf =============================')
    //             // commit('RENDERQUESTION' , data)
    //             // console.log(data)
    //         })
    //         .catch(console.log)
    //   },
    //   null,
    //   true,
    //   "Asia/Jakarta"
    // );
  }
};
</script>

<style>
.iklan {
  width: 100%;
  height: 195px;
  padding-top: 10px;
}
</style>