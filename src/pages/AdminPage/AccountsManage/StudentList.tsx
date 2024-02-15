import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import adminApi from 'src/apis/adminApi'
import Table from 'src/components/Table'
import { IUser } from 'src/types/user'
import { getHeaderColumns, getNewHeaderColumn } from 'src/utils'
import CreateAccount from './CreateAccount'
import DeleteAccount from './DeleteUser'
import MultiDeleteAccount from './MultiDeleteAccount'
import UploadAccountByExcel from './UploadAccountByExcel'
import AccountDetail from './AccountDetail'
import { Box } from '@mui/material'
import FormControl from 'src/components/FormControl'
import { useTypingDebounce } from 'src/hooks'
import UpdateAccount from './UpdateAccount'


const columnsHeader: GridColDef[] = [
  {
    field: '_id',
    headerName: 'STT',
    width: 60,
    hide: true,
  },
  {
    field: 'id',
    headerName: 'STT',
    width: 60,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'email',
    headerName: 'Họ và tên',
    flex: 1,
  },
  {
    field: 'fullName',
    headerName: 'Họ và tên',
    flex: 1,
  },
  {
    field: 'phone',
    headerName: 'Số điện thoại',
    flex: 1,
  },
  {
    field: 'course',
    headerName: 'Khóa học',
    flex: 1.5,
    renderCell: ({ value }) => {
      return <div>{value.name}</div>
    },
  },
  {
    field: 'isPaid',
    headerName: 'Đã Nộp',
    flex: 0.75,
    renderCell: ({ value }) => {
      return <div>{value?.isPaid ? 'Đã Nộp' : 'Chưa Nộp'}</div>
    },
  },
]

export default function StudentList() {
  const [users, setUsers] = useState<IUser[]>([])
  const [userId, setUserId] = useState<string | number>('')
  const [userIds, setUserIds] = useState<string[] | number[]>([])
  const [loading, setLoading] = useState(false)

  // debounce
  const [value, setValue] = useState<string>()
  const debouncedValue = useTypingDebounce(value)
  const [email, setEmail] = useState<string>()

  
  //pagination
  const [total, setTotal] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(5)
  const [page, setPage] = useState<number>(1)

  //modal
  const [showDelete, setShowDelete] = useState(false)
  const [showMultiDelete, setShowMultiDelete] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  //check status
  const [isCreateCompleted, setIsCreateCompleted] = useState(false)
  const [isDeleteCompleted, setIsDeleteCompleted] = useState(false)
  const [isMultiDeleteCompleted, setIsMultiDeleteCompleted] = useState(false)
  const [isUpdateCompleted, setIsUpdateCompleted] = useState(false)
  const [isUploadCompleted, setIsUploadCompleted] = useState(false)

  useEffect(() => {
    getStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])

  useEffect(() => {
    if (isCreateCompleted || isDeleteCompleted || isMultiDeleteCompleted || isUploadCompleted || isUpdateCompleted) {
      getStudents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateCompleted, isDeleteCompleted, isMultiDeleteCompleted, isUploadCompleted,isUpdateCompleted])

  const getStudents = async () => {
    setLoading(true)
    const params = { page, limit: pageSize }
    // console.log("params nè", params);
    try {
      const response = await adminApi.getStudents(params)
      const { users, total }: any = response
      // console.log(users, total);

      if (users.length > 0) {
        const keys = getHeaderColumns(users[0], ['account'])
        const data = getNewHeaderColumn(users, keys, page, pageSize)

        const userData = data.map((data, index) => {
          return {
            ...data,
            email: users[index].account.email,
            phone: users[index].user.phone,
            fullName: users[index].user.fullName,
          }
        })

        setUsers(userData)
      } else {
        setUsers(users)
      }
      setLoading(false)
      setTotal(total)
    } catch (error) {
      console.log('lỗi rồi', { error })
      setLoading(false)
    }
  }
//debounce to search
useEffect(() => {
  setEmail(debouncedValue)
}, [debouncedValue])

const handleModifyItem = async (id: string | number) => {
  setUserId(id)
  setShowUpdate(true)
}
const handleViewDetail = async (id: string | number) => {
  setUserId(id)
  setShowDetail(true)
}
  const handleDelete = (id: string | number) => {
    setUserId(id)
    setShowDelete(true)
  }

  const handleMultiDeleted = (ids: string[] | number[]) => {
    setUserIds(ids)
    setShowMultiDelete(true)
  }
  return (
    <>
      <Table
      // search Students //////////////
        // btnHandle={
        //   <Box
        //     sx={{
        //       display: 'flex',
        //       flexDirection: 'row',
        //       alignItems: 'center',
        //       gap: 1,
        //     }}
        //   >
        //     <FormControl.Input
        //       style={{ width: 250 }}
        //       placeholder="Tìm kiếm bằng địa chỉ email"
        //       onChange={(e: any) => setValue(e.target.value)}
        //     />
            
        //   </Box>
        // }
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        getRowId={(row) => row._id}
        titleBtnAdd="Tạo tài khoản mới"
        isLoading={loading}
        title="Danh sách thông tin học sinh"
        columnsData={columnsHeader}
        rowsData={users}
        total={total}
        handleAddItem={() => setShowCreate(true)}
        onDeleteItem={handleDelete}
        onViewItemDetail={handleViewDetail}
        onModifyItem={handleModifyItem}
        onDeleteSelectMultiItem={handleMultiDeleted}
        // isViewActions={false}
      />
      <DeleteAccount
        isUpdate={(status) => setIsDeleteCompleted(status)}
        id={userId}
        show={showDelete}
        onClose={() => setShowDelete(false)}
        setShow={setShowDelete}
      />
      <MultiDeleteAccount
        isUpdate={(status) => setIsMultiDeleteCompleted(status)}
        ids={userIds}
        show={showMultiDelete}
        onClose={() => setShowMultiDelete(false)}
        setShow={setShowMultiDelete}
      />
      <CreateAccount
        isUpdate={(status) => setIsCreateCompleted(status)}
        show={showCreate}
        onClose={() => setShowCreate(false)}
        setShow={setShowCreate}
      />
      <UpdateAccount
        id={userId}
        show={showUpdate}
        isUpdate={(status) => setIsUpdateCompleted(status)}
        onClose={() => setShowUpdate(false)}
        setShow={setShowUpdate}
      />
      <UploadAccountByExcel
        isUpdate={(status) => setIsUploadCompleted(status)}
        show={showUpload}
        onClose={() => setShowUpload(false)}
        setShow={setShowUpload}
      />
      <AccountDetail id={userId} show={showDetail} onClose={() => setShowDetail(false)} />
    </>
  )
}
