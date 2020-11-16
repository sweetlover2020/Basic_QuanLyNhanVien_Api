var Validation = function () {
    // Kiểm tra rỗng
    this.kiemTraRong = function (value, name, selectorError) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    // Kiểm tra độ dài chuỗi
    this.kiemTraDoDaiChuoi = function (value, name, selectorError, minLength, maxLength) {
        if (value.trim().length < minLength || value.trim().length > maxLength) {
            document.querySelector(selectorError).innerHTML = name + ` tối đa ${minLength} đến ${maxLength} ký số`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    // Kiểm tra định dạng mã nhân viên
    this.kiemTraDinhDang = function (value, name, selectorError) {
        var regexKyTu = /^[0-9]/;
        if (!regexKyTu.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký số!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    // Kiểm tra định dạng tên nhân viên
    this.kiemTraTatCaKyTu = function (value, name, selectorError) {
        var regexKyTu = /^[A-Za-z ]+$/;
        if (!regexKyTu.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là chữ !';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    // Kiểm tra giá trị lương cơ bản
    this.kiemTraGiaTri = function (value, name, selectorError, minValue, maxValue) {
        if (Number(value) < minValue || Number(value) > maxValue) {
            document.querySelector(selectorError).innerHTML = name + ` từ ${minValue.toLocaleString()} đến ${maxValue.toLocaleString()} !`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}