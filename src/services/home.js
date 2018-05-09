import request from '../utils/request';
import {stringify} from 'qs';
//社联基本信息
export async function getClubUnionInfo() {
    /**
     * pageNo   页码
     pageSize 每页多少条
     * */
    return request(`/dicParams/getDicParamsByType?type=SAU_INFO`);
}
//社联各部门信息
export async function getClubUnionDepartments() {
    return request(`/dicParams/getDoubleLayerCascadeDicParams?type=SAU_DEPT`);
}
//获取全部社团类型
export async function getClubTypes() {
    return request(`/dicParams/getDicParamsByType?type=ASSOCIATION_CATEGORY`);
}
//根据类型分页获取社团列表
export async function getClubUnionInfos(params) {
    /**
     * type 类型
     * pageNo   页码
     pageSize 每页多少条
     * */
    return request(`/ass/getPageIsEnroll?${stringify(params)}`);
}
//根据社团id获取社团详细信息
export async function getClubInfoForId(params) {
    return request(`ass/getOne?id=${params.id}`);
}
//获取全部推文类型
export async function getArticleTypes() {
    return request(`/dicParams/getDicParamsByType?type=TWEETS_CATEGORY`);
}
//根据类型分页获取推文列
export async function getArticlesForType(params) {
    /**
     * type 类型
     * pageNo   页码
     pageSize 每页多少条
     * */
    return request(`/actart/getPageByTypeIsShow?${stringify(params)}`);
}

//根据社团分页获取推文列表
export async function getArticlesForAssId(params) {
    /**
     * assId 社团id
     * pageNo   页码
     pageSize 每页多少条
     * */
    return request(`/actart/getPageByAssIdIsShow?${stringify(params)}`);
}
//根据推文id获取详细推文
export async function getArticleForId(params) {
    return request(`/actart/getOne?id=${params.id}`);
}