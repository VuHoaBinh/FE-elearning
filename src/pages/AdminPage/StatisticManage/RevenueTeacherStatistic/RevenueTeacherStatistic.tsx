import { Box, Button, Divider, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import statisticApi from "src/apis/statisticApi";
import FormControl from "src/components/FormControl";
import Table from "src/components/Table";
import { LINK_DOMAIN, revenueSortTypes } from "src/data";
import { useTypingDebounce } from "src/hooks";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils";
import formatDate from "src/utils/formatDate";
import TopTeacherByYear from "./TopTeacherByYear";

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
    width: 60,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Địa chỉ email",
    width: 160,
    // align: "center",
    // headerAlign: "center",
  },

  {
    field: "fullName",
    headerName: "Họ và tên",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 140,
  },
  // {
  //   field: "numOfDetailInvoice",
  //   headerName: "Số lượng bán được",
  //   width: 160,
  //   align: "center",
  // },
  {
    field: "revenue",
    headerName: "Tiền lương",
    width: 200,
  },
];

const RevenueTeacherStatistic = () => {
  document.title = "Doanh thu giảng viên";
  const [loading, setLoading] = useState<boolean>(false);
  const [teacherRevenues, setTeacherRevenues] = useState<any[]>([]);
  const [excelHref, setExcelHref] = useState<string>();

  //for search
  const [sort, setSort] = useState<string>("revenue-asc");
  const [monthAndYear, setMonthAndYear] = useState<any>(new Date());

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [email, setEmail] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      month: new Date(monthAndYear).getMonth() + 1,
      year: new Date(monthAndYear).getFullYear(),
      exports: true,
      sort,
      page,
      pageSize,
      email,
    };

    // console.log("params là", params);
    getRevenueTeacherByMonth(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthAndYear, sort, page, pageSize, email]);

  //debounce to search
  useEffect(() => {
    setEmail(debouncedValue);
  }, [debouncedValue]);

  const getRevenueTeacherByMonth = async (params: any) => {
    setLoading(true);
    try {
      const response = await statisticApi.getTeacherRevenueByMonth(params);
      // console.log("lấy được dữ liệu là", response);
      const { file, result, total }: any = response;
      //   console.log("lấy được result là", result);

      if (result.length > 0) {
        const keys = getHeaderColumns(result[0]);
        const data = getNewHeaderColumn(result, keys, page, pageSize);
        const teacherRevenueData = data.map((data, index) => {
          return {
            ...data,
            email: result[index].account.email,
          };
        });

        setTeacherRevenues(teacherRevenueData);
      } else {
        setTeacherRevenues(result);
      }

      setExcelHref(file);
      setLoading(false);
      setTotal(total);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setLoading(false);
    }
  };

  const goToExcel = () => {
    if (!excelHref) {
      toast.warning("Link bị lỗi, hãy chọn ngày lại", {
        position: "bottom-right",
      });
      return;
    }
    //go to excel
    window.location.href = LINK_DOMAIN + excelHref;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingBottom: 10,
      }}
    >
      {/* <TopTeacherByEveryMonth />
      <Divider /> */}
      <TopTeacherByYear />
      <Divider />
      <Table
        btnSearch={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormControl.Input
              style={{ width: 250 }}
              placeholder="Tìm kiếm bằng địa chỉ email"
              hideErrorMessage={true}
              onChange={(e: any) => setValue(e.target.value)}
            />
            <FormControl.InputSelect
              hideErrorMessage={true}
              list={revenueSortTypes}
              defaultValue={sort}
              onChange={(status) => setSort(status)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["year", "month"]}
                label="Chọn tháng năm"
                minDate={new Date("2018-06-01")}
                maxDate={new Date()}
                value={monthAndYear}
                onChange={(newMonthAndYear) => {
                  setMonthAndYear(newMonthAndYear);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
            <Button variant="contained" color="success" onClick={goToExcel}>
              Xuất excel
            </Button>
          </Box>
        }
        title={`Danh sách bảng lương của giảng viên tháng ${formatDate.getDate(
          monthAndYear,
          "MM-yyyy"
        )}`}
        btnAdd={false}
        btnMultiDeleted={false}
        isCheckBoxSelection={false}
        isModify={false}
        getRowId={(row) => row._id}
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        total={total}
        titleBtnMultiDelete="Xoá mã khuyến mãi"
        titleBtnAdd="Tạo mã giảm giá mới"
        isLoading={loading}
        columnsData={columnsHeader}
        rowsData={teacherRevenues}
        onViewItemDetail={(id) => navigate(`${id}`)}
        // handleAddItem={() => setShowCreate(true)}
        // onModifyItem={handleModifyItem}
        // onDeleteSelectMultiItem={handleMultiDeleted}
      />
    </Box>
  );
};
export default RevenueTeacherStatistic;
