// console.log(axios);

// Kết nối backend dựa vào thư viện axios
// -------------- Lấy danh sách nhân viên API-------------------
var nvService = new NhanVienServices();
var layDanhSachNhanVienApi = function () {

    var promise = nvService.layDanhSachNhanVienApi(); // Gọi đến BE lấy data

    // Xử lý cho trường hợp gọi thành công
    promise.then(function (result) {
        console.log('Kết quả', result.data);
        // Lấy dữ liệu server trả về gọi hàm tạo table
        renderTable(result.data);
    });

    // Xử lý cho trường hợp gọi thất bại
    promise.catch(function (error) {
        console.log('Lỗi', error);
    })
}
layDanhSachNhanVienApi();

var renderTable = function (mangNhanVien) {
    var noiDungTable = '';
    for (var i = 0; i < mangNhanVien.length; i++) {

        // Từ dữ liệu api tạo đối tượng lưu trữ
        var nv = new NhanVien();
        nv.maNhanVien = mangNhanVien[i].maNhanVien;
        nv.tenNhanVien = mangNhanVien[i].tenNhanVien;
        nv.chucVu = mangNhanVien[i].chucVu;
        nv.heSoChucVu = mangNhanVien[i].heSoChucVu;
        nv.luongCoBan = mangNhanVien[i].luongCoBan;
        nv.soGioLamTrongThang = mangNhanVien[i].soGioLamTrongThang;

        // Tạo các tr chứa thông tin sinh viên tương ứng
        noiDungTable += `
            <tr>
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.tongLuong()}</td>
                <td>${nv.soGioLamTrongThang}</td>
                <td>${nv.xepLoaiNhanVien()}</td>
                <td><button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button></td>
                <td><button class="btn btn-primary" onclick="suaNhanVien('${nv.maNhanVien}')">Chỉnh sửa</button></td>
            </tr >
        `
    }
    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}

// ----------- Chức năng thêm sinh viên lữu trữ vào server thông quá api backend ----------
// ----------- Get Validation
var validation = new Validation();
document.querySelector('#btnXacNhan').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    // nv.chucVu = document.querySelector('#chucVu').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    // Lấy innerHTML của option được chọn trong thẻ select
    var tagChucVu = document.getElementById('chucVu');
    // Lấy ra các thẻ option trong thẻ select
    var arrOption = tagChucVu.options;
    // Lấy thẻ option được chọn 
    nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;


    // Kiểm tra hợp lệ
    var valid = true;

    // Kiểm tra rỗng
    valid &= validation.kiemTraRong(nv.maNhanVien, 'Mã nhân viên', '.kiemTraRong-maNhanVien')
    & validation.kiemTraRong(nv.tenNhanVien, 'Tên nhân viên', '.kiemTraRong-tenNhanVien');

    // Kiểm tra độ dài chuỗi
    valid &= validation.kiemTraDoDaiChuoi(nv.maNhanVien, 'Mã nhân viên', '.kiemTraDoDaiChuoi-maNhanVien', 4, 6);

    // Kiểm tra định dạng
    valid &= validation.kiemTraDinhDang(nv.maNhanVien, 'Mã nhân viên', '.kiemTraDinhDang-maNhanVien') // Mã nhân viên
        & validation.kiemTraTatCaKyTu(nv.tenNhanVien, 'Tên nhân viên', '.kiemTraDinhDang-tenNhanVien'); //Tên nhân viên

    // Kiểm tra giá trị
    valid &= validation.kiemTraGiaTri(nv.luongCoBan, 'Lương cơ bản phải', '.kiemTraGiaTri-luongCoBan', 1000000, 20000000)
        & validation.kiemTraGiaTri(nv.soGioLamTrongThang, 'Số giờ làm trong tháng phải', '.kiemTraGiaTri-gioLamTrongThang', 50, 150);

    // Thoát validation
    if (!valid) {
        return;
    }


    console.log(nv);

    // ------------------Dùng axios đưa dữ liệu vể server thông qua api BE cung cấp---------------------
    var promise = nvService.themNhanVienApi(nv);

    // Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVienApi();
    })
    // Hàm thực thi khi gọi ajax thất bại
    promise.then(function (error) {
        console.log('Lỗi', error.response.data);
    })
}

// --------------Xoa Nhan Vien-------------
var xoaNhanVien = function (maNhanVien) {
    // Dung axios dua du lieu ve server thong qua api 
    var promise = nvService.xoaNhanvienApi(maNhanVien);

    // Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVienApi();
    })
    // Hàm thực thi khi gọi ajax thất bại
    promise.then(function (error) {
        console.log('Lỗi: ', error.response.data);
    })
}

// -------------- Chức năng sửa sinh viên--------------------
var suaNhanVien = function (maNhanVien) {
    // alert(maNhanVien);
    // Dùng axios đưa dữ liệu vể server thông qua api BE cung cấp
    var promise = nvService.suaNhanvienApi(maNhanVien);

    // Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);
        document.querySelector('#maNhanVien').disabled = true;
        // Gán dữ liệu trả về lên giao diện
        document.querySelector('#maNhanVien').value = maNhanVien;
        document.querySelector('#tenNhanVien').value = result.data.tenNhanVien;;
        document.querySelector('#chucVu').value = result.data.heSoChucVu;;
        document.querySelector('#luongCoBan').value = result.data.luongCoBan;;
        document.querySelector('#soGioLamTrongThang').value = result.data.soGioLamTrongThang;;

    })
    // Hàm thực thi khi gọi ajax thất bại
    promise.then(function (error) {
        console.log('Lỗi: ', error.response.data);
    })
}

// --------------- Chức năng lưu thông tin sinh viên server dựa vào api backend cung cấp -------------------
document.querySelector('#btnLuuThongTin').onclick = function () {
    // lấy dữ liệu từ người dùng nhập đưa vào đối tượng theo format dữ liệu quả Backend yêu cầu
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    // nv.chucVu = document.querySelector('#chucVu').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    // Lấy innerHTML của option được chọn trong thẻ select
    var tagChucVu = document.getElementById('chucVu');
    // Lấy ra các thẻ option trong thẻ select
    var arrOption = tagChucVu.options;
    // Lấy thẻ option được chọn 
    nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;

    // Gọi axios đưa dữ liệu về server cập nhật
    var promise = nvService.luuThongTinNhanVienApi(nv);

    // Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVienApi();
    })
    // Hàm thực thi khi gọi ajax thất bại
    promise.then(function (error) {
        console.log('Lỗi: ', error.response.data);
    })
}