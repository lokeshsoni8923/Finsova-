export interface MobiResponse {
  success: true;
  message: string;
   data: {
    customerName: string;
    amount: string;
    plans: any[]; // <-- use any[] if you don't want to define a structure
  };
  statusCode: number;
}
export interface CommonResponse {
  success: true;
  message: string;
   data:[];
  statusCode: number;
}
export interface ViewBillResponse {
  success: true;
  message?: {
    code:number,
    text:string
  }; // Optional if not always present
  data: {
    billAmount: string;
    billnetamount: string;
    billdate: string;
    dueDate: string;
    acceptPayment: boolean;
    acceptPartPay: boolean;
    userName: string;
  };
  statusCode?: number; // Optional if not always returned
}
export interface RechargeStatusResponse {
  success: true;
  message: string;
  data: {
    txStatus: {
      queryStatus: string;
      txId: string;
      uid: string;
      cellNumber: string;
      amount: string;
      status: string;
      statusDetails: string;
      date: string;
      discountprice: string;
      mobikwikrefno: string;
      mobikwikstamp: string;
      operatorrefno: string;
      operatorname: string;
      circlename: string;
      googleVoucherCode: string | null;
    };
  };
  statusCode: number;
}
export interface RechargeResponse {
  status: 'SUCCESS' | 'SUCCESSPENDING' | 'FAILURE';
  txId?: string;
  balance?: string;
  discountprice?: string;
  couponstatus?: string | null;
  mobikwikstamp?: string;
  opRefNo?: string | null;
  googleVoucherCode?: string | null;
  errorMsg?: string; // Only for FAILURE
}

export interface ResponseRecharge {
  success: boolean;
  message?: string;
  data: RechargeResponse; // Array of recharge statuses
  statusCode?: number;
}

