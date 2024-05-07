import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingBackdropProps {
  isLoading: boolean;
}

const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({
  isLoading = false,
}) => {
  return (
    <Backdrop
      // sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      sx={{ color: "#fff", zIndex: 99999 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
export default LoadingBackdrop;
