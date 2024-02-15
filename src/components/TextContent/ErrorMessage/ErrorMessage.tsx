import { Typography } from "@mui/material";

interface ErrorMessageProps {
  hideErrorMessage?: boolean;
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  hideErrorMessage,
  message,
}) => {
  if (hideErrorMessage) return <></>;
  return (
    <Typography
      variant="body2"
      component="span"
      marginTop={0.5}
      fontWeight={600}
      color="#f52727"
    >
      {message}
    </Typography>
  );
};

export default ErrorMessage;
