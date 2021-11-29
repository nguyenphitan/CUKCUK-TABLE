$(document).ready(function() {
    employeePage = new EmployeePage();
})


class EmployeePage extends BasePage {
    TitlePage = 'Danh sách khách hàng';
    FormMode = null;
    EmployeeIdSelected = null;
    constructor() {
        super("t-table-employee", "http://cukcuk.manhnv.net/api/v1/Employees")
        this.loadData();
        this.initEvent();
    }

    /**
     * Load dữ liệu
     * Author: NPTAN (19/11/2021)
     */
    loadData() {   
        // Clear dữ liệu cũ:
        $("#t-table-employee tbody").empty();
        // Gọi api thực hiện lấy dữ liệu về -> sử dụng ajax
        $.ajax({
            type: "GET",
            url: "http://cukcuk.manhnv.net/api/v1/Employees",
            success: function (response) {
                if(response) {
                    var employees = response;
                    // Duyệt từng nhân viên có trong mảng:
                    for (const employee of employees) {
                        // Build từng tr và append vào tbody của table
                        let tr = $(`
                            <tr class="t-table-body color-red">
                                <td class="t-employee-code">${employee.EmployeeCode}</td>
                                <td class="t-employee-fullname">${employee.FullName}</td>
                                <td class="t-employee-gender">${employee.GenderName || ""}</td>
                                <td class="t-employee-date">${CommonJS.formatDateDDMMYYYY(employee.DateOfBirth)}</td>
                                <td class="t-employee-part t-align-left">${employee.DepartmentName}</td>
                                <td class="t-employee-salary">${CommonJS.formatMoneyVND(employee.Salary)}</td>
                            </tr>`);

                        // Lưu trữ khóa chính của dòng dữ liệu hiện tại:
                        tr.data('employeeId', employee.EmployeeId);
                        tr.data('data', employee);
                        $("#t-table-employee tbody").append(tr);
                    }
                }
            }
        });

        // Build dữ liệu, hiển thị lên table:
    }


    /**
     * Gán sự kiện cho các thành phần có trong trang
     * Author: NPTAN (19/11/2021)
     */
    initEvent() {
        // Button add employee:
        $('.t-add-employee').click(this.btnAddOnClick.bind(this));

        // Đóng form thêm mới
        $(".t-dialog-btn .t-close-btn").click(function() {
            $(".t-dialog-add").hide();
        });

        $(".t-close-dialog").click(function () { 
            $(".t-dialog-add").hide();
        });

        // Button save:
        $('.t-dialog-btn .t-add-btn').click(this.saveData.bind(this));

        // Row on click:
        // Row double click:
        $('#t-table-employee').on('dblclick', '.t-table-body', this.rowOnDbClick.bind(this));
        $('#t-table-employee').on('click', '.t-table-body', this.rowOnClick.bind(this));
        $('.t-btn-delete').click(this.delete.bind(this));
    }

    rowOnClick(sender) {
        let currentRow = sender.currentTarget;
        let employeeId = $(currentRow).data('employeeId');  // entityId
        this.EmployeeIdSelected = employeeId;
        $(currentRow).siblings().removeClass('t-bg-red');
        $(currentRow).addClass('t-bg-red');

    }

    btnAddOnClick() {
        // Gán lại giá trị của FormMode của EmployeePage
        this.FormMode = Enum.FormMode.Add;
        // Clean các giá trị đã được nhập trước đó
        $('.t-dialog-add input').val(null);
        // Load mã nhân viên mới cho dialog chi tiết
        $.ajax({
            type: "GET",
            url: "http://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
            success: function (response) {
                $("#t-employeeCode-txt").val(response);
                // Focus vào ô nhập liệu đầu tiên
                $("#t-employeeCode-txt").focus();
            }
        });
        // Hiển thị form thêm mới nhân viên
        $('.t-dialog-add').show();
    }

    // Hiển thị form điền thông tin chi tiết khi nhấn đúp chuột
    rowOnDbClick(sender) {
        this.FormMode = Enum.FormMode.Update;
        let currentRow = sender.currentTarget;
        let employeeId = $(currentRow).data('employeeId');  // entityId
        this.EmployeeIdSelected = employeeId;
        // Gọi tới api lấy dữ liệu chi tiết của nhân viên
        $.ajax({
            type: "GET",
            url: `http://cukcuk.manhnv.net/api/v1/Employees/${employeeId}`,
            success: function (employee) {
                // Binding dữ liệu vào form:
                // 1. Lấy toàn bộ các input sẽ binding dữ liệu -> có atrribute [fieldName];
                let inputs = $('input[fieldName]');
                // 2. Duyệt từng input -> lấy ra giá trị của attribute [fieldName] -> để biết được sẽ map với thông tin (property) nào của đối tượng
                for (const input of inputs) {
                    let fieldName = $(input).attr('fieldName');
                    let value = employee[fieldName];
                    if(value) {
                        $(input).val(value);
                    }
                    else {
                        $(input).val(null);
                    }
                }

                // Hiển thị form chi tiết
                $('.t-dialog-add').show();
            }
        });
    }

    saveData() {
        let me = this;
        // Valida dữ liệu -> Kiểm tra dữ liệu có hợp lệ hay không:

        // Thực hiện Build object chi tiết thông tin khách hàng:
        // 1. Lấy toàn bộ các input sẽ binding dữ liệu -> có atrribute [fieldName];
        let inputs = $('input[fieldName]');
        // 2. Duyệt từng input -> lấy ra giá trị của attribute [fieldName] -> để biết được sẽ map với thông tin (property) nào của đối tượng
        let employee = {};
        for (const input of inputs) {
            let fieldName = $(input).attr('fieldName');
            let value = $(input).val();
            if(value) {
                employee[fieldName] = value;
            }
        }
        
        // Duyệt các combobox:
        let comboboxs = $('.t-dialog-container div[tcombobox]');
        // Duyệt từng combobox thực hiện lấy ra value:
        for (const combobox of comboboxs) {
            const value = $(combobox).attr('value');
            const fieldName = $(combobox).data('fieldName');
            if(fieldName) {
                employee[fieldName] = value;
            }
        }

        // Thực hiện cất dữ liệu -> cần kiểm tra xem form ở trạng thái thêm mới hay update để gọi api tương ứng
        if(this.FormMode == Enum.FormMode.Add) {
            $.ajax({
                type: "POST",
                url: "http://cukcuk.manhnv.net/api/v1/Employees",
                data: JSON.stringify(employee),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    // Load lại dữ liệu
                    me.loadData();
                    // Ẩn form chi tiết
                    $('.t-dialog-add').hide();

                }
            });
        }
        else {
            $.ajax({
                type: "PUT",
                url: `http://cukcuk.manhnv.net/api/v1/Employees/${this.EmployeeIdSelected}`,
                data: JSON.stringify(employee),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    // Load lại dữ liệu
                    me.loadData();
                    // Ẩn form chi tiết
                    $('.t-dialog-add').hide();
                }
            });
        }
    }

    delete(sender) {
        let me = this;
        // Lấy ra id của bản ghi vừa chọn:
        let employeeId = this.EmployeeIdSelected;
        // Gọi api thực hiện xóa:
        $.ajax({
            type: "DELETE",
            url: `http://cukcuk.manhnv.net/api/v1/Employees/${this.EmployeeIdSelected}`,
            success: function (response) {
                $('.t-box-success').fadeIn(2000);
                setTimeout(function(){
                    $('.t-box-success').fadeOut(2000);
                }, 500)
                me.loadData();
            }
        });
    }

}



