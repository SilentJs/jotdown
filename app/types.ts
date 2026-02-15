import type { StaticImageData } from "next/image";
export const serverUrl = 'http://localhost:4000/'
export interface GoogleOneTapProps{
    clientId:string;
}
export interface GoogleOneTapResponse {
    credential:string,
    clientId:string,
    client_id:string,
}
export interface DecodedJwtPayload {
    sub?: string;             // User ID
    name: string;            // Full Name
    given_name?: string;      // Given Name
    family_name?: string;     // Family Name
    picture: string;         // Image URL
    email: string;
    jti:string;           // Email
    // Add any additional properties as needed
}
export interface orderCustomizationSettings{
    propertyName1:string;
    propertyName2:string;
    propertyName3:string;

}
export interface billValues{
    billProperty1:number;
    billProperty2:number;
    billProperty3:number;
    billProperty4:number;
}
export interface order{
    orderid?:string;
    id:string;
    ordertype:string,
    pagenumber:string,
    decornumber:string,
    diagramnumber:string,
    instructions:string,
    filelinks:string,
    totalamount:string,
    orderstatus?:string,
    timestamp?:string
    paymentid:string,
    ogfilename:string | null,
    assignedwriterid?:string,
    fulladdress:string,
    fullwriteraddress?:string,
    ogwriterfilename?:string,
    serverwriterfilename?:string,
    writerfilelinks?:string,
    serverfilename:string | null,
}
export interface order2{
    orderId?:string;
    id:string;
    orderType:string,
    pageNumber:string,
    decorNumber:string,
    diagramNumber:string,
    instructions:string,
    fileLinks:string,
    totalAmount:string,
    orderStatus?:string,
    timestamp?:string,
    paymentId:string,
    ogFileName:string | null,
    assignedWriterId?:string
    serverFileName:string | null,
}
export interface dashboardState{
    controlAreaState: "NFOrders" | "";
}
export interface ordersDashboardState{
    imageFunction:Function,
    imageSelected:number,
    image?:StaticImageData,
    fullAddress:string,
    displayBillList?:boolean,
    screenWidth?:string,
    type?:string,
    notebooktype1?:string,
    notebooktype2?:string
    isType1Selected?: boolean,
    selectedTypeCost:number,
    type1Cost?:number,
    type2Cost?:number,
    noteBookNumber?:number,
    pageNumber?:number,
    diagramNumber?:number,
    billBoxNotification?:boolean
}
export interface credentialsJson{
    type:'admin' | 'writer' | 'jwtToken';
    uuid?:string;
    username?:string;
    password:string;
    jwtToken?:string;
    orderstatus?:string;
}

export interface RazorpayOrderOptions {
    amount: number;
    currency: string;
    receipt?: string;
    payment_capture?: number; // 1 for automatic capture, 0 for manual capture
    // Add other relevant options based on the Razorpay API documentation
}
export type adminPanelAction = "WA" | "WDA"
export type adminPanelOrderStatus = 'NF' | 'SA' | 'AS' | 'PI' | 'DS' | 'FF'
export interface tokenJson{
    jwtToken:string,
    settings?:{
        action:adminPanelAction,        //WA: Writer Assign WDA: Writer Deassign
        orderId:string,
        writerId:string
    },
    orderstatus:adminPanelOrderStatus
}  
  