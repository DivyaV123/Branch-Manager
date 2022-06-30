<script setup>
import { computed, ref ,reactive,onBeforeMount} from 'vue'
import { mdiCloseCircleOutline, mdiMagnify, mdiLifebuoy, mdiBookEducation, mdiPlusBox,mdiMicrophone, mdiEmail, mdiExclamationThick ,mdiArrowLeftTopBold  } from '@mdi/js'
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
import ModalContact from '@/components/ModalContact.vue'
import ModalAcademics from '@/components/ModalAcademics.vue'
import ModalOnline from '@/components/ModalOnline.vue'
import ModalEmail from '@/components/ModalEmail.vue'
import ModalCall from '@/components/ModalCall.vue'
import ModalEsculate from '@/components/ModalEsculate.vue'
import ModalRemove from '@/components/ModalRemove.vue'
import Modal from '@/components/ModalAcademics.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
const rigid = rigidStore();
const route= useRoute();
const theme = themeStore();


// Pagination
const perPage=25;
const itemsPaginated = computed(() => rigid.rigid_child
)
const itemsCount = computed(() => rigid.rig_child_total)
console.log("itemsPaginated",itemsCount)

// const pageChange =(page)=>{
//   currentPage.value=page
//   rigid.getStudentDetails(page);
//   console.log("page",page)
// }



const pageChange = (page) => {
currentPage.value = page;
console.log("pagee changeeee",page,route.params.id, route.params.types );
// if(copysearchString){
rigid.getStudentDetails(page, route.params.id, route.params.types,route.params.date1,route.params.date2,route.params.count,route.params.mode)
// }
// else{
// mchesc.getMchescalCounsReport(page, route.params.cid, route.params.type, paramsDate)
// }
};


const crec = Array({
  id: null,
  records: [],
  count:''
});



// const paramsDate=new URLSearchParams(route.params.date)
const params=ref("")
const email = Array({id:null,name:''});
const online = Array({id:null,name:'',courses:""});
const escalate = Array({id:null,name:''});
const removedd = Array({id:null,name:''});
const academics = Array({id:null,name:''});
const mobile = Array({id:null,name:''});


const onShowEmail = (id,name) => {
    email.id = id;
    email.name= name;
    isModalEmail.value = true;
};
const onShowOnline = (id,name,courses) => {
    online.id = id;
     online.name =name;
     online.courses=courses;
    isModalOnline.value = true;
};


const onShowEscalate = (id,name) => {
    escalate.id = id;
    escalate.name= name
    isModalEsculate.value = true;
};
const onShowRemovedd = (id,name) => {
    removedd.id = id;
    removedd.name= name
    isModalRemove.value = true;
};
const onShowAcademics = (id,name) => {
    academics.id = id;
    academics.name=name
    isModalAcademic.value = true;
};
const onShowMobile = (id,name) => {
    mobile.id = id;
    mobile.name= name;
    isModalContact.value = true;
};
const onShowRecords = (id, records,count,name) => {
  if (count > 0 ) {
    crec.id = id;
    crec.name= name
    crec.records = records;
    isModalCall.value = true;
  }
  else{
    theme.pushMessage("No record Found!");
  }
};



const numPages = computed(() => Math.ceil(itemsCount.value / perPage))
console.log("numPg",numPages)



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
      console.log("num",num)
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


onBeforeMount(async (page) => {
  currentPage.value=1
  console.log("currentpage",currentPage.value);
  console.log("route.params",route.params.search);
 await rigid.getStudentDetails(page, route.params.id,route.params.types,route.params.date1,route.params.date2,route.params.count,route.params.mode);
   theme.setPageTitle("Rigid Summary details")
 

})

const setPage=ref(false)
const isModalContact = ref(false)
const isModalEducation = ref(false)
const isModalEmail = ref(false)
const isModalCall = ref(false)
const isModalEsculate = ref(false)
const isModalRemove = ref(false)
const isModalAcademic = ref(false)
const isModalOnline = ref(false)

</script>

<template>
<!-- <modal-academics :academic="academic" v-model="isModalEducation" v-if="isModalEducation==true" /> -->
<modal-email :email="email" v-model="isModalEmail" v-if="isModalEmail==true"/>
<modal-online :online="online" v-model="isModalOnline" v-if="isModalOnline==true" />
<modal-esculate :escalate="escalate" v-model="isModalEsculate" v-if="isModalEsculate==true"/>
<modal-remove :removedd="removedd" v-model="isModalRemove" v-if="isModalRemove==true"/>
<modal-academics :academics="academics" v-model="isModalAcademic" v-if="isModalAcademic==true"/>
<modal-call :crec="crec" v-model="isModalCall" v-if="isModalCall == true"/>
<modal-contact :mobile="mobile" v-model="isModalContact" v-if="isModalContact == true" />


<!-- <modal-online v-if="isModalOnlineActive" v-model="isModalOnlineActive"
    :title="'Move course to online for ' + propValues.name" :id="propValues.id" :courses="propValues.courses"
    :sid="propValues.sid" @confirm="confirmRefresh" has-cancel>
  </modal-online> -->
  <router-link :to="`/rigid_summary/` ">
  <jb-button
          color="info"
          :icon="mdiArrowLeftTopBold"
          small
          :label="Back"
        />
  </router-link> 
     
  <table>
    <thead>
      <tr>
   
        <th>Name</th>
        <th>Academic Details</th>
        <th>Mobile</th>
        <th>Course-Mode of class-Agreed date</th>
        <th>Call Record</th>
        <th>Email</th>
        <th>Status-comment</th>
         <th>Actions</th>
         <th>Online</th>
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
          {{ client.name }} <span v-if="client.enquiree_name">({{ client.enquiree_name }})</span>
          </small>
          <!-- <small
            class="text-gray-500 dark:text-gray-300 font-semibold"
          >
          {{ client.name }}
          </small> -->
        </td>
<!-- 
   <span v-if="client.academicdetails.length > 0"> -->

        <td  data-label="Academic Details">   
          <span v-if="client.academicdetails.length > 0">
               
              
           <small 
            class="text-gray-500 dark:text-gray-300 uppercase"
          >
          <span v-if="client.academicdetails[0].percentage == true" class="text-gray-500 dark:text-gray-300 capitalize">
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

          {{ client.academicdetails[0].name }}, {{ client.academicdetails[0].stream }} ,{{ client.academicdetails[0].college }} 
              
           </small>
              
            </span>
           
          <span v-else>
               <jb-button
          color="info"
          :icon="mdiPlusBox"
          small
          class="mr-1"
           @click="onShowAcademics(client.id,client.name)"
        />
          </span>
        </td>
     





         <td  data-label="Mobile">   
           <jb-button
          color="info"
          :icon="mdiPlusBox"
          small
          class="mr-1"
          
           @click="onShowMobile(client.id,client.name)"
        />
     

          <span
            v-for="(contact,i) in client.mobile"
            :key="i"
          >
           <small
            class="text-gray-500 dark:text-gray-300"
          >
            <a
              class=""
              :href="'tel:' + contact.number"
              >{{ maskNumber(contact.number) }}</a
            > 
            &nbsp;
           </small>
          </span>
          
        </td>







         <td  data-label="Course-Mode of class-Agreed date"> 
          
      
          <span
            v-for="(course,i) in client.course_mode_date"
            :key="i"
          >
          <small
            class="text-gray-500 dark:text-gray-300 capitalize"
          >
            {{ course.name }} - {{ course.mode_class.name }} - {{ course.agreed_date }} <br>
          </small>
          </span>
          
        </td>

        <td  data-label="Call Record">   
             
                 <jb-button
          @click="onShowRecords(client.id, client.callrecord,client.callcount,client.name)"
          color="info"
          :icon="mdiMicrophone"
          :label="client.callcount"
          small
        />
    

       
                </td>



         <td  data-label="Email">   
          <jb-button
          class="mr-1"
          color="info"
          :icon="mdiPlusBox"
          small
        @click="onShowEmail(client.id,client.name)"
        />
          <span
          class="mr-1"
            v-for="(email,i) in client.email"
            :key="i"
          >
           <small
            class="text-gray-500 dark:text-gray-300"
          >
              <a
                class=""
                :href="'mailto:' + email.email"
                > {{email.email}}<jb-button
            color="warning"
            :icon="mdiEmail"
            small
          />
        </a
            >
           </small>
          </span>
          
        </td>

        <!-- <td  data-label="Call Count">   
             <jb-button
          
          color="info"
          :icon="mdiMicrophone"
          small
        />
          
        </td> -->

    <td  data-label="Status-comment" v-if="client.latestcallrecord != null"> 
 
       <small class="text-gray-500 dark:text-gray-300 font-semibold capitalize"   
      v-if="client.latestcallrecord.status[0]!= null"
       >
        <!-- v-for="(course,i) in client.latestcallrecord.status" :key="i" -->
        {{client.latestcallrecord.status[0].main_status_name}}
            - 
                {{client.latestcallrecord.status[0].comment }}
       </small>
        <small class="text-gray-500 dark:text-gray-300 font-semibold capitalize"   
      v-else
       >
       No Status
       </small>
    
    </td>
    <td  data-label="Status-comment" v-else> 
        <small class="text-gray-500 dark:text-gray-300 font-semibold">No status</small>
    </td>
  <td data-label="Actions">
          <small
            class="text-gray-500 dark:text-gray-300"
          >
       
          <jb-button
          label="Escalate"
          color="warning"
          small
          class="mr-1"
         @click="onShowEscalate(client.id,client.name)"
        />
        <jb-button
          label="Remove"
          color="danger"
          small
           @click="onShowRemovedd(client.id,client.name)"
        />
          
          </small>
        </td>
      <td data-label="Online">
          <small
            class="text-gray-500 dark:text-gray-300"
          
          >
          <jb-button
          label="Need Online"
          color="info"
          small
          class="mr-1"
          @click="onShowOnline(client.id,client.name,client.course_mode_date)"
        />
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

      <button @click="pageChange(currentPage=currentPage -1)"  :disabled="currentPage<=1" class="border-2 ml-2 p-1 ">Previous</button>
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

     <button @click="pageChange(currentPage=currentPage +1)" :disabled="currentPage>=numPages" class="border-2 ml-2 p-1 ">Next</button>
      <small>Page {{ currentPage }} of {{ numPages }}</small>
    </level>
  </div>
</template>
