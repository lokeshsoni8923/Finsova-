// // Next Imports
// import { useParams } from 'next/navigation'

// // MUI Imports
// import { useTheme } from '@mui/material/styles'

// // Third-party Imports
// import PerfectScrollbar from 'react-perfect-scrollbar'

// // Type Imports
// import type { getDictionary } from '@/utils/getDictionary'
// import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// // Component Imports
// import { Menu, SubMenu, MenuItem } from '@menu/vertical-menu'
// import CustomChip from '@core/components/mui/Chip'

// // Hook Imports
// import useVerticalNav from '@menu/hooks/useVerticalNav'

// // Styled Component Imports
// import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// // Style Imports
// import menuItemStyles from '@core/styles/vertical/menuItemStyles'
// import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// type RenderExpandIconProps = {
//   open?: boolean
//   transitionDuration?: VerticalMenuContextProps['transitionDuration']
// }

// type Props = {
//   dictionary: Awaited<ReturnType<typeof getDictionary>>
//   scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
// }

// const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
//   <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
//     <i className='tabler-chevron-right' />
//   </StyledVerticalNavExpandIcon>
// )

// const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
//   // Hooks
//   const theme = useTheme()
//   const verticalNavOptions = useVerticalNav()
//   const params = useParams()

//   // Vars
//   const { isBreakpointReached, transitionDuration } = verticalNavOptions
//   const { lang: locale } = params

//   const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

//   return (
//     <ScrollWrapper
//       {...(isBreakpointReached
//         ? {
//             className: 'bs-full overflow-y-auto overflow-x-hidden',
//             onScroll: container => scrollMenu(container, false)
//           }
//         : {
//             options: { wheelPropagation: false, suppressScrollX: true },
//             onScrollY: container => scrollMenu(container, true)
//           })}
//     >
//       <Menu
//         popoutMenuOffset={{ mainAxis: 23 }}
//         menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
//         renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
//         renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
//         menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
//       >
//         {/* dashboards */}
//         <SubMenu label={dictionary['navigation'].dashboards} icon={<i className='tabler-smart-home' />}>
//           <MenuItem href={`/${locale}/dashboards/crm`}>{dictionary['navigation'].crm}</MenuItem>
//           <MenuItem href={`/${locale}/dashboards/analytics`}>{dictionary['navigation'].analytics}</MenuItem>
//         </SubMenu>

//         {/* user */}
//         <SubMenu label={dictionary['navigation'].user} icon={<i className='tabler-user' />}>
//           <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].list}</MenuItem>
//           <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].view}</MenuItem>
//         </SubMenu>

//         {/* master */}
//         <SubMenu label={dictionary['navigation'].master} icon={<i className='tabler-user' />}>
//           <MenuItem href={`/${locale}/apps/master/bank`}>{dictionary['navigation'].bank}</MenuItem>
//           <MenuItem href={`/${locale}/apps/master/commission`}>{dictionary['navigation'].commission}</MenuItem>
//           <MenuItem href={`/${locale}/apps/master/role`}>{dictionary['navigation'].role}</MenuItem>
//           <MenuItem href={`/${locale}/apps/master/service-provider`}>
//             {dictionary['navigation'].serviceprovider}
//           </MenuItem>
//         </SubMenu>

//         {/* services */}
//         <SubMenu label={dictionary['navigation'].services} icon={<i className='tabler-user' />}>
//           <MenuItem href={`/${locale}/apps/finsova/bbps`}>{dictionary['navigation'].bbps}</MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/cms`}>CMS</MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/ccbp`}>CCBP</MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/aesp1`}>AEPS1</MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/aesp2`}>AEPS2</MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/expresspay`}>Express Pay</MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/recharge`}>Recharge</MenuItem>
//         </SubMenu>

//         {/* Product */}
//         <SubMenu label='Product' icon={<i className='tabler-package' />}>
//           <MenuItem href={`/${locale}/apps/product/inventory`}>Buy Product</MenuItem>
//           <MenuItem href={`/${locale}/apps/product/orders`}>View Details</MenuItem>
//         </SubMenu>

//         {/* Report Section */}
//         <SubMenu label='Reports' icon={<i className='tabler-report' />}>
//           <MenuItem href={`/${locale}/apps/finsova/reports`}> My Commission</MenuItem>
//         </SubMenu>

//         {/* Support Tickets */}
//         <SubMenu label='Support Tickets' icon={<i className='tabler-ticket' />}>
//           <MenuItem href={`/${locale}/apps/finsova/support-tickt`}>View Tickets</MenuItem>
//         </SubMenu>

//         {/* Financial */}
//         <SubMenu label='Financial' icon={<i className='tabler-credit-card' />}>
//           <MenuItem href={`/${locale}/apps/finsova/wallet-transfer`}>Wallet Transfer</MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/load-money`}>Load Money</MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/load-money-plus`}>
//             LOAD MONEY PLUS
//             <CustomChip label='NEW' color='success' size='small' sx={{ ml: 1 }} />
//           </MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/fund-request`}>Fund Request</MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/fund-withdrawal`}>Fund Withdrawal</MenuItem>
//         </SubMenu>

//         <SubMenu label='Account Request' icon={<i className='tabler-file-text' />}>
//           <MenuItem href={`/${locale}/apps/finsova/requests`}>Payout Accounts</MenuItem>
//           <MenuItem href={`/${locale}/apps/finsova/new-request`}>Pay-in Accounts</MenuItem>
//         </SubMenu>

//         {/* Settings */}
//         <SubMenu label='Settings' icon={<i className='tabler-settings' />}>
//           <MenuItem href={`/${locale}/apps/settings/profile`}>Profile</MenuItem>
//           <MenuItem href={`/${locale}/apps/settings/security`}>Change Password</MenuItem>
//         </SubMenu>

//         {/* Download Center */}
//         <SubMenu label='Download Center' icon={<i className='tabler-download' />}>
//           <MenuItem href={`/${locale}/apps/downloads/documents`}>UnderTaking Letter</MenuItem>
//           <MenuItem href={`/${locale}/apps/downloads/reports`}>Agent Agreement</MenuItem>
//         </SubMenu>

//         {/* <SubMenu label={dictionary['navigation'].transactions} icon={<i className='tabler-user' />}>
//           <MenuItem href={`/${locale}/apps/user/fundrequest`}>{dictionary['navigation'].fundrequest}</MenuItem>
//         </SubMenu> */}
//       </Menu>
//     </ScrollWrapper>
//   )
// }

// export default VerticalMenu

import { useParams } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import { Menu, SubMenu, MenuItem } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { menuConfig } from '@/configs/menuConfig'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const navigation = dictionary['navigation'] as Record<string, string>

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {menuConfig.map(group => (
          <SubMenu key={group.key} label={navigation[group.labelKey]} icon={<i className={group.icon} />}>
            {group.submenus.map(item => (
              <MenuItem key={item.key} href={`/${locale}${item.path}`}>
                {navigation[item.labelKey] || item.labelKey}
                {item.chip && (
                  <CustomChip label={item.chip.label} color={item.chip.color as any} size='small' sx={{ ml: 1 }} />
                )}
              </MenuItem>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
