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
  resplit:Array,
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

const recs = computed(() => props.resplit);
console.log("recs",recs)

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


const manager=computed(()=>{
   return rigid.managercounselor  
})

console.log("manafer",manager.value);
//  watch(counselor, (currentValue, oldValue) => {
//   console.log("inside watch")
//     console.log("currentValue",currentValue);
//     console.log("oldValue",oldValue);
//     if(currentValue){
//       couns.value=currentValue
//     }
//   });



 
const currentPage = ref(1)
const hasError = ref(false)
const hasError1 = ref(false)
const isModalActive = ref(false)
const cardClassAddon = computed(() => hasError.value || hasError1.value ? 'animate-shake' : '')


 
const formState= reactive({
"id":recs.value.id,
"tentative_start":null
})

const resplitdata=computed(()=>{
  return rigid.resplit
})
console.log("resplit",resplitdata)








const split =Array({id:null,not_called:null,bid:recs.value.id,counsvalue:""})


const onResplitid =async (id,not_called,counsvalue) => {
    split.id = id;
    split.not_called=not_called;
    split.counsvalue=counsvalue;
    split.bid=recs.value.id;
      isModalActive.value = true;  
      console.log("split",split.counsvalue); 
    await rigid.getsharecounsellor({bid:formState.id,counid:id});


  let something = JSON.parse(JSON.stringify(manager.value.counselors));
  let cns = []
  cns = something
  console.log("cns===",cns);
  if(cns.length > 0){
    for(var p = 0; p < cns.length; p++){
      console.log("cns username",cns[p].username);
      couns.value.push({name:cns[p].username, count:0,id:cns[p].id})  
       console.log("coubns",couns);
    }
  } 

  couns.value=[];
//   else{
//  couns=[];
//   }

 
};


// const form=reactive({
// "bid" : recs.value.id,
// "shared" :couns,
// }) 
// console.log("form",form);


// let totCount = 0;
// let shareddata=[];
// let counscount=[];
 
// const submit = async() => {
//   for (let i = 0; i < couns.value.length ; i++) {
//     console.log("counselor name",couns.value);
//     let shared = {"name":couns.value[i].id, "count":couns.value[i].count}
//     totCount += parseInt(couns.value[i].count);
//     shareddata.push(shared)
//     console.log("shareddataa",shareddata[i].count);
//     if(couns.value[i].count!=0){
//   counscount.push({"name":couns.value[i].id, "count":couns.value[i].count})
//     }
//   }
// console.log("counttt",counscount)
//   if(totCount == split.not_called){
//      let res=await rigid.postresplit({"bid":form.bid,"shared":counscount,"shared_by_manager":true})  
//      totCount = 0
//     counscount=[];  
// theme.pushMessage("Resplit")
//  rigid.getlist(currentPage.value ); 
//   // confirmCancel('splitCancel')
//   // location.reload()
//   }
//   else{
//         totCount = 0
//     counscount=[];
//     theme.pushMessage("count is exceeded")
//      rigid.getlist(currentPage.value ); 
//   }
// } 


const cancel = () => {
  confirmCancel('cancel')
  //  location.reload()
  }


onBeforeMount(async () => {
    // await rigid.getsharecounsellor();
  await rigid.getresplit(formState); 
   
})
const itemsPaginated = computed(() => rigid.days
)  

</script>



       
  
   

   
 







<template>
  <overlay
  >

    <card-component
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >
     
  <table>
    
    <thead>
      <tr>
       <th>Counselor Name</th>
      <th>Yet to call</th>
      <th> Total called</th>
      <th> Resplit</th>
      </tr>
      
    </thead>
    <tbody>

      <tr
        v-for="(client, index) in resplitdata"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >

          <td > 
            {{client.author}}  
        </td>
    <td>
      {{client.not_called}} 
   </td>
    <td>
       {{client.called}} 
   </td>

    <td  v-if="client.not_called>0">  
   <jb-button
              color="info"
              label="Resplit"
             @click="onResplitid(client.author_id,client.not_called,couns)" 
            />
   </td>
   <td  v-else>
   <jb-button
              color="danger"
              label="Resplit"
              outline
              class="cursor-not-allowed"
            />
   </td>

      
      </tr>
    </tbody>
  </table>
      <template #footer>
        <level mobile>
          <jb-buttons>
            <!-- <jb-button
              label="Confirm"
              color="info"
              @click="cancel"
            /> -->
            <jb-button
              label="Cancel"
              color="white"
              outline
              @click="cancel"
            />
          </jb-buttons>

          <text-link

          />
        </level>
      </template>

       </card-component>
  </overlay>

    

  <second-split :split="split" v-model="isModalActive" v-if="isModalActive==true" />

</template>

