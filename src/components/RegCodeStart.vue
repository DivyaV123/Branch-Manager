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
const theme = themeStore();

const rigid = rigidStore();


const props = defineProps({
  regcode:Array,
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
const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')
const recs = computed(() => props.regcode);

const formState= reactive({
"id":recs.value.id,
"tentative_start":null
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
 
  
const confirm = async() => {
   if(formState.tentative_start == "" ){
      hasError.value = true; 
  }
    
let response = await rigid.putregcode({formState})
 if(formState.tentative_start===null){
  theme.pushMessage("date field is required");
   }
else{
theme.pushMessage("Regcode raised Succesfully")
location.reload();
confirmCancel('confirm')
 }
}
  

const cancel = () => {
  confirmCancel('cancel')
  location.reload()
  }
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
       <field label="Tentative date " vertical help="This field is required"  :error="hasError"> 
     
            <input type="date" v-model="formState.tentative_start " 
            :min="dayjs(new Date).format('YYYY-MM-DD')" 
            class="bg-gray-700 border border-white py-1"
            style="width:220px"
          >
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