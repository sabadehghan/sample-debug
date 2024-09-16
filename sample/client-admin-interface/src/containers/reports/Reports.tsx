import { Box, Grid } from '@mui/material'
import ReportsTable from './components/ReportsTable'
import useReports from '@/hooks/useReports'

const Reports = () => {
  const { data, isLoading } = useReports()
  return (
    <Box bgcolor="white" height="100%" width="100%" borderRadius={6} padding={2}>
      <Grid container height="100%" width="100%" direction="column" gap={2} margin={0}>
        <Grid item container flexGrow="1">
          {!isLoading && data && <ReportsTable data={data?.result?.content || []} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Reports
