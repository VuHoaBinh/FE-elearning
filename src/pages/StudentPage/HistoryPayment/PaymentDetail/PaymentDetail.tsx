import { Button, Divider } from "@mui/material";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import invoicesApi from "src/apis/invoicesApi";
import LoadingContent from "src/components/LoadingContent";
import MediaContent from "src/components/MediaContent";
import NavigationHeader from "src/components/NavigationHeader";
import { selectAuthorization } from "src/reducers";
import { IDetailInvoice, IInvoice } from "src/types";
import formatCharacter from "src/utils/formatCharacter";
import formatDate from "src/utils/formatDate";
import translateVi from "src/utils/translateVi";
import CoursePaymentDetail from "./CoursePaymentDetail/CoursePaymentDetail";
import "./PaymentDetail.scss";

const PaymentDetail = () => {
  document.title = "Thông tin chi tiết hoá đơn";

  const { isAuth } = useSelector(selectAuthorization);
  const { id } = useParams();

  const [invoice, setInvoice] = useState<IInvoice>({});
  const [show, setShow] = useState<boolean>(false);
  const [detailInvoice, setDetailInvoice] = useState<IDetailInvoice[]>([]);

  useEffect(() => {
    getPaymentDetail();
    setShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getPaymentDetail = async () => {
    try {
      const response = await invoicesApi.getInvoiceDetail(id);
      console.log("payment detail là", response);
      const { invoice }: any = response;
      const { detailInvoices }: any = invoice;
      // console.log("invoice là", invoice[0]);
      // console.log("detailInvoices là", detailInvoices);
      setDetailInvoice(detailInvoices);
      setInvoice(invoice);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderCoursePaymentDetail = (courses: IDetailInvoice[]) => {
    if (courses.length === 0) {
      return <LoadingContent.Loading />;
    }

    return (
      courses.length > 0 &&
      courses.map((course, index) => (
        <CoursePaymentDetail data={course} key={index} />
      ))
    );
  };

  const handlePrint = () => {
    setShow(true);
    window.print();
    setShow(false);
  };

  return (
    <>
      {!show && isAuth && <NavigationHeader />}
      <div className="payments-detail">
        <span className="title">
          Thông tin chi tiết hoá đơn: <i>{invoice?._id}</i>
        </span>

        <Button
          variant="contained"
          className={classNames(!show ? "btn-export" : "hide")}
          onClick={handlePrint}
        >
          Xuất Hoá Đơn
        </Button>

        <div className="invoice-info">
          <MediaContent.Image width={200} height={200} src={invoice.qrcode} />

          <table className="info">
            <tr>
              <th>Ngày in hoá đơn</th>
              <td>{formatDate.getDate("now", "dd-MM-yyyy HH:mm:ss")}</td>
            </tr>
            <tr>
              <th>Mã giao dịch</th>
              <td>
                {invoice.transactionId !== "undefined"
                  ? invoice.transactionId
                  : "Không có mã giao dịch"}
              </td>
            </tr>
            <tr>
              <th>Mã người mua</th>
              <td>{invoice.user?._id}</td>
            </tr>
            <tr>
              <th>Tên người mua</th>
              <td>{invoice.user?.fullName}</td>
            </tr>
            <tr>
              <th>Ngày thanh toán</th>
              <td>
                {formatDate.getDate(invoice.createdAt, "dd-MM-yyyy HH:mm")}
              </td>
            </tr>
            <tr>
              <th>Hình thức thanh toán</th>
              <td>{invoice.paymentMethod}</td>
            </tr>
            <tr>
              <th>Trạng thái</th>
              <td> {translateVi(invoice.status)}</td>
            </tr>
            <tr>
              <th>Được giảm</th>
              <td>
                {formatCharacter.numberLocale(invoice.totalDiscount, " đồng")}
              </td>
            </tr>
            <tr>
              <th>Thành tiền</th>
              <td>
                {formatCharacter.numberLocale(invoice.totalPrice, " đồng")}
              </td>
            </tr>
          </table>
        </div>

        <Divider />
        <div className="invoice-cart">
          <span className="cart-title">Các khoá học đã mua</span>
          <div className="cart-content">
            {renderCoursePaymentDetail(detailInvoice)}
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentDetail;
