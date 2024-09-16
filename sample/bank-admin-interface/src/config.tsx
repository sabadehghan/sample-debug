import { IoLayersOutline } from 'react-icons/io5'
import { LuGanttChartSquare } from 'react-icons/lu'
import { PiUsersThree } from 'react-icons/pi'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { IoLogInOutline } from 'react-icons/io5'
export const MENU_LIST = [
  {
    title: 'شرکت ها',
    name: 'companies',
    path: '/companies',
    icon: <PiUsersThree size={20} />,
  },
  {
    title: 'سرویس ها',
    name: 'services',
    path: '/services',
    icon: <IoLayersOutline size={20} />,
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
  {
    title: 'سقف ها',
    name: 'scope-limit',
    path: '/scope-limit',
    icon: <IoLogInOutline size={22} style={{ transform: 'rotate(-90deg)' }} />,
  },
]
