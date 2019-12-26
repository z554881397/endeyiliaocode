
import api from './api.js';
import apiUtil from './apiUtil.js';

const generateApiMap = apiUtil.generateApiMap({...api})
export default {
  ...generateApiMap // 取出所有可遍历属性赋值在新的对象上
}