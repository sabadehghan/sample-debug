import React, { useState } from 'react'
import CustomDialog from '@/components/CustomDialog'
import { Autocomplete, Button, Grid, TextField } from '@mui/material'
import useCompanies from '@/hooks/useCompanies'
import useAccess from '@/hooks/useAccess'
import { AccessType } from '@/services/accessServices'

interface CreateCompanyDialogProps {
  open: boolean
  onClose: () => void
}

type CompanyFormDataType = {
  name: string
  username: string
  password: string
  callbackUrl: string
  ip: string
  scopes: AccessType[]
  publicKey: string
  description: string
}

const INITIAL_COMPANY_FORM_DATA = {
  name: '',
  username: '',
  password: '',
  callbackUrl: '',
  ip: '',
  scopes: [],
  publicKey: '',
  description: '',
}

const CreateCompanyDialog: React.FC<CreateCompanyDialogProps> = ({ open, onClose }) => {
  const [data, setData] = useState<CompanyFormDataType>(INITIAL_COMPANY_FORM_DATA)

  const { createCompanyMutation } = useCompanies()
  console.log(createCompanyMutation)
  const { accessQuery } = useAccess()
  const { data: accessData, isLoading } = accessQuery

  const handleClose = () => {
    setData(INITIAL_COMPANY_FORM_DATA)
    onClose()
  }

  const handleSubmit = () => {
    createCompanyMutation.mutate(
      {
        name: data.name,
        username: data.username,
        password: data.password,
        callbackUrl: data.callbackUrl,
        scopes: data.scopes.map((item: AccessType) => ({ id: item.id })),
        ip: data.ip,
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
  console.log(data)
  return (
    <CustomDialog
      open={open}
      handleClose={handleClose}
      title="افزودن شرکت"
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
            name="username"
            label="نام کاربری"
            value={data.username}
            onChange={(e) => setData((prev) => ({ ...prev, username: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="password"
            label=" رمز عبور"
            value={data.password}
            onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
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
            getOptionLabel={(option) => option.name}
            multiple
            fullWidth
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

export default CreateCompanyDialog
