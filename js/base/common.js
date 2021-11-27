class CommonJS {


    /**
     * Định dạng hiển thị thông tin ngày là : ngày/tháng/năm
     * @param {Date} date
     * Author: NPTAN (19/11/2021)
     */
    static formatDateDDMMYYYY(date) {
        if(date) {
            const newDate = new Date(date);
            let day = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();

            day = (day < 10 ?`0${day}` : day);
            month = (month < 10 ?`0${month}` : month);
            return `${day}/${month}/${year}`;
        }
        else {
            return "";
        }
    }


    /**
     * Định dạng tiền tệ: VND
     * Author: NPTAN (20/11/2021)
     */
    static formatMoneyVND(money) {
        if(money) {
            return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(money);
        }
        else {
            return "";
        }
    }




}