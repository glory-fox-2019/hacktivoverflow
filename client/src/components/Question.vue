<template>
    <b-card>
      <b-row>
        <b-col cols="4">
          <div class="pt-3">
            <b-row align="center">
              <b-col cols="6">
                <h2> {{question.upvotes.length - question.downvotes.length}} </h2>
                <p small> Votes </p>
              </b-col>
              <b-col cols="6">
                 <h2> {{question.answer.length}} </h2>
                <p small> Replies </p>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col cols="8">
          <router-link :to="'/question/'+question._id">
          <h4 align='left'> {{question.title}} </h4>
          </router-link>
          <p align='left' class="giveMeEllipsis"> {{question.description}} </p>
          <b-row>
            <b-col cols="4" align="left">
                <h6> Asked By </h6>
                <h6> {{question.owner.username}} </h6>
            </b-col>
            <b-col cols="8" align="right">
                <p class="text-muted mb-0" > {{question.answer.length}} Answer </p>
                <p class="text-muted mb-0" > {{question.upvotes.length - question.downvotes.length}} Votes</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
</template>

<script>
export default {
  props: ['question'],
};
</script>

<style>

#footer-content {
  display: flex;
  flex-direction: row;
  max-height: 100px;
  align-content: flex-end;
}
.asked {
  width: 40%;
  align-content: flex-start;
  text-align: left;
}
.stat {
  text-align: right;
  width: 60%;
}
.giveMeEllipsis {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 4; /* number of lines to show */
   line-height: 1.5;        /* fallback */
   max-height: 4*1.5;       /* fallback */
}
.icon-vote{
  cursor: pointer;
}
</style>
