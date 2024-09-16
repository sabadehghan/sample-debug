import CustomDialog from '@/components/CustomDialog'
import useScopeLimit from '@/hooks/useScopeLimit'
import { ScopeLimitType } from '@/services/scopeLimitServices'
import { Button, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

interface EditScopeLimitDialogProps {
  open: boolean
  onClose: () => void
  scopeLimit: ScopeLimitType | null
}

const INITIAL_SCOPE_LIMIT_FORM_DATA = {
  name: '',
  dailyAmount: null,
  dailyTransactionCount: null,
  monthlyAmount: null,
  monthlyTransactionCount: null,
  perTransactionAmount: null,
}

const EditScopeLimitDialog: React.FC<EditScopeLimitDialogProps> = ({ open, onClose, scopeLimit }) => {
  const [data, setData] = useState<ScopeLimitType>(INITIAL_SCOPE_LIMIT_FORM_DATA)

  const { updateScopeLimitMutation } = useScopeLimit()

  useEffect(() => {
    if (scopeLimit)
      setData({
        name: scopeLimit.name,
        dailyAmount: scopeLimit.dailyAmount,
        dailyTransactionCount: scopeLimit.dailyTransactionCount,
        monthlyAmount: scopeLimit.monthlyAmount,
        monthlyTransactionCount: scopeLimit.monthlyTransactionCount,
        perTransactionAmount: scopeLimit.perTransactionAmount,
      })
  }, [scopeLimit])
  const handleSubmit = () => {
    updateScopeLimitMutation.mutate(
      {
        ...scopeLimit,
        name: data.name,
        dailyAmount: data.dailyAmount,
        monthlyAmount: data.monthlyAmount,
        dailyTransactionCount: data.dailyTransactionCount,
        monthlyTransactionCount: data.monthlyTransactionCount,
        perTransactionAmount: data.perTransactionAmount,
      },
      {
        onSuccess: () => {
          onClose()
        },
      }
    )
  }
  return (
    <CustomDialog
      open={open}
      handleClose={onClose}
      title="ویرایش سقف"
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

export default EditScopeLimitDialog
