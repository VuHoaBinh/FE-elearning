import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'
import MediaContent from 'src/components/MediaContent'

import TextContent from 'src/components/TextContent'
import { InputSelectProps, ValueInputSelectType } from './InputSelect.type'

const InputSelect: React.FC<InputSelectProps> = (props) => {
  const {
    label,
    list,
    name,
    errorMessage,
    required,
    border = true,
    onChange,
    defaultValue,
    style,
    icon,
    hideErrorMessage = false,
    disabled = false,
    placeholder,
    ...rest
  } = props

  const [value, setValue] = React.useState<ValueInputSelectType>('')

  React.useEffect(() => {
    if (defaultValue || typeof defaultValue === 'boolean') {
      setValue(defaultValue)
    }
  }, [defaultValue])

  const handleChange = (event: SelectChangeEvent<ValueInputSelectType>) => {
    const selectValue = event.target.value

    setValue(selectValue)
    onChange?.(selectValue)
  }

  return (
    <Box
      fontStyle={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TextContent.Label label={label} required={required} />

      <FormControl fullWidth>
        <Select
          disabled={disabled}
          displayEmpty
          renderValue={
            defaultValue || typeof defaultValue === 'boolean'
              ? undefined
              : () => <Box sx={{ color: '#aaa', fontWeight: 'normal' }}>{placeholder}</Box>
          }
          onChange={handleChange}
          sx={{
            fontSize: '14px',
            height: 47,
            borderRadius: '12px',
            fontWeight: 'bold',
            background: 'white',
            '& .MuiOutlinedInput-input': {
              display: 'flex',
              gap: '8px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: border ? '1px solid #e2e8f0' : 'none',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: border ? '1px solid #e2e8f0' : 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: border ? '1px solid #1976d2' : 'none',
            },
            ...style,
          }}
          {...rest}
          value={value}
        >
          {list.map((item: any, index) => (
            <MenuItem
              value={item.value}
              key={index}
              // sx={{
              //   fontSize: '14px',
              //   color: '#000',
              //   fontWeight: 'medium',
              //   gap: '8px',
              // }}
            >
              {icon && <MediaContent.Icon icon={icon} size={18} />} 
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!hideErrorMessage && (
        <Typography variant="h2" component="span" marginTop={0.5} fontWeight={600} color="#f52727">
          {errorMessage}
        </Typography>
      )}
    </Box>
  )
}

export default InputSelect
