import GeneralFilter from '@/components/GeneralFilter'
import useScopeLimit from '@/hooks/useScopeLimit'
import { Box, Button, Grid } from '@mui/material'
import ScopeLimitTable from './components/ScopeLimitTable'
import { useState } from 'react'
import CreateScopeLimitDialog from './components/CreateScopeLimitDialog'
import { MdAdd } from 'react-icons/md'

const ScopeLimit = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const { scopeLimitQuery } = useScopeLimit()
  const { data: scopeLimit, isLoading } = scopeLimitQuery

  return (
    <>
      <Box bgcolor="white" height="100%" width="100%" borderRadius={6} padding={2}>
        <Grid container height="100%" width="100%" flexDirection="column" gap={2} margin={0}>
          <Grid item container>
            <GeneralFilter />
          </Grid>
          <Grid item alignSelf="end">
            <Button onClick={() => setOpenAddDialog(true)} variant="contained" endIcon={<MdAdd />}>
              اضافه کردن
            </Button>
          </Grid>
          <Grid item container flexDirection="column" flexGrow="1">
            {!isLoading && scopeLimit && <ScopeLimitTable data={scopeLimit?.result?.scopeLimits || []} />}
          </Grid>
        </Grid>
      </Box>

      <CreateScopeLimitDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
    </>
  )
}

export default ScopeLimit
