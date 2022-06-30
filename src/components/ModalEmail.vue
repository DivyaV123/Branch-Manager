<script setup>
import { computed, reactive, ref  } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiEmailPlusOutline } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import {summaryStore} from '../stores/summary'
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme";
const theme = themeStore();
const summary = summaryStore();



const props = defineProps({
  email:Array,
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

const recs = computed(() => props.email);

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

// const formState= reactive({
//   id:props.id,
//   contact: contact

// })
// const confirm = async() => {
//   formState.contact = contact
//   let valid = true
//   let formValues = JSON.parse(JSON.stringify(formState))
//   for (const key in formValues) {
//     if(key === 'contact'){
//      formValues[key].forEach(element => {
//        if(element.number.length != 10 || isNaN(element.number)){
//          valid = false
//          theme.pushMessage("Contact number with valid number is required!")
//        }
//      });
//    } 
//    }
//    if(valid === true){
//    let response = await summary.getContact(formValues)
//    theme.pushMessage("Contact Created Succesfully")
//    confirmCancel('confirm')
//    }
//    else{
//   theme.pushMessage("Form Error, please fill out mandatory fields")   
//    }

// }
const emails = ref([{ email: "" }]);

const addEmail = () => {
  emails.value.push({ email: "" });
};

const formState= reactive({
  id:recs.value.id,
  emailId: emails

})
  
const confirm = async() => {
  let valid=true
  formState.emailId = emails
  let formValues = JSON.parse(JSON.stringify(formState))


   for (let i=0;i <formState.emailId.length;i++) {
 if(emails.value[i].email==""){
    theme.pushMessage("Add Email details!")
  }
 
else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emails.value[i].email)))
  {
    hasError.value=true
    valid=false
    theme.pushMessage("Add valid email!")
   
  }
    
   }
 

   if(valid){
      for (let i=0;i <formState.emailId.length;i++){
   let response = await summary.getEmail( {"id":formValues.id,
    "email":[
      {
        "email_id":formValues.emailId[i].email 
        
      }]})
    theme.pushMessage("EmailId added successfully") 
    location.reload()  
       confirmCancel('confirm')
   }
   }
   else{
  theme.pushMessage("Form Error, please fill out mandatory fields")   
   }
  }




const cancel = () => {
  confirmCancel('cancel')
  location.reload()
  }

const hasError=ref(false)
const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')
const click=()=>[
  hasError.value=false
]
</script>

<template>
  <overlay
  >
    <card-component
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
     :class="[cardClassAddon]"
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >
      <div class="pl-4 space-y-3">
        <card-component>
        <field grouped>
        <control
        v-for="(con, i) in emails"
        :key="i"
          v-model="con.email"
          help="Email"
          placeholder="Email"
          :error="hasError"
          @click="click"
        />
        <jb-button color="info" :icon="mdiPlusBox" @click="addEmail"  small />
        <jb-button
        v-if="emails.length > 1"
          color="danger"
          :icon="mdiMinusBox"
          @click="removeEmail"
          small
        />
      </field>
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