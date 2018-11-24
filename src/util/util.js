import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;

export default {
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            // currrent:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total_count,
            showTotal:()=>`共${data.result.total_count}条`,
            showQuickJumper:true
        }
    },
    getOptionList(data){
        if(!data){
            return []
        }
        let option=[]
        data.map((item)=>{
            option.push(<Option value={item.id} key={item.id} >{item.name}</Option>)
        })
        return option
    },
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },

}