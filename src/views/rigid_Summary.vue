<template>
<!-- <title-bar :title-stack="titleStack"/> -->

  
<card-component   
      class="mb-6"
      has-table>

 <rigid-list  />
</card-component>

</template>

<script setup>
import { onBeforeMount, computed } from 'vue'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import RigidList from '@/components/RigidList.vue'
import { rigidStore } from "../stores/rigid";

const rigid = rigidStore();
const follow = computed(() => {
  return rigid.rigid;
});


</script>


