<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { mdiAccount, mdiEyeOff ,mdiClose} from '@mdi/js'
import FormScreenSection from '@/components/FormScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import TextLink from '@/components/TextLink.vue'
import { sessionStore } from "../stores/session";
import { useRouter } from "vue-router";
import { themeStore } from "../stores/theme"
import { batchplanStore } from "../stores/batchplan1";
const router = useRouter();
const user = sessionStore();
const theme = themeStore();
const batchplan = batchplanStore();

const form = reactive({
  old_password: '',
  new_password: '',
  confirmed:"",
})


const hasError = ref(false)
const hasError2 = ref(false)
const hasError3 = ref(false)
const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')

const change = () => {
  hasError.value = false
  hasError2.value = false,
  hasError3.value = false 
}

const pass =(value) =>{ 
    
      if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value))
        {
            return  form.new_password;
        } 
    }

const submit = async () => {
  try{
    if(form.old_password===""){
      theme.pushMessage("Add Old Password")
      hasError.value = true
    }
    else if(form.new_password==="")
    {
      theme.pushMessage("Add New Password")
      hasError2.value = true
    }
    else if(form.new_password !=pass(form.new_password))
    {
      theme.pushMessage("Add Valid Password")
    }
    else if(form.confirmed==="")
    {
      theme.pushMessage("Add Confirm Password")
      hasError3.value = true
    }
    else if(form.new_password!=form.confirmed)
      {
        theme.pushMessage("Both Password and Confirm Password should be identical");
      }
      else{
          await batchplan.changepassword({"old_password":form.old_password,"new_password":form.new_password,"confirmed_password":form.confirmed})
          if(batchplan.$state.change_pass.message==="Password has been changed successfully."){ 
            theme.pushMessage("Password has been changed successfully");
            form.old_password=""
            form.new_password=""
            form.confirmed=""
             router.push("/batchplan");
          }
          else{
            theme.pushMessage("Old Password is not  matching");
          }
        }
  }
    catch(err){
      theme.pushMessage("Old Password is not  matching");
    }
    
  
}
const passShowHideClicked = ref(true)
const cancel = () =>  router.push("/batchplan");
</script>

<template>
  <form-screen-section >
    <card-component
     title="Change Password"
       :class="[cardClassAddon]" form @submit.prevent="submit" 
         :rounded="cardRounded"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
      class="w-[500px]"
    >


      <field label="Old Password" :error="hasError" help="Click icon to show/hide">
        <control
        :error="hasError"
          :tip-right="passShowHideClicked ? null : 'Click to show/hide'"
          :icon-right="mdiEyeOff"
     v-model="form.old_password"
          type="password"
          name="password"
          placeholder="old Password"
             autocomplete="current-password"
          @right-icon-click="passShowHideClicked = true"
          @click="change"
        />
      </field>
      

            <field label="New Password" :error="hasError2" help="Click icon to show/hide">
        <control
        v-model="form.new_password"
          :error="hasError2"
          :tip-right="passShowHideClicked ? null : 'Click to show/hide'"
          :icon-right="mdiEyeOff"
          type="password"
          name="password"
          placeholder="new Password"
          autocomplete="current-password"
          @right-icon-click="passShowHideClicked = true"
           @click="change"
        />
      </field> 

        <field label="Confirm Password" :error="hasError3" help="Click icon to show/hide">
        <control
        v-model="form.confirmed"
          :error="hasError3"
          :tip-right="passShowHideClicked ? null : 'Click to show/hide'"
          :icon-right="mdiEyeOff"
          type="password"
          name="password"
          placeholder="confirm Password"
          autocomplete="current-password"
          @right-icon-click="passShowHideClicked = true"
           @click="change"
        />
      </field>
 

    
      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="Change Password"
              type="submit"
              color="info"
            />
     
          </jb-buttons>
        </level>
      </template>
    </card-component>
  </form-screen-section>
</template>
