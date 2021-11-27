$(document).ready(() => {
    loadData();
    addEmployee();
})


// Lấy dữ liệu từ server: 

function loadData() {

    // Lấy dữ liệu:
    // gọi lên API thực hiện lấy dữ liệu -> sử dụng jquery ajax
    let employees = [];

    $("#t-table-employee").empty();
    initTable();
    $(".t-refresh").show();

    $.ajax({
        type: "GET",
        url: "http://cukcuk.manhnv.net/api/v1/Employees",
        // data: "data",        // tham số truyền lên cho api
        // dataType: "json",
        // dataType: "application/json",
        async: true,
        success: function (response) {
            employees = response;

            // render table
            $.each(employees, function (indexInArray, employee) { 
                let employeeCode = employee.EmployeeCode;
                let fullname = employee.FullName;
                let gender = employee.GenderName;
                let dateOfBirth = employee.DateOfBirth;
                let salary = employee.Salary;
                let DepartmentName = employee.DepartmentName;

                // Xử lí / định dạng dữ liệu:
                // Định dạng ngày tháng: (Ngày/Tháng/Năm)
                dateOfBirth = new Date(dateOfBirth);
                let date = dateOfBirth.getDate();   // ngày
                date = date < 10 ?`0${date}` : date;
                let month = dateOfBirth.getMonth() + 1; // tháng
                month = month < 10 ?`0${month}` : month;
                let year = dateOfBirth.getFullYear(); // năm
                dateOfBirth = `${date}/${month}/${year}`;

                // Định dạng tiền tệ:
                salary = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(salary);
                
                let tr = `
                <tr class="t-table-body color-red">
                    <td class="t-employee-code">${employeeCode}</td>
                    <td class="t-employee-fullname">${fullname}</td>
                    <td class="t-employee-code">${gender || ""}</td>
                    <td class="t-employee-date">${dateOfBirth}</td>
                    <td class="t-employee-part t-align-left">${DepartmentName}</td>
                    <td class="t-employee-salary">${salary}</td>
                </tr>`;

                $("#t-table-employee").append(tr);

            });
            
            $(".t-refresh").hide();
        },
        error: function(reject) {
            alert('Có lỗi xảy ra');
        }
    });

}

// Khởi tạo các column của bảng
function initTable() {
    let tr = `<tr class="t-table-head">
        <th class="t-table-title t-column-100 t-left-16">
            <div class="t-column-name t-employee-code">Mã nhân viên</div>
            <i class="fas fa-sort t-column-icon"></i>
        </th>
        <th class="t-table-title t-column-150">
            <div class="t-column-name">Họ và tên</div>
            <i class="fas fa-sort t-column-icon"></i>
        </th>
        <th class="t-table-title t-column-100">
            <div class="t-column-name">Giới tính</div>
            <i class="fas fa-sort t-column-icon"></i>
        </th>
        <th class="t-table-title t-column-100">
            <div class="t-column-name">Ngày Sinh</div>
            <i class="fas fa-sort t-column-icon"></i>
        </th>
        <th class="t-table-title t-column-150 t-align-left">
            <div class="t-column-name">Bộ phận/Phòng ban</div>
            <i class="fas fa-sort t-column-icon"></i>
        </th>
        <th class="t-table-title t-column-100 t-employee-salary">
            <div class="t-column-name">Lương Cơ Bản</div>
            <i class="fas fa-sort t-column-icon"></i>
        </th>
    </tr>`;

    $("#t-table-employee").append(tr);
}


// add employee

function addEmployee() {
    // show
    $(".t-add-employee").click(function() {
        $(".t-dialog-add").show();

        // reset input
        $("input").val(null);

        // Lấy mã nhân viên mới và hiện thị lên ô nhập mã nhân viên
        $.ajax({
            type: "GET",
            url: "http://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
            success: function (response) {
                $("#t-employeeCode-txt").val(response);
                // Focus vào ô nhập liệu đầu tiên
                $("#t-employeeCode-txt").focus();
            }
        });
    });

    // hide
    $(".t-dialog-btn .t-close-btn").click(function() {
        $(".t-dialog-add").hide();
    });

    $(".t-close-dialog").click(function () { 
        $(".t-dialog-add").hide();
    });

    // Thêm nhân viên
    $(".t-add-btn").click(function() {
        // thu thập các thông tin
        const employeeCode = $("#t-employeeCode-txt").val();
        const employeeFullName = $("#t-employeeFullName-txt").val();
        const employeeGender = $("#t-employeeGender-txt").data('value');
        const employeeDateOfBirth = $("#t-employeeDateOfBirth-txt").val();
        const employeeDepartmentId = $("#t-employeeDepartmentId-txt").data('value');
        const employeeSalary = $("#t-employeeSalary-txt").val();

        // Build thành object nhân viên
        let employee = {
            "EmployeeCode": employeeCode,
            "FullName": employeeFullName,
            "Gender": employeeGender,
            "DateOfBirth": employeeDateOfBirth,
            "DepartmentId": employeeDepartmentId,
            "Salary": employeeSalary
        }

        // Sự dụng ajax gọi lên api rồi cất dữ liệu
        $.ajax({
            type: "POST",
            url: "http://cukcuk.manhnv.net/api/v1/Employees",
            data: JSON.stringify(employee),
            async: false,
            dataType: "json",
            contentType:"application/json",
            success: function (response) {
                console.log(response);
            },
            error: function(reject) {
                console.log(reject);
            }
        });

        // Ẩn form chi tiết
        $(".t-dialog-add").hide();

        // Refresh lại dữ liệu
        loadData();

    });

    // Load dữ liệu cho các combobox:
    // Load dữ liệu phòng ban
    loadDepartmentComboboxData();
}


// load dữ liệu cho combobox phòng ban
// create by T.A.N (14/11/2021)
function loadDepartmentComboboxData() {
    // Lấy dữ liệu về
    $.ajax({
        type: "GET",
        url: "http://cukcuk.manhnv.net/api/v1/Departments",
        success: function (response) {
            // Buid combobox
            for(const department of response) {
                // let optionHTML = `<option value="${department.DepartmentId}">${department.DepartmentName}</option>`;
                let optionHTML = `<div class="t-combobox-item" value="${department.DepartmentId}">${department.DepartmentName}</div>`
                $("#t-employeeDepartmentId-txt .t-combobox-data").append(optionHTML);

                let itemDataElements = $('#t-employeeDepartmentId-txt').find('.t-combobox-data').html();
                $('#t-employeeDepartmentId-txt').data('itemDataElement', itemDataElements);
            }
        }
    });
}


