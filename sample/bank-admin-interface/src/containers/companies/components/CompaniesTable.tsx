import React, { useState } from 'react'
import GeneralTable from '@/components/GeneralTable'
import { CompanyType } from '@/services/companiesServices'
import { LuArrowDownUp } from 'react-icons/lu'
import { PiGpsFix } from 'react-icons/pi'
import { SlLock } from 'react-icons/sl'
import { VscKey } from 'react-icons/vsc'
import EditCompanyDialog from './EditCompanyDialog'

interface CompaniesTableProps {
  data: CompanyType[]
}

const CompaniesTable: React.FC<CompaniesTableProps> = ({ data }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null)

  const handleEditClick = (id: number) => {
    const company = data.find((company) => company.id === (id as string | number))

    if (company) {
      setOpenEditDialog(() => {
        setSelectedCompany(company)
        return true
      })
    }
  }

  const columns = [
    { id: 'name', label: 'نام شرکت', icon: <LuArrowDownUp size={18} /> },
    { id: 'apiKey', label: 'API Key', icon: <VscKey size={18} />, isCopyable: true, width: 350 },
    { id: 'callbackUrl', label: 'Call Back URL', icon: <VscKey size={18} />, isCopyable: true, width: 200 },
    { id: 'access', label: 'دسترسی‌ها', icon: <SlLock size={16} /> },
    { id: 'ip', label: 'IP', icon: <PiGpsFix size={18} />, isCopyable: true },
    {
      id: 'actions',
      type: 'actions',
      label: 'عملیات',
    },
  ]

  const rows = data?.map((client: CompanyType) => ({
    id: client.id,
    name: client.name,
    apiKey: client.apiKey,
    callbackUrl: client.callbackUrl,
    access: client.scopes.map((item) => item.name),
    ip: client.ip,
  }))

  return (
    <>
      <GeneralTable columns={columns} rows={rows} onEditClick={handleEditClick} />
      <EditCompanyDialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} company={selectedCompany} />
    </>
  )
}

export default CompaniesTable
