import GeneralFilter from '@/components/GeneralFilter'
import { Box, Grid } from '@mui/material'
import ServicesTable from './components/ServicesTable'
import useServices from '@/hooks/useServices'

const Services = () => {
  const { serviceQuery } = useServices()
  const { data: services, isLoading } = serviceQuery

  return (
    <Box bgcolor="white" height="100%" width="100%" borderRadius={6} padding={2}>
      <Grid container height="100%" width="100%" direction="column" gap={2} margin={0}>
        <Grid item container>
          <GeneralFilter />
        </Grid>
        <Grid item container flexGrow="1">
          {!isLoading && <ServicesTable data={services?.result?.resources || []} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Services
