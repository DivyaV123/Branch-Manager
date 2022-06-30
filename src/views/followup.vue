<template>

  
<card-component   
      class="mb-6"
      has-table>

 <batch-followup :Started="Started"/>
</card-component>

</template>

<script setup>
import { onBeforeMount, computed } from 'vue'
import EnquiryList from '@/components/EnquiryList.vue'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import BatchFollowup from '@/components/BatchFollowup.vue'
import { batchplanStore } from "../stores/batchplan1";

const batchplan = batchplanStore();
const Started = computed(() => {
  return batchplan.started;
});

onBeforeMount(async () => {
  batchplan.getstarted()
})
</script>






