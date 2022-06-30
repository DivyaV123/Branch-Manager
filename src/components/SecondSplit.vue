<script setup>
import { computed, onBeforeMount, reactive, ref  } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiEmailPlusOutline,mdiPound } from '@mdi/js'
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
 split:Array,
  title: {
    type: String,
    default: null
  },
  id: {
    type: Number,
  },
  bid:{
    type:Number,
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

const recs = computed(() => props.split);
console.log("recs",recs.value)

const itemsPaginated = computed(() => batchplan.not_started
)

const yettocall=recs.value.not_called;
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

let data=recs.value.counsvalue;
console.log("data in shared",data)

const form=reactive({
"bid" : recs.value.bid,
"shared" :couns,
}) 
console.log("form",form);

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
    console.log("counttt",counscount) 
  }

  if(totCount <= yettocall){
    let res=await rigid.postresplit({"bid":form.bid,"shared":counscount,"shared_by_manager":true})  
    totCount = 0
    shareddata=[];
    counscount=[];
    theme.pushMessage("Resplit")
    cancel()
  }
  else{
    totCount = 0
     shareddata=[];
    counscount=[];
    theme.pushMessage("count is exceeded")
    console.log("totCount elseweeee",totCount) 
  }
}


const cancel = () => {
confirmCancel('cancel') 
  totCount = 0
     shareddata=[];
    counscount=[]; 
  
}







</script>

<template>
  <overlay
  >
    <card-component
       :title="`Resplit data  `"
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >
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
       <field  horizontal  label="Counselor count" >
          <control
          :icon-left="mdiPound"
          v-model="counselor.count"
      type=number
          min="0"
         class="ml-[100px]"
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

