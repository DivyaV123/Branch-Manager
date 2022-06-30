<script setup>
import { onBeforeMount, computed,ref } from 'vue'
import { mdiCloseCircleOutline, mdiMagnify, mdiLifebuoy, mdiBookEducation, mdiPlusBox,mdiMicrophone, mdiEmail, mdiExclamationThick   } from '@mdi/js'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import ModalBox from '@/components/ModalBox.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'


</script>

<template>
<hero-bar>

  </hero-bar>
      <card-component
      class="mb-6"
      has-table  
    >
    </card-component>

</template>
