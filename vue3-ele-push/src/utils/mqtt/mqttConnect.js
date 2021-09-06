/**
 * Created by zcr on 2018/5/21.
 */

window.Paho = require('./paho-mqtt').Paho;

const pageConfig = require('./../../store/config');
const commonFun = require('./../../store/common');
var client = null

var userdata = null;

//连接MQ
function connectMqtt(user, onConnect, onMessageArrived, connectionLost, onFail) {
  console.log('开始连接...');
  //console.log(user);
  userdata = user;
  //console.log(commonFun)
  let topBaseData = commonFun.$common.deepCopy(pageConfig.topBaseData);
  //console.log(topBaseData)
  pageConfig.allBaseData = [];
  //初始化所有topic
  topBaseData.forEach((item, index) => {
    topBaseData[index].topic = changeTopStr(item.topic, user.platformid, user.workerid);
  })
  pageConfig.allBaseData = topBaseData;
  //获取需要关注的topic
  let topicArr = [];

  topicArr = getMyTopic(pageConfig.followTopic, userdata.userid)

  pageConfig.topicArr = topicArr;
  // 139.198.186.246
  // 15673
  // https://yljtest.jstxb.com/
  let mqSetting = {
    // hostname: 'jchcapp.jstxb.com',
    // port: '15673',
    hostname: 'yljtest.jstxb.com',//'139.198.177.119',
    port: '443',
    mquser: 'orderclient',
    mqpassword: 'orderclient123',
    // hostname:userdata.mqtturl,
    // port:userdata.mqttport,
    // mquser:userdata.mquser,
    // mqpassword:userdata.mqpassword,
  }

  var hostname = mqSetting.hostname;
  var port = mqSetting.port;
  var path = '/ws';
  var clientId = Math.random().toString(16).substr(2, 8);


  client = new Paho.MQTT.Client(hostname, Number(port), path, clientId);//初始化

  client.onMessageArrived = onMessageArrived;//接受订阅内容回调
  client.onConnectionLost = connectionLost;//断开链接回调

  var options = {
    invocationContext: {host: hostname, port: port, path: path, clientId: clientId},
    timeout: 3,//超时时间
    keepAliveInterval: 10,//心跳
    cleanSession: false,//是否保存断线消息
    useSSL: true,
    userName: mqSetting.mquser,
    password: mqSetting.mqpassword,
    reconnect: true,
    onSuccess: onConnect,//成功回调
    onFailure: onFail//失败回调
  };

//   var lastWillMessage ={
//     workername:user.workername,
//     workerid:user.workerid,
//     headpic:user.headpic,
//     workertype:user.permlevel,
//     maxcallin:user.maxcallin,
//     servicestatus: 1006003,//服务状态 默认挂起状态  刷新后取 缓存的状态
//     workstatus:userdata.yzStatus,//工作状态
//     logintype:2001004,
//     ua:navigator.userAgent,
//     ip:user.ip,
//     workercode:user.workercode,
//     servicetype:user.groupno,//客服分组
//     groupname:user.groupname,//客服分组名称
//   };
//   var lastWillMessageData = getTopicByName('多客服上下线消息',lastWillMessage);
//   // console.log(lastWillMessageData)
//
// //设置遗嘱
//   var lastWillMessage = new Paho.MQTT.Message(JSON.stringify(lastWillMessage));
//   lastWillMessage.destinationName = changeTopStr(lastWillMessageData.topic,userdata.platformid,userdata.workerid);
//   lastWillMessage.qos = lastWillMessageData.QoS;
//   lastWillMessage.retained = lastWillMessageData.RETAIN;
//   options.willMessage = lastWillMessage;


//连接
  client.connect(options);

}


//订阅
function subscribe(topic) {
  // var topic = 'test';
  //console.log(topic)
  client.subscribe(topic, {qos: 2});
}

//发送topic
function publish(data) {
  console.log('发送topic');
  console.log(data);
  // var topic = 'publish_test';
  // var qos = 2;
  // var message = 'publish_test_rak';
  // var retain = true;

  var topic = data.topic;
  var qos = data.QoS;
  var message = data.PAYLOAD;
  var retain = data.RETAIN;

  message = new Paho.MQTT.Message(message);
  message.destinationName = topic;
  message.qos = Number(qos);
  message.retained = retain;
  client.send(message);

}


//断开连接
function disconnect() {
  if( !!client ){
    client.disconnect()
    client = null
  }
}


//主题字符替换
function getMyTopic(arr, userid) {
  let temp = [];
  if (arr.length > 0) {
    arr.forEach((item, index) => {
      item = changeTopStr(item, userid);
      temp.push(item)
    })
  }
  return temp
}

function changeTopStr(item, userid) {
  return item.replace('{userid}', userid)
}

//根据主题名称获取主题配置
function getTopicByName(name, payload) {
  let temp = null
  pageConfig.allBaseData.forEach((item, index) => {
    if (item.name == name) {
      temp = item;
      temp.PAYLOAD = payload;
    }
  })
  return temp
}

let mqtt = {
  connect: connectMqtt,
  publish: publish,
  subscribe: subscribe,
  getTopicByName: getTopicByName,
  disconnect: disconnect
}

// module.exports = {
//   connect: connectMqtt,
//   sendMqtt: sendMqtt,
//   MQsubscribe: subscribe,
// }
// 返回在vue模板中的调用接口
export default {
  install(Vue) {
    Vue.prototype.$mqtt = mqtt
    Vue.http = mqtt
  },
  $mqtt: mqtt
}

export const $mqtt = mqtt
