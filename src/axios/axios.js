import JsonP from "jsonp";
import axios from "axios";
import { Modal } from "antd";

export default class Axios {
  static jsonp(option) {
    return new Promise((resolve, reject) => {
      JsonP(
        option.url,
        {
          param: "callback"
        },
        function(err, res) {
          if (res.status == "success") {
            resolve(res);
          } else {
            reject(res.messsage);
          }
        }
      );
    });
  }

  static ajax(options) {
    let loading;
    let baseUrl = `https://easy-mock.com/mock/5beae2788eaaf00b3a4e14ac/api`;
    // 显示遮罩层
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById("ajaxLoading");
      loading.style.display = "block";
    }
    return new Promise((resolve, reject) => {
      axios({
        baseURL: baseUrl,
        url:options.url,
        method: options.method || "get",
        timeout: 5000,
        params: options.data || ""
      }).then(res => {
        // 返回数据后隐藏遮罩层
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById("ajaxLoading");
          loading.style.display = "none";
        }
        if (res.status === 200) {
          if (res.data.code == 0) {
            resolve(res.data);
          } else {
            Modal.info({
              title: "提示",
              content: res.data.msg
            });
          }
        } else {
          loading.style.display = "none";
          reject(res);
        }
      });
    });
  }
}
