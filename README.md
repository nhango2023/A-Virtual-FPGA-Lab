#Project: A virtual FPGA Lab - Bo Thí nghiệm FPGA Ảo

##Giới thiệu 
Giáo dục kỹ thuật thiết kế IC phụ thuộc nhiều vào các bài thực hành để củng cố hiệu quả việc học các nguyên tắc thiết kế IC. Ngày nay, các trường đại học đang phải đối mặt với chi phí mua sắm đắt đỏ cho các thiết bị phòng thí nghiệm thiết kế IC. Bài báo này giới thiệu một phòng thí nghiệm FPGA ảo dành cho giáo dục kỹ thuật thiết kế IC. Ứng dụng phòng thí nghiệm web mô phỏng một bảng FPGA với các tiện ích và chức năng tương tự được sử dụng trong phòng thí nghiệm kỹ thuật thiết kế IC. Đầu tiên, người dùng tạo ra một thiết kế Verilog và kiểm tra bằng cách sử dụng trình soạn thảo. Thứ hai, người dùng kiểm tra cú pháp của thiết kế và kiểm tra. Thứ ba, người dùng kích hoạt các đầu vào của thiết kế theo kết nối trong kiểm tra thông qua các công tắc và nút nhấn của GUI FPGA được mô phỏng (tức là ứng dụng phòng thí nghiệm FPGA ảo). Cuối cùng, người dùng theo dõi đầu ra của thiết kế trên các đèn LED của GUI FPGA được mô phỏng. Nguyên mẫu được lập trình bằng JavaScript và có khả năng mô phỏng các thiết kế phòng thí nghiệm đại học điển hình như cổng AND, mux, bộ mã hóa, bộ giải mã, flipflop, bộ đếm, FSM, v.v. Ứng dụng này sẽ cho phép giáo dục kỹ thuật thiết kế IC không cần phòng thí nghiệm và học thiết kế IC miễn phí cho bất kỳ ai ở bất kỳ đâu và bất kỳ lúc nào. Các nhu cầu, yêu cầu, kiến trúc, triển khai và trường hợp sử dụng của hệ thống FPGA ảo được nghiên cứu và trình bày. Ứng dụng này là mã nguồn mở trên GitHub.

##Hình ảnh mô họa 
[Hình ảnh mô họa](https://imgur.com/a/2DzJ2B2)

##Giao diện
- Nút bấm (Push button)
  <ul>
  <li>4 nút bấm</li>
  <li>[Nút bấm](https://imgur.com/a/f6cWQd7)</li>
  </ul>
- Công tắc (Switch)
  <ul>
  <li>8 công tắc</li>
  <li>[Công tắc](https://imgur.com/a/dip-switches-pEEfhT3)</li>
  </ul>
  -Đèn (Led)
  <ul>
  <li>10 đèn</li>
  <li>[Đèn](https://imgur.com/a/dZbigb0)</li>
  </ul>
  -Đèn 7 đoạn (7-segment Led)
  <ul>
  <li>7 đoạn led</li>
  <li>[7 đoạn led](https://imgur.com/a/7-segment-display-ix6tMAU)</li>
  </ul>

##Hướng dẫn sử dụng
1.Tải dự án từ github về 
2.Mở thư mục có tên Front-end GUI 
3.Click chuột phải lên têp tên: index và chọn Open with 
4.Chọn một trình duyệt
5.Chọn nút "Upload" và chọn một file trên máy của bạn
6.Bắt đầu sử dụng.

