import CustomDialog from '@/components/CustomDialog'
import { RecordsType } from '@/services/reportServices'
import { useState } from 'react'
import ReportsTabs from './ReportsTabs'

interface ReportsDetailProps {
  open: boolean
  onClose: () => void
  records: RecordsType[]
}

const ReportsDetail: React.FC<ReportsDetailProps> = ({ open, onClose, records }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }
  return (
    <CustomDialog open={open} handleClose={onClose} maxWidth="lg" fullWidth={false}>
      <ReportsTabs tabs={records} value={selectedTab} onChange={handleTabChange} />
    </CustomDialog>
  )
}

export default ReportsDetail
