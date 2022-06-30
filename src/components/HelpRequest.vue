<script setup>
import { computed, onBeforeMount, reactive, ref  } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiEmailPlusOutline ,mdiPound, mdiUsbFlashDrive} from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import ModalBox from '@/components/ModalBox.vue'
import { rigidStore } from "../stores/rigid";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme";
import dayjs from 'dayjs';
import { current } from 'tailwindcss/colors'
const theme = themeStore();

const rigid = rigidStore();


const props = defineProps({
  help:Array,
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
const hasError = ref(false)


const recs = computed(() => props.help);
console.log("recs",recs.value.id)

const isModalActive2=ref(false)
const isModalActive=ref(false)
const showreject = ref(true)
const showaccept = ref(true)
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
const cancel = async() => {
  confirmCancel('cancel')
  location.reload()
 }

const acceptcancel =async()=>{
confirmCancel('cancel')
  // location.reload()
}

const form={
comment:"",
}

const confirm =async() =>{
   for(let i=0;i<hrfoc.value.length;i++){
  await rigid.getaccept({id:hrfoc.value[i].id,type:"accepted",comment:form.comment})
  theme.pushMessage("share data succesfully")
acceptcancel()
  }
}

const Rejectcancel=async()=>{
   for(let i=0;i<hrfoc.value.length;i++){
    await rigid.getreject({id:hrfoc.value[i].id,type:"rejected",comment:form.comment})
    theme.pushMessage("Reject  data succesfully")
   cancel()
  } 
}

const hrfoc=computed(()=>{
   return rigid.hrfoc  
})

onBeforeMount(async (page) => {
  await rigid.gethrfoc(recs.value.id)    
})

</script>

<template>
  
 <overlay>
    <card-component
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
       title="Help Request data" 
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >
      <div class="pl-5 space-y-6">


     <field  label="Counselor name" horizontal  v-for="(client, index) in hrfoc" :key="index"  > 
   
            <h1 class=" border-1 dark:bg-gray-800 rounded  text-white text-lg cursor-not-allowed text-center w-[180px] h-[40px] ml-[-68px] ">{{client.author}}</h1> 
       <field    label="Counselor count" horizontal   >
          <h1
           class="w-[100px] ml-[70px] cursor-not-allowed text-center border-1 dark:bg-gray-800 rounded  text-white text-lg  "
          >
          {{client.count}}
          </h1>
          </field>


<div v-if="client.status=1">
       <jb-button
    label="Accept"
      color="info"
        class="ml-[150px] w-[70px] h-[30px]"
       @click="isModalActive2=true" />

       <jb-button
       label="Reject"
       color="danger"
      class="ml-[150px] w-[70px] h-[30px]"
       @click="isModalActive=true"/>
 
</div>
  <div v-else-if="client.status=2">
   <jb-button
    label="Accepted"
    color="info"
    class="ml-[150px] w-[70px] h-[30px]"
 />
 </div>

   <div v-else-if="client.status=3">
   <jb-button
    label="Rejected"
    color="danger"
    class="ml-[150px] w-[70px] h-[30px]"
 />
 </div>

<div v-else-if="client.status=4">
   <jb-button
    label="Accepted and moved"
    color="success"
    class="ml-[150px] w-[70px] h-[30px]"
 />
 </div>



      <div v-else>
<h1 class="ml-[100px]">no enq left for split</h1>
         </div>
 </field>


      </div>
    </card-component>
  </overlay>

  
  <modal-box
      v-model="isModalActive"
      >
     <overlay>
        <card-component
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
       title="Reject data" 
      :header-icon="mdiClose"
      @header-icon-click="acceptcancel"
    >
      <div class="pl-5 space-y-6">

 <field label="Reject Reason"> 
        <control
          type="textarea"
        placeholder="Comments"
        v-model="form.comment"
          />
      </field>
</div>
      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="save"
              color="info"
              @click="Rejectcancel"
            />
          
            <jb-button
              label="Cancel"
              :color="danger"
              outline
             @click="acceptcancel"
            />
          </jb-buttons>

          <text-link
            :label="textLinkLabel"
            :icon="textLinkIcon"
          />
        </level>
      </template> 
  
    </card-component>
  </overlay>
  
  </modal-box>



  <modal-box
      v-model="isModalActive2">
     <overlay>
        <card-component
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
       title="Accept data" 
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >
      <div class="pl-5 space-y-6">

 <field label="Accept Reason"> 
        <control
          type="textarea"
        placeholder="Comments"
        v-model="form.comment"
          />
      </field>
</div>
      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="save"
              color="info"
              @click="confirm"
            />
          
            <jb-button
              label="Cancel"
              :color="danger"
              outline
             @click="cancel"
            />
          </jb-buttons>

          <text-link
            :label="textLinkLabel"
            :icon="textLinkIcon"
          />
        </level>
      </template> 
  
    </card-component>
  </overlay>
  
  </modal-box>


</template>