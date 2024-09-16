import React from 'react'
import { Tabs, Tab, Box, TabsProps, TabProps } from '@mui/material'
import { styled } from '@mui/system'
import { RecordsType } from '@/services/reportServices'
import { theme } from '@/themes/mui'

const CustomTabs = styled((props: TabsProps) => <Tabs {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 20,
  overflowX: 'auto',
  padding: '0.5rem',
}))

const CustomTab = styled((props: TabProps) => <Tab {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 20,
  margin: '0.25rem',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  '&:not(.Mui-selected)': {
    backgroundColor: theme.palette.secondary.main,
  },
}))

interface ReportsTabsProps {
  tabs: RecordsType[]
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

const ReportsTabs: React.FC<ReportsTabsProps> = ({ tabs, value, onChange }) => {
  const renderJsonContent = (data: string) => {
    const parsedData = JSON.parse(data)
    return (
      <div style={{ textAlign: 'left', direction: 'ltr', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(parsedData, null, 2)}
      </div>
    )
  }

  return (
    <Box
      sx={{
        width: 'auto',
        mt: '30px',
      }}>
      <CustomTabs value={value} onChange={onChange}>
        {tabs.map((tab, index) => (
          <CustomTab key={index} label={tab.type} />
        ))}
      </CustomTabs>

      <Box
        sx={{
          padding: '1rem',
          backgroundColor: `${theme.palette.secondary.main}`,
          borderRadius: '10px',
          marginTop: '1rem',
          minHeight: '400px',
          maxHeight: '400px',
          textAlign: 'left',
          borderRight: `4px solid ${theme.palette.primary.main}`,
          overflow: 'auto',
        }}>
        {renderJsonContent(tabs[value]?.message)}
      </Box>
    </Box>
  )
}

export default ReportsTabs
