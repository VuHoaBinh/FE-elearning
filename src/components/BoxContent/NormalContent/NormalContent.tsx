import { Box } from '@mui/material'

interface NormalContentProps {
  style?: React.CSSProperties
  children: React.ReactNode
  flexDirectionType?: 'column' | 'row'
}

const NormalContent: React.FC<NormalContentProps> = ({
  children,
  style,
  flexDirectionType = 'column',
}) => {
  if (flexDirectionType === 'row') {
    return (
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={20}
        borderRadius={3}
        style={style}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={20} borderRadius={3} style={style}>
      {children}
    </Box>
  )
}

export default NormalContent
