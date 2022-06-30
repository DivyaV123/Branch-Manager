<script setup>
import { computed, onMounted, reactive, ref ,onBeforeMount } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import { rigidStore } from "../stores/rigid";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme"
import { useRoute, useRouter } from 'vue-router'

const theme = themeStore();
const route= useRoute();
const rigid = rigidStore();
const props = defineProps({
  crec: Array,
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


const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}


const cancel = () => confirmCancel('cancel')

const perPage=5;

const itemsPaginated = computed(() => rigid.rigid_child)
const itemsCount = computed(() => rigid.rig_child_total)


const pageChange =(page)=>{
  currentPage.value=page
 rigid.getcallrecord(page,recs.value.id)
  // rigid.getStudentDetails(page);
}



const numPages = computed(() => Math.ceil(itemsCount.value / perPage))


const lightBorderStyle = computed(() => theme.lightBorderStyle)

const lightBgStyle = computed(() => theme.lightBgStyle)

const tableTrStyle = computed(() => theme.tableTrStyle)

const tableTrOddStyle = computed(() => theme.tableTrOddStyle)

const darkMode = computed(() => theme.darkMode)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const currentPage = ref(1)

const checkedRows = ref([])

const numShown = ref(5);


const maskNumber = (number) => {
  return number.replace(/\d(?=\d{4})/g, "*")
}


const pagesList = computed(() => {
  const pagesList = []
  for (let i = 1; i <= numPages.value; i++) {
     const num = Math.min(numShown.value,numPages.value);
      console.log("num",num)
  let first = currentPage.value - Math.floor(num / 2);
    first = Math.max(first, 1);
    first = Math.min(first, numPages.value - num + 1);
    // return [...Array(numShown)].map((k,i) => i + first);
      return [...Array(num)].map((k,i) => i + first)
  }
  return pagesList
})


const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}
const recs = computed(() => props.crec);
console.log("recs",recs.value.id)
const callrecords=computed(()=>rigid.call_record)
console.log("call details",callrecords)

onBeforeMount(async (page) => {
  currentPage.value=1
 await rigid.getcallrecord(page,recs.value.id)

})

</script>

<template>
  <overlay
    v-show="value"
    
  >
    <card-component
      v-show="value"
      :title="`Call record details ${recs.name}`"
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <table>
    <thead >
      <tr >
  
        <th class="bg-gray-900">Record</th>
        <th class="bg-gray-900">Status</th>
        <th class="bg-gray-900">Branch</th>
        <th class="bg-gray-900">DateTime</th>
       
      </tr>
    </thead>
    <tbody  >

      <tr
       v-for="(rec, index) in callrecords"
            :key="rec.id"
            :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >

        <td class="Record"  >
           <small
            class="text-gray-500 dark:text-gray-300 capitalize"
          >
           <audio :src="rec.audio" controls controlsList="nodownload" >
                Your browser does not support the audio element.
              </audio>
          
           </small>
            
        </td>

      
        <td data-label="Status" v-if="rec.status">
         
       <small
            class="text-gray-500 dark:text-gray-300 capitalize"  
            v-for="(stat, i) in rec.status" :key="i" 
          >  

           {{ stat.main_status_name}},
          </small>   
        </td>
    
       <td v-else>
           <small
            class="text-gray-500 dark:text-gray-300 capitalize"
          >  
          No Status
           </small>
        </td>

        <td data-label="Branch" v-for="(client4) in rec.branches"  :key="client4.id">
         <small
            class="text-gray-500 dark:text-gray-300 capitalize"
            v-for="(branch, i) in rec.branches" :key="i"
          >    {{ branch.name }}
         </small>
        
        </td>

        <td data-label="DateTime">
           <small
            class="text-gray-500 dark:text-gray-300 capitalize"
          >      {{ rec.time }}
           </small>
          
        </td>
    
      </tr>
    </tbody>
  </table>
  <div :class="lightBorderStyle" class="p-3 lg:px-6 border-t dark:border-gray-800">
    <level mobile>
      <jb-buttons glue>
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active-soft="page === currentPage"
          :label="page"
          addon
          :outline="darkMode"
          small
          no-focus-ring
          @click="pageChange(page)"
        />
      </jb-buttons>
      <small>Page {{ currentPage }} of {{ numPages }}</small>
    </level>
  </div>
      
     </card-component>
  </overlay>
</template>