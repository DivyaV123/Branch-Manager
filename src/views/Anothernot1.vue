
<script setup>
import { computed, ref ,reactive,onBeforeMount} from 'vue'
import { mdiCloseCircleOutline, mdiMagnify, mdiLifebuoy, mdiBookEducation, mdiPlusBox,mdiMicrophone, mdiEmail, mdiExclamationThick ,mdiArrowLeftTopBold  } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import { themeStore } from "../stores/theme"
import Icon from '@/components/Icon.vue'
import dayjs from 'dayjs';
import { rigidStore } from "../stores/rigid";
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import { useRoute, useRouter } from 'vue-router'
import ModalContact from '@/components/ModalContact.vue'
import ModalAcademics from '@/components/ModalAcademics.vue'
import ModalOnline from '@/components/ModalOnline.vue'
import ModalEmail from '@/components/ModalEmail.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import ShowHistory from '@/components/ShowHistory.vue'


const rigid = rigidStore();
const route= useRoute();
const theme = themeStore();


// Pagination
const perPage=25;
const itemsPaginated = computed(() => rigid.follow_second
)
// const itemsCount = computed(() => rigid.rig_child_total)
// const pageChange =(page)=>{
//   currentPage.value=page
//   rigid.getStudentDetails(page);
//   console.log("page",page)
// }


const history=Array({id:null})

const onHistory = async(id,name,value) => {
  history.id=id;
  isModelHistory.value=true;
}



const isModelHistory=ref(false)
const pageChange = (page) => {
currentPage.value = page;
rigid.getfollowupsecond(currentPage.value, route.params.id,route.params.types)

};


const crec = Array({
  id: null,
  records: [],
  count:''
});



// const paramsDate=new URLSearchParams(route.params.date)
let params=ref("")
const academics = Array({id:null,name:''});




const onShowAcademics = (id,name) => {
    academics.id = id;
    academics.name=name
    isModalAcademic.value = true;
};

const enquiry=ref("")
const email=ref("")
const number=ref("")
const date_selected1 = ref(dayjs(new Date()).format("YYYY-MM-01"));
const date_selected2 = ref(dayjs(new Date()).format("YYYY-MM-DD"));         
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
const numShown=ref(10)

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
      name:ref(''),
 });
 
   
let searchParams = async() => {
       let searchdata=""          
if(enquiry.value || email.value ||number.value||date_selected1.value || date_selected2.value){
  if (enquiry.value ) {
  searchdata+="&name=" +enquiry.value
  }
 if (email.value ) {
  searchdata+="&email=" +email.value
  }
 if (number.value ) {
  searchdata+="&number=" + number.value
  }
  if (date_selected1.value) {
searchdata += "&from_date="+dayjs(date_selected1.value).format("YYYY-MM-DD");
}
if(date_selected2.value){
searchdata += "&to_date="+dayjs(date_selected2.value).format("YYYY-MM-DD");
}
console.log("searchstring",searchdata)  

params = new URLSearchParams(searchdata).toString();
    console.log('params',params);
    currentPage.value=1
    await rigid.getfollowupsecond(currentPage.value,route.params.id,route.params.types,searchdata);
}
}


 const clear = async() => {
    params ='';
    enquiry.value = '';
    // date_selected1.value='';
    search.name='';
    search.date='';
    date_selected1.value = dayjs(paramsDate).format("YYYY-MM-DD");
    date_selected2.value = dayjs(paramsDate).format("YYYY-MM-DD");
    await rigid.getfollowupsecond(currentPage.value,route.params.id,route.params.types,fromtodate);
    }
const paramsDate=ref(route.params.date)



onBeforeMount(async (page) => {
  currentPage.value=1
 await rigid.getfollowupsecond(currentPage.value, route.params.id,route.params.types,fromtodate);
 

})

const setPage=ref(false)
const isModalAcademic = ref(false)



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
    

     
    <field  label="Search enquiry name">
    <control
    :icon-left="mdiMagnify"
    placeholder="Search  enquiry name"
    v-model="enquiry"
    />
   
    </field>
 
    <field  label="Search mobile number">
    <control
    :icon-left="mdiMagnify"
    placeholder="Search mobile number"
    v-model="number"
    />
    </field>

     
    <field  label="Search email">
    <control
    :icon-left="mdiMagnify"
    placeholder="Search email"
    v-model="email"
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


<show-history :history="history"  v-model="isModelHistory" v-if="isModelHistory==true" />

<div v-if="route.params.redirect=='not_started'">
  <router-link :to="`/notstarted/` ">
  <jb-button
          color="info"
          :icon="mdiArrowLeftTopBold"
          small
          :label="Back"
        />
  </router-link> 
</div>
<div v-else>
    <router-link :to="`/batchfollowup/` ">
  <jb-button
          color="info"
          :icon="mdiArrowLeftTopBold"
          small
          :label="Back"
        />
  </router-link> 
</div>

<modal-academics :academics="academics" v-model="isModalAcademic" v-if="isModalAcademic==true"/>
<card-component   
      class="mb-6"
      has-table>


  <table>
    <thead>
      <tr>
      <th>Name</th>
        <th>Academic</th>
        <th>Mobile No.</th>
        <th> Email</th>
        <th>Courses</th>
        <th>Branch</th>
        <th>Timing </th>
        <th>Call Count</th>
        <th>Status</th>
        <th>DOE</th>
       <th>Remove</th>

      </tr>
    </thead>

      <tbody>
  


      <tr
        v-for="(client, index) in itemsPaginated"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
      
  
         <td data-label="Name">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.enquiry.name }} <span >({{ client.enquiry.enquiree_name }})</span>
          </small>
        
        </td>

   <td  data-label="Academic Details">   
          <span v-if="client.enquiry.education.length > 0">
                  
           <small 
            class="text-gray-500 dark:text-gray-300 uppercase"
          >
          <span v-if="client.enquiry.education[0].percentage == true" class="text-gray-500 dark:text-gray-300 capitalize">
               <jb-button
                color="success"
                :icon="mdiBookEducation"
                small
              />
             
              </span>

              <span v-else class="text-gray-500 dark:text-gray-300 capitalize">
                  
              <jb-button
                color="danger"
                :icon="mdiBookEducation"
                small
              />

              </span>

          {{ client.enquiry.education[0].name }}, {{ client.enquiry.education[0].stream }} ,{{ client.enquiry.education[0].college }} 
              
           </small>
              
            </span>
           
          <span v-else>
       
               <jb-button
          color="info"
          :icon="mdiPlusBox"
          small
          class="mr-1"
           @click="onShowAcademics(client.enquiry.id,client.name)"
        />
          </span>
        </td>
     

         <td  data-label="Mobile"  >   
          <span
         v-for="(client1, index1) in client.enquiry.contactnumber_set"
        :key="index1%2===1"
          >
           <small
            class="text-gray-500 dark:text-gray-300"
          >
           <a
              class=""
              :href="'tel:' + client1.number"
              >{{ maskNumber(client1.number) }}</a
            >
         &nbsp;
           </small>
          </span>
          </td>


         <td  data-label="Course-Mode of class-Agreed date">
            <span
         v-for="(client2, index1) in client.enquiry.emailid_set"
        :key="index1%2===1"
          >
           <small
            class="text-gray-500 dark:text-gray-300"
          >
           <a
                class=""
                :href="'mailto:' +   client2.email"
                >   {{client2.email}}<jb-button
            color="warning"
            :icon="mdiEmail"
            small
          />
        </a
            >
        
              &nbsp;
           </small>
          </span> 
        </td>

        <td  data-label="Courses">
            <span
         v-for="(client3, index1) in client.course"
        :key="index1%2===1"
          >
           <small
            class="text-gray-500 dark:text-gray-300"
          >
          {{client3.name}}
           </small>
          </span>    
         </td>

         <td  data-label="Email">   
             <span
         v-for="(client3, index1) in client.course"
        :key="index1%2===1"
          >
           <small  v-for="(client4, index1) in client3.branch"
        :key="index1%2===1"
            class="text-gray-500 dark:text-gray-300"
          >
          {{client4.name}}
           </small>
          </span>
          
        </td>

        <td  data-label="Call Count" v-if="client.enquiry.flexi_timing===false">   
            <small  v-for="(client5, index1) in client.enquiry.timeslot"
        :key="index1%2===1"
            class="text-gray-500 dark:text-gray-300"
          >
         flexi- {{client5.name}}
           </small>
        </td>


        <td  data-label="Call Count" v-else> 
          <small>  
        rigid- {{client.enquiry.class_timing}}
          </small>
        </td>

    <td  data-label="Status-comment"> 
     <jb-button :icon="mdiMicrophone"  color="info" small/>
{{client.enquiry.record_count}}
         <jb-button  label="Show history"  color="success" class="mt-2"  small   @click="onHistory(client.id)"/>
    </td>


  <td data-label="Actions">
    <small>
          {{client.status}}
    </small>
        </td>

      <td data-label="Online">
        <small>
        {{client.enquiry.get_created}} 
        </small> 
      </td>

       <td data-label="Online">
       <jb-button label="Remove"  color="danger" small/>
      </td>
      </tr>
      </tbody>
  </table>

  </card-component>


   <div
    :class="lightBorderStyle"
    class="p-3 lg:px-6 border-t dark:border-gray-800"
  >
    <level mobile>
 <!-- <button @click="pageChange(currentPage === 1)"  class="border-2 ml-2 p-1 ">First</button> -->
      <!-- <button @click="pageChange(currentPage=currentPage -1)"  :disabled="currentPage<=1" class="border-2 ml-2 p-1 ">Previous</button> -->
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

     <!-- <button @click="pageChange(currentPage=numPages)" :disabled="currentPage>=numPages" class="border-2 ml-2 p-1 ">Last</button> -->

     <!-- <button @click="pageChange(currentPage=currentPage +1)" :disabled="currentPage>=numPages" class="border-2 ml-2 p-1 ">Next</button> -->
      <small>Page {{ currentPage }} of {{ numPages }}</small>
    </level>
  </div>
</template>




