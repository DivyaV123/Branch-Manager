<script setup>
import { computed, onBeforeMount, reactive, ref  } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiEmailPlusOutline ,mdiPound} from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import { rigidStore } from "../stores/rigid";
import { batchplanStore } from "../stores/batchplan1";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme";
import Multiselect from "@vueform/multiselect";
import {selectClasses} from "../selectcss";
import dayjs from 'dayjs';
const theme = themeStore();

const rigid = rigidStore();
const batchplan = batchplanStore();

const props = defineProps({
 share:Array,
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

const couns=ref([{
  name:"", 
  count:0
}])

const recs = computed(() => props.share);
console.log("recs",recs.value)
const name1=recs.value.var;
const counselor=computed(()=>{
   return rigid.counselor  
})


const itemsPaginated = computed(() => batchplan.not_started
)


const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])
const currentPage = ref(1)
const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}


let data=recs.value.value;


const form=reactive({
 Fid : recs.value.id,
shared :data,

}) 

let totCount = 0;
let shareddata=[];
let counscount=[];

const submit = async() => {
  for (let i = 0; i < data.length ; i++) {
    let shared = {"name":data[i].id, "count":data[i].count}
    totCount += parseInt(data[i].count);
    shareddata.push(shared)
    if(data[i].count!=0){
  counscount.push({"name":data[i].id, "count":data[i].count})
    }
  }
if(recs.value.sharemyenq===true){
  if(totCount <= counselor.value.my_enq){
    console.log(counselor.value.my_enq);
    await rigid.postresplit({"fid":form.Fid,"shared":counscount,"share_my_enq":true}) 
    theme.pushMessage("shared data successfully")
           totCount = 0
    shareddata=[];
    counscount=[];
    cancel()

    
  }
  else{
    theme.pushMessage("count is exceeded")
           totCount = 0
    shareddata=[];
    counscount=[];
    

  }
}else{
    if(totCount <= counselor.value.other_enq){
    console.log(counselor.value.my_enq);
    await rigid.postresplit({"fid":form.Fid,"shared":counscount,"share_my_enq":true}) 
    theme.pushMessage("Reassign data successfully")
           totCount = 0
    shareddata=[];
    counscount=[];
    cancel()

   
  }
  else{
    theme.pushMessage("count is exceeded")
           totCount = 0
    shareddata=[];
    counscount=[];
    

  }
}
  
}


const cancel = () => {
  confirmCancel('cancel')
  location.reload()
}


onBeforeMount(async (page) => {
await rigid.getsharecounsellor1(form.Fid);
await batchplan.getnotstarted()

})


</script>

<template>
  <overlay
  >
    <card-component
    v-for="(counselor, index) in  data" :key="index"
       :title="` Share Data`" 
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >

 <div v-if="counselor.myenq">you can share only ===  {{counselor.myenq}} data</div>
 <div v-else>you can share only ===  {{counselor.other}} data</div>
 
      <div class="pl-4 space-y-3" >
        <card-component>

            <field  label="Counselor name" horizontal  v-for="(counselor, index) in  data" :key="index" > 
            <h1 class=" border-1 dark:bg-gray-800 rounded  text-white text-lg cursor-not-allowed text-center w-[230px]">{{counselor.name}}</h1> 
        <!-- <control
          :icon-left="mdiAccount"
          v-model="counselor.name"
          :label="counselor.name"
          class="cursor-not-allowed"
         
         /> -->
       <field  horizontal  label="Counselor count" class="ml-[153px]"  >
          <control
          :icon-left="mdiPound"
          v-model="counselor.count"
          type=number
          min="0"
         class=" ml-[100px] w-[100px] mt-[-40px]"
          />
          </field>
        
 </field>
        </card-component>
      </div>

      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="Save"
              color="info"
              @click="submit"
            />
            
          </jb-buttons>

          <text-link

          />
        </level>
      </template>
    </card-component>
  </overlay>
</template>

