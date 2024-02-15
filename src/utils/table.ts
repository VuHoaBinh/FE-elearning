import _ from "lodash";
import formatCharacter from "./formatCharacter";
import formatDate from "./formatDate";
import translateVi from "./translateVi";

//get all keys to pass for header table
export const getHeaderColumns = (data: string[], excepts: string[] = []) => {
  const keys = Object.keys(data);
  const newColumns: string[] = [];
  keys.forEach((key) => {
    !excepts.includes(key) && newColumns.push(key);
  });
  return newColumns;
};

//get data  each of keys of table
// index + 1 + (page - 1) * pageSize
export const getNewHeaderColumn = (
  data: Object[],
  keys: string[],
  page: number = 1,
  pageSize: number = 5
) => {
  const finalResult = data.map((item: any, index) => {
    const values = keys.map((key: any) => {
      if (key === "gender") {
        return { [key]: item[key] ? "Nam" : "Nữ" };
      }
      if (key === "publish") {
        return { [key]: item[key] ? "Hoạt động" : "Đang khoá" };
      }
      if (key === "used") {
        return { [key]: item[key] ? "Đang sử dụng" : "Đang trống" };
      }
      if (key === "transactionId") {
        return {
          [key]:
            item[key] !== "undefined" ? item[key] : "Không có mã giao dịch",
        };
      }
      if (
        key === "currentPrice" ||
        key === "originalPrice" ||
        key === "paymentPrice" ||
        key === "totalDiscount" ||
        key === "totalPrice" ||
        key === "revenue"
      ) {
        return { [key]: formatCharacter.numberLocale(item[key]) + " đ" };
      }
      if (key === "isActive") {
        return { [key]: item[key] ? "Đang mở" : "Hết hạn" };
      }
      if (key === "expireDate" || key === "startDate" || key === "createdAt") {
        return { [key]: formatDate.getDate(item[key], "dd-MM-yyyy HH:mm:ss") };
      }
      if (key === "percentProgress") {
        return { [key]: !item[key] ? "Chưa xem" : item[key] };
      }
      return { [key]: translateVi(item[key]) };
    });
    return _.merge({ id: index + 1 + (page - 1) * pageSize }, ...values);
  });

  return finalResult;
};
