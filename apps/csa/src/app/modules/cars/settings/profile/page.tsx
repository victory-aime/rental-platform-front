'use client'

import {} from '@chakra-ui/react'
import { BaseTabs } from '_components/custom'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { CiUser } from 'react-icons/ci'

import { ProfileInfo } from './components/ProfileInfo'
import { GoShieldLock } from 'react-icons/go'
import { Settings } from './components/Settings'

const ProfilePage = () => {
  const { t } = useTranslation()
  const tabsItems = [
    {
      label: t('SIDE_BAR.PROFILE'),
      icon: <CiUser />,
      content: <ProfileInfo />,
    },
    {
      label: 'Securite',
      icon: <GoShieldLock />,
      content: <Settings />,
    },
  ]

  return <BaseTabs items={tabsItems} title={'SIDE_BAR.SETTINGS'} description={'SIDE_BAR.SETTINGS'} />
}

export default ProfilePage
