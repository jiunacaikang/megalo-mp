const createBaseConfig = require("./createBaseConfig");
const platform = process.argv[process.argv.length - 1]; // wechat || alipay || swan
const isDev = process.env.NODE_ENV === "development"; // 执行环境
const config = createBaseConfig(platform, isDev);

module.exports = config;
