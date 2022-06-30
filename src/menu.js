import {
  mdiAccountCircle,
  mdiBookOpenOutline,
  mdiHelpCircle,
  mdiLock,
  mdiHumanQueue,
  mdiSquareEditOutline,
  mdiPlaylistCheck,
  mdiViewList,
  mdiMenuOpen,
  mdiTable,
  mdiTelevisionGuide,
  mdiBarcode,
  mdiThemeLightDark,
  mdiPalette,mdiLogout
} from '@mdi/js'

export default [
 
  'Branch Manager',
  [
    {
      to: '/batchplan',
      label: 'Create Batch Plan',
      icon: mdiSquareEditOutline,
     
    },
    {
      to: '/rigid_summary',
      label: 'Rigid Summary',
      icon: mdiBookOpenOutline,
    },
    // {
    //   to: '/batchfollowup',
    //   label: 'Followup',
    //   icon: mdiPlaylistCheck
    // },
    {
      label: 'BatchplanList',
      subLabel: 'Submenus Example',
      icon: mdiViewList,
      menu: [
        {
          to: '/list',
          label: 'weekday batchplan',
          icon:   mdiTable,
        },
        {
          label: 'weekend batchplan',
          icon:   mdiTable,
        }
      ]
    },

    {
      label: 'Followup',
      subLabel: 'Submenus Example',
      icon: mdiPlaylistCheck,
      menu: [
        {
          to: '/batchfollowup',
          label: 'Followup started',
          icon:   mdiHumanQueue,
        },
        {
          to:"/notstarted",
          label: 'Followup notstarted',
          icon:   mdiHumanQueue,
        }
      ]
    },
 
    // {
    //   label: 'Dark mode',
    //   icon: mdiThemeLightDark,
    //   darkModeToggle: true
    // },
 
    // {
    //   to: '/profile',
    //   label: 'Profile',
    //   icon: mdiAccountCircle
    // },
    // {
    //   to: '/',
    //   label: 'Login',
    //   icon: mdiLock
    // },
   
 
   
  ],

  // 'About',
  // [
  //   {
  //     href: '#',
  //     label: 'About',
  //     icon: mdiHelpCircle
  //   }
  // ]
]
