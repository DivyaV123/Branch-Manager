<script setup>
import { computed, reactive, ref ,onBeforeMount } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import {summaryStore} from '../stores/summary'
import Control from "@/components/Control.vue";
import Multiselect from "@vueform/multiselect";
import {selectClasses} from "../selectcss"
import { themeStore } from "../stores/theme"
import { sessionStore } from '../stores/session'
const theme = themeStore();
const summary = summaryStore();
const user = sessionStore()
const props = defineProps({
  removedd:Array,
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
    default: 'Remove'
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

const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')

const recs = computed(() => props.removedd);

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
  reason:null,
  comment:'',
 
})
const getRemove = computed( () => {
  return summary.remove;
});

onBeforeMount(async() => {
   await user.checkUser();
     summary.getRemove(); 
  
});


// const disabledDate1=((date)=> {
//       const today = new Date();
//       return date > new Date(today.getFullYear(), today.getMonth()-3, today.getDate());
// }),

const confirm = async() => {
    if(formState.reason  == null)
  { 
      hasError.value = true; 
  }
  else {
    if (user.loggedIn) {  
     try {
        await summary.getRemovedd({"id": formState.id,
    "reason": {
             "id": formState.reason
    },
    "comment": formState.comment});
  theme.pushMessage("Enquiry has been removed with Approval pending");
  cancel();
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
      :title="`Remove ${recs.name}`"
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake,cardClassAddon }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <div class="pl-4">
         
 

      <card-component  grouped  
          class="max-h-modal"
          >
          <div class="grid grid-cols-1 gap-6  xl:grid-cols-1">
     <field help="Remove Reason" :error="hasError" > 
        <Multiselect
                 class="border border-success "
            v-model="formState.reason"
            :options="getRemove"
            :error="hasError"
             placeholder="Select Reason"
            label="name"
            searchable
            trackBy="name"
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
              color="danger"
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
