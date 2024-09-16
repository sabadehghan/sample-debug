import { theme } from '@/themes/mui'
import { Box, IconButton } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { AiOutlineEdit } from 'react-icons/ai'
import { LuCopy } from 'react-icons/lu'
import { RiDeleteBinLine } from 'react-icons/ri'

type ColumnsType = {
  id: string
  type?: string
  label?: string
  icon?: JSX.Element
  content?: () => JSX.Element
  width?: GridColDef['width']
  isCopyable?: boolean
}
interface GeneralTableProps {
  columns: ColumnsType[]
  rows: object[]
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

const generateDataGridColumns = (columns: ColumnsType[], onEditClick?: (id: number) => void) => {
  let dataGridColumns: GridColDef[] = []

  dataGridColumns = columns.map(({ id, type, label, icon, content, width, isCopyable }: ColumnsType) => {
    if (type === 'actions') {
      return {
        field: id,
        type: 'actions',
        width: width || 200,
        resizable: false,
        headerClassName: 'data-grid--header',
        renderHeader: () => <CustomHeader label={label} content={content} />,
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<AiOutlineEdit size={24} />}
              label="Edit"
              sx={{ pointerEvents: 'auto' }}
              onClick={() => onEditClick?.(id as number)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<RiDeleteBinLine size={24} color={theme.palette.error.main} />}
              label="Delete"
              // onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ]
        },
      }
    }

    return {
      field: id,
      headerName: label,
      width: width || 200,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'data-grid--header',
      renderHeader: () => <CustomHeader label={label} icon={icon} content={content} />,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          {params.value || '-'}
          {params.value && isCopyable && (
            <IconButton onClick={() => navigator.clipboard.writeText(params.value)}>
              <LuCopy size={16} color={theme.palette.primary.main} />
            </IconButton>
          )}
        </Box>
      ),
    }
  })

  const lastColumn = dataGridColumns[dataGridColumns.length - 1]
  lastColumn.minWidth = lastColumn.width
  lastColumn.flex = 1

  return dataGridColumns
}

const GeneralTable: React.FC<GeneralTableProps> = ({ columns, rows, onEditClick }) => {
  const dataGridColumns = generateDataGridColumns(columns, onEditClick)

  return (
    <DataGrid
      sx={{
        width: "100%",
        border: 'none',
        '& .data-grid--header': {
          backgroundColor: 'white',
          cursor: 'auto',
        },
        '& .MuiDataGrid-columnHeader:focus-within': {
          outline: 'none',
        },
        '& .MuiDataGrid-cell:focus-within': {
          outline: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          outline: 'none',
        },
        '& .MuiDataGrid-overlay': {
          backgroundColor: 'white',
        },
      }}
      columns={dataGridColumns}
      rows={rows}
      disableColumnSorting
      disableColumnMenu
      disableRowSelectionOnClick
    />
  )
}

export default GeneralTable
