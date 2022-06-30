
<script setup>
import { computed, ref ,reactive,onBeforeMount} from 'vue'
import { mdiCloseCircleOutline, mdiMagnify, mdiLifebuoy, mdiBookEducation, mdiPlusBox,mdiMicrophone, mdiEmail, mdiExclamationThick ,mdiFilter  } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { themeStore } from "../stores/theme"
import Icon from '@/components/Icon.vue'
import dayjs from 'dayjs';
import { batchplanStore } from "../stores/batchplan1";
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import { useRoute, useRouter } from 'vue-router'
import ModalRemove from '@/components/ModalRemove.vue'
import { rigidStore } from "../stores/rigid";
import Modal from '@/components/ModalAcademics.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import RegCodeStart from '@/components/RegCodeStart.vue'
import SharedData from "@/components/SharedData.vue"
import HelpRequest from "@/components/HelpRequest.vue"
import AuthorShared from "@/components/AuthorShared.vue"



const batchplan = batchplanStore();
const route= useRoute();
const theme = themeStore();
const rigid = rigidStore();

// Pagination
const perPage=25;
const itemsPaginated = computed(() => batchplan.started
)
const itemsCount = computed(() => batchplan.started_total)

const counselor=computed(()=>{
   return rigid.counselor  
})
console.log("counselor",counselor);
const pageChange = (page) => {
currentPage.value = page;
 batchplan.getstarted(page)
};
 
let params=ref("")
const share = Array({id:null,name:"",value:""});
const help =Array({id:null})
const author=Array({id:null})

const onShare = async(id,name,value) => {
  share.id=id;
  share.name=name;
  share.value=value;
  isRegCodeStart.value = true;
  await rigid.getsharecounsellor1(id);

  let something = JSON.parse(JSON.stringify(counselor.value.counselors));
  let cns = []
  cns = something
  console.log("cns===",cns);
  if(cns.length > 0){
    for(var p = 0; p < cns.length; p++){
      couns.value.push({name:cns[p].username, count:0,id:cns[p].id,myenq:counselor.value.my_enq})  
    }
  } 
  couns.value = []

};

const onReassign =async(id,name,value)=>{
  share.id=id;
  share.name=name;
  share.value=value;
  isRegCodeStart.value = true;
  await rigid.getsharecounsellor1(id);

  let something = JSON.parse(JSON.stringify(counselor.value.counselors));
  let cns = []
  cns = something
  console.log("cns===",cns);
  if(cns.length > 0){
    for(var p = 0; p < cns.length; p++){
      couns.value.push({name:cns[p].username, count:0,id:cns[p].id,other:counselor.value.other_enq})  
    }
  } 
  couns.value = []
}



const onHelp =async(id)=>{
  help.id=id
  isHelpCode.value=true;
}

const onAuthor =async(id)=>{
  author.id=id
  isAuthorCode.value=true;
}



let couns=ref([])
const numPages = computed(() => Math.ceil(itemsCount.value / perPage))
const lightBorderStyle = computed(() => theme.lightBorderStyle)
const lightBgStyle = computed(() => theme.lightBgStyle)
const tableTrStyle = computed(() => theme.tableTrStyle)
const tableTrOddStyle = computed(() => theme.tableTrOddStyle)
const darkMode = computed(() => theme.darkMode)
const currentPage = ref(1)
const checkedRows = ref([])
const numShown = ref(10)
const isHelpCode=ref(false)
const isAuthorCode=ref(false)

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

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}



const search = reactive({
      name:ref(''),
    });

 const searchParams = async() => {
      let search=""
  
    if (coursefilter.value ) {
    search+="&name=" +coursefilter.value
}
    params = new URLSearchParams(search).toString();
    currentPage.value=1
    await rigid.getlist(currentPage.value,search);
    }

 const clear = async() => {
  params ='';
  coursefilter.value = '';
  search.name='';
  await rigid.getlist();
    }
const paramsDate=ref(route.params.date)


onBeforeMount(async (page) => {
  currentPage.value=1
 await batchplan.getstarted()
  await rigid.getsharecounsellor();
   theme.setPageTitle("Followup Started")
})

const setPage=ref(false)
const isRegCodeStart =ref(false)
const isModalActive =ref(false)
const redirect1 = ref("started")
</script>

<template>

<shared-data :share="share" v-model="isRegCodeStart" v-if="isRegCodeStart==true" />
<help-request   :help="help" v-model="isHelpCode" v-if="isHelpCode==true"/>
<author-shared  :author="author" v-model="isAuthorCode" v-if="isAuthorCode==true"/>


    <div class="flex justify-end mr-6">
    <jb-button
    @click = "isModalActive =! isModalActive"
    label="Filters"
    type="submit"
    color="info"
    :icon="mdiFilter"
    />
    </div>
  <table>
    <thead>
      <tr>

        <th rowspan="2">Batch plan Name</th>
        <th rowspan="2">Batch Plan Date</th>
        <th rowspan="2">Assigned Enquires to me</th>
        <th rowspan="2">My Enq</th>
        <th rowspan="2">Total Called</th>
        <th rowspan="2">Not Called</th>
        <th rowspan="2">Coming</th>
        <th rowspan="2">Not interested</th>
        <th rowspan="2">CB-NR-SW</th>
        <th rowspan="2">Next Batch</th>
      <th colspan="2" class="text-center">Joined  </th>
      <th colspan="3" class="text-center">Not Joined  </th>
    
      </tr>
       <tr>
           <th class="text-center">Coming</th>
            <th class="text-center">Other Status</th>
      </tr> 
      
    </thead>
    <tbody>
      <tr
        v-for="(client, index) in itemsPaginated"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
      
 <td data-label="Batch plan Name">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
             <router-link :to="`/notstart1/` + `${client.id}` + `&` +`full`">
         {{client.batchplan}} 
            </router-link>
  
          </small>
         
        </td>
 <td data-label="Batch Plan Date">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
            {{client.batchplan_date}}
          </small>
         
        </td>
         <td data-label="Assigned Enquires to me">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.other_count }} 
          </small>
<!-- v-if="client.assigned_enq>0" -->
         <button class="border bg-orange-400 mx-2 px-3"  @click="onHelp(client.id)" >HRFOC</button>
         <small v-if="client.other_count>0">
          <button class="border-2  bg-red-400 rounded-sm px-2 " style="margin-top:7px; margin-left:15px"  @click="onReassign(client.id,client.my_enq,couns)">reassign</button>
         </small>
        </td>
         <td data-label="My Enq">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          {{ client.enquiry_count }} 
       
          </small>
            <small>
             <button class="border bg-green-600 mx-2 px-3" @click="onShare(client.id,client.my_enq,couns)">share</button>
                  <button class="border bg-blue-600 mx-2 px-3"  style="margin-top:7px; margin-left:15px" @click="onAuthor(client.id)">shared</button>
            </small>
        </td>
         <td data-label="Total Called">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          <router-link :to="`/notstart1/`+`${client.id}` + `&` +`called`+`&` + `${redirect1}`">
       {{ client.called }} 
          </router-link>
          </small>
         
        </td>
         <td data-label="Not Called">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
               <router-link :to="`/notstart1/` +`${client.id}` + `&`  +`not_called`+`&` + `${redirect1}`">
       {{ client.not_called }}  
            </router-link>
          </small>
         
        </td>
         <td data-label="Coming">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
            <router-link :to="`/notstart1/` + `${client.id}` + `&`  +`coming`+`&` + `${redirect1}`">
         {{ client.coming }}  
                </router-link>
          </small>
         
        </td>
         <td data-label="Not interested">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >

          <router-link :to="`/notstart1/` +`${client.id}` + `&` +`not_interested`+`&` + `${redirect1}`">
        {{ client.not_coming }}  
                </router-link>
          </small>
         
        </td>
         <td data-label="CB-NR-SW">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
             <router-link :to="`/notstart1/` +`${client.id}` + `&` +`other_status`+`&` + `${redirect1}`">
      {{ client.others }}  
                </router-link>
          
          </small>
         
        </td>
          <!-- <td data-label="Name">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
     
          </small>
         
        </td> -->
         <td data-label="Next Batch">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
           <router-link :to="`/notstart1/`  +`${client.id}` + `&` +`next_batch`+`&` + `${redirect1}`">
      {{ client.nextbatch  }}  
                </router-link>
          
       
          </small>
         
        </td>

        

          
   
             <td data-label="coming">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize">

                 <router-link :to="`/notstart1/` +`${client.id}` + `&`  +`cjoined`+`&` + `${redirect1}`">
           {{client.joined}} 
                </router-link>
          
              </small>
             </td>

            <td data-label="other Status">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize ml-[10px]">
                      <router-link :to="`/notstart1/`+`${client.id}` + `&` +`ojoined`+`&` + `${redirect1}`">
             {{client.joined_otherstatus}} 
                </router-link>
       
              </small>
             </td>

          <td data-label="Not Joined">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize ml-[30px]"
          >
                      <router-link :to="`/notstart1/` +`${client.id}` + `&` +`notjoined`+`&` + `${redirect1}`">
            {{client.notjoined}} 
                </router-link>
       
          </small>
         
        </td>

             <!-- <td data-label="Coming to this batch">
              <small
            class="text-gray-500 dark:text-gray-300 font-semibold capitalize"
          >
          <a href="/notstart1">{{ client.nextbatch }} </a>
          </small>
         
        </td> -->

        

 
      </tr>
    </tbody>

  </table>
  <div
    :class="lightBorderStyle"
    class="p-3 lg:px-6 border-t dark:border-gray-800"
  >
    <level mobile>
 <!-- <button @click="pageChange(currentPage === 1)"  class="border-2 ml-2 p-1 ">First</button>
      <button @click="pageChange(currentPage=currentPage -1)"  :disabled="currentPage<=1" class="border-2 ml-2 p-1 ">Previous</button> -->
      <jb-buttons glue>
        <jb-button
          v-for="page in pagesList"
          :key="page" 
          :active-soft="page === currentPage"
          :label="page"
          addon
          :outline="darkMode"
          small
          @click="pageChange(page)"
          class="ml-2"
        />
      </jb-buttons>

     <!-- <button @click="pageChange(currentPage=numPages)" :disabled="currentPage>=numPages" class="border-2 ml-2 p-1 ">Last</button>

     <button @click="pageChange(currentPage=currentPage +1)" :disabled="currentPage>=numPages" class="border-2 ml-2 p-1 ">Next</button> -->
      <small>Page {{ currentPage }} of {{ numPages }}</small>
    </level>
  </div>
</template>