
const qiniu = require('qiniu')
// const proc = require('process')
var accessKey = 'PyCEyXL5N3SSIDyeaoaT4hlh1v4Ou-JiP419n667'
var secretKey = 'PSZz3guPApl4WhU_NeKMvEtTdhvnFb3CxIl1HMQh'
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
var config = new qiniu.conf.Config()
// config.useHttpsDomain = true;
// config.zone = qiniu.zone.Zone_z1;
var bucketManager = new qiniu.rs.BucketManager(mac, config)
// var resUrl = 'http://devtools.qiniu.com/qiniu.png'
var bucket = 'mark'
// var key = 'qiniu.png'
exports.fetchQinIu = (resUrl, userName, call) => {
  bucketManager.fetch(resUrl, bucket, userName, function (err, respBody, respInfo) {
    if (err) {
      console.log(err)
      // throw err;
    } else {
      if (respInfo.statusCode == 200) {
        console.log('--------')
        console.log('文件名', respBody.key)
        // console.log('文件名',respBody.hash)
        console.log('文件大小:', respBody.fsize)
        console.log('文件类型:', respBody.mimeType)
        console.log('--------')
        call(respBody)
      } else {
        console.log(respInfo.statusCode)
        console.log(respBody)
      }
    }
  })
}
