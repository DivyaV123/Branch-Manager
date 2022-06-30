<script setup>
import { computed, reactive, ref,onBeforeMount  } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import {summaryStore} from '../stores/summary'
import { batchplanStore } from "../stores/batchplan1";
import { sessionStore } from '../stores/session'
import Control from "@/components/Control.vue";
import Multiselect from "@vueform/multiselect";
import {selectClasses} from "../selectcss"
import { themeStore } from "../stores/theme"
// const counselor = counselorStore();
const theme = themeStore();
const user = sessionStore()
const summary = summaryStore();
const batchplan = batchplanStore();
const props = defineProps({
  escalate:Array,
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
    default: 'Escalate'
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
const recs = computed(() => props.escalate);



const hasError = ref(false)
const hasError2 = ref(false)
const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')
const cardClassAddon2 = computed(() => hasError2.value ? 'animate-shake' : '')


const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}

const formState= reactive({
  id:recs.value.id,
  reason:{id:null},
  to:{id:null},
  comment:'',
})

  const getBatchtype = computed( () => {
  return summary.escalation_reason;
  });

  const getCourse = computed( () => {
  return batchplan.course.branch;
  });


onBeforeMount(async() => {
   await user.checkUser();
     summary.getEscalationReason(); 
    batchplan.getCourses();
})

const confirm = async() => {
    if(formState.reason.id  == null)
  { 
      hasError.value = true; 
  }
 else if(formState.to.id == null ){
     
    hasError2.value = true; 
  }
  else {
    if (user.loggedIn) {  
    try {
        await summary.getEsculate(formState);
        theme.pushMessage("Escalated Succesfully");
        cancel();
        if (summary.$state.error){
        theme.pushMessage(summary.$state.error);}
        await summary.removeError()
        }
      catch (error) {
      theme.pushMessage(error)
    }
    }

  }}

const cancel = () => confirmCancel('cancel')
</script>

<template>
  <overlay
    v-show="value"
   
  >
    <card-component
      v-show="value"
       :title="`Escalate ${recs.name}`"
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <div class="pl-4">
         
 

      <card-component  grouped  
          class="max-h-modal"
            :class="{ 'animate-shake': shake }"
          >
          <div class="grid grid-cols-1 gap-6  xl:grid-cols-1">
     <field help="Esculate Reason"  :error="hasError"> 
         <Multiselect
                 class="border border-success "
            v-model="formState.reason.id"
            :options="getBatchtype"
             placeholder="Select Batchcode"
            label="name"
            searchable
            trackBy="name"
            valueProp="name"
            :classes="selectClasses"
            
          />
      </field>
      <field help="Escalation To"  :error="hasError2" v-for="(counselor,index1) in getCourse" :key="index1"> 
    <Multiselect
                 class="border border-success "
            v-model="formState.to.id"
            :options="counselor.counselor"
             placeholder="Select Batchcode"
            label="username"
            searchable
            trackBy="username"
            valueProp="id"
            :classes="selectClasses"  
          />
      </field>
      <field > 
        <control
          type="textarea"
        placeholder="Comments"
        v-model="formState.comment"
          />
      </field>
    
              </div>
      
        </card-component>
         

        </div>



         
 

         <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              :label="buttonLabel"
              :color="button"
              @click="confirm"
            />
            <jb-button
             
              label="Cancel"
              :color="button"
              outline
              @click="cancel"
            />
             <!-- v-if="hasCancel" -->
          </jb-buttons>

          <text-link
            :label="textLinkLabel"
            :icon="textLinkIcon"
          />
        </level>
      </template> 
     </card-component>
  </overlay>
</template>
