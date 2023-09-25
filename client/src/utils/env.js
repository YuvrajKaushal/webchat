import { removeBlank } from './tools'

const info = (function () {
  let system = '' // 系统版本
  let os = '' // 机型
  const ua = navigator.userAgent // 用户代理

  let logMsg = 'Unknown'
  // 设备检测
  const ipod = ua.match(/(ipod).*\s([\d_]+)/i)
  const ipad = ua.match(/(ipad).*\s([\d_]+)/i)
  const iphone = ua.match(/(iphone)\sos\s([\d_]+)/i)
  const android = ua.match(
    /(Android\s\S*)(\szh-cn;|\szh-CN;)?\s?((\S*)\s(\S*\s\S*)|(\w*)-(\w*)|(\S*)\s(\S*))\sBuild/i
  )
  let s
  const browser = (s = ua.match(/(MSIE [\d.]+)/))
    ? s[1]
    : (s = ua.match(/(Firefox\/[\d.]+)/))
        ? s[1]
        : (s = ua.match(/(Chrome\/[\d.]+)/))
            ? s[1]
            : (s = ua.match(/(Opera.[\d.]+)/))
                ? s[1]
                : (s = ua.match(/(Version\/[\d.]+).*Safari/))
                    ? s[1]
                    : 'Unknown'

  if (android && android.length > 2) {
    logMsg = android[1].replace(';', '') + ',' + android[3]
  } else if (iphone) {
    logMsg = 'iPhone,iOS ' + iphone[2].replace(/_/g, '.')
  } else if (ipad) {
    logMsg = 'iPad,iOS ' + ipad[2].replace(/_/g, '.')
  } else if (ipod) {
    logMsg = 'iPod,iOS ' + ipod[2].replace(/_/g, '.')
  } else {
    logMsg = 'browser,' + browser
  }
  logMsg = removeBlank(logMsg)
  const logList = logMsg.split(',')
  system = logList[0]
  os = logList[1]

  return {
    browser: system,
    os,
    ua
  }
})()

export default info
