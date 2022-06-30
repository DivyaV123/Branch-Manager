
<template>
  <overlay
  >
    <card-component
          :title="`Cancel ${recs.name}`"
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >
      <div class="pl-4 space-y-3">
        <card-component>
     <div class="grid grid-cols-1 gap-5  xl:grid-cols-1">
     <field help="Remove Reason" label="Remove Reason" :error="hasError" > 
         
      <Multiselect
          class="border border-success"
            v-model="formState.reason"
            :options="remove"
       
            placeholder="select reasons here"
            name="remove"
            label="name"
            valueProp="id"
            searchable
            trackBy="name"
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
              label="Confirm"
              color="info"
              @click="confirm"
            />
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
</template>


<script setup>
import { computed, onBeforeMount, reactive, ref  } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiEmailPlusOutline } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import { rigidStore } from "../stores/rigid";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme";
import dayjs from 'dayjs';
import Multiselect from "@vueform/multiselect";
import {selectClasses} from "../selectcss"
const theme = themeStore();

const rigid = rigidStore();


const props = defineProps({
  cancel:Array,
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


const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}

const removeEmail = () => {
    emails.value.pop();
 };

const recs = computed(() => props.cancel);
console.log("recs",recs)


const formState= reactive({
  id:recs.value.id,
  reason:null,
  comment:'',
 
})

console.log("fromstate regcode",formState.id)


  
const confirm = async() => {
 let response = await rigid.postcancelldata({"id": formState.id,
    "reason": {
             "id": formState.reason
    },
    "comment": formState.comment})
   if(rigid.$state.error){
  theme.pushMessage(rigid.$state.error);
    }
else{
theme.pushMessage("cancelled batchplan sucessfully")
cancel()
}
}


const remove=computed(()=>{
  return rigid.removereason
})
console.log("reasons",remove)

onBeforeMount(async () => {
   rigid.getremove();   
})




const cancel = () => {
  confirmCancel('cancel')
  location.reload()
  }
</script>
