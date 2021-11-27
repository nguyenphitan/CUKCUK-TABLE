class Person {
    Name;
    Age = 18;
    constructor() {

    }
    getName() {
        return 'Đây là cha';
    }

}

// Định nghĩa 1 class trong js: 
// Đối với việc kế thừa thì bắt buộc trong hàm khởi tạo phải sử dụng lệnh super
class Employee extends Person {
    // Trường/thuộc tính (Không cần khai báo kiểu dữ liệu)
    FullName;
    GenderName;

    // Hàm khởi tạo: (có thể có tham số đầu vào hoặc không)

    constructor(name) {
        super();
        // Set các giá trị cho các thành phần trong class
        this.FullName = name;
        // Có thể gán giá trị cho những thuộc tính không được khai báo
        this.SchoolName = "HVCN BCVT";
    }

    /**
     * Khai báo một phương thức
     * Author: NPTAN (19/11/2021)
     */
    getName() {
        return 'Đây là con';
    }

    /**
     * Khai báo một phương thức tĩnh: chỉ sử dụng được qua Class
     * Author: NPTAN (19/11/2021)
     */
    static getSchoolName() {
        return 'MISA';
    }

}

var employee = new Employee('Nguyễn Phi Tân');
console.log(employee.getName());
// console.log(employee.getName());
