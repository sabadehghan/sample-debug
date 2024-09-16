import { Box, Grid, TextField, Typography } from '@mui/material'
import { IoFilter } from 'react-icons/io5'
import { BiFilterAlt } from 'react-icons/bi'
import { RiSearchLine } from 'react-icons/ri'
import { theme } from '@/themes/mui'

interface GeneralFilterProps { }
const GeneralFilter: React.FC<GeneralFilterProps> = () => {
  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={12} md={4}>
        <Box sx={{ display: 'flex', gap: '80px' }}>
          <Box sx={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            <Typography>مرتب سازی</Typography>
            <IoFilter size={18} />
          </Box>
          <Box sx={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            <Typography>فیلتر</Typography>
            <BiFilterAlt size={18} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              height: '40px',
              borderRadius: '11px',
              backgroundColor: theme.palette.secondary.main,
              '& fieldset': {
                border: 'none',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: '10px 14px',
            },
          }}
          InputProps={{
            endAdornment: <RiSearchLine size={20} />,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default GeneralFilter
