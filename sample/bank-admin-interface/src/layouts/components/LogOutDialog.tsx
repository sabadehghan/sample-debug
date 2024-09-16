import CustomDialog from '@/components/CustomDialog'
import { theme } from '@/themes/mui'
import { Box, Button } from '@mui/material'
import logOut from '../../assets/svg/logout.svg'
interface LogOutDialogProps {
  open: boolean
  onClose: () => void
}
const LogOutDialog: React.FC<LogOutDialogProps> = ({ open, onClose }) => {
  return (
    <CustomDialog
      open={open}
      handleClose={onClose}
      actions={
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              width: '110px',
              m: '8px',
              borderColor: 'gray',
              color: 'gray',
              '&:hover': {
                borderColor: 'gray',
                color: 'gray',
              },
            }}>
            انصراف
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              m: '8px',
              backgroundColor: `${theme.palette.error.dark}`,
              '&:hover': {
                backgroundColor: `${theme.palette.error.dark}`,
              },
            }}>
            خارج شوید
          </Button>
        </Box>
      }>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}>
        <img src={logOut} />
      </Box>
    </CustomDialog>
  )
}

export default LogOutDialog
