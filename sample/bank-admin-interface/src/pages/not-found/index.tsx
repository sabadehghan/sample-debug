import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h1">404</Typography>
            <Typography variant="h5">صفحه مورد نظر یافت نشد</Typography>
            <Link to="/">
                <Typography sx={{ mt: 4 }} variant="body1">خانه</Typography>
            </Link>
        </Box>
    );
}

export default NotFoundPage