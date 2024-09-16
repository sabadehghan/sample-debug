import { IoLayersOutline } from 'react-icons/io5'
import { TbLockCog } from 'react-icons/tb'
import { BiCalendar } from 'react-icons/bi'
import GeneralTable from '@/components/GeneralTable'
import { RecordsType, ReportType } from '@/services/reportServices'
import { LuEye } from 'react-icons/lu'
import { useState } from 'react'
import ReportsDetail from './ReportsDetail'
import { PiUsersThree } from 'react-icons/pi'
import { FaRegAddressCard } from 'react-icons/fa6'
import dateConvertor from '@/functions/dateConvertor'

interface ReportsTableProps {
  data: ReportType[]
}

const ReportsTable: React.FC<ReportsTableProps> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<RecordsType[]>([])

  const handleIconClick = (records: RecordsType[]) => {
    setSelectedRow(records)
    setOpen(true)
  }

  const columns = [
    { id: 'resource', label: 'نام سرویس ', icon: <IoLayersOutline size={18} /> },
    { id: 'context', label: 'شناسه', icon: <TbLockCog size={18} /> },
    { id: 'timestamp', label: 'تاریخ تراکنش', icon: <BiCalendar size={18} /> },
    { id: 'client', label: 'شرکت', icon: <PiUsersThree size={18} /> },
    { id: 'nid', label: 'کد ملی', icon: <FaRegAddressCard size={18} /> },
    { id: 'icon' },
  ]

  const rows = data.map((report, index) => ({
    id: index + 1,
    resource: report.resource,
    context: report.context,
    timestamp: dateConvertor(report.timestamp as string),
    client: report.client,
    nid: report.nid,
    icon: (
      <LuEye
        size={24}
        style={{ marginTop: '10px', cursor: 'pointer' }}
        onClick={() => handleIconClick(report.records)}
      />
    ),
  }))

  return (
    <>
      <GeneralTable columns={columns} rows={rows} />
      <ReportsDetail open={open} onClose={() => setOpen(false)} records={selectedRow} />
    </>
  )
}

export default ReportsTable
