import {toast} from "react-toastify"

export function success(msg){
 toast.success(msg,{
    position:"top-right"
 })
}
export function failed(msg){
 toast.error(msg,{
    position:"top-right"
 })
}