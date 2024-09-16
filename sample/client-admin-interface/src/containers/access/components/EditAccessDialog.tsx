import CustomDialog from '@/components/CustomDialog'
import useAccess from '@/hooks/useAccess'
import useScopeLimit from '@/hooks/useScopeLimit'
import useServices from '@/hooks/useServices'
import { AccessType } from '@/services/accessServices'
import { ServicesType } from '@/services/servicesServices'
import { Autocomplete, Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface EditAccessDialogProps {
  open: boolean
  onClose: () => void
  access: AccessType | null
}

type AccessFormDataType = {
  name: string
  description: string
  services: ServicesType[]
  expireTimeByDay: number
  type: string
  scopeLimit: { name: string }
}

const INITIAL_ACCESS_FORM_DATA = {
  name: '',
  services: [],
  scopeLimit: {
    name: '',
  },
  description: '',
  expireTimeByDay: 0,
  type: '',
}
const EditAccessDialog: React.FC<EditAccessDialogProps> = ({ open, onClose, access }) => {
  const [data, setData] = useState<AccessFormDataType>(INITIAL_ACCESS_FORM_DATA)
  const typeData = ['CLIENT_CREDENTIALS', 'AUTHORIZATION_CODE_GRANT']

  const { serviceQuery } = useServices()
  const { data: servicesData, isLoading } = serviceQuery

  const { scopeLimitQuery } = useScopeLimit()
  const { data: scopeLimitData } = scopeLimitQuery

  const { updateAccessMutation } = useAccess()

  useEffect(() => {
    if (access)
      setData({
        name: access?.name,
        description: access?.description,
        services: access?.services,
        scopeLimit: access?.scopeLimit,
        type: access?.type,
        expireTimeByDay: access?.expireTimeByDay,
      })
  }, [access])

  const handleSubmit = () => {
    updateAccessMutation.mutate(
      {
        name: data.name,
        description: data.description,
        scopeLimit: {
          name: data.scopeLimit.name,
        },
        services: data.services.map((item) => item.name),
        type: data.type,
        expireTimeByDay: data.expireTimeByDay,
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
      title="ویرایش دسترسی"
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
            label="نام"
            value={data.name}
            onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={servicesData?.result?.resources ?? []}
            value={data.services}
            onChange={(_, newValue) => {
              setData((prev) => ({
                ...prev,
                services: newValue,
              }))
            }}
            getOptionLabel={(option) => `${option.name}`}
            fullWidth
            multiple
            loading={isLoading}
            renderInput={(params) => <TextField {...params} label="سرویس ها" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={scopeLimitData?.result?.scopeLimits ?? []}
            value={data.scopeLimit}
            onChange={(_, newValue) => {
              setData((prev) => ({
                ...prev,
                scopeLimit: newValue as { name: string },
              }))
            }}
            getOptionLabel={(option) => `${option.name}`}
            renderInput={(params) => <TextField {...params} label="سقف" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={typeData}
            value={data.type}
            onChange={(_, newValue) => {
              setData((prev) => ({
                ...prev,
                type: newValue as string,
              }))
            }}
            renderInput={(params) => <TextField {...params} label="نوع" />}
          />
        </Grid>
      </Grid>
    </CustomDialog>
  )
}

export default EditAccessDialog
