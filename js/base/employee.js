let employees = [
    {
        ID: 1,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Phi Tân",
        Position: "Giám đốc",
        Part: "Tổng công ty"
    },
    {
        ID: 2,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Thạc Hương",
        Position: "Phó giám đốc",
        Part: "Tổng công ty"
    },
    {
        ID: 3,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Văn A",
        Position: "Quản lý",
        Part: "Tổng công ty"
    },
    {
        ID: 4,
        EmployeeCode: "0342366513",
        FullName: "Tạ Thị Trang",
        Position: "Trưởng phòng",
        Part: "Sale"
    },
    {
        ID: 5,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Phi Tân",
        Position: "Giám đốc",
        Part: "Tổng công ty"
    },
    {
        ID: 6,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Thạc Hương",
        Position: "Phó giám đốc",
        Part: "Tổng công ty"
    },
    {
        ID: 7,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Văn A",
        Position: "Quản lý",
        Part: "Tổng công ty"
    },
    {
        ID: 8,
        EmployeeCode: "0342366513",
        FullName: "Tạ Thị Trang",
        Position: "Trưởng phòng",
        Part: "Sale"
    },
    {
        ID: 9,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Phi Tân",
        Position: "Giám đốc",
        Part: "Tổng công ty"
    },
    {
        ID: 10,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Thạc Hương",
        Position: "Phó giám đốc",
        Part: "Tổng công ty"
    },
    {
        ID: 11,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Văn A",
        Position: "Quản lý",
        Part: "Tổng công ty"
    },
    {
        ID: 12,
        EmployeeCode: "0342366513",
        FullName: "Tạ Thị Trang",
        Position: "Trưởng phòng",
        Part: "Sale"
    },
    {
        ID: 13,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Phi Tân",
        Position: "Giám đốc",
        Part: "Tổng công ty"
    },
    {
        ID: 14,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Thạc Hương",
        Position: "Phó giám đốc",
        Part: "Tổng công ty"
    },
    {
        ID: 15,
        EmployeeCode: "0342366513",
        FullName: "Nguyễn Văn A",
        Position: "Quản lý",
        Part: "Tổng công ty"
    }
]

$(document).ready(() => {
    tableRender();
})


function initTable() {

    let tr = 
        `<tr class="t-table-head">
        <th></th>
        <th class="t-table-title t-column-50">
            <div class="t-column-name">#</div>
        </th>
        <th class="t-table-title t-column-100">
            <div class="t-column-name">Mã nhân viên</div>
            <i class="fas fa-sort t-column-icon"></i>
        </th>
        <th class="t-table-title t-column-150">
            <div class="t-column-name">Họ và tên</div>
            <i class="fas fa-sort t-column-icon"></i>
        </th>
        <th class="t-table-title t-column-100">
            <div class="t-column-name">Vị trí/Chức vụ</div>
            <i class="fas fa-sort t-column-icon"></i>
        </th>
        <th class="t-table-title t-column-150">
            <div class="t-column-name">Bộ phận/Phòng ban</div>
            <i class="fas fa-sort t-column-icon"></i>
        </th>
        </tr>`;

    $("#t-table-employee").append(tr);
}

function tableRender() {
    $("#t-table-employee").empty();
    $(".t-refresh-table").show();
    let tableEmployee = $("#t-table-employee");
    setTimeout(function() {
        initTable();
        for(let employee of employees) {
            let tr = 
            `<tr class="t-table-body">
            <td><input class="t-table-checkbox" type="checkbox" name="" id=""></td>
            <td>${employee.ID}</td>
            <td>${employee.EmployeeCode}</td>
            <td>${employee.FullName}</td>
            <td>${employee.Position}</td>
            <td>${employee.Part}</td>
            </tr>`;
    
            $("#t-table-employee").append(tr);
    
        }
        $(".t-refresh-table").hide();
    }, 2000);
}

function refreshTable() {
    $(".t-header-refresh").click(function() {
        $(".t-refresh-table").show();
    })
}


// Lấy dữ liệu từ server: 

// $(document).ready(() => {
//     $.ajax({
//         type: "GET",
//         url: "http://cukcuk.manhnv.net/api/v1/Employees",
//         // data: "data",
//         // dataType: "dataType",
//         success: function (response) {
//             console.table(response);
//         },
//         error: function (reject) {
//             alert('Error!!!')
//         }
//     });
// }) 




