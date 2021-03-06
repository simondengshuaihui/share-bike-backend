import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
  static jsonp(option) {
    return new Promise((resolve, reject) => {
      JsonP(
        option.url,
        {
          param: 'callback',
        },
        function(err, res) {
          if (res.status == 'success') {
            resolve(res)
          } else {
            reject(res.messsage)
          }
        }
      )
    })
  }

  static ajax(options) {
    let loading
    let baseUrl = `https://easy-mock.com/mock/5beae2788eaaf00b3a4e14ac/api`
    // 显示遮罩层
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }
    return new Promise((resolve, reject) => {
      const data = {
        result: {},
        code: 0,
      }
      const url = options.url
      // 自己返回数据
      if (url === '/map/bike_list') {
        data.result = {
          total_count: 10,
          route_list: [],
        }
        data.service_list = []
        data.bike_list = []
      } else if (url === '/open_city') {
        data.result = {
          item_list: [
            {
              id: 1,
              name: '北京',
              mode: 1,
              franchisee_name: 'user',
              city_admins: ['lili'],
              open_time: '2020',
              update_time: Date.now(),
              sys_user_name: 'simon',
            },
          ],
        }
      } else if (url === '/order/detail') {
        data.result = {
          position_list: [],
          area: [],
        }
      } else if (url === '/order/ebike_info') {
        data.result = {
          bike_sn: 1231,
          battery: 89,
          start_time: 2020,
          location: 'gz',
        }
      } else if (url === '/order/list') {
        data.result = {
          item_list: [
            {
              id: 1,
              order_sn: 1231,
              bike_sn: 89,
              user_name: 'simon',
              mobile: 189,
              distance: 100,
              total_time: 10,
              status: 8,
              start_time: 2020,
              end_time: 2020,
              total_fee: 10,
              user_pay: 10,
            },
          ],
        }
      } else if (url === '/role/list') {
        data.result = {
          list: [],
        }
      } else if (url === '/role/user_list') {
        data.result = []
      } else if (url === '/table/list') {
        data.result = {
          list: [
            {
              id: '1',
              userName: 'Lily',
              sex: '1',
              state: '1',
              interest: '1',
              birthday: '2000-01-01',
              address: '北京市海淀区奥林匹克公园',
              time: '09:00',
            },
            {
              id: '2',
              userName: 'Lily',
              sex: '1',
              state: '1',
              interest: '1',
              birthday: '2000-01-01',
              address: '北京市海淀区奥林匹克公园',
              time: '09:00',
            },
            {
              id: '3',
              userName: 'Lily',
              sex: '1',
              state: '1',
              interest: '1',
              birthday: '2000-01-01',
              address: '北京市海淀区奥林匹克公园',
              time: '09:00',
            },
          ],
        }
      } else if (url === '/table/heigh/list') {
        data.result = {
          list: [
            {
              id: '1',
              userName: 'Lily',
              sex: '1',
              state: '1',
              interest: '1',
              birthday: '2000-01-01',
              address: '北京市海淀区奥林匹克公园',
              time: '09:00',
            },
            {
              id: '2',
              userName: 'Lily',
              sex: '1',
              state: '1',
              interest: '1',
              birthday: '2000-01-01',
              address: '北京市海淀区奥林匹克公园',
              time: '09:00',
            },
            {
              id: '3',
              userName: 'Lily',
              sex: '1',
              state: '1',
              interest: '1',
              birthday: '2000-01-01',
              address: '北京市海淀区奥林匹克公园',
              time: '09:00',
            },
          ],
        }
      }

      setTimeout(() => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        resolve(data)
      }, 500)
      // axios({
      //   baseURL: baseUrl,
      //   url:options.url,
      //   method: options.method || "get",
      //   timeout: 5000,
      //   params: options.data || ""
      // }).then(res => {
      //   // 返回数据后隐藏遮罩层
      //   if (options.data && options.data.isShowLoading !== false) {
      //     loading = document.getElementById("ajaxLoading");
      //     loading.style.display = "none";
      //   }
      //   if (res.status === 200) {
      //     if (res.data.code == 0) {
      //       resolve(res.data);
      //     } else {
      //       Modal.info({
      //         title: "提示",
      //         content: res.data.msg
      //       });
      //     }
      //   } else {
      //     loading.style.display = "none";
      //     reject(res);
      //   }
      // });
    })
  }
}
