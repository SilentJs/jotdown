import Razorpay from "razorpay"
import { RazorpayOrderOptions } from "../../types"

export default class RazorpayService{
    constructor(){
        // console.log(process.env.RAZORPAY_SECRET_CLIENT_ID)
        this.razorpay= new Razorpay({
            key_id:'rzp_test_c5QgQ6Mw8rYqRo',
            key_secret:'KaxujSmYwkdyWNj1YkegXyFI',
        })
    }
    public async createOrder(options:RazorpayOrderOptions):Promise<string>{
        try {
            const order = await this.razorpay.orders.create(options)
            return Promise.resolve(order.id)
        } catch (error) {
            return Promise.reject('FAILED')
        }
    }
    razorpay: Razorpay; 
} 