import { Box, Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import CompaniesTable from './components/CompaniesTable'
import useCompanies from '@/hooks/useCompanies'
import GeneralFilter from '@/components/GeneralFilter'
import { MdAdd } from 'react-icons/md'
import CreateCompanyDialog from './components/CreateCompanyDialog'

interface CompaniesProps { }

const Companies: React.FC<CompaniesProps> = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const { companiesQuery } = useCompanies()
  const { data: companies, isLoading } = companiesQuery

  return (
    <>
      <Box bgcolor="white" height="100%" width="100%" borderRadius={6} padding={2}>
        <Grid container height="100%" width="100%" flexDirection="column" gap={2} margin={0}>
          <Grid item container>
            <GeneralFilter />
          </Grid>
          <Grid item alignSelf="end">
            <Button onClick={() => setOpenAddDialog(true)} variant="contained" endIcon={<MdAdd />}>
              افزودن شرکت
            </Button>
          </Grid>
          <Grid item container flexDirection="column" flexGrow="1">
            {!isLoading && <CompaniesTable data={companies?.result?.clients || []} />}
          </Grid>
        </Grid>
      </Box>

      <CreateCompanyDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
    </>
  )
}

export default Companies
