class BasePage {
    tableId = null;
    api = null;

    constructor(tableId, api) {
        this.tableId = tableId;
        this.api = api;
        this.loadData();
    }


    loadData() {
        var TableId = this.tableId;
        // Clear dữ liệu cũ:
        $(`table#${TableId} tbody`).empty();

        // Lấy entityId để xác định khóa chính của các bản ghi trong bảng:
        let entityId = $(`table#${TableId}`).attr('entityId');
        // Gọi api thực hiện lấy dữ liệu về -> sử dụng ajax
        $.ajax({
            type: "GET",
            url: this.api,
            async: false,
            success: function (response) {
                if(response) {
                    var entities = response;

                    // Duyệt các cột của table để biết table có bao nhiêu cột dữ liệu:
                    let ths = $(`table#${TableId} thead tr th`);
                    // Duyệt từng nhân viên có trong mảng:
                    for (const entity of entities) {
                        // Build từng tr và append vào tbody của table
                        let tr = $(`
                            <tr class="t-table-body">
                            </tr>`);


                        // Build từng td và gán giá trị tương ứng với các cột:
                        for (const th of ths) {
                            let tdHTML = $(`<td class="t-employee-code"></td>`)
                            // Lấy thông tin trường dữ liệu tương ứng với đối tượng entity đã được khai báo là fieldValue trong html:
                            const fieldValue = $(th).attr('fieldValue');
                            const value = entity[fieldValue];
                            const formatType = $(th).attr('formatType');
                            switch(formatType) {
                                case 'date':
                                    // Căn giữa dữ liệu
                                    tdHTML.addClass('text-align-center');
                                    tdHTML.text(CommonJS.formatDateDDMMYYYY(value));
                                    break;
                                case 'money':
                                    // Căn phải dữ liệu
                                    tdHTML.addClass('t-align-right');
                                    tdHTML.text(CommonJS.formatMoneyVND(value));
                                    break;

                                default:
                                    // Căn trái dữ liệu:
                                    tdHTML.addClass('t-align-left');
                                    tdHTML.text(value);
                                    break;
                            }
                            // Append cho tr:
                            tr.append(tdHTML);
                        }

                        // Lưu trữ khóa chính của dòng dữ liệu hiện tại:
                        tr.data('entityId', entity[entityId]);
                        tr.data('data', entity);
                        $(`table#${TableId} tbody`).append(tr);
                    }
                }
            }
        });
    }


}