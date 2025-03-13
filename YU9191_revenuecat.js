/*************************************


[rewrite_local]
#修改
^https:\/\/(api\.revenuecat\.com|api\.rc-backup\.com)\/.+\/(receipts$|subscribers\/[^/]+$) url script-response-body https://raw.githubusercontent.com/Joanesnn/Quantumultx_YU9191/main/YU9191_revenuecat.js
#清理
^https:\/\/(api\.revenuecat\.com|api\.rc-backup\.com)\/.+\/(receipts$|subscribers\/[^/]+$) url script-request-header https://raw.githubusercontent.com/Joanesnn/Quantumultx_YU9191/main/YU9191_revenuecat.js

https://api.lianjiu.fun/app/api/v1/profile url reject

[mitm] 
hostname = api.revenuecat.com, api.lianjiu.fun


************************************/

const Q = {};
const Q1 = JSON.parse(typeof $response != "undefined" && $response.body || null);
if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  Q.headers = $request.headers;
} else if (Q1 && Q1.subscriber) {
  Q1.subscriber.subscriptions = Q1.subscriber.subscriptions || {};
  Q1.subscriber.entitlements = Q1.subscriber.entitlements || {};
  var headers = {};
  for (var key in $request.headers) {
  const reg = /^[a-z]+$/;
  if (key === "User-Agent" && !reg.test(key)) {
    var lowerkey = key.toLowerCase();
    $request.headers[lowerkey] = $request.headers[key];
    delete $request.headers[key];
    }
  }
  var UA = $request.headers['user-agent'];
  const app = '1';
  const UAMappings = {
    'ClipyBoard':{name:'premium',id:'clipyboard_yearly'},//2.27
    'Spark':{name:'premium',id:'spark_c_5999_1y_d50'},//2.27
    'Nightcam':{name:'nightcam_pro',id:'com.ahmetserdarkaradeniz.nightcamyearlyalternative'},//11.26
    'Jellycuts':{name:'pro',id:'standart'},//11.21
    'Unfold':{name:'FF2_STORY',id:'UNFOLD_PRO_YEARLY'},//11.2
    'GigaBody':{ name: 'Pro', id: 'GigaBodySubscriptionYear_v1'},//8.21
    'Loora':{ name: 'Yearly', id: 'yearly_119_99_no_trial'},//8.14
    'Python3IDE':{ name: 'pro', id: 'python3ide_six_month'},//7.14
    'PrevisShot':{ name: 'VIP', id: 'com.previsshot.previsshot.continuous_subscribe_12month_vip'},//7.9
    'clica':{ name: 'pro', id: 'clica.vip.year'},//
    'FoJiCam':{ name: 'ProVersionLifeTime', id: 'com.uzero.cn.fojicam.life2'},//2024.4.9
    'Vision':{ name: 'promo_3.0', id: 'vis_lifetime_3.0_promo'},
    'Structured':{ name: 'pro', id: 'today.structured.pro'},
    'Version':{ name: 'pro', id: 'httpbot_1499_1y_1w0'},
    'AnkiPro':{ name: 'Premium', id: 'com.ankipro.app.lifetime'},
    'Langster':{ name: 'Premium', id: 'com.langster.universal.lifetime'},
    'Readle':{ name: 'Premium', id: 'com.hello.german.yearly'},
    'HabitKit':{ name: 'Pro', id: 'habitkit_1799_lt'},
    'Currency':{ name: 'plus', id: 'com.jeffreygrossman.currencyapp.iap.pro.crossgrade'},
    'VSCO':{name:'pro',id:'vscopro_global_5999_annual_7D_free'},
    'Pillow':{name:'premium',id:'com.neybox.pillow.premium.yearly'}
    
    
    
    };

  const data = {
    "expires_date": "2099-12-31T12:00:00Z",
    "original_purchase_date": "2023-09-01T11:00:00Z",
    "purchase_date": "2023-09-01T11:00:00Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };
  for (const i in UAMappings) {
    if (new RegExp(`^${i}`, 'i').test(UA)) {
      const { name, id } = UAMappings[i];
      Q1.subscriber.subscriptions = {};
      Q1.subscriber.subscriptions[id] = data;
      Q1.subscriber.entitlements[name] = JSON.parse(JSON.stringify(data));
      Q1.subscriber.entitlements[name].product_identifier = id;
      break;
    }
  }
  Q.body = JSON.stringify(Q1);
}
$done(Q);
