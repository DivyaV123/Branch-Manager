<template>

  
<card-component   
      class="mb-6"
      has-table>

 <followup-not-started :notStarted="notStarted"/>
</card-component>

</template>

<script setup>
import { onBeforeMount, computed } from 'vue'
import EnquiryList from '@/components/EnquiryList.vue'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import FollowupNotStarted from "@/components/FollowupNotStarted.vue"
import { batchplanStore } from "../stores/batchplan1";

const batchplan = batchplanStore();
const notStarted = computed(() => {
  return batchplan.not_started;
});

onBeforeMount(async () => {
  batchplan.getnotstarted()
})
</script>






