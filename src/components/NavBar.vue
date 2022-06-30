<script setup>
import { computed, ref } from 'vue'
import {
  mdiForwardburger,
  mdiBackburger,
  mdiClose,
  mdiDotsVertical,
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiHelpCircleOutline,
  mdiBell,
  mdiThemeLightDark,
  mdiLock,
  mdiToggleSwitch
} from '@mdi/js'
import NavBarItem from '@/components/NavBarItem.vue'
import NavBarItemLabel from '@/components/NavBarItemLabel.vue'
import NavBarMenu from '@/components/NavBarMenu.vue'
import Divider from '@/components/Divider.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import Icon from '@/components/Icon.vue'
// import NavBarSearch from '@/components/NavBarSearch.vue'
import { themeStore } from "../stores/theme"
import { sessionStore } from "../stores/session";
import LogoutModal from '@/components/LogoutModal.vue'
const theme = themeStore();
const user = sessionStore();
const isAsideRightActive = computed(() => theme.isAsideRightActive)

const isNavBarVisible = computed(() => !theme.isFormScreen)

const isAsideMobileExpanded = computed(() => theme.isAsideMobileExpanded)

const isAsideCompact = computed(() => theme.isAsideCompact)

const isAsideHiddenLayout = computed(() => theme.isAsideHiddenLayout)

const isModalDangerActive = ref(false)


const pageTitle = computed(() => theme.pageTitle)

const userName = computed(() => {
  if(user.user)
  {
    return user.user.first_name+ '_' +user.user.last_name
  }
  
})

const menuToggleMobileIcon = computed(() => isAsideMobileExpanded.value ? mdiBackburger : mdiForwardburger)

const menuToggleMobile = () => theme.asideMobileToggle()

const menuToggleIcon = computed(() => {
  if (isAsideHiddenLayout.value) {
    return mdiMenu
  }

  return isAsideCompact.value ? mdiForwardburger : mdiBackburger
})

const menuToggle = () => {
  if(isAsideHiddenLayout.value){
    theme.asideVisibilityToggle()
  }
  else{
    theme.asideCompactToggle()
  }
  
  
}

const asideRightToggle = () => {
  updatesClicked.value = true
  theme.asideRightToggle()
}

const isMenuNavBarActive = ref(false)

const menuNavBarToggleIcon = computed(() => isMenuNavBarActive.value ? mdiClose : mdiDotsVertical)

const menuNavBarToggle = () => {
  isMenuNavBarActive.value = !isMenuNavBarActive.value
}

const updatesClicked = ref(false)

const updatesUpdateMark = computed(() => !updatesClicked.value && theme.updatesStatus ? 'warning' : null)

const toggleLightDark = () => {
  theme.darkModeTrigger()
}

const role=async()=>{
  console.log("coming here role function");
  window.open("https://cn.qspiders.com")
  
}
</script>

<template>
<logout-modal v-model="isModalDangerActive" large-title="Please Confirm" button="danger" has-cancel>
  <p>Are you sure,You want to Logout?</p>
</logout-modal>
  <nav
    v-show="isNavBarVisible"
    id="nav"
    class="top-0 left-0 right-0 fixed flex bg-white h-14 border-b border-gray-100 z-30 w-screen transition-position lg:transition-none lg:w-auto lg:items-stretch dark:bg-gray-900 dark:border-gray-800"
  >
    <div class="flex-1 items-stretch flex h-14">
      <nav-bar-item type="flex lg:hidden" p-x="pl-3 pr-0" @click.prevent="menuToggleMobile">
        <icon :path="menuToggleMobileIcon" size="24" />
      </nav-bar-item>
      <nav-bar-item type="hidden lg:flex" p-x="pl-3 pr-0" @click.prevent="menuToggle">
        <icon :path="menuToggleIcon" size="24" />
      </nav-bar-item>
      <nav-bar-item>
       {{pageTitle}}
      </nav-bar-item>
      <nav-bar-item type="hidden lg:flex">
        <!-- <nav-bar-search /> -->
      </nav-bar-item>
    </div>
    <div class="flex-none items-stretch flex h-14 lg:hidden">
      <nav-bar-item :active="isAsideRightActive" @click="asideRightToggle">
        <icon :path="mdiBell" :update-mark="updatesUpdateMark" size="20" />
      </nav-bar-item>
      <nav-bar-item @click.prevent="menuNavBarToggle">
        <icon :path="menuNavBarToggleIcon" size="20" />
      </nav-bar-item>
     
    </div>
    
    <div
      class="absolute w-screen top-14 left-0 bg-white shadow lg:w-auto lg:items-stretch lg:flex lg:grow lg:static lg:border-b-0 lg:overflow-visible lg:shadow-none dark:bg-gray-900"
      :class="{ 'hidden': !isMenuNavBarActive, 'block': isMenuNavBarActive }"
    >
      <div
        class="max-h-screen-menu overflow-y-auto lg:overflow-visible lg:flex lg:items-stretch lg:justify-end lg:ml-auto"
      >
  
        <nav-bar-menu has-divider>
          <div>
            <span>{{userName}}</span>
          </div>

          <template #dropdown>
            <nav-bar-item to="/profile">
              <nav-bar-item-label :icon="mdiAccount" label="My Profile" />
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label :icon="mdiCogOutline" label="Settings" />
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label :icon="mdiEmail" label="Messages" />
            </nav-bar-item>
             <nav-bar-item to="/change_password">
              <nav-bar-item-label :icon="mdiLock" label="Change Password" />
            </nav-bar-item>
             <nav-bar-item @click="role">
           <!-- <a href="https://cn.qspiders.com" target="_blank"> -->
      <nav-bar-item-label :icon="mdiToggleSwitch" label="Switch to counselor" />
                
           <!-- </a>   -->
         
            </nav-bar-item>
            <divider nav-bar />
            <nav-bar-item @click="isModalDangerActive= true">
              <nav-bar-item-label :icon="mdiLogout" label="Log Out" />
            </nav-bar-item>
          </template>
        </nav-bar-menu>
        <nav-bar-item has-divider desktop-icon-only @click.prevent="toggleLightDark">
          <nav-bar-item-label :icon="mdiThemeLightDark" label="Light/Dark" desktop-icon-only />
        </nav-bar-item>
        <nav-bar-item
          href="#"
          has-divider
          desktop-icon-only
        >
          <nav-bar-item-label :icon="mdiHelpCircleOutline" label="About" desktop-icon-only />
        </nav-bar-item>
        <nav-bar-item
          :active="isAsideRightActive"
          has-divider
          desktop-icon-only
          @click="asideRightToggle"
        >
          <nav-bar-item-label
            :icon="mdiBell"
            :update-mark="updatesUpdateMark"
            label="Updates"
            desktop-icon-only
          />
        </nav-bar-item>
        <nav-bar-item desktop-icon-only @click="isModalDangerActive= true">
          <nav-bar-item-label :icon="mdiLogout" label="Log out" desktop-icon-only />
        </nav-bar-item>
      </div>
    </div>
  </nav>
</template>
