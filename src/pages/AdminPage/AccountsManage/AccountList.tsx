import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import adminApi from "src/apis/adminApi";
import FormControl from "src/components/FormControl";
import Table from "src/components/Table";
import { accountTypes, statusTypes } from "src/data";
import { useTypingDebounce } from "src/hooks";
import { IUser } from "src/types/user";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils";
import translateVi from "src/utils/translateVi";
import CreateAccount from "./CreateAccount";
import DeleteAccount from "./DeleteUser";
import MultiDeleteAccount from "./MultiDeleteAccount";
import UpdateAccount from "./UpdateAccount";

const columnsHeader: GridColDef[] = [
  {
    field: "_id",
    headerName: "STT",
    width: 100,
    hide: true,
  },
  {
    field: "id",
    headerName: "STT",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 120,
  },
  {
    field: "role",
    headerName: "Chức vụ",
    width: 120,
  },
  {
    field: "email",
    headerName: "Địa chỉ email",
    width: 220,
  },
  {
    field: "fullName",
    headerName: "Họ và tên",
    width: 180,
  },
  { field: "phone", headerName: "Số điện thoại", width: 200 },
  {
    field: "gender",
    headerName: "Giới tính",
    width: 120,
  },
  // { field: "birthday", headerName: "Ngày sinh", width: 150 },
];

export default function AccountList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [userId, setUserId] = useState<string | number>("");
  const [userIds, setUserIds] = useState<string[] | number[]>([]);
  const [role, setRole] = useState("student");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [email, setEmail] = useState<string>();

  //modal
  const [showDelete, setShowDelete] = useState(false);
  const [showMultiDelete, setShowMultiDelete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  //check status
  const [isCreateCompleted, setIsCreateCompleted] = useState(false);
  const [isDeleteCompleted, setIsDeleteCompleted] = useState(false);
  const [isMultiDeleteCompleted, setIsMultiDeleteCompleted] = useState(false);
  const [isUpdateCompleted, setIsUpdateCompleted] = useState(false);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, isActive, email, page, pageSize]);

  useEffect(() => {
    if (
      isCreateCompleted ||
      isDeleteCompleted ||
      isMultiDeleteCompleted ||
      isUpdateCompleted
    ) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCreateCompleted,
    isDeleteCompleted,
    isMultiDeleteCompleted,
    isUpdateCompleted,
  ]);

  //debounce to search
  useEffect(() => {
    setEmail(debouncedValue);
  }, [debouncedValue]);

  const getUsers = async () => {
    setLoading(true);
    const params = { role, active: isActive, email, page, limit: pageSize };
    // console.log("params nè", params);
    try {
      const response = await adminApi.getUsers(params);
      const { users, total }: any = response;
      // console.log(users, total);

      if (users.length > 0) {
        const keys = getHeaderColumns(users[0], ["account"]);
        const data = getNewHeaderColumn(users, keys, page, pageSize);

        const userData = data.map((data, index) => {
          return {
            ...data,
            email: users[index].account.email,
            role: translateVi(users[index].account.role),
            status: users[index].account.isActive ? "Hoạt động" : "Đang khoá",
          };
        });

        setUsers(userData);
      } else {
        setUsers(users);
      }
      setLoading(false);
      setTotal(total);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setLoading(false);
    }
  };

  const handleModifyItem = async (id: string | number) => {
    setUserId(id);
    setShowUpdate(true);
  };
  const handleDelete = (id: string | number) => {
    setUserId(id);
    setShowDelete(true);
  };

  const handleMultiDeleted = (ids: string[] | number[]) => {
    setUserIds(ids);
    setShowMultiDelete(true);
  };

  return (
    <>
      <Table
        btnSearch={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FormControl.Input
              style={{ width: 250 }}
              placeholder="Tìm kiếm bằng địa chỉ email"
              onChange={(e: any) => setValue(e.target.value)}
            />
            <FormControl.InputSelect
              defaultValue={role}
              list={accountTypes}
              onChange={(role) => setRole(role)}
              style={{ border: "1px solid #e2e8f0" }}
            />
            <FormControl.InputSelect
              defaultValue={isActive}
              list={statusTypes}
              onChange={(status) => setIsActive(status)}
              style={{ border: "1px solid #e2e8f0" }}
            />
          </Box>
        }
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        getRowId={(row) => row._id}
        titleBtnAdd="Tạo tài khoản mới"
        isLoading={loading}
        title="Danh sách thông tin người dùng"
        columnsData={columnsHeader}
        rowsData={users}
        total={total}
        handleAddItem={() => setShowCreate(true)}
        onDeleteItem={handleDelete}
        onModifyItem={handleModifyItem}
        onDeleteSelectMultiItem={handleMultiDeleted}
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
    </>
  );
}
