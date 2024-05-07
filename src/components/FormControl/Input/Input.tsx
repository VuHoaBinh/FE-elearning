import { Box } from '@mui/material'
import classnames from 'classnames'
import React, { useState } from 'react'
import MediaContent from 'src/components/MediaContent'
import TextContent from 'src/components/TextContent'
import './Input.scss'
import { InputProps } from './Input.type'

const Input = React.forwardRef((props: InputProps, ref?: React.LegacyRef<HTMLInputElement>) => {
  const {
    label,
    type,
    className = '',
    name,
    errorMessage,
    icon,
    disabled,
    sizeIcon = 18,
    hint,
    required,
    autoComplete,
    accept,
    style,
    borderType = 'round',
    ...rest
  } = props

  const [focused, setFocused] = useState(false)
  const [show, setShow] = useState(false)

  return (
    <Box className={classnames(className)} style={style}>
      <TextContent.Label label={label} required={required} />
      <Box
        className={classnames(`input ${borderType}`, {
          focused,
          disabled,
        })}
      >
        <Box className="input-form">
          <input
            // required={required}
            name={name}
            type={show ? 'text' : type}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            autoComplete={autoComplete}
            ref={ref}
            accept={accept}
            {...rest}
          />
        </Box>

        {icon && (
          <MediaContent.Icon className="input-icon" size={sizeIcon} icon={icon} color={'#94A3B8'} />
        )}

        {type === 'password' && (
          <MediaContent.Icon
            style={{ marginRight: 16, cursor: 'pointer' }}
            onClick={() => setShow(!show)}
            size={18}
            icon={show ? 'eye' : 'eye-slash'}
            color={'#94A3B8'}
          />
        )}
      </Box>

      <TextContent.ErrorMessage message={errorMessage ?? ''} />
      <TextContent.Hint hint={hint} />
    </Box>
  )
})

export default Input
