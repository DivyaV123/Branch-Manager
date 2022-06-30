
<script setup>
import { computed, ref ,reactive,onBeforeMount} from 'vue'
import { batchplanStore } from "../stores/batchplan1";
import { mdiCloseCircleOutline, mdiMagnify, mdiLifebuoy, mdiBookEducation, mdiPlusBox,mdiMicrophone, mdiEmail, mdiExclamationThick,mdiFilter ,mdiCalendarRange  } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { themeStore } from "../stores/theme"
import Icon from '@/components/Icon.vue'
import dayjs from 'dayjs';
import { rigidStore } from "../stores/rigid";
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import { useRoute, useRouter } from 'vue-router'
import ModalRemove from '@/components/ModalRemove.vue'
import Modal from '@/components/ModalAcademics.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import RegCodeStart from '@/components/RegCodeStart.vue'
import Cancelled from "@/components/Cancelled.vue"
import Resplit from "@/components/Resplit.vue"
import Multiselect from "@vueform/multiselect";
import {selectClasses} from "../selectcss"

const rigid = rigidStore();
const route= useRoute();
const theme = themeStore();
const batchplan = batchplanStore();
const date_selected1 = ref(dayjs(new Date()).format("YYYY-MM-01"));
const date_selected2 = ref(dayjs(new Date()).format("YYYY-MM-DD"));
const coursefilter = ref('');

// Pagination
const perPage=25;
const itemsPaginated = computed(() => rigid.days
)
const itemsCount = computed(() => rigid.days_total)
const getCourse = computed( () => {
  return batchplan.course;
  });

const pageChange = (page) => {
currentPage.value = page;
rigid.getlist(page,params)


};

let params=ref("")
const regcode = Array({id:null,status:''});
const cancel = Array({id:null,name:""})
const resplit =Array({id:null})


const onShowReg = (id,name) => {
    regcode.id = id;
    regcode.status= name;
    isRegCodeStart.value = true;
};


const onShowcancel = (id,name) => {
   cancel.id = id;
   cancel.name=name;
    isCancel.value = true;
};




const onResplit = (id,name) => {
  resplit.id=id;
    isResplit.value = true;
};
 


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
const numShown = ref(10)


const maskNumber = (number) => {
  return number.replace(/\d(?=\d{4})/g, "*")
}

const pagesList = computed(() => {
  const pagesList = []
  for (let i = 1; i <= numPages.value; i++) {
     const num = Math.min(numShown.value,numPages.value);
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


let fromtodate="";
fromtodate= "&tentative_start_after="+dayjs(date_selected1.value).format("YYYY-MM-DD") +  "&tentative_start_before="+dayjs(date_selected2.value).format("YYYY-MM-DD") 


let search = reactive({
      date:ref(''),
      name:ref(''),
 });

const searchParams = async() => {
     let searchdata=""
                    
if(coursefilter.value || date_selected1.value || date_selected2.value){
  if (coursefilter.value ) {
  searchdata+="&class_timing=" +coursefilter.value
    ;}
  if (date_selected1.value) {
searchdata += "&tentative_start_after="+dayjs(date_selected1.value).format("YYYY-MM-01");
}
if(date_selected2.value){
searchdata += "&tentative_start_before="+dayjs(date_selected2.value).format("YYYY-MM-DD");
}
 params = new URLSearchParams(searchdata).toString();
    currentPage.value=1
   let  copystring=searchdata
    await rigid.getlist(currentPage.value,params);
}
}


 const clear = async() => {
    params ='';
    coursefilter.value = '';
    // date_selected1.value='';
    search.name='';
    search.date='';
    date_selected1.value = dayjs(paramsDate).format("YYYY-MM-01");
    date_selected2.value = dayjs(paramsDate).format("YYYY-MM-DD");
    await rigid.getlist(currentPage.value,fromtodate);
    }


const paramsDate=ref(route.params.date)


onBeforeMount(async () => {
rigid.getlist(currentPage.value,fromtodate ); 
batchplan.getCourses()
console.log("before",fromtodate);
theme.setPageTitle("Batch Plan List")
   
})

const setPage=ref(false)
const isRegCodeStart = ref(false)
const isCancel=ref(false)
const isResplit =ref(false)


</script>

<template>

<reg-code-start :regcode="regcode" v-model="isRegCodeStart" v-if="isRegCodeStart==true"/>
<cancelled :cancel="cancel" v-model="isCancel" v-if="isCancel==true"/>
<resplit :resplit="resplit"  v-model="isResplit" v-if="isResplit==true"/>





    <div class="flex justify-start mr-6">
    <jb-button
    @click = "isModalActive =! isModalActive"
    label="Search"
    type="submit"
    color="info"
    :icon="mdiFilter"
    />
    </div>

 
<aside
    id="aside-right"
    class="
      w-60
      pr-1.5
      fixed
      z-40
      h-screen
      lg:h-screen-menu
      top-0
      lg:top-14
      bg-white
      border-l border-gray-100
      overflow-y-scroll
      transition-position
      dark:bg-gray-900
      dark:border-gray-700
      dark:scrollbar-thumb-gray-600
      dark:scrollbar-track-gray-800
      right-0
    "
    v-if="isModalActive"
  >
    <div>
      <div
        class="
          md:rounded
          dark:bg-gray-900/70
          block
          bg-white
          border border-gray-100
          dark:border-gray-900
          mb-4
        "
      >
        <header
          class="
            flex
            items-stretch
            border-b border-gray-100
            dark:border-gray-700
          "
        >
          <p class="flex items-center py-3 grow font-bold px-6">
            Search List
          </p>
          <a @click="isModalActive = false" class="flex items-center py-3 px-4 justify-center cursor-pointer">
            <span class="inline-flex justify-center items-center w-6 h-6"
              ><svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                class="inline-block"
              >
                <path
                  fill="currentColor"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                ></path></svg
              ></span
            ></a
          >
        </header>
        <div class="p-2">
    


            <field label="Search class_timings">
                   <Multiselect
           class="border border-success  "
            v-model="coursefilter"
            :options="getCourse.class_timing"
            :reduce="(name) => name"
            placeholder="Select Class Timings"
            name="class_timing"
            label="name"
                 valueProp="id"
            searchable
            trackBy="name"
            :classes="selectClasses"
            
          />

          </field>

          <div class="mb-4">
            <div class="relative">
              <field label="From Date">
            <control
                v-model="date_selected1"
                :icon-left="mdiCalendarRange"
                placeholder="Search by Date"
                type="date"          
            />
          </field>
            </div>
          </div>

          <div class="mb-4">
            <div class="relative">
             <field label="To Date">
            <control
                v-model="date_selected2"
                :icon-left="mdiCalendarRange"
                placeholder="Search by Date"
                type="date"    
            />
          </field>
            </div>
          </div>

          

          <div class="grid grid-cols-1 last:mb-0 mb-2">
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
              <button
                class="
                  inline-flex
                  cursor-pointer
                  justify-center
                  items-center
                  whitespace-nowrap
                  ring-blue-700
                  focus:outline-none
                  transition-colors
                  duration-150
                  border
                  bg-emerald-600
                  text-white
                  border-emerald-700
                  hover:bg-emerald-700
                  focus:ring
                  rounded
                "
                @click="searchParams()"
                type="button"
              >
                <span class="pl-1 pr-1">Search</span></button>
              <button
                class="
                  inline-flex
                  cursor-pointer
                  justify-center
                  items-center
                  whitespace-nowrap
                  ring-blue-700
                  focus:outline-none
                  transition-colors
                  duration-150
                  border
                  bg-red-600
                  text-white
                  border-red-700
                  hover:bg-red-700
                  focus:ring
                  rounded
                "
                @click="clear()"
                type="button"
              >
                <span class="pl-1 pr-1">Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>

  <table>
    <thead>
      <tr>
   <th>Add Enq Date</th>
        <th>Batch plan Name</th>
        <th>Course</th>
        <th>Tentative date and Time</th>
        <th>Subject</th>
        <th>class Timing</th>
        <th>Trainer</th>
        <th>Expected std</th>
        <th>Raise to create batch</th>
        <th>Mitigation Plan</th>
       
        <th>Total std enq</th>
      </tr>
      
    </thead>
    <tbody>
      <tr
        v-for="(client, index) in itemsPaginated"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
      
 <td data-label="Add Enq Date">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.agreed_date }} 
          </small>
         
        </td>

            
         <td data-label="Batch plan Name">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
  <span v-if="client.reg_code===null && client.status==='1'" class="text-gray-500 dark:text-gray-300 capitalize">
                <div>  {{ client.name }}  </div>
                    
               <button class=" border-2 dark:bg-gray-800 rounded  text-black text-sm cursor-not-allowed" style=" background-color: lightskyblue">yet to</button>
              </span>
              
              <span v-else class="text-gray-500 dark:text-gray-300 capitalize">
                         {{ client.name }} 
               
              </span>
    
           </small>
       
         
        </td>
         <td data-label="Course">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.course_name }} 
          </small>
         
        </td>
            <td data-label="Tentative date and Time">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.tentative_start }} 
          </small>
         
        </td>
         <td data-label="Subject">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.subject_name }} 
          </small>
         
        </td>
    

      <td data-label="class Timing">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.class_timing_name }} 
          </small>
    
        </td>
        
        <td data-label="Trainer">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.trainer_name.username}} 
          </small>
      
        </td>
      <td data-label="Expected std">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.target_students }} 
          </small>
      
        </td>
        <td data-label="Raise to create batch">
              <small  v-if="client.status==='1' || client.status==='2' "
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
           <span v-if="client.reg_code===null " class="text-gray-500 dark:text-gray-300 capitalize">
          <button class="border-2 rounded-sm px-3 " style=" background-color: green" @click="onShowReg(client.id,client.name)">start</button>
           <button class="border-2 rounded-sm px-2 " style="margin-top:7px; background-color: red"  @click="onShowcancel(client.id,client.name)" >Cancel</button>
            <button class="border-2 rounded-sm px-2 " style="margin-top:7px; background-color: blur" @click="onResplit(client.id)">Resplit</button>
           </span>
       <span v-else class="text-gray-500 dark:text-gray-300 capitalize">
            <button class="px-2 border-2 rounded  cursor-not-allowed" style=" background-color: Blue">started</button>
             <button class="border-2 rounded-sm px-2 " style="margin-top:7px; background-color: red"  @click="onShowcancel(client.id,client.name)" >Cancel</button>
             <button class="border-2 rounded-sm px-2 " style="margin-top:7px; background-color: blur" @click="onResplit(client.id)">Resplit</button>
              </span>
 
          </small>
          <small v-if="client.status==='4'">
<button class="px-2 border-2 rounded  cursor-not-allowed" style=" background-color: red">cancelled</button>
          </small>
      
        </td>


       
        <td data-label="Mitigation Plan">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.mitigation_plan }} 
          </small>
      
        </td>
     
        <td data-label="Total std enq">
              <small class="text-gray-500 dark:text-gray-300 font-semibold capitalize">
         {{client.total_student_enq}}
          </small>
      
        </td>
      </tr>
    </tbody>
  </table>
  <div
    :class="lightBorderStyle"
    class="p-3 lg:px-6 border-t dark:border-gray-800"
  >
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
          class="ml-2"
        />
      </jb-buttons>

  
      <small>Page {{ currentPage }} of {{ numPages }}</small>
    </level>
  </div>
</template>
