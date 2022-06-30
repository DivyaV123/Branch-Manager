<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { mdiAccount, mdiEyeOff } from '@mdi/js'
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

const router = useRouter();
const user = sessionStore();
const theme = themeStore();


const form = reactive({
  username: '',
  password: '',
})

const hasError = ref(false)
const hasError2 = ref(false)
const hasError3 = ref(false)
const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')
const cardClassAddon2 = computed(() => hasError2.value ? 'animate-shake' : '')
const cardClassAddon3 = computed(() => hasError3.value ? 'animate-shake' : '')

const email =(value) =>{
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
  {
      return form.username;
  }
  console.log(form.username);
}

const submit = async () => {
  if(form.username === ""||email(form.username)=== undefined)
  {
    hasError.value = true
    theme.pushMessage("Invalid Email");
  }
  else if(form.password === ""){
    hasError2.value = true
    theme.pushMessage("Password cannot be empty");
  }
  else{
    await user.login({ username:email(form.username), password: form.password });
   
    if (user.loggedIn) {
      theme.pushMessage("Logged In successfully");
      router.push("/batchplan");
    }
    else{
       theme.pushMessage(user.loginError)
    }
  }
}
const passShowHideClicked = ref(true)
onBeforeMount(() => {
  if (user.loggedIn) {
    router.push("/batchplan");
  }
});
</script>

<template>
  <form-screen-section v-slot="{ cardClass, cardRounded }" bg="login" promo>
    <card-component
      :class="[cardClass, cardClassAddon,cardClassAddon2,cardClassAddon3]"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <field label="Login" :error="hasError" help="Please enter your Email">
        <control
          v-model="form.username"
          :error="hasError"
          :icon-right="mdiAccount"
          name="login"
          placeholder="user@example.com"
          autocomplete="username"
           pattern="\[a-z]+@qsp.com\"
          
        />
      </field>

      <field label="Password" :error="hasError2" help="Click icon to show/hide">
        <control
          v-model="form.password"
          :error="hasError2"
          :tip-right="passShowHideClicked ? null : 'Click to show/hide'"
          :icon-right="mdiEyeOff"
          type="password"
          name="password"
          placeholder="Password"
          autocomplete="current-password"
          @right-icon-click="passShowHideClicked = true"
        />
      </field>

      <level mobile>
        <router-link to="/" class="text-sm">Forgot password?</router-link>
      </level>

      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="Login"
              type="submit"
              color="info"
            />
     
          </jb-buttons>
        </level>
      </template>
    </card-component>
  </form-screen-section>
</template>
