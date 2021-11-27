
$(document).ready(function() {
    new CustomerPage();
})

class CustomerPage extends BasePage {
    constructor() {
        super("t-table-customer", "http://cukcuk.manhnv.net/api/v1/Customerss");
        this.loadData();
    }

    /**
     * Load dữ liệu
     * Author: NPTAN (25/11/2021)
     */
    // loadData() {
    //     let data = [];
    //     // Gọi api thực hiện lấy dữ liệu:
    //     // Lấy các thông tin thực hiện phân trang:
    //     // const searchText = $('#txtSearch').val();
    //     // const pageSize = $('#cbxPageSize').val();
    //     // const pageNumber = 1;
    //     // let apiUrl =
        



    //     // Clear dữ liệu cũ:
    //     $("#t-table-customer tbody").empty();
    //     // Gọi api thực hiện lấy dữ liệu về -> sử dụng ajax
    //     $.ajax({
    //         type: "GET",
    //         url: "http://cukcuk.manhnv.net/api/v1/Customerss",
    //         success: function (response) {
    //             if(response) {
    //                 var customers = response;
    //                 // Duyệt từng nhân viên có trong mảng:
    //                 for (const customer of customers) {
    //                     // Build từng tr và append vào tbody của table
    //                     let tr = $(`
    //                         <tr class="t-table-body color-red">
    //                             <td class="t-employee-code">${customer.CustomerCode}</td>
    //                             <td class="t-employee-fullname">${customer.FullName}</td>
    //                             <td class="t-employee-code">${customer.Email}</td>
    //                             <td class="t-employee-part t-align-left">${customer.Address}</td>
    //                         </tr>`);

    //                     // Lưu trữ khóa chính của dòng dữ liệu hiện tại:
    //                     tr.data('customerId', customer.CustomerId);
    //                     tr.data('data', customer);
    //                     $("#t-table-customer tbody").append(tr);
    //                 }
    //             }
    //         }
    //     });
    // }

}