import { TextField as MUITextField, TextFieldProps } from '@mui/material';

const TextField = (props: TextFieldProps) => {
  return <MUITextField variant="outlined" fullWidth {...props} />;
};

export default TextField;
