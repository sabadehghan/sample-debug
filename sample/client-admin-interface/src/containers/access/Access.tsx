import { Box, Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import AccessTable from './components/AccessTable'
import useAccess from '@/hooks/useAccess'
import CreateAccessDialog from './components/CreateAccessDialog'
import { MdAdd } from 'react-icons/md'

interface AccessProps {}

const Access: React.FC<AccessProps> = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const { accessQuery } = useAccess()
  const { data: access, isLoading } = accessQuery

  return (
    <>
      <Box bgcolor="white" height="100%" width="100%" borderRadius={6} padding={2}>
        <Grid container height="100%" width="100%" flexDirection="column" gap={2} margin={0}>
          <Grid item alignSelf="end">
            <Button onClick={() => setOpenAddDialog(true)} variant="contained" endIcon={<MdAdd />}>
              اضافه کردن
            </Button>
          </Grid>
          <Grid item container flexDirection="column" flexGrow="1">
            {!isLoading && <AccessTable data={access?.result?.scopes || []} />}
          </Grid>
        </Grid>
      </Box>

      <CreateAccessDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
    </>
  )
}

export default Access
