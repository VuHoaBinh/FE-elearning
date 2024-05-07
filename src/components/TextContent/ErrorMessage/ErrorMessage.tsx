import { Typography } from '@mui/material'

interface ErrorMessageProps {
  message?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Typography variant="body2" component="span" marginTop={0.5} fontWeight={600} color="#f52727">
      {message}
    </Typography>
  )
}

export default ErrorMessage
