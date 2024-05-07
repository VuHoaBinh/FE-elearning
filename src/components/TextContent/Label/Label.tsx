import { Typography } from "@mui/material";

interface LabelProps {
  label?: string;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ label, required }) => {
  if (!label) return <></>;
  return (
    <Typography variant="body1" component="span" fontWeight={700}>
      {label}
      {required && (
        <Typography ml={2} variant="body1" color="red" component="span">
          *
        </Typography>
      )}
    </Typography>
  );
};

export default Label;
