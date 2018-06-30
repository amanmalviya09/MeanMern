class Employee{

    constructor(basicpay){
        this.basicpay=basicpay;
    }
    calculatenetpay(){
     var grosspay =0 ;
     if(this.basicpay>50000){
        var hra = (this.basicpay*0.4);
     }  
     else{
        var hra = (this.basicpay*0.3);
     }
     grosspay = this.basicpay+hra;
     var netpay = grosspay - 1000;
     return netpay;

    }
}
module.exports.Employee=Employee;