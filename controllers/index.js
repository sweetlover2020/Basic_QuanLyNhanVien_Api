
var mangNhanVien = [];
var validation = new Validation();
//Định nghĩa sự kiện click khi người dùng bấm nút xác nhận
document.querySelector('#btnXacNhan').onclick = function () {
    //Tạo ra đối tượng nhân viên chứa thông tin người dùng nhập vào từ giao diện
    var sv = new NhanVien();
    sv.maNhanVien = document.querySelector('#maNhanVien').value;
    sv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    sv.heSoChucVu = document.querySelector('#chucVu').value;
    sv.luongCoBan = document.querySelector('#luongCoBan').value;
    sv.gioLamTrongThang = document.querySelector('#gioLamTrongThang').value;
    sv.tenNhanVien = document.querySelector('#tenNhanVien').value;

    // Lấy innerHTML của option được chọn trong thẻ select
    var tagChucVu = document.getElementById('chucVu');
    // Lấy ra các thẻ option trong thẻ select
    var arrOption = tagChucVu.options;
    // Lấy thẻ option được chọn 
    sv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;


    // Kiểm tra hợp lệ
    var valid = true;

    // Kiểm tra rỗng
    valid &= validation.kiemTraRong(sv.maNhanVien, 'Mã nhân viên', '.kiemTraRong-maNhanVien')
        & validation.kiemTraRong(sv.tenNhanVien, 'Tên nhân viên', '.kiemTraRong-tenNhanVien');

    // Kiểm tra độ dài chuỗi
    valid &= validation.kiemTraDoDaiChuoi(sv.maNhanVien, 'Mã nhân viên', '.kiemTraDoDaiChuoi-maNhanVien', 4, 6);

    // Kiểm tra định dạng
    valid &= validation.kiemTraDinhDang(sv.maNhanVien, 'Mã nhân viên', '.kiemTraDinhDang-maNhanVien') // Mã nhân viên
        & validation.kiemTraTatCaKyTu(sv.tenNhanVien, 'Tên nhân viên', '.kiemTraDinhDang-tenNhanVien'); //Tên nhân viên

    // Kiểm tra giá trị
    valid &= validation.kiemTraGiaTri(sv.luongCoBan, 'Lương cơ bản phải', '.kiemTraGiaTri-luongCoBan', 1000000, 20000000)
        & validation.kiemTraGiaTri(sv.gioLamTrongThang, 'Số giờ làm trong tháng phải', '.kiemTraGiaTri-gioLamTrongThang', 50, 150);

    // Thoát validation
    if (!valid) {
        return;
    }


    // console.log('Nhân viên', sv);
    //Thêm 1 nhân viên vào mảng
    mangNhanVien.push(sv);
    // console.log('mảng nhân viên', mangNhanVien);

    renderTable(mangNhanVien);

    //Lưu vào localstorage
    luuLocalStorage();

}


var renderTable = function (arrSV) {
    //Từ mảng nhân viên tạo ra 1 chuỗi html nhiều thẻ tr dựa vào vòng lặp
    var noiDungTable = '';
    for (var index = 0; index < arrSV.length; index++) {
        //Mỗi lần lặp lấy ra 1 đối tượng nhânVien
        var nhanVien = arrSV[index];
        // console.log('NhanVien: ',nhanVien);
        var sv = new NhanVien(
            nhanVien.maNhanVien,
            nhanVien.tenNhanVien,
            nhanVien.chucVu,
            nhanVien.heSoChucVu,
            nhanVien.luongCoBan,
            nhanVien.gioLamTrongThang
        );
        //Tạo ra 1 chuỗi + dồn vào nội dung <tr></tr>
        noiDungTable += `
                <tr>
                    <td>${sv.maNhanVien}</td>
                    <td>${sv.tenNhanVien}</td>
                    <td>${sv.chucVu}</td>
                    <td>${sv.luongCoBan}</td> <!--Lối không dùng được toLocaleString-->
                    <td>${sv.tongLuong().toLocaleString()}</td>
                    <td>${sv.gioLamTrongThang}</td>
                    <td>${sv.xepLoaiNhanVien()}</td>
                    <td><button class="btn btn-danger" onclick="xoaNhanVien('${sv.maNhanVien}')">Xóa</button></td>
                    <td><button class="btn btn-primary" onclick="chinhSua('${sv.maNhanVien}')">Chỉnh sửa</button></td>

                </tr>            
        `
    }
    // console.log('noidungTable',noiDungTable);
    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}

// Cài đặt sự kiện cho nút button xóa 
var xoaNhanVien = function (maNV) {

    for (var index = mangNhanVien.length - 1; index >= 0; index--) {
        // Mỗi lần duyệt lấy ra 1 đối tượng nhân Viên
        var sv = mangNhanVien[index];
        // Lấy mã nhân viên của từng đối tượng so sánh với maNV được click 
        if (sv.maNhanVien === maNV) {
            // Splice là hàm xóa phần tử của mảng dụa vào index 
            mangNhanVien.splice(index, 1);
        }
    }
    // Sau khi xóa dữ liệu trong mảng goi lại gàm tạo table truyền vào mảng nhân viên đã xóa 
    renderTable(mangNhanVien);
}


var chinhSua = function (maNV) {
    document.querySelector('#maNhanVien').disabled = true;
    //Từ mã sinh viên => tìm sinh viên trong mangNhanVien
    for (var index = 0; index < mangNhanVien.length; index++) {
        //Mỗi lần duyệt mảng lấy ra 1 đối tượng sinh viên
        var sv = mangNhanVien[index];
        console.log('mangNhanVien: ', mangNhanVien);
        //So sánh nếu maNV truyền vào === với đối tượng đang duyệt => gán ngược lại lên các control phía trên
        if (maNV === sv.maNhanVien) {
            document.querySelector('#maNhanVien').value = sv.maNhanVien;
            document.querySelector('#tenNhanVien').value = sv.tenNhanVien;
            document.querySelector('#chucVu').value = sv.heSoChucVu;
            document.querySelector('#luongCoBan').value = sv.luongCoBan;
            document.querySelector('#gioLamTrongThang').value = sv.gioLamTrongThang;
        }

    }
}

//Viết hàm lưu trữ dữ liệu xuống máy tính client
var luuLocalStorage = function () {
    //Biến mảng sinh viên thành chuỗi
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    //Đem chuỗi mangNhanVien lưu vào localstorage
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}


//Viết phương thức lấy dữ liệu từ localstorage => khi người dùng vừa vào trang web
var layMangNhanVienStorage = function () {
    //Kiểm tra dữ liệu có trong localstorage không
    if (localStorage.getItem('mangNhanVien')) {
        //Lấy dữ liệu được lưu trong localstorage ra ngoài
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        //Biến dữ liệu từ chuỗi chuyển về object javascript gán vào mangNhanVien
        mangNhanVien = JSON.parse(sMangNhanVien);
        //Sau khi lấy dữ liệu ra gọi hàm tạo bảng
        // console.log('mangNhanVienLocal: ',mangNhanVien);
        renderTable(mangNhanVien);
    }
}
layMangNhanVienStorage();


//Cập nhật thông tin người dùng
document.querySelector('#btnLuuThongTin').onclick = function () {
    //Lấy thông tin người dùng sau khi thay đổi gán vào đối tượng sinhVien
    var sv = new NhanVien();
    sv.maNhanVien = document.querySelector('#maNhanVien').value;
    sv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    sv.heSoChucVu = document.querySelector('#chucVu').value;
    sv.luongCoBan = document.querySelector('#luongCoBan').value;
    sv.gioLamTrongThang = document.querySelector('#gioLamTrongThang').value;
    sv.tenNhanVien = document.querySelector('#tenNhanVien').value;

    // Lấy innerHTML của option được chọn trong thẻ select
    var tagChucVu = document.getElementById('chucVu');
    // Lấy ra các thẻ option trong thẻ select
    var arrOption = tagChucVu.options;
    // Lấy thẻ option được chọn 
    sv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;


    //Tìm trong mangNhanVien đối tượng cùng mã => cập lại giá trị
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nhanVienCapNhat = mangNhanVien[index];
        //Tìm ra sinhVien trong mảng có mã = với mã sv trên giao diện => cập nhật giá trị
        if (nhanVienCapNhat.maNhanVien === sv.maNhanVien) {
            nhanVienCapNhat.maNhanVien = sv.maNhanVien;
            nhanVienCapNhat.tenNhanVien = sv.tenNhanVien;
            nhanVienCapNhat.luongCoBan = sv.luongCoBan;
            nhanVienCapNhat.gioLamTrongThang = sv.gioLamTrongThang;
            nhanVienCapNhat.heSoChucVu = sv.heSoChucVu;
            nhanVienCapNhat.chucVu = sv.chucVu;
        }
    }
    //Gọi hàm tạo lại bảng
    renderTable(mangNhanVien);
    //Gọi hàm lưu vào localstorage
    luuLocalStorage();
    document.querySelector('#maNhanVien').disabled = false;
}