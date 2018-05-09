import request from '../utils/request';
import {stringify} from 'qs';
// 获取数据
export async function getPage(params) {
    /**
     * pageNo   页码
     pageSize 每页多少条
     * */
    return request(`/datadow/getPageIsEnable?${stringify(params)}`);
}