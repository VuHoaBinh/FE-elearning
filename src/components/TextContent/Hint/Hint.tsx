import { Typography } from "@mui/material";

interface HintProps {
  hint?: string;
}

const Hint: React.FC<HintProps> = ({ hint }) => {
  if (hint) return <></>;
  return (
    <Typography variant="caption" component="span">
      {hint}
    </Typography>
  );
};

export default Hint;
