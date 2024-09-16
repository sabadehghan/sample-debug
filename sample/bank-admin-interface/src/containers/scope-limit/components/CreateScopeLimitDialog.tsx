import CustomDialog from '@/components/CustomDialog'
import useScopeLimit from '@/hooks/useScopeLimit'
import { ScopeLimitType } from '@/services/scopeLimitServices'
import { Button, Grid, TextField } from '@mui/material'
import { useState } from 'react'

interface CreateScopeLimitDialogProps {
  open: boolean
  onClose: () => void
}

const INITIAL_SCOPE_LIMIT_FORM_DATA = {
  name: '',
  dailyAmount: null,
  dailyTransactionCount: null,
  monthlyAmount: null,
  monthlyTransactionCount: null,
  perTransactionAmount: null,
}
const CreateScopeLimitDialog: React.FC<CreateScopeLimitDialogProps> = ({ open, onClose }) => {
  const [data, setData] = useState<ScopeLimitType>(INITIAL_SCOPE_LIMIT_FORM_DATA)

  const { createScopeLimitMutation } = useScopeLimit()

  const handleClose = () => {
    setData(INITIAL_SCOPE_LIMIT_FORM_DATA)
    onClose()
  }
  const handleSubmit = () => {
    createScopeLimitMutation.mutate(
      {
        name: data.name,
        dailyAmount: Number(data.dailyAmount),
        monthlyAmount: Number(data.monthlyAmount),
        perTransactionAmount: Number(data.perTransactionAmount),
        dailyTransactionCount: Number(data.dailyTransactionCount),
        monthlyTransactionCount: Number(data.monthlyTransactionCount),
      },
      {
        onSuccess: () => {
          handleClose()
        },
      }
    )
  }
  return (
    <CustomDialog
      open={open}
      handleClose={handleClose}
      title="افزودن سقف"
      actions={
        <Button onClick={handleSubmit} variant="contained" size="large" sx={{ m: '8px' }}>
          تایید
        </Button>
      }>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="name"
            label="نام"
            value={data.name}
            onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={data.dailyAmount}
            label="سقف تعداد (روزانه) "
            name="dailyAmount"
            onChange={(e) => setData((prev) => ({ ...prev, dailyAmount: Number(e.target.value) }))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={data.monthlyAmount}
            label="سقف تعداد (ماهانه) "
            name="monthlyAmount"
            onChange={(e) => setData((prev) => ({ ...prev, monthlyAmount: Number(e.target.value) }))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={data.dailyTransactionCount}
            label="سقف مبلغ (روزانه) "
            name="dailyTransactionCount"
            onChange={(e) => setData((prev) => ({ ...prev, dailyTransactionCount: Number(e.target.value) }))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={data.monthlyTransactionCount}
            label="سقف مبلغ (ماهانه) "
            name="monthlyTransactionCount"
            onChange={(e) => setData((prev) => ({ ...prev, monthlyTransactionCount: Number(e.target.value) }))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={data.perTransactionAmount}
            label="به ازای هر تراکنش"
            name="perTransactionAmount"
            onChange={(e) => setData((prev) => ({ ...prev, perTransactionAmount: Number(e.target.value) }))}
          />
        </Grid>
      </Grid>
    </CustomDialog>
  )
}

export default CreateScopeLimitDialog
