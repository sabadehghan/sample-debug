import GeneralTable from '@/components/GeneralTable'
import useServices from '@/hooks/useServices'
import { theme } from '@/themes/mui'
import { Box, Chip, Grid, Tooltip, Typography } from '@mui/material'
import { GiMoneyStack } from 'react-icons/gi'
import { useParams } from 'react-router-dom'
import { prettyPrintJson, FormatOptions } from 'pretty-print-json'
import { useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import { IoMdCheckmark } from 'react-icons/io'

const Document = () => {
  const { docsName } = useParams()

  const { serviceDetailQuery } = useServices(docsName)
  const { data: serviceData, isLoading } = serviceDetailQuery

  const [copied, setCopied] = useState(false)
  const options: FormatOptions = { linkUrls: true }

  if (!isLoading) {
    const resourceDoc = serviceData.result.resourceDoc
    let sampleRequestHtml, sampleResponseHtml
    try {
      const sampleRequest = JSON.parse(resourceDoc.sampleRequest)
      const sampleResponse = JSON.parse(resourceDoc.sampleResponse)

      sampleRequestHtml = JSON.stringify(sampleRequest, null, 2)
      sampleResponseHtml = JSON.stringify(sampleResponse, null, 2)
    } catch (error) {
      console.error('Error parsing JSON:', error)
      sampleRequestHtml = 'Error parsing request JSON'
      sampleResponseHtml = 'Error parsing response JSON'
    }

    function copyTextHandler() {
      const jsonData = resourceDoc.sampleRequest
      if (jsonData) {
        navigator.clipboard.writeText(jsonData).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
      }
    }

    if (resourceDoc) {
      return (
        <Box bgcolor="white" height="100%" width="100%" borderRadius={6} padding={6}>
          <Grid container height="100%" width="100%" direction="column" gap={3} margin={0}>
            <Grid item container alignItems="center">
              <Grid item alignItems="center" sx={{ display: 'flex', gap: '10px' }}>
                <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontSize: '30px', fontWeight: 900 }}>
                  {resourceDoc.label || resourceDoc.name}
                </Typography>

                <Typography variant="h6" sx={{ color: '#414141' }}>
                  {resourceDoc.isTransactional && (
                    <Tooltip title="تراکنش مالی" placement="top" arrow>
                      <span style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
                        <GiMoneyStack color={theme.palette.success.dark} size={36} style={{ marginTop: '12px' }} />
                      </span>
                    </Tooltip>
                  )}
                </Typography>
                <Typography variant="subtitle1">({resourceDoc.name})</Typography>
              </Grid>
            </Grid>

            <Grid item container display="flex" justifyContent="center">
              <Grid
                item
                container
                flexDirection="row-reverse"
                alignItems="center"
                sx={{
                  backgroundColor: '#F5F5F5',
                  borderRadius: '8px',
                  height: '39px',
                }}>
                <Grid item>
                  <Chip
                    sx={{
                      borderRadius: 2,
                      lineHeight: 'normal',
                      fontSize: 18,
                      fontWeight: 400,
                      color: 'white',
                      width: '86px',
                      height: '39px',
                      backgroundColor:
                        resourceDoc.method === 'GET'
                          ? '#40A69F'
                          : resourceDoc.method === 'POST'
                          ? '#4AD15F'
                          : resourceDoc.method === 'PUT'
                          ? '#F4C542'
                          : resourceDoc.method === 'DELETE'
                          ? '#E57373'
                          : 'defaultColor',
                    }}
                    label={resourceDoc.method}
                    color={
                      resourceDoc.method === 'GET'
                        ? 'info'
                        : resourceDoc.method === 'POST'
                        ? 'success'
                        : resourceDoc.method === 'PUT'
                        ? 'warning'
                        : resourceDoc.method === 'DELETE'
                        ? 'error'
                        : 'default'
                    }
                  />
                </Grid>
                <Grid item marginRight={6}>
                  <Typography variant="h6" sx={{ fontSize: '18px' }}>
                    {resourceDoc.link}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container flexDirection="column">
              <Grid item>
                <Typography sx={{ color: 'black', fontSize: '18px', fontWeight: 400, margin: '36px 0' }}>
                  {resourceDoc.description || 'بدون توضیحات'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  پارامترهای ورودی:
                </Typography>
              </Grid>
              <Grid item container>
                <GeneralTable
                  columns={[
                    { id: 'name', label: 'نام' },
                    { id: 'label', label: 'برچسب' },
                    { id: 'description', label: 'توضیحات' },
                    { id: 'isRequired', label: 'اجباری' },
                    { id: 'defaultValue', label: 'مقدار پیش فرض' },
                    { id: 'regex', label: 'فرمت' },
                  ]}
                  rows={resourceDoc.requestBody.map((request: any, index: number) => ({
                    id: index + 1,
                    name: request.name,
                    label: request.label,
                    description: request.description,
                    isRequired: request.isRequired ? 'بله' : 'خیر',
                    defaultValue: request.defaultValue,
                    regex: <Box sx={{ direction: 'rtl' }}>{request.regex}</Box>,
                    subElements: request.subElements,
                  }))}
                />
              </Grid>
            </Grid>

            <Grid item container flexDirection="column">
              <Grid item>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  پارامترهای خروجی:
                </Typography>
              </Grid>
              <Grid item container>
                <GeneralTable
                  columns={[
                    { id: 'name', label: 'نام' },
                    { id: 'label', label: 'برچسب' },
                    { id: 'description', label: 'توضیحات' },
                    { id: 'regex', label: 'فرمت' },
                  ]}
                  rows={resourceDoc.responseBody.map((request: any, index: number) => ({
                    id: index + 1,
                    name: request.name,
                    label: request.label,
                    description: request.description,
                    regex: <Box sx={{ direction: 'rtl' }}>{request.regex}</Box>,
                  }))}
                />
              </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  backgroundColor: theme.palette.background.default,
                  width: '1000px',
                  m: '2rem',
                  p: '1rem 2rem',
                  direction: 'rtl',
                }}>
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: '25px',
                      color: theme.palette.primary.main,
                      textAlign: 'left',
                      mb: 1,
                    }}>
                    نمونه ورودی سرویس
                  </Typography>
                </Grid>

                <Box
                  sx={{
                    backgroundColor: 'white',
                    p: 2,
                    borderRight: `2px solid ${theme.palette.primary.main}`,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    overflowX: 'auto',
                  }}>
                  <div>
                    {copied ? (
                      <IoMdCheckmark
                        size={'22px'}
                        style={{ cursor: 'pointer', color: theme.palette.success.main, marginBottom: '20px' }}
                      />
                    ) : (
                      <FaCopy
                        onClick={copyTextHandler}
                        size={'22px'}
                        style={{ cursor: 'pointer', color: theme.palette.primary.main, marginBottom: '20px' }}
                      />
                    )}
                  </div>
                  <pre>{sampleResponseHtml}</pre>
                </Box>
              </Box>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  backgroundColor: theme.palette.background.default,
                  width: '1000px',
                  m: '2rem',
                  p: '1rem 2rem',
                  direction: 'rtl',
                }}>
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: '25px',
                      color: theme.palette.primary.main,
                      textAlign: 'left',
                      mb: 1,
                    }}>
                    نمونه خروحی سرویس
                  </Typography>
                </Grid>

                <Box
                  sx={{
                    backgroundColor: 'white',
                    p: 2,
                    borderRight: `2px solid ${theme.palette.primary.main}`,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    overflowX: 'auto',
                  }}>
                  <div>
                    {copied ? (
                      <IoMdCheckmark
                        size={'22px'}
                        style={{ cursor: 'pointer', color: theme.palette.success.main, marginBottom: '20px' }}
                      />
                    ) : (
                      <FaCopy
                        onClick={copyTextHandler}
                        size={'22px'}
                        style={{ cursor: 'pointer', color: theme.palette.primary.main, marginBottom: '20px' }}
                      />
                    )}
                  </div>
                  <pre>{sampleRequestHtml}</pre>
                </Box>
              </Box>
            </div>
          </Grid>
        </Box>
      )
    } else {
      return (
        <Grid container height="100%" justifyContent="center" alignItems="center">
          'مستندات یافت نشد!'
        </Grid>
      )
    }
  }
}

export default Document
