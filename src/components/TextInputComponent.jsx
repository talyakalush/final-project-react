import { Grid, TextField, Alert } from "@mui/material";
import PropTypes from "prop-types";
const TextInputComponent = ({
  xs,
  id,
  label,
  autoFocus,
  value,
  onChange,
  onBlur,
  errors,
  required,
}) => {
  const isPassword = id.toLowerCase().includes("password");
  return (
    <Grid item xs={xs}>
      <TextField
        name={id}
        required={required}
        fullWidth
        id={id}
        label={label}
        type={isPassword ? "password" : "text"}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errors && <Alert severity="error">{errors}</Alert>}
    </Grid>
  );
};

TextInputComponent.defaultProps = {
  xs: 6,
  autoFocus: false,
};

export default TextInputComponent;

TextInputComponent.prototype = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.Boolean,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.string,
  required: PropTypes.bool,
  xs: PropTypes.number,
};
