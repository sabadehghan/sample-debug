import { useState } from 'react'
import { LuArrowDownUp } from 'react-icons/lu'
import { FiLayers } from 'react-icons/fi'
import { PiMagicWand } from 'react-icons/pi'
import { IoLogInOutline } from 'react-icons/io5'
import { AccessType } from '@/services/accessServices'
import GeneralTable from '@/components/GeneralTable'
import EditAccessDialog from './EditAccessDialog'

interface AccessTableProps {
  data: AccessType[]
}

const AccessTable: React.FC<AccessTableProps> = ({ data }) => {
  const columns = [
    { id: 'name', label: 'نام', icon: <LuArrowDownUp size={18} />, width: '300px' },
    {
      id: 'scopeLimit',
      label: 'سقف',
      icon: <IoLogInOutline size={20} style={{ transform: 'rotate(-90deg)' }} />,
      width: '300px',
      isCopyable: true,
    },
    { id: 'services', label: 'سرویس ها', icon: <FiLayers size={18} />, width: '300px', isCopyable: true },
    { id: 'type', label: 'نوع', icon: <PiMagicWand size={16} /> },
  ]

  const rows = data.map((scope: AccessType) => ({
    id: scope.id,
    name: scope.name,
    scopeLimit: scope.scopeLimit?.name,
    services: scope.services,
    type: scope.type,
  }))
  return (
    <>
      <GeneralTable columns={columns} rows={rows} />
    </>
  )
}

export default AccessTable
