import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import { AiOutlineEdit } from 'react-icons/ai'
import { LuCopy } from 'react-icons/lu'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { Typography } from '@mui/material'
import { theme } from '@/themes/mui'

type ColumnsType = {
  id: string
  type?: string
  label?: string
  icon?: JSX.Element
  content?: () => JSX.Element
  width?: string
  isCopyable?: boolean
}

interface GeneralTableProps {
  columns: ColumnsType[]
  rows: Array<Record<string, any>>
  onEditClick?: (id: number) => void
}

interface CustomHeaderProps {
  label?: string
  icon?: JSX.Element
  content?: () => JSX.Element
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ label, icon, content }) =>
  content ? (
    content()
  ) : (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ marginLeft: '8px', fontWeight: 600, fontSize: '16px' }}>{label}</span>
      {icon}
    </div>
  )

const generateTableColumns = (columns: ColumnsType[]) => {
  return columns.map(({ id, label, isCopyable }) => ({
    id,
    label,
    render: (value: any) => {
      const maxLength = 18
      const displayValue = value && value.length > maxLength ? `${value.slice(0, maxLength)}...` : value || '-'
      return (
        <Tooltip title={value || '-'} placement="top" arrow>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {displayValue}
            {value && isCopyable && (
              <IconButton onClick={() => navigator.clipboard.writeText(value)}>
                <LuCopy size={16} color={theme.palette.primary.main} />
              </IconButton>
            )}
          </Box>
        </Tooltip>
      )
    },
  }))
}

const RowDetailPanel: React.FC<{ row: any }> = ({ row }) => (
  <Box sx={{ padding: '10px', width: '900px', margin: 'auto' }}>
    {row.subElements && row.subElements.length > 0 ? (
      <Table size="small">
        <TableBody>
          {row.subElements.map((subElement: any) => (
            <TableRow key={subElement.id}>
              <TableCell style={{ textAlign: 'center' }}>{subElement.name || '-'}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{subElement.label || '-'}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{subElement.description || '-'}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {subElement.isRequired === true ? 'بله' : 'خیر' || '-'}
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>{subElement.defaultValue || '-'}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{subElement.regex || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      <Typography>No sub-elements</Typography>
    )}
  </Box>
)

const GeneralTable: React.FC<GeneralTableProps> = ({ columns, rows, onEditClick }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const tableColumns = generateTableColumns(columns)

  const handleRowClick = (id: number) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev)
      if (newExpandedRows.has(id)) {
        newExpandedRows.delete(id)
      } else {
        newExpandedRows.add(id)
      }
      return newExpandedRows
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {tableColumns.map((col) => (
              <TableCell key={col.id} sx={{ textAlign: 'center' }}>
                <CustomHeader label={col.label} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <React.Fragment key={row.id}>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>
                  {row.subElements && row.subElements.length > 0 && (
                    <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(row.id)}>
                      {expandedRows.has(row.id) ? <MdExpandLess /> : <MdExpandMore />}
                    </IconButton>
                  )}
                </TableCell>
                {tableColumns.map((col) => (
                  <TableCell key={col.id} sx={{ textAlign: 'center' }}>
                    {col.render ? col.render(row[col.id]) : row[col.id]}
                  </TableCell>
                ))}
                <TableCell sx={{ textAlign: 'center' }}>
                  {onEditClick && (
                    <IconButton onClick={() => onEditClick(row.id)} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <AiOutlineEdit size={24} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
              {expandedRows.has(row.id) && (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length + 2}
                    style={{ padding: 0, backgroundColor: theme.palette.background.default }}>
                    <RowDetailPanel row={row} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GeneralTable
