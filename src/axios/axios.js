import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
    static jsonp(option){
        return new Promise((resolve,reject)=>{
            JsonP(option.url,{
                param: 'callback'
            },function(err,res){
                if (res.status == 'success') {
                    resolve(res);
                } else {
                    reject(res.messsage);
                }
            })
        })
    }
    
}