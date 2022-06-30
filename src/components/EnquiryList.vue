<script setup>
import { computed, onMounted, ref } from 'vue'
import { mdiWeb,mdiAlertCircle,mdiCommentTextOutline,mdiAccountSwitch ,mdiLifebuoy,mdiBookmarkPlus  } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { themeStore } from "../stores/theme"
import Icon from '@/components/Icon.vue'
import { batchplanStore } from "../stores/batchplan1";
import dayjs from 'dayjs';
const theme = themeStore();
const batchplan = batchplanStore();

const props = defineProps({
  course:null,
  class_timing:null,
  agreed_date:'',
  branch:null,
  start_date:'',
  mode_class:null,
  checkable: Boolean,
  perPage: {
    type: Number,
    default: 25
  }
})


const lightBorderStyle = computed(() => theme.lightBorderStyle)

const lightBgStyle = computed(() => theme.lightBgStyle)

const tableTrStyle = computed(() => theme.tableTrStyle)

const tableTrOddStyle = computed(() => theme.tableTrOddStyle)

const darkMode = computed(() => theme.darkMode)

const items = computed(() => props.course)
const items2 = computed(() => props.class_timing)
const items3 = computed(() => props.agreed_date)
const items4 = computed(() => props.branch)
const items5 = computed(() => props.start_date)
const items6 = computed(() => props.mode_class)

const tabledata = computed (()=>batchplan.enq)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(
  () => items.value.slice(props.perPage * currentPage.value, props.perPage * (currentPage.value + 1))
)

const maskNumber = (number) => {
  return number.replace(/\d(?=\d{4})/g, "*")
}

const numPages = computed(() => Math.ceil(items.value.length / props.perPage))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
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

onMounted(async()=>{
  // if(items.value != null && items2.value != null && items3.value!= '' && items5.value != '' && items4.value != null && items6.value != null )
  // {
     const Tentative = dayjs(items5.value).format("YYYY-MM-DD");
     const  add_enq= dayjs(items3.value).format("YYYY-MM-DDTHH:mm:ss");
    batchplan.getEnq({"course":items.value ,"class_timing":items2.value, "agreed_date":Tentative, "branch": items4.value ,"start_date":add_enq,"mode_class":items6.value})
  // }
  
})


 
</script>

<template>

  <modal-box
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Are you sure , you want to create Batch !!</p>

  </modal-box>


  <div
    v-if="checkedRows.length"
    class="bg-opacity-50 p-3 dark:bg-gray-800"
    :class="lightBgStyle"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700"
      :class="lightBgStyle"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table >
    <thead>
      <tr>
        <th v-if="checkable" /> 
        <th>Other branch Enquiries</th>
        <th>Other role Enquiries</th>
        <th>Inactive author Enquiries</th>
        <th>Branch Enquiries</th>
        <th>Total Split Enquiries</th>
      </tr>
    </thead>
    <tbody>
 
      <tr
      >
        <td data-label="Other branch Enquiries"  class="text-gray-500 dark:text-gray-300 font-semibold">
           <jb-button
             
                color="success"
                :icon="mdiWeb"
                small
              />
                 {{tabledata.other_branches}}
        </td>
        <td  data-label="Other role Enquiries" class="text-gray-500 dark:text-gray-300 font-semibold">
                 <jb-button
             
                color="success"
                :icon="mdiAccountSwitch"
                small
              />
              {{tabledata.other_roles}}
        </td>
        <td data-label="Inactive author Enquiries" class="text-gray-500 dark:text-gray-300 font-semibold">
           <jb-button
             
                color="success"
                :icon="mdiAlertCircle"
                small
              />
               {{tabledata.inactive}}
        </td>
        <td
          data-label="Branch Enquiries" class="text-gray-500 dark:text-gray-300 font-semibold"
        >
           <jb-button
             
                color="success"
                :icon="mdiCommentTextOutline"
                small
              />
           {{tabledata.branch_enquiries}}   
        </td>
         <td
          data-label="Total Split Enquiries" class="text-gray-500 dark:text-gray-300 font-semibold"
        >
           <jb-button
             
                color="success"
                :icon="mdiBookmarkPlus"
                small
              />
           {{tabledata.total}}   
        </td>
       
      </tr>
    </tbody>
  </table>

</template>
