import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import teacherApi from "src/apis/teacherApi";
import BoxContent from "src/components/BoxContent";
import FormControl from "src/components/FormControl";
import LoadingContent from "src/components/LoadingContent";
import TextContent from "src/components/TextContent";
import RevenueInvoiceItem from "src/pages/AdminPage/StatisticManage/RevenueTeacherStatistic/RevenueInvoiceItem";
import { IInvoice, ITeacher } from "src/types";
import formatCharacter from "src/utils/formatCharacter";
import formatDate from "src/utils/formatDate";
import "./TeacherRevenue.scss";

export default function TeacherRevenue() {
  document.title = "Doanh thu cá nhân";

  const [dateRange, setDateRange] = useState<any>();
  const [teacherInfo, setTeacherInfo] = useState<ITeacher>();
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // console.log("date range", dateRange);
    dateRange && getTeacherRevenue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  const getTeacherRevenue = async () => {
    setIsLoading(true);
    try {
      const response = await teacherApi.getTeacherRevenueByRangeDate(dateRange);

      // console.log("response", response);
      const { teacher, detailInvoices }: any = response;
      // console.log("teacher", teacher);
      // console.log(" detailInvoices", detailInvoices);
      setInvoices(detailInvoices);
      setTeacherInfo(teacher);
      setIsLoading(false);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setIsLoading(false);
    }
  };

  const renderRevenueInvoices = (invoices: IInvoice[] = []) => {
    if (invoices.length > 0) {
      return invoices.map((invoice, index) => (
        <RevenueInvoiceItem data={invoice} key={index} />
      ));
    }

    return <div>Không có thông tin</div>;
  };

  return (
    <div className="teacher-revenue">
      {/* <BoxContent.NormalContent style={{ gap: 30 }}> */}
      <TextContent.NormalText
        type="title-header"
        content={`Doanh thu từ ngày ${formatDate.getDate(
          dateRange?.start,
          "dd-MM-yyyy HH:mm:ss"
        )} đến ngày
        ${formatDate.getDate(dateRange?.end, "dd-MM-yyyy HH:mm:ss")}`}
      />
      <Box sx={{ display: "flex", gap: 1 }}>
        <FormControl.DateRangePicker onChange={(date) => setDateRange(date)} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div className="revenue-teacher-info">
          <TextContent.NormalText
            type="title-header"
            content="Thông tin giản viên"
          />
          <div className="info">
            <BoxContent.ContentInfo
              title="Tên giảng viên:"
              content={teacherInfo?.fullName}
              type="fit-content"
              style={{ gap: 5 }}
            />
            <BoxContent.ContentInfo
              title="Tổng số lượng đã bán trong tháng:"
              content={teacherInfo?.numOfDetailInvoice}
              type="fit-content"
              style={{ gap: 5 }}
            />
            <BoxContent.ContentInfo
              title="Tổng số tiền nhận được:"
              content={formatCharacter.numberLocale(
                teacherInfo?.revenue,
                " đồng"
              )}
              type="fit-content"
              style={{ gap: 5 }}
            />
          </div>
        </div>
        <Divider />
        <div className="revenue-teacher-content">
          <TextContent.NormalText
            type="title-header"
            content="Thông tin các khoá học đã bán trong tháng"
          />

          <div className="content">
            {!isLoading ? (
              renderRevenueInvoices(invoices)
            ) : (
              <LoadingContent.Loading />
            )}
          </div>
        </div>
      </Box>
      {/* </BoxContent.NormalContent> */}
    </div>
  );
}
