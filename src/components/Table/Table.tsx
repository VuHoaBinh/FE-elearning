import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import { Box, Button, Tooltip } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import classNames from 'classnames'
import React, { useState } from 'react'
import TableNone from './TableNone/TableNone'
import { TableProps } from './Table.type'
import './Table.scss'

const Table: React.FC<TableProps> = ({
  title,
  className,
  btnAdd = true,
  btnMultiDeleted = true,
  btnHandle,
  btnSearch,
  titleBtnAdd = 'Thêm mới',
  titleBtnMultiDelete = 'Xoá thông tin',
  rowsData,
  columnsData = [],
  isLoading = false,
  isCheckBoxSelection = true,
  isModify = true,
  isViewActions = true,
  isViewDetail = false,
  onPageSize,
  onPage,
  getRowId,
  total = 0,
  handleAddItem,
  onDeleteSelectMultiItem,
  // onDeleteItem
  onModifyItem,
  onViewItemDetail,
}) => {
  const [pageSize, setPageSize] = useState(5)
  const [multiSelect, setMultiSelect] = useState<string[] | number[]>([])

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Thao tác',
    sortable: false,
    flex: 1,
    renderCell: ({ id }) => {
      return (
        <div style={{ display: 'flex', gap: 20 }}>
          {isModify && (
            <Tooltip title="Cập nhật thông tin" onClick={() => onModifyItem?.(id)}>
              <EditIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          )}
          {isViewDetail && (
            <Tooltip title="Thông tin chi tiết" onClick={() => onViewItemDetail?.(id)}>
              <InfoIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          )}
        </div>
      )
    },
  }

  const handleChangePage = (newPage: number) => {
    onPage?.(newPage + 1)
  }

  const handlePageSizeChange = (pageSize: number) => {
    onPageSize?.(pageSize)
    setPageSize(pageSize)
  }

  const handleDeleteMultiSelectItem = () => {
    onDeleteSelectMultiItem?.(multiSelect)
  }

  return (
    <div className={classNames(className, 'table-container')}>
      <span className="title">{title}</span>

      <div className="btns">
        <Box className="search">{btnSearch}</Box>
        <Box className="handle">
          {btnAdd && (
            <Button variant="contained" color="secondary" onClick={handleAddItem}>
              {titleBtnAdd}
            </Button>
          )}
          {btnHandle}

          {btnMultiDeleted && multiSelect.length > 0 && (
            <Button variant="contained" color="warning" onClick={handleDeleteMultiSelectItem}>
              {titleBtnMultiDelete}
            </Button>
          )}
        </Box>
      </div>
      <DataGrid
        className="data-grid"
        getRowId={getRowId}
        autoHeight
        checkboxSelection={isCheckBoxSelection}
        disableColumnMenu
        components={{
          // Toolbar: TableToolBar,
          // Pagination: TablePagination,
          NoRowsOverlay: TableNone,
        }}
        componentsProps={{
          pagination: {
            labelRowsPerPage: 'Số lượng hiển thị',
          },
        }}
        onSelectionModelChange={(id: any) => setMultiSelect(id)}
        loading={isLoading}
        rowSpacingType="border"
        onPageChange={handleChangePage}
        onPageSizeChange={handlePageSizeChange}
        rows={rowsData?.length > 0 ? rowsData : []}
        columns={isViewActions ? [...columnsData, actions] : columnsData}
        // page={page}
        pageSize={pageSize}
        rowCount={total}
        paginationMode="server"
        rowsPerPageOptions={[5, 10, 15]}
        density="standard"
        pagination
      />
    </div>
  )
}
export default Table
