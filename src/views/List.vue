<template>

  
<card-component   
      class="mb-6"
      has-table>

 <batch-plan-list :list="list" /> 
</card-component>

</template>

<script setup>
import { onBeforeMount, computed } from 'vue'
import EnquiryList from '@/components/EnquiryList.vue'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import BatchPlanList from '@/components/BatchPlanList.vue'
import { rigidStore } from "../stores/rigid";

const rigid = rigidStore();
const list = computed(() => {
  return rigid.days;
});

onBeforeMount(async () => {
rigid.getlist()
})
</script>






