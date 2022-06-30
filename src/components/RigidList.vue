<script setup>
import { computed, ref ,reactive,onBeforeMount} from 'vue'
import { mdiCloseCircleOutline, mdiMagnify, mdiLifebuoy, mdiBookEducation, mdiPlusBox,mdiMicrophone, mdiEmail, mdiFilter   } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { useRoute, useRouter } from 'vue-router'
import { themeStore } from "../stores/theme"
import Icon from '@/components/Icon.vue'
import dayjs from 'dayjs';
import Multiselect from "@vueform/multiselect";
import { selectClasses } from "../selectcss"
import { rigidStore } from "../stores/rigid";
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'

const rigid = rigidStore();
const route= useRoute();
const theme = themeStore();
const coursefilter = ref([]);
const date_selected1 = ref(dayjs(new Date()).format("YYYY-MM-01"));
const date_selected2 = ref(dayjs(new Date()).format("YYYY-MM-DD"));
let params = ref('');
 

// Pagination
const perPage=25;
const itemsPaginated = computed(() => rigid.rigid)
const itemsCount = computed(() => rigid.rigid_total)

console.log("rigid total",itemsPaginated)

const pageChange =(page)=>{
  currentPage.value=page
  rigid.getCourses(page,params);
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
const copystring =""
const numShown = ref(10)

const getdays = computed( () => rigid.days);
console.log("getdyas",getdays)


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
 
let fromtodate="";
fromtodate= "&from_date="+dayjs(date_selected1.value).format("YYYY-MM-DD") +  "&to_date="+dayjs(date_selected2.value).format("YYYY-MM-DD") 
console.log("formtodate",fromtodate)

let search = reactive({
      date:ref(''),
      course_id:ref(''),
 });

 const searchParams = async() => {
      let search=""
    if(coursefilter.value || date_selected1.value || date_selected2.value){
    if (coursefilter.value ) {
    search+="&course_id=" +coursefilter.value
  }
    if (date_selected1.value) {
search += "&from_date="+dayjs(date_selected1.value).format("YYYY-MM-DD");
}
if(date_selected2.value){
search += "&to_date="+dayjs(date_selected2.value).format("YYYY-MM-DD");
}
console.log("searchstring",search)
 
    params = new URLSearchParams(search).toString();
    console.log('params',params);
    currentPage.value=1
    await rigid.getCourses(currentPage.value,params);

    }
 }
    
   
// const searchParams = async() => {
//        let searchdata=""          
// if(coursefilter.value || date_selected1.value || date_selected2.value){
//   if (coursefilter.value ) {
//   searchdata+="&name=" +coursefilter.value
//     ;}
//   if (date_selected1.value) {
// searchdata += "&from_date="+dayjs(date_selected1.value).format("YYYY-MM-DD");
// }
// if(date_selected2.value){
// searchdata += "&to_date="+dayjs(date_selected2.value).format("YYYY-MM-DD");
// }
// console.log("searchstring",searchdata)  

// params = new URLSearchParams(searchdata).toString();
//     console.log('params',params);
//     currentPage.value=1
//     await rigid.getCourses(currentPage.value,searchdata);
// }
// }


 const clear = async() => {
    params ='';
    coursefilter.value = '';
    // date_selected1.value='';
    search.name='';
    search.date='';
    date_selected1.value = dayjs(paramsDate).format("YYYY-MM-DD");
    date_selected2.value = dayjs(paramsDate).format("YYYY-MM-DD");
    await rigid.getCourses(currentPage.value,fromtodate);
    }
const paramsDate=ref(route.params.date)


onBeforeMount(async () => {
  await rigid.getCourses(currentPage.value,fromtodate);
    theme.setPageTitle("Rigid Summary")    
})




</script>

<template>



    <div class="flex justify-end mr-6">
    <jb-button
    @click = "isModalActive =! isModalActive"
    label="Filters"
    type="submit"
    color="info"
    :icon="mdiFilter"
    />
    </div>

<!-- 
<div v-if="isModalActive" @submit.prevent="searchParams"> -->


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
    

 <field label="Search Courses" vertical  help="This field is required">
        <Multiselect   v-model="coursefilter" name="name" label="name"
          :options="itemsPaginated"  placeholder="Select courses" valueProp="id" searchable trackBy="name" :classes="selectClasses" mode="multiple"/>
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
      
    <thead >
      <tr>

        <th>Course</th>
        <th>Weekend Only</th>
        <th>Saturday Only</th>
        <th>Sunday Only</th>
        <th>Morning</th>
        <th>Afternoon</th>
        <th>Evening</th>
        <th>Night</th>
      </tr>
      
    </thead>
   <!-- v-for="(jet,index) in getdays"  :key="index"  -->
    <tbody>
  
      <tr   v-for="(client, index1) in itemsPaginated"
        :key="index1%2===1"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      
        >

 

         <td data-label="Name"  >
          <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
      
          {{ client.name }}
        
          </small>
        </td>

        <td  data-label="weekend " class="pl-[52px]" >   
           <small
            class="text-gray-500 dark:text-gray-300 ">

  <router-link :to="`/rigid_child/` + `${client.id}` + `&` +`weekend`+`&`+'converted'+ `&` + dayjs(date_selected1).format('YYYY-MM-DD') + `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&` +'offline'">
             <jb-button v-if="client.all_data.weekend != 0"
         :label="client.all_data.weekend"
        color="info"
        small
        />
            <jb-button v-else
        label="0"
        color="info"
        small
        /> 
           </router-link>
         <router-link :to="`/rigid_child/` + `${client.id}` + `&` +`weekend`+`&`+'total'+ `&` + dayjs(date_selected1).format('YYYY-MM-DD') + `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
         <span class="text-lg p-2">/</span>
              <jb-button v-if="client.all_data.weekendtotal != 0"
        :label="client.all_data.weekendtotal"
        color="info"
        small
        />
         <jb-button v-else
        label="0"
        color="info"
        small
        />
      
            </router-link>

           </small>
          
        </td>

         <td  data-label="saturday">   
           <small
            class="text-gray-500 dark:text-gray-300 text-center">
              <router-link :to="`/rigid_child/`+`${client.id}`+ `&`+`saturday`+ `&`+'converted'+'&'+dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">

         <jb-button v-if="client.all_data.saturday != 0"
    :label="client.all_data.saturday"
        color="info"
        small
        /> 
            <jb-button v-else
        label="0"
        color="info"
        small
        />
          </router-link>
         <router-link :to="`/rigid_child/`+`${client.id}`+ `&`+`saturday`+ `&`+'total'+'&'+dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
        <span class="text-lg p-2">/</span>
              <jb-button v-if="client.all_data.saturdaytotal != 0"
        :label="client.all_data.saturdaytotal"
        color="info"
        small
        />
         <jb-button v-else
        label="0"
        color="info"
        small
        />

             </router-link>
           </small>
          
        </td>


         <td  data-label="sunday">   
           <small
            class="text-gray-500 dark:text-gray-300 text-center">
              <router-link :to="`/rigid_child/`+ `${client.id}` + `&` + `sunday`+ `&`+'converted'+'&'+dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
                 <jb-button v-if="client.all_data.sunday != 0"
        :label="client.all_data.sunday"
        color="info"
        small
        /> 
            <jb-button v-else
        label="0"
        color="info"
        small
        />  
          </router-link>
 <router-link :to="`/rigid_child/`+ `${client.id}` + `&` + `sunday`+ `&`+'total'+'&'+dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">

        <span class="text-lg p-2">/</span>
              <jb-button v-if="client.all_data.sundaytotal != 0"
        :label="client.all_data.sundaytotal"
        color="info"
        small
        />
         <jb-button v-else
        label="0"
        color="info"
        small
        />


        <!-- {{ client.sunday }} -->
         </router-link>
           </small>
          
        </td>


         <td  data-label="morning">   
           <small
            class="text-gray-500 dark:text-gray-300 text-center">
           <router-link :to="`/rigid_child/` +`${client.id}`+`&` +`morning`+`&` +'converted'+'&'+dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
               <jb-button v-if="client.all_data.morning != 0"
         :label="client.all_data.morning"
        color="info"
        small
        />
            <jb-button v-else
        label="0"
        color="info"
        small
        />  
         </router-link>
             <router-link :to="`/rigid_child/` +`${client.id}`+`&` +`morning`+`&` +'total'+'&'+dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
         <span class="text-lg p-2">/</span>
              <jb-button v-if="client.all_data.morningtotal != 0"
        :label="client.all_data.morningtotal"
        color="info"
        small
        />
         <jb-button v-else
        label="0"
        color="info"
        small
        />
        <!-- {{ client.morning }} -->
         </router-link>
           </small>
          
        </td>

         <td  data-label="afternoon">   
           <small
            class="text-gray-500 dark:text-gray-300 text-center ml-[20px]">
           <router-link :to="`/rigid_child/`+`${client.id}` +`&` +`afternoon` + `&` +'converted'+'&'+dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
               <jb-button v-if="client.all_data.afternoon != 0"
           :label="client.all_data.afternoon"
        color="info"
        small
        />
            <jb-button v-else
        label="0"
        color="info"
        small
        />  
         </router-link> 
             <router-link :to="`/rigid_child/`+`${client.id}` +`&` +`afternoon` + `&` +'total'+'&'+dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
        <span class="text-lg p-2">/</span>
              <jb-button v-if="client.all_data.afternoontotal != 0"
        :label="client.all_data.afternoontotal"
        color="info"
        small
        />
         <jb-button v-else
        label="0"
        color="info"
        small
        />
        <!-- {{ client.afternoon }} -->
         </router-link>
           </small>
          
        </td>


        <td  data-label="evening">   
           <small
            class="text-gray-500 dark:text-gray-300 text-center">
              <router-link :to="`/rigid_child/`+`${client.id}`+`&`+`evening` + `&` +'converted'+'&'+dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
               <jb-button  v-if="client.all_data.evening != 0"
           :label="client.all_data.evening"
        color="info"
        small
        />
            <jb-button v-else
        label="0"
        color="info"
        small
        /> 
         </router-link>
           <router-link :to="`/rigid_child/`+`${client.id}`+`&`+`evening` + `&` +'total'+'&'+dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
        <span class="text-lg p-2">/</span>

              <jb-button v-if="client.all_data.eveningtotal != 0"
        :label="client.all_data.eveningtotal"
        color="info"
        small
        />
         <jb-button v-else
        label="0"
        color="info"
        small
        />

        <!-- {{ client.evening }} -->
         </router-link>
           </small>
          
        </td>


          <td  data-label="night">   
           <small
            class="text-gray-500 dark:text-gray-300 text-center">
               <router-link :to="`/rigid_child/` + `${client.id}` + `&` + `night` + `&` + `converted` + `&` + dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
              <jb-button v-if="client.all_data.night != 0"
       :label="client.all_data.night"
        color="info"
        small
        />
            <jb-button v-else
        label="0"
        color="info"
        small
        /> 
          </router-link>
          <router-link :to="`/rigid_child/` + `${client.id}` + `&` + `night` + `&` + `total` + `&` + dayjs(date_selected1).format('YYYY-MM-DD')+ `&` + dayjs(date_selected2).format('YYYY-MM-DD') + `&`+'offline'">
        <span class="text-lg p-2">/</span>
        
              <jb-button v-if="client.all_data.nighttotal != 0"
        :label="client.all_data.nighttotal"
        color="info"
        small
        />
         <jb-button v-else
        label="0"
        color="info"
        small
        />
        <!-- {{ client.night }} -->
         </router-link>
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
        />
      </jb-buttons>
      <small>Page {{ currentPage }} of {{ numPages }}</small>
    </level>
  </div>
</template>
