import CustomDialog from '@/components/CustomDialog'
import useAccess from '@/hooks/useAccess'
import useCompanies from '@/hooks/useCompanies'
import { AccessType } from '@/services/accessServices'
import { CompanyType } from '@/services/companiesServices'
import { Autocomplete, Button, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

interface EditCompanyDialogProps {
  open: boolean
  onClose: () => void
  company: CompanyType | null
}

type CompanyFormDataType = {
  name: string
  callbackUrl: string
  ip: string
  scopes: AccessType[]
  publicKey: string
  description: string
}

const INITIAL_COMPANY_FORM_DATA = {
  name: '',
  callbackUrl: '',
  ip: '',
  scopes: [],
  publicKey: '',
  description: '',
}

const EditCompanyDialog: React.FC<EditCompanyDialogProps> = ({ open, onClose, company }) => {
  const [data, setData] = useState<CompanyFormDataType>(INITIAL_COMPANY_FORM_DATA)

  useEffect(() => {
    if (company)
      setData({
        name: company.name,
        callbackUrl: company.callbackUrl,
        ip: company.ip,
        scopes: company.scopes,
        description: company.description as string,
        publicKey: company.publicKey as string,
      })
  }, [company])

  const { accessQuery } = useAccess()
  const { updateCompanyMutation } = useCompanies()
  const { data: accessData, isLoading } = accessQuery

  const handleSubmit = () => {
    updateCompanyMutation.mutate(
      {
        ...company,
        name: data.name,
        callbackUrl: data.callbackUrl,
        ip: data.ip,
        scopes: data.scopes.map((item: AccessType) => ({ id: item.id })),
        publicKey: data.publicKey,
        description: data.description,
      },
      {
        onSuccess: () => {
          handleClose()
        },
      }
    )
  }

  const handleClose = () => {
    setData(INITIAL_COMPANY_FORM_DATA)
    onClose()
  }

  return (
    <CustomDialog
      open={open}
      handleClose={handleClose}
      title="ویرایش شرکت"
      maxWidth="sm"
      actions={
        <Button onClick={handleSubmit} variant="contained" size="large" sx={{ m: '8px' }}>
          تایید
        </Button>
      }>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="name"
            label="نام شرکت"
            value={data.name}
            onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="callbackUrl"
            label="Call Back URL"
            value={data.callbackUrl}
            onChange={(e) => setData((prev) => ({ ...prev, callbackUrl: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="ip"
            label="IP"
            value={data.ip}
            onChange={(e) => setData((prev) => ({ ...prev, ip: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={accessData?.result?.scopes ?? []}
            value={data.scopes}
            onChange={(_, newValue) => {
              setData((prev) => ({
                ...prev,
                scopes: newValue,
              }))
            }}
            fullWidth
            getOptionLabel={(option) => option.name}
            multiple
            loading={isLoading}
            renderInput={(params) => <TextField {...params} label="دسترسی ها" fullWidth />}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={4}
            label="کلید عمومی"
            fullWidth
            sx={{
              '& input': {
                textAlign: 'right',
              },
            }}
            value={data.publicKey}
            onChange={(e) => setData((prev) => ({ ...prev, publicKey: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={4}
            label="توضیحات"
            fullWidth
            value={data.description}
            onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
          />
        </Grid>
      </Grid>
    </CustomDialog>
  )
}

export default EditCompanyDialog
