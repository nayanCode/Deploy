import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function NativePickers() {
  return (
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="date"
        label="Document Issue Date"
        type="date"
        defaultValue="2001-10-06"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
  );
}
