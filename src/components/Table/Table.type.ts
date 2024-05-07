import { GridColDef } from '@mui/x-data-grid'
import { ReactNode } from 'react'

export interface TableProps {
  title?: string
  titleBtnAdd?: string
  titleBtnMultiDelete?: string
  columnsData?: GridColDef[]
  rowsData?: any
  className?: string
  isLoading?: boolean
  isCheckBoxSelection?: boolean
  isModify?: boolean
  isViewDetail?: boolean
  isViewActions?: boolean
  btnAdd?: boolean
  btnMultiDeleted?: boolean
  btnHandle?: ReactNode
  btnSearch?: ReactNode
  getRowId?: (rowId: any) => any
  onPageSize?: (pageSize: string | number) => void
  onPage?: (page: string | number) => void
  total?: number
  handleAddItem?: () => void
  onModifyItem?: (id: string | number) => void
  onDeleteSelectMultiItem?: (multiSelect: string[] | number[]) => void
  onDeleteItem?: (id: string | number) => void
  onViewItemDetail?: (id: string | number) => void
}
