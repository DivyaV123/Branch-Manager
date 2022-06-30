<script setup>
import { computed, reactive, ref  } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import {summaryStore} from '../stores/summary'
// import TitleSubBar from "@/components/TitleSubBar.vue";
// import { counselorStore } from "../stores/counselor";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme"
const summary = summaryStore();
const theme = themeStore();

const props = defineProps({
  mobile:Array,
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
const contact = ref([{ number: "" }]);

const addContact = () => {
  contact.value.push({ number: "" });
};
const removeContact = () => {
  contact.value.pop();
};
const recs = computed(() => props.mobile);


const formState= reactive({
  id:recs.value.id,
  contact: contact

})

const confirm = async() => {
  formState.contact = contact
  let valid = true
  let formValues = JSON.parse(JSON.stringify(formState))
  for (const key in formValues) {
    if(key === 'contact'){
     formValues[key].forEach(element => {
       if(element.number.length != 10 || isNaN(element.number)){
         valid = false
         theme.pushMessage("Contact number with valid number is required!")
       }
     });
   } 
   }
   if(valid === true){
   let response = await summary.getContact(formValues)
   theme.pushMessage("Contact Created Succesfully")
   location.reload()
   confirmCancel('confirm')
   }
   else{
  theme.pushMessage("Form Error, please fill out mandatory fields")   
   }

}

const cancel = () => confirmCancel('cancel')
</script>

<template>
  <overlay
    v-show="value"

  >
    <card-component
      v-show="value"
      :title="`Add course details ${recs.name}`"
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <div class="pl-4 space-y-3">
        <card-component>
        <field grouped>
        <control
          v-for="(con, i) in contact"
          :key="i"
          v-model="con.number"
          :icon-left="mdiPhone"
          help="Mobile"
          placeholder="Mobile"
          :error="con.number.length >= 10 && !isNaN(con.number) ? false : 'Mobile number is not valid'"
        />
        <jb-button color="info" :icon="mdiPlusBox" @click="addContact" small />
        <jb-button
          v-if="contact.length > 1"
          color="danger"
          :icon="mdiMinusBox"
          @click="removeContact"
          small
        />
      </field>
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
