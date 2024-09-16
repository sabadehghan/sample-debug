import React, { useState } from 'react'
import { Tabs, Tab, Box, TabsProps, TabProps } from '@mui/material'
import { styled } from '@mui/system'
import { RecordsType } from '@/services/reportServices'
import { theme } from '@/themes/mui'
import { prettyPrintJson, FormatOptions } from 'pretty-print-json'
import { FaCopy } from 'react-icons/fa'
import { IoMdCheckmark } from 'react-icons/io'

const CustomTabs = styled((props: TabsProps) => <Tabs {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 20,
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiTabs-indicator': {
    left: 0,
  },
}))

const CustomTab = styled((props: TabProps) => <Tab {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 20,
  margin: '0.25rem',
  display: 'flex',
  flexDirection: 'column',
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
  const options: FormatOptions = { linkUrls: true }
  const [copied, setCopied] = useState(false)

  function copyTextHandler() {
    const jsonData = tabs[value]?.message
    if (jsonData) {
      navigator.clipboard.writeText(jsonData).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const renderJsonContent = (data: string) => {
    try {
      const parsedData = JSON.parse(data)
      const html = prettyPrintJson.toHtml(parsedData, options)
      return (
        <div style={{ width: '600px', overflow: 'auto', height: '350px' }}>
          <div
            style={{
              direction: 'ltr',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 0,
            }}>
            {copied ? (
              <IoMdCheckmark
                size={'22px'}
                style={{ cursor: 'pointer', color: theme.palette.success.main, marginBottom: '20px' }}
              />
            ) : (
              <FaCopy
                onClick={copyTextHandler}
                size={'22px'}
                style={{ cursor: 'pointer', color: theme.palette.primary.main, marginBottom: '20px' }}
              />
            )}
          </div>
          <div
            style={{ textAlign: 'left', direction: 'ltr', whiteSpace: 'pre-wrap', flexWrap: 'wrap' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )
    } catch (error) {
      return <div>Invalid JSON</div>
    }
  }

  return (
    <Box
      sx={{
        mt: '30px',
        display: 'flex',
        gap: '40px',
      }}>
      <CustomTabs value={value} onChange={onChange} orientation="vertical">
        {tabs.map((tab, index) => (
          <CustomTab key={index} label={tab.type} />
        ))}
        
      </CustomTabs>

      <Box
        sx={{
          padding: '1rem',
          backgroundColor: `${theme.palette.secondary.main}`,
          borderRadius: '10px',
          height: 'auto',
          textAlign: 'left',
          borderRight: `4px solid ${theme.palette.primary.main}`,
        }}>
        {renderJsonContent(tabs[value]?.message)}
      </Box>
    </Box>
  )
}

export default ReportsTabs
