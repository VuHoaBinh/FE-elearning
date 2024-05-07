import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import adminApi from 'src/apis/adminApi'
import Table from 'src/components/Table'
import { IUser } from 'src/types/user'
import { getHeaderColumns, getNewHeaderColumn } from 'src/utils'
import CreateAccount from './CreateAccount'
import DeleteAccount from './DeleteUser'
import MultiDeleteAccount from './MultiDeleteAccount'
import UpdateAccount from './UpdateAccount'
import { ICourse } from 'src/types'
import courseApi from 'src/apis/courseApi'

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
]

export default function StudentList() {
  const [users, setUsers] = useState<IUser[]>([])
  const [userId, setUserId] = useState<string | number>('')
  const [userIds, setUserIds] = useState<string[] | number[]>([])
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<ICourse[]>([])

  //pagination
  const [total, setTotal] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(5)
  const [page, setPage] = useState<number>(1)

  //modal
  const [showDelete, setShowDelete] = useState(false)
  const [showMultiDelete, setShowMultiDelete] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)

  //check status
  const [isCreateCompleted, setIsCreateCompleted] = useState(false)
  const [isDeleteCompleted, setIsDeleteCompleted] = useState(false)
  const [isMultiDeleteCompleted, setIsMultiDeleteCompleted] = useState(false)
  const [isUpdateCompleted, setIsUpdateCompleted] = useState(false)

  useEffect(() => {
    getStudents()
    getCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])

  useEffect(() => {
    if (isCreateCompleted || isDeleteCompleted || isMultiDeleteCompleted || isUpdateCompleted) {
      getStudents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateCompleted, isDeleteCompleted, isMultiDeleteCompleted, isUpdateCompleted])

  const getStudents = async () => {
    setLoading(true)
    const params = { page, limit: pageSize }
    // console.log("params nè", params);
    try {
      const response = await adminApi.getStudents(params)
      const { users, total }: any = response

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

  const getCourses = async () => {
    setLoading(true)
    try {
      const response = await courseApi.getCourses({ publish: true })
      const { courses }: any = response
      setCourses(courses)
    } catch (error) {
      console.log('lỗi rồi', { error })
      setLoading(false)
    }
  }

  const handleModifyItem = async (id: string | number) => {
    setUserId(id)
    setShowUpdate(true)
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
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        getRowId={(row) => row.user._id}
        titleBtnAdd="Tạo tài khoản mới"
        isLoading={loading}
        title="Danh sách thông tin học sinh"
        columnsData={columnsHeader}
        rowsData={users}
        total={total}
        handleAddItem={() => setShowCreate(true)}
        onDeleteItem={handleDelete}
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
        courses={courses}
        isStudent={true}
      />
      <UpdateAccount
        id={userId}
        show={showUpdate}
        isUpdate={(status) => setIsUpdateCompleted(status)}
        onClose={() => setShowUpdate(false)}
        setShow={setShowUpdate}
        courses={courses}
        isStudent={true}
      />
    </>
  )
}
