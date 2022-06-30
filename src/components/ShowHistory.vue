<script setup>
import { computed, onBeforeMount, reactive, ref ,watch } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiEmailPlusOutline } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import ModalBox from '@/components/ModalBox.vue'
import { useRoute, useRouter } from 'vue-router'
import { rigidStore } from "../stores/rigid";
import Control from "@/components/Control.vue";
import Multiselect from "@vueform/multiselect";
import {selectClasses} from "../selectcss"
import SecondSplit from "@/components/SecondSplit.vue"
import { themeStore } from "../stores/theme";
import dayjs from 'dayjs';
const theme = themeStore();
const route= useRoute();
const rigid = rigidStore();


const props = defineProps({
  history:Array,
  title: {
    type: String,
    default: null
  },
  id: {
    type: Number,
  },
  button: {
    type: String,
    default: 'info'
  },
  buttonLabel: {
    type: String,
    default: 'Add'
  },
  shake: Boolean,
  hasCancel: Boolean,
  textLinkLabel: {
    type: String,
    default: null
  },
  textLinkIcon: {
    type: String,
    default: null
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})
let couns=ref([])

const recs = computed(() => props.history);
console.log("recs",recs.value.id)

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])
const tableTrStyle = computed(() => theme.tableTrStyle)
const tableTrOddStyle = computed(() => theme.tableTrOddStyle)

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}

const currentPage = ref(0)
const hasError = ref(false)
const hasError1 = ref(false)
const isModalActive = ref(false)
const cardClassAddon = computed(() => hasError.value || hasError1.value ? 'animate-shake' : '')


const historydata=computed(()=>{
  return rigid.callhistory
})
console.log("resplit",historydata)

const cancel = () => {
  confirmCancel('cancel')
  //  location.reload()
  }


onBeforeMount(async (page) => {
  await rigid.getcallhistory(page,recs.value.id);
   })

const pageLoading = ref(false)
const itemsCount = computed(() => rigid.total_call)  
const perPage =5

const maxPages = ref(10);
const numPages = computed(() => Math.ceil(itemsCount.value / perPage));

const currentPageHuman = computed(() => currentPage.value + 1);

const pageChange = async (page) => {
  pageLoading.value = true
  currentPage.value = page;
  await rigid.getcallhistory(page,recs.value.id);
  pageLoading.value = false
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
};

const pagesList = computed(() => {
  const pagesList = [];
  let startPage;
  let endPage;
  if (currentPage.value < 1) {
    currentPage.value = 1;
  } else if (currentPage.value > numPages.value) {
    currentPage.value = numPages.value;
  }

  if (numPages.value <= maxPages.value) {
    startPage = 1;
    endPage = numPages.value;
  } else {
    let maxPagesBeforeCurrentPage = Math.floor(maxPages.value / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages.value / 2) - 1;
    if (currentPage.value <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages.value;
    } else if (currentPage.value + maxPagesAfterCurrentPage >= numPages.value) {
      // current page near the end
      startPage = numPages.value - maxPages.value + 1;
      endPage = numPages.value;
    } else {
      // current page somewhere in the middle
      startPage = currentPage.value - maxPagesBeforeCurrentPage;
      endPage = currentPage.value + maxPagesAfterCurrentPage;
    }
  }

  return Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i
  );
});

</script>


<template>
  <overlay
  >
  <second-split :split="split" v-model="isModalActive" v-if="isModalActive==true" />
    <card-component
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      title="call record history"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >
     
  <table>
    
    <thead>
      <tr>
       <th>Status</th>
      <th>Record</th>
      <th>Date and Time</th>
      
      </tr>
   
    </thead>
  <tbody>

      <tr
        v-for="(client, index) in historydata"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
       <td data-label="Status">
         <small class="text-gray-500 dark:text-gray-300 capitalize"  
             v-for="(client1, index) in client.status"
        :key="index" > 
         {{client1.sub_status_name}}  
          </small>   
        </td>
         

    <td data-label="Recording">
       <small class="text-gray-500 dark:text-gray-300 capitalize"  >  
        <audio :src="client.audio" controls controlsList="nodownload" >
        Your browser does not support the audio element.
              </audio>
          </small>   
        </td>
 
    <td data-label="Recording">
       <small class="text-gray-500 dark:text-gray-300 capitalize"  >  
        {{client.time}} 
          </small>   
        </td>
   

 


      
      </tr>
    </tbody>
  </table>
      <template #footer>
        <level mobile>
         <jb-buttons>
        <jb-button v-for="page in pagesList" :key="page" :active-soft="page === currentPage" :label="page" addon
          :outline="darkMode" small no-focus-ring @click="pageChange(page)" />
      </jb-buttons>
      <small>Page {{ currentPage }} of {{ numPages }}</small>
          <text-link />
        </level>
      </template>

       </card-component>
  </overlay>

    



</template>
