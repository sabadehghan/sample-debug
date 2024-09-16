import { LuGanttChartSquare } from 'react-icons/lu'
import { PiUsersThree } from 'react-icons/pi'
import { RiSecurePaymentLine } from 'react-icons/ri'

export type MenuType = {
  title: string,
  name: string,
  path: string,
  icon: React.ReactNode,
  isNested?: boolean
}

export const MENU_LIST: MenuType[] = [
  {
    title: 'مستندات',
    name: 'docs',
    path: '/docs',
    icon: <PiUsersThree size={20} />,
    isNested: true
  },
  {
    title: 'دسترسی ها',
    name: 'access',
    path: '/access',
    icon: <RiSecurePaymentLine size={20} />,
  },
  {
    title: 'گزارش ها',
    name: 'reports',
    path: '/reports',
    icon: <LuGanttChartSquare size={20} />,
  },
]
