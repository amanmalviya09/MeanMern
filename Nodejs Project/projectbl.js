class Employee{
    constructor(basicpay){
      this.basicpay=basicpay;
    }
    calculateNetPay(){
        var grosspay = 0;
        if(this.basicpay>50000){
        var hra = (this.basicpay*40)/100;
        }
               
        else{
            var hra = (this.basicpay*30)/100;
            }
            grosspay = this.basicpay + hra
            var netpay = grosspay - 1000;
            return netpay;
        }


}
module.exports.Employee=Employee;