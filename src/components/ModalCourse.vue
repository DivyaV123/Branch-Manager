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
import { rigidStore } from "../stores/rigid";
// import TitleSubBar from "@/components/TitleSubBar.vue";
// import { counselorStore } from "../stores/counselor";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme"
// const counselor = counselorStore();
const theme = themeStore();

const rigid = rigidStore();
const props = defineProps({
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

const date = ref('');
const customElementsForm = reactive({
   radio: ["60% or Greater than 60%","Less than 60%"]
   
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

const formState= reactive({
  id:props.id,
  contact: contact

})


const format = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
}

const confirm = async() => {
  formState.contact = contact
  let valid = true
  let formValues = JSON.parse(JSON.stringify(formState))
  for (const key in formValues) {
    if(key === 'contact'){
     formValues[key].forEach(element => {
       if(element.number < 10 || isNaN(element.number)){
         valid= false
         theme.pushMessage("Contact number with valid number is required!")
       }
     });
   } 
   }
   if(valid){
   let response = await counselor.submitContact(formValues)
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
      <div class="pl-4">
          <h2>Regular Course</h2>
 

      <card-component  grouped  v-for="(con, i) in contact"
          :key="i"
          class="max-h-modal"
          >
          <div class="grid grid-cols-4 gap-6  xl:grid-cols-4 ">
     <field help="Select Course" > 
        <v-select
            class="border border-success"
            :reduce="(name) => name.id"
            name="moc"
            label="name"
        ></v-select>
      </field>
      <field help="Mode of class" > 
        <v-select
            class="border border-success"
            :reduce="(name) => name.id"
            
            name="moc"
            label="name"
        ></v-select>
      </field>
      <field help="Select Branch(es)" > 
        <v-select
            class="border border-success"
            :reduce="(name) => name.id"
            name="moc"
            label="name"
        ></v-select>
      </field>
       
      <field help="Agreed date" > 
           <input type=date v-model="date"   placeholder="dd-mm-yy" required :minDate="new Date()" :format="format" dark/>
      </field>
       
              </div>
      
        </card-component>
           <jb-button color="info" :icon="mdiPlusBox" @click="addContact" small  label="Add regular course"/>
        <jb-button
          v-if="contact.length > 1"
          color="danger"
          :icon="mdiMinusBox"
          @click="removeContact"
          small
        label="Remove regular course"

        />

        </div>


        <!--Special course  -->
          
         
      <h2 class="pl-4 mt-10">Special Course</h2>
      <card-component  grouped  v-for="(con, i) in contact"
      
          :key="i">
         
 
          <div class="grid grid-cols-4 gap-6  xl:grid-cols-4 ">
     <field help="Course Name" > 
       <control
        placeholder="Course Name"
          />
      </field>
      <field help="Mode of class" > 
        <v-select
            class="border border-success"
            :reduce="(name) => name.id"
            
            name="moc"
            label="name"
        ></v-select>
      </field>
      <field help="Select Branch(es)" > 
        <v-select
            class="border border-success"
            :reduce="(name) => name.id"
            name="moc"
            label="name"
        ></v-select>
      </field>
       
      <field help="Agreed date" > 
           <input type=date v-model="date"   placeholder="dd-mm-yy" required :minDate="new Date()" :format="format" dark/>
      </field>
       
              </div>
      
        </card-component>
           <jb-button color="info" :icon="mdiPlusBox" @click="addContact" small  label="Add special course"/>
        <jb-button
          v-if="contact.length > 1"
          color="danger"
          :icon="mdiMinusBox"
          @click="removeContact"
          small
        label="Remove special course"
        />




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
