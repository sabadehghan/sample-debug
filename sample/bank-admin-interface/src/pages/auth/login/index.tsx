import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { theme } from '@/themes/mui'
import styles from '@/styles/login.module.css'
import useLogin from '@/hooks/useLogin'

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' })
  const navigate = useNavigate()
  const { loginAccess } = useLogin()

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await loginAccess.mutateAsync({
        username: formValues.username,
        password: formValues.password,
      })
      navigate('/companies')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <Grid container component="main" justifyContent="end" bgcolor="white" sx={{ height: '100vh' }}>
      <Grid item xs={12} md={7} className={styles.background}>
        <Typography
          component="h1"
          sx={{
            position: 'absolute',
            right: '50%',
            transform: 'translateX(50%)',
            top: '10%',
            color: 'white',
            fontSize: 40,
            fontWeight: 700,
            [theme.breakpoints.up('md')]: {
              top: '50%',
              transform: 'translate(-50%, 0%)',
              right: '0%',
              fontSize: 60,
            },
          }}>
          + Kariz
        </Typography>
      </Grid>

      <Box
        bgcolor="white"
        boxShadow="4"
        sx={{
          width: '90%',
          position: 'absolute',
          left: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          p: 3,
          borderRadius: 6,
          display: 'flex',
          gap: 2,
          flexDirection: 'column',
          alignItems: 'center',
          [theme.breakpoints.up('md')]: {
            width: '50%',
            p: 4,
            px: 6,
          },
          [theme.breakpoints.up('xl')]: {
            width: '30%',
            left: '20%',
          },
        }}>
        <Typography component="h2" alignSelf="start" sx={{ fontSize: 20, fontWeight: 600 }}>
          ورود
        </Typography>
        <Typography component="h4" alignSelf="start" sx={{ fontSize: 14 }}>
          جهت ورود نام کاربری و پسور خود را وارد کنید
        </Typography>
        <Box component="form" onSubmit={handleLogin} width="100%" noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="نام کاربری"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={inputHandler}
            value={formValues.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="رمز عبور"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={inputHandler}
            value={formValues.password}
          />
          <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 4, mb: 2, py: 1.5 }}>
            ورود
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

export default LoginPage
