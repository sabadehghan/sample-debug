import GeneralTable from '@/components/GeneralTable'
import { ServicesType } from '@/services/servicesServices'
import { LuArrowDownUp } from 'react-icons/lu'
import { TbRoute } from 'react-icons/tb'
import { TbReceipt } from 'react-icons/tb'
import { FaSquareCheck } from 'react-icons/fa6'
import { theme } from '@/themes/mui'
import { BsFillXSquareFill } from 'react-icons/bs'
interface ServicesTableProps {
  data: ServicesType[]
}

const ServicesTable: React.FC<ServicesTableProps> = ({ data }) => {
  const columns = [
    { id: 'name', label: 'نام', icon: <LuArrowDownUp size={18} /> },
    { id: 'method', label: 'مِتد', icon: <TbRoute size={18} />, width: 300 },
    { id: 'isTransactional', label: 'تراکنش مالی', icon: <TbReceipt size={18} />, width: 300 },
  ]

  const rows = data?.map((resources: ServicesType, index) => ({
    id: index + 1,
    name: resources.name,
    method: resources.method,
    isTransactional: resources.isTransactional ? (
      <FaSquareCheck color={theme.palette.success.main} size={24} style={{ marginTop: '12px' }} />
    ) : (
      <BsFillXSquareFill color={theme.palette.error.main} size={24} style={{ marginTop: '12px' }} />
    ),
  }))
  return <GeneralTable columns={columns} rows={rows} />
}

export default ServicesTable
