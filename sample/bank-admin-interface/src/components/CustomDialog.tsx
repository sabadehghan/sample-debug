import { Dialog, DialogTitle, IconButton, DialogContent, DialogActions } from "@mui/material"
import { CgClose } from "react-icons/cg"

interface CustomDialogProps {
    fullWidth?: boolean
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    open: boolean
    handleClose: () => void
    title?: string
    actions?: React.ReactNode
    children?: React.ReactNode
}

const CustomDialog: React.FC<CustomDialogProps> = ({ fullWidth = true, maxWidth = 'xs', open, handleClose, title, actions, children }) => {
    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { borderRadius: '16px' } }}
        >
            <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    left: 8,
                    top: 10,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CgClose />
            </IconButton>
            {title && <DialogTitle marginLeft={4}>{title}</DialogTitle>}


            <DialogContent>
                {children}
            </DialogContent>

            {actions && (
                <DialogActions>
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    )
}

export default CustomDialog