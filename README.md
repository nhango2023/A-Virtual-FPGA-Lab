<h1>Project: A virtual FPGA Lab - Bo Thí nghiệm FPGA Ảo</h1>

<h3>Giới thiệu </h3>
Giáo dục kỹ thuật thiết kế IC phụ thuộc nhiều vào các bài thực hành để củng cố hiệu quả việc học các nguyên tắc thiết kế IC. Ngày nay, các trường đại học đang phải đối mặt với chi phí mua sắm đắt đỏ cho các thiết bị phòng thí nghiệm thiết kế IC. Bài báo này giới thiệu một phòng thí nghiệm FPGA ảo dành cho giáo dục kỹ thuật thiết kế IC. Ứng dụng phòng thí nghiệm web mô phỏng một bảng FPGA với các tiện ích và chức năng tương tự được sử dụng trong phòng thí nghiệm kỹ thuật thiết kế IC. Đầu tiên, người dùng tạo ra một thiết kế Verilog và kiểm tra bằng cách sử dụng trình soạn thảo. Thứ hai, người dùng kiểm tra cú pháp của thiết kế và kiểm tra. Thứ ba, người dùng kích hoạt các đầu vào của thiết kế theo kết nối trong kiểm tra thông qua các công tắc và nút nhấn của GUI FPGA được mô phỏng (tức là ứng dụng phòng thí nghiệm FPGA ảo). Cuối cùng, người dùng theo dõi đầu ra của thiết kế trên các đèn LED của GUI FPGA được mô phỏng. Nguyên mẫu được lập trình bằng JavaScript và có khả năng mô phỏng các thiết kế phòng thí nghiệm đại học điển hình như cổng AND, mux, bộ mã hóa, bộ giải mã, flipflop, bộ đếm, FSM, v.v. Ứng dụng này sẽ cho phép giáo dục kỹ thuật thiết kế IC không cần phòng thí nghiệm và học thiết kế IC miễn phí cho bất kỳ ai ở bất kỳ đâu và bất kỳ lúc nào. Các nhu cầu, yêu cầu, kiến trúc, triển khai và trường hợp sử dụng của hệ thống FPGA ảo được nghiên cứu và trình bày. Ứng dụng này là mã nguồn mở trên GitHub.

<h3>Hình ảnh giao diện </h3>
<div style="display: inline">
  <img src="https://i.imgur.com/dZR4110.png" alt="Hình ảnh code editor và console" width="500" height="400">
  <img src="https://i.imgur.com/4Ktl9TZ.png" alt="Hinh ảnh I/O" width="500" height="400"> 
</div>

<h3>Giao diện</h3>
-Code editor
<ul >
  <img src="https://i.imgur.com/sUEhjB0.png" alt="Nút bấm" width="300" height="200">
  </ul>
  -Console
<ul >
  <img src="https://i.imgur.com/uCHH2bE.png" alt="Nút bấm" width="500" height="200">
  </ul>
- Nút bấm (Push button)
  <ul>
  <li>4 nút bấm</li>
  <li><img src="https://i.imgur.com/3r8XqHF.png" alt="Nút bấm" width="300" height="200"></li>
  </ul>
- Công tắc (Switch)
  <ul>
  <li>8 công tắc</li>
  <li><img src="https://i.imgur.com/Cc2FgK4.png" alt="Công tắc"  width="300" height="200"></li>
  </ul>
  -Đèn (Led)
  <ul>
  <li>10 đèn </li>
  <li><img src="https://i.imgur.com/hjQiHOM.png" alt="Đèn led"  width="300" height="200"></li>
  </ul>
  -Đèn 7 đoạn (7-segment Led)
  <ul>
  <li>7 đoạn led</li>
  <li><img src="https://i.imgur.com/RgsC9d7.png" alt="Đèn 7 đoạn"  width="300" height="200"></li>
  </ul>

<h3>Hướng dẫn sử dụng<h3>
<ul>
  <li>1.Tải dự án từ github về </li>
  <li>2.Mở thư mục có tên Front-end GUI </li>
  <li>3.Click chuột phải lên tệp tên: index và chọn Open with </li>
  <li>4.Chọn một trình duyệt</li>
  <li>5.Nhập thiết kế và kểt nối vào code editor (*vui lòng nhập theo thứ tự: tệp thiết kế trước và sau đó là tệp kết nối)</li>
  <li>6.Bấm nút Run (*tệp thiết kế và tệp kết nối sẽ được kiểm tra cùng lúc)</li>
  <li>7.Kiểm tra thông báo (lỗi hoặc không lỗi) ở Console</li>
  <li>8.Nếu không có lỗi thì bắt đầu công tắc, nút bấm .</li>
  </ul>
<h3>Phần đã thực hiện</h3>
<ul>
  <li> Kết nối Front-end và Back-end</li>
  <li>Xử lý Input và Output</li>
</ul>

