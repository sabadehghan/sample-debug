import { ScopeLimitType } from '@/services/scopeLimitServices'
import { useState } from 'react'
import { LuArrowDownUp } from 'react-icons/lu'
import { BsCalendar2Date } from 'react-icons/bs'
import { BsCalendar2Month } from 'react-icons/bs'
import { TbReceipt } from 'react-icons/tb'
import GeneralTable from '@/components/GeneralTable'
import EditScopeLimitDialog from './EditScopeLimitDialog'
import convertEnNumberToFaNumber from '@/functions/convertEnNumberToFaNumber'

interface ScopeLimitTableProps {
  data: ScopeLimitType[]
}
const ScopeLimitTable: React.FC<ScopeLimitTableProps> = ({ data }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedScopeLimit, setSelectedScopeLimit] = useState<ScopeLimitType | null>(null)

  const handleEditClick = (id: number) => {
    const scopeLimit = data.find((scopeLimit) => scopeLimit.id === (id as string | number))
    if (scopeLimit) {
      setOpenEditDialog(() => {
        setSelectedScopeLimit(scopeLimit)
        return true
      })
    }
  }
  const columns = [
    { id: 'name', label: 'نام', icon: <LuArrowDownUp size={18} /> },
    { id: 'dailyAmount', label: 'سقف تعداد (روزانه) ', icon: <BsCalendar2Date size={18} /> },
    { id: 'monthlyAmount', label: 'سقف تعداد (ماهانه) ', icon: <BsCalendar2Month size={18} /> },
    { id: 'dailyTransactionCount', label: 'سقف مبلغ (روزانه) ', icon: <BsCalendar2Date size={16} /> },
    { id: 'monthlyTransactionCount', label: 'سقف مبلغ (ماهانه) ', icon: <BsCalendar2Month size={18} /> },
    { id: 'perTransactionAmount', label: 'به ازای هر تراکنش', icon: <TbReceipt size={18} /> },
    {
      id: 'actions',
      type: 'actions',
      label: 'عملیات',
    },
  ]

  const rows = data?.map((scopeLimit: ScopeLimitType) => ({
    id: scopeLimit.id,
    name: scopeLimit.name,
    dailyAmount: convertEnNumberToFaNumber(scopeLimit.dailyAmount as number),
    monthlyAmount: convertEnNumberToFaNumber(scopeLimit.monthlyAmount as number),
    dailyTransactionCount: scopeLimit.dailyTransactionCount?.toLocaleString('fa-IR'),
    monthlyTransactionCount: scopeLimit.monthlyTransactionCount?.toLocaleString('fa-IR'),
    perTransactionAmount: scopeLimit.perTransactionAmount?.toLocaleString('fa-IR'),
  }))
  return (
    <>
      <GeneralTable columns={columns} rows={rows} onEditClick={handleEditClick} />
      <EditScopeLimitDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        scopeLimit={selectedScopeLimit}
      />
    </>
  )
}

export default ScopeLimitTable
