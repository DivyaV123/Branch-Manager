<template>
<!-- <title-bar :title-stack="titleStack"/> -->

  
<card-component   
      class="mb-6"
      has-table>

 <rigid-child  />
</card-component>

</template>

<script setup>
import { onBeforeMount, computed } from 'vue'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import RigidChild from '@/components/RigidChild.vue'


</script>

