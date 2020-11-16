// Lớp đối tượng chứa các phương thức giao tiếp với BE
var NhanVienServices = function () {
    this.layDanhSachNhanVienApi = function () {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien', // BE cung cấp
            method: 'GET', // BE cung cấp
        })
        return promise;
    }
    this.themNhanVienApi = function(nv){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method: 'POST',
            data: nv // Dữ liệu gửi đi (Lưu ý: Dữ liệu gửi đi phải đúng format dữ liệu của BE)
        })
        return promise;
    }
    this.xoaNhanvienApi = function(maNhanVien){
        var promise = axios({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=` + maNhanVien,
            method: 'DELETE',
        })
        return promise;
    }
    this.suaNhanvienApi = function(maNhanVien){
        var promise = axios({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=` + maNhanVien,
            method: 'GET',
        })
        return promise;
    }
    this.luuThongTinNhanVienApi = function(nv){
        var promise = axios({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=` + nv.maNhanVien,
            method: 'PUT',
            data: nv
        })
        return promise;
    }
 
}