<script setup>
import { computed, reactive, ref } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import TitleSubBar from "@/components/TitleSubBar.vue";
import { counselorStore } from "../stores/counselor";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme"
import dayjs from "dayjs";
import {summaryStore} from '../stores/summary'

const summary = summaryStore();
const theme = themeStore();


const props = defineProps({
  online:Array,
  title: {
    type: String,
    default: null
  },
  sid: {
    type: Number,
    default: 0
  },
  id: {
    type: Number,
  },
  courses: {
    type: Array,
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

const recs = computed(() => props.online);
console.log("recs",recs.value.courses);
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}

const formState = reactive({
//  id:recs.value.id,
  course: null,
  agreed_date: '',
sid:0

})

const todayDate = () => {
  return dayjs().format("YYYY-MM-DD");
};

const confirm = async () => {
  let valid = true
  let formValues = JSON.parse(JSON.stringify(formState))
  for (const key in formValues) {
    if (key === 'course' && formValues[key] === null) {
      valid = false
      theme.pushMessage("Course is required!")
    }
    if (key === 'agreed_date' && formValues[key].length === 0) {
      valid = false
      theme.pushMessage("Agree date is required!")
    }
    if (key === 'agreed_date' && formValues[key].length !== null) {
      const today = dayjs(new Date());
      const ag = dayjs(formValues[key]);
      if (ag.isBefore(today)) {
        valid = false;
        theme.pushMessage(
          "Agreed date should be greater than today!"
        );
      }
    }
  }
  if (valid) {
    formValues.id = props.online.id
    formValues.sid = props.sid
    //     for(let i=0;i<props.online.courses.length;i++){
    // formValues.course=props.online.courses[i].enquiry
    //     }
    console.log(formValues)
    let response = await summary.getOnline(formValues)
    confirmCancel('confirm')
  }
  else {
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
      :title="`Move course to online for ${recs.name}`"
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake ,cardClassAddon,cardClassAddon2}"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
<!-- <template>
  <overlay v-show="value" @overlay-click="cancel">
    <card-component v-show="value" :title="NeedOnline" class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake }" :header-icon="mdiClose" modal @header-icon-click="cancel"> -->
      <div class="pl-4 space-y-3">
        <card-component>
          <field>
            <control v-model="formState.course" :options="props.online.courses" help="Course"
              :error="formState.course !== null ? false : 'Course'"  value="name" />
          </field>

          <field>
            <control :error="formState.agreed_date.length > 0 ? false : true" v-model="formState.agreed_date"
              type="date" help="Agreed date" :minDate="todayDate()" />
          </field>
        </card-component>
      </div>

      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button :label="buttonLabel" :color="button" @click="confirm" />
            <jb-button
             
              label="Cancel"
              :color="button"
              outline
              @click="cancel"
            />
            <!-- <jb-button v-if="hasCancel" label="Cancel" :color="button" outline @click="cancel" /> -->
          </jb-buttons>

          <text-link :label="textLinkLabel" :icon="textLinkIcon" />
        </level>
      </template>
    </card-component>
  </overlay>
</template>