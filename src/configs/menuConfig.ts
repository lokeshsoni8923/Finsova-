export type MenuItemType = {
  key: string
  labelKey: string
  path: string
  chip?: { label: string; color: string } // optional for "NEW" badge
}

export type MenuGroupType = {
  key: string
  labelKey: string
  icon: string // tabler icon class
  submenus: MenuItemType[]
}

export const menuConfig: MenuGroupType[] = [
  {
    key: 'dashboards',
    labelKey: 'dashboards',
    icon: 'tabler-smart-home',
    submenus: [
      { key: 'crm', labelKey: 'crm', path: '/dashboards/crm' },
      { key: 'analytics', labelKey: 'analytics', path: '/dashboards/analytics' }
    ]
  },
  {
    key: 'user',
    labelKey: 'user',
    icon: 'tabler-user',
    submenus: [
      { key: 'list', labelKey: 'list', path: '/apps/user/list' },
      { key: 'view', labelKey: 'view', path: '/apps/user/view' }
    ]
  },
  {
    key: 'master',
    labelKey: 'master',
    icon: 'tabler-user',
    submenus: [
      { key: 'bank', labelKey: 'bank', path: '/apps/master/bank' },
      { key: 'commission', labelKey: 'commission', path: '/apps/master/commission' },
      { key: 'role', labelKey: 'role', path: '/apps/master/role' },
      { key: 'serviceprovider', labelKey: 'serviceprovider', path: '/apps/master/service-provider' }
    ]
  },
  {
    key: 'services',
    labelKey: 'services',
    icon: 'tabler-user',
    submenus: [
      { key: 'bbps', labelKey: 'bbps', path: '/apps/finsova/bbps' },
      { key: 'cms', labelKey: 'cms', path: '/apps/finsova/cms' },
      { key: 'ccbp', labelKey: 'ccbp', path: '/apps/finsova/ccbp' },
      { key: 'aesp1', labelKey: 'aesp1', path: '/apps/finsova/aesp1' },
      { key: 'aesp2', labelKey: 'aesp2', path: '/apps/finsova/aesp2' },
      { key: 'expresspay', labelKey: 'expresspay', path: '/apps/finsova/expresspay' },
      { key: 'recharge', labelKey: 'recharge', path: '/apps/finsova/recharge' }
    ]
  },
  {
    key: 'products',
    labelKey: 'products',
    icon: 'tabler-package',
    submenus: [
      { key: 'buyProduct', labelKey: 'buyProduct', path: '/apps/product/inventory' },
      { key: 'viewDetails', labelKey: 'viewDetails', path: '/apps/product/orders' }
    ]
  },
  {
    key: 'reports',
    labelKey: 'reports',
    icon: 'tabler-report',
    submenus: [{ key: 'myCommission', labelKey: 'myCommission', path: '/apps/finsova/reports' }]
  },
  {
    key: 'supportTickets',
    labelKey: 'supportTickets',
    icon: 'tabler-ticket',
    submenus: [{ key: 'viewTickets', labelKey: 'viewTickets', path: '/apps/finsova/support-tickt' }]
  },
  {
    key: 'financial',
    labelKey: 'financial',
    icon: 'tabler-credit-card',
    submenus: [
      { key: 'walletTransfer', labelKey: 'walletTransfer', path: '/apps/finsova/wallet-transfer' },
      { key: 'loadMoney', labelKey: 'loadMoney', path: '/apps/finsova/load-money' },
      {
        key: 'loadMoneyPlus',
        labelKey: 'loadMoneyPlus',
        path: '/apps/finsova/load-money-plus',
        chip: { label: 'NEW', color: 'success' }
      },
      { key: 'fundrequest', labelKey: 'fundrequest', path: '/apps/finsova/fund-request' },
      { key: 'fundWithdrawal', labelKey: 'fundWithdrawal', path: '/apps/finsova/fund-withdrawal' }
    ]
  },
  {
    key: 'accountRequest',
    labelKey: 'accountRequest',
    icon: 'tabler-file-text',
    submenus: [
      { key: 'payoutAccounts', labelKey: 'payoutAccounts', path: '/apps/finsova/requests' },
      { key: 'payinAccounts', labelKey: 'payinAccounts', path: '/apps/finsova/new-request' }
    ]
  },
  {
    key: 'settings',
    labelKey: 'settings',
    icon: 'tabler-settings',
    submenus: [
      { key: 'profile', labelKey: 'profile', path: '/apps/settings/profile' },
      { key: 'changePassword', labelKey: 'changePassword', path: '/apps/settings/security' }
    ]
  },
  {
    key: 'downloadCenter',
    labelKey: 'downloadCenter',
    icon: 'tabler-download',
    submenus: [
      { key: 'undertakingLetter', labelKey: 'undertakingLetter', path: '/apps/downloads/documents' },
      { key: 'agentAgreement', labelKey: 'agentAgreement', path: '/apps/downloads/reports' }
    ]
  }
]
