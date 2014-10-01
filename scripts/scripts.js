"use strict";function getJsonIndex(a,b,c){return b.indexOf(a("filter")(b,c)[0])}angular.module("config",[]).constant("ENV",{name:"production",apiEndpoint:"https://mealsonwheels.herokuapp.com/"});var myApp=angular.module("Mobile",["ionic","config","Mobile.controllers","Mobile.services","Mobile.directives","ngCookies","ngResource","angular-loading-bar","ngAnimate"]).run(["$ionicPlatform","$rootScope","Global","$filter","$location","Auth","$ionicPopup","$ionicNavBarDelegate",function(a,b,c,d,e,f,g,h){a.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&(StatusBar.styleDefault(),StatusBar.overlaysWebView(!1))}),b.isHome=!0,b.showLogin=!0,b.showDelete=!1,b.showDeleteRow=!1,b.showBackButton=!1,b.hasInternet=!0,b.hasLoggedIn=!1,b.predicate="+ranking",b.currentUser={},b.mainSwitch=!0,b.mainSwitchInfo="",b.blacklist=!1,b.sliders=[],b.isScam=!1;var i=c.getAllCities();i.then(function(a){b.allCities=a,b.currentCity=d("filter")(b.allCities,{isDefault:!0})[0]}),b.$on("$stateChangeStart",function(a,c){b.showDeleteRow=!1,f.isLoggedInAsync(function(a){if(c.authenticate&&!a){var d=g.alert({title:"温馨提示",template:"该页面需要登录后才能使用！",okText:"确定",okType:"button-assertive"});d.then(function(){h.back()})}else if(a){b.hasLoggedIn=!0;var e=f.getCurrentUser();e.$promise.then(function(a){b.currentUser=a,a.blacklist&&(b.blacklist=!0)})}})})}]).config(["$stateProvider","$urlRouterProvider","$httpProvider","cfpLoadingBarProvider",function(a,b,c,d){d.includeSpinner=!1,a.state("tab",{url:"/tab","abstract":!0,templateUrl:"views/tabs.html"}).state("tab.home",{url:"/home",views:{"tab-home":{templateUrl:"views/home/tab-home.html",controller:"HomeCtrl"}}}).state("tab.home-location",{url:"/home/location",views:{"tab-home":{templateUrl:"views/home/tab-home-location.html",controller:"HomeLocationCtrl"}}}).state("tab.suburb",{url:"/suburb/:suburbId",views:{"tab-home":{templateUrl:"views/home/tab-suburb.html",controller:"SuburbCtrl"}}}).state("tab.restaurant",{url:"/restaurant/:restaurantId",views:{"tab-home":{templateUrl:"views/home/tab-restaurant.html",controller:"RestaurantCtrl"}}}).state("tab.dish",{url:"/dish/:dishId",views:{"tab-home":{templateUrl:"views/home/tab-dish-detail.html",controller:"DishCtrl"}}}).state("tab.orders",{url:"/orders",views:{"tab-orders":{templateUrl:"views/orders/tab-orders.html",controller:"OrdersCtrl"}}}).state("tab.orders-confirm",{url:"/orders/confirm",views:{"tab-orders":{templateUrl:"views/orders/tab-orders-confirm.html",controller:"OrdersConfirmCtrl"}},authenticate:!0}).state("tab.pick-address",{url:"/orders/pickAddress",views:{"tab-orders":{templateUrl:"views/orders/tab-pick-address.html",controller:"PickAddressCtrl"}},authenticate:!0}).state("tab.order-tracking",{url:"/orders/tracking",views:{"tab-orders":{templateUrl:"views/orders/tab-orders-tracking.html",controller:"TrackingOrdersCtrl"}},authenticate:!0}).state("tab.order-details",{url:"/orders/order-details/:orderId",views:{"tab-orders":{templateUrl:"views/common/tab-order-details.html",controller:"OrderDetailsCtrl"}},authenticate:!0}).state("tab.account",{url:"/account",views:{"tab-account":{templateUrl:"views/settings/tab-account.html",controller:"AccountCtrl"}}}).state("tab.account-history",{url:"/account/history",views:{"tab-account":{templateUrl:"views/settings/tab-history.html",controller:"HistoryCtrl"}},authenticate:!0}).state("tab.account-order-details",{url:"/account/order/:orderId",views:{"tab-account":{templateUrl:"views/common/tab-order-details.html",controller:"OrderDetailsCtrl"}},authenticate:!0}).state("tab.account-address",{url:"/account/address",views:{"tab-account":{templateUrl:"views/common/my-address.html",controller:"AddressCtrl"}},authenticate:!0}).state("tab.account-password",{url:"/account/password",views:{"tab-account":{templateUrl:"views/account/change-password.html",controller:"PasswordCtrl"}},authenticate:!0}).state("tab.account-register",{url:"/account/register",views:{"tab-account":{templateUrl:"views/account/register.html",controller:"RegisterCtrl"}}}).state("tab.account-forgot",{url:"/account/forgot",views:{"tab-account":{templateUrl:"views/account/forgot.html",controller:"ForgotCtrl"}}}).state("tab.account-comments",{url:"/account/comments",views:{"tab-account":{templateUrl:"views/settings/comments.html",controller:"CommentsCtrl"}},authenticate:!0}),b.otherwise("/tab/home"),c.interceptors.push("authInterceptor")}]).factory("authInterceptor",["$rootScope","$q","$cookieStore","$location",function(a,b,c,d){return{request:function(a){return a.headers=a.headers||{},c.get("token")&&(a.headers.Authorization="Bearer "+c.get("token")),a},responseError:function(a){return 401===a.status?(d.path("#/home/tab"),c.remove("token"),b.reject(a)):b.reject(a)}}}]);angular.module("Mobile.controllers",[]),angular.module("Mobile.services",["config"]),angular.module("Mobile.directives",[]),angular.module("Mobile.controllers").controller("GlobalCtrl",["$scope","$rootScope","$ionicModal","$timeout","$ionicNavBarDelegate","$ionicPopup","$window","$filter","Auth","Global",function(a,b,c,d,e,f,g,h,i){a.user={},a.errors={},a.hasOtherError=!1,c.fromTemplateUrl("views/account/login.html",{scope:a}).then(function(b){a.modal=b}),a.closeLogin=function(){a.modal.hide(),a.submitted=!1},a.login=function(){a.modal.show()},a.doLogin=function(c){a.hasOtherError=!1,a.submitted=!0,c.$valid&&i.login({username:a.user.username,password:a.user.password}).then(function(){console.log("logged in"),a.modal.hide(),b.hasLoggedIn=!0,b.currentUser.mobile=a.user.username;var c=i.getCurrentUser();c.$promise.then(function(a){b.currentUser=a})}).catch(function(b){a.hasOtherError=!0,a.errors.other=b.message,d(function(){a.hasOtherError=!1},3e3)})},a.goBack=function(){""==e.getPreviousTitle()&&(window.location.href="#/tab/home"),"订单跟踪"==e.getTitle()?window.location.href="#/tab/orders":e.back()},a.toggleDeleteBtn=function(){b.showDeleteRow=!b.showDeleteRow},b.$watch("hasInternet",function(b){if(a.hasInternet=b,!b){var c=f.alert({title:"网络异常",template:"请检查您的网络连接状态！",okText:"重试",okType:"button-assertive"});c.then(function(){g.location.href="#/tab/home",g.location.reload()})}}),b.$watch("mainSwitch",function(a){if(0==a){var c=f.alert({title:"非常抱歉",template:b.mainSwitchInfo,okText:"确定",okType:"button-assertive"});c.then(function(){g.location.href="#/tab/home",g.location.reload()})}}),a.gotoRegister=function(){a.modal.hide(),a.submitted=!1,window.location.href="#/tab/account/register"},a.gotoSettings=function(){window.location.href="#/tab/account"},a.gotoLocation=function(){window.location.href="#/tab/home/location"},a.gotoForgot=function(){a.modal.hide(),a.submitted=!1,window.location.href="#/tab/account/forgot"}}]),angular.module("Mobile.controllers").controller("HomeCtrl",["$scope","$rootScope","Global","$ionicSlideBoxDelegate","$filter",function(a,b,c,d,e){if(b.isHome=!0,b.showLogin=!0,b.showDelete=!1,b.showBackButton=!1,b.sliders.length)a.sliders=b.sliders,d.update();else{var f=c.getAllSliders();f.then(function(c){a.sliders=c,b.sliders=c,d.update()})}var g=c.getAllCities();g.then(function(a){b.allCities=a;var d=c.getCurrentCityId();b.currentCity=""==d?e("filter")(b.allCities,{isDefault:!0})[0]:e("filter")(b.allCities,{_id:d})[0];var f=c.getAllSlidersNoStatusBar();f.then(function(a){b.sliders=a})})}]).controller("HomeLocationCtrl",["$scope","$rootScope","Global","$filter","$ionicNavBarDelegate",function(a,b,c,d,e){b.isHome=!1,b.showDelete=!1,b.showLogin=!1,b.showBackButton=!0,a.setCurrentCity=function(a){c.setCurrentCity(a);var e=c.getCurrentCityId();b.currentCity=""==e?d("filter")(b.allCities,{isDefault:!0})[0]:d("filter")(b.allCities,{_id:e})[0]},a.goback=function(){e.back()};var f=c.getAllCities();f.then(function(a){b.allCities=a;var e=c.getCurrentCityId();b.currentCity=""==e?d("filter")(b.allCities,{isDefault:!0})[0]:d("filter")(b.allCities,{_id:e})[0]})}]).controller("SuburbCtrl",["$scope","$rootScope","$stateParams","Global","$filter",function(a,b,c,d,e){b.isHome=!1,b.showDelete=!1,b.showLogin=!1,b.showBackButton=!0,a.currentSuburb=d.getSuburbBySuburbId(c.suburbId);var f=d.getAllCities();f.then(function(f){b.allCities=f;var g=d.getCurrentCityId();b.currentCity=""==g?e("filter")(b.allCities,{isDefault:!0})[0]:e("filter")(b.allCities,{_id:g})[0],a.currentSuburb=d.getSuburbBySuburbId(c.suburbId)})}]).controller("RestaurantCtrl",["$scope","$rootScope","$stateParams","Global","$filter",function(a,b,c,d,e){b.isHome=!1,b.showDelete=!1,b.showLogin=!1,b.showBackButton=!0,a.currentRestaurant=d.getRestaurantByRestaurantId(c.restaurantId);var f=d.getAllCities();f.then(function(f){b.allCities=f;var g=d.getCurrentCityId();b.currentCity=""==g?e("filter")(b.allCities,{isDefault:!0})[0]:e("filter")(b.allCities,{_id:g})[0],d.updateCurrentSuburb(),a.currentRestaurant=d.getRestaurantByRestaurantId(c.restaurantId)})}]).controller("DishCtrl",["$scope","$rootScope","$stateParams","Global","$ionicPopup","$filter",function(a,b,c,d,e,f){if(b.isHome=!1,b.showDelete=!1,b.showLogin=!1,b.showBackButton=!0,a.currentDish=d.getDishByDishId(c.dishId),a.currentRestaurant=d.getCurrentRestaurant().name,a.currentRestaurantStatus=d.getCurrentRestaurant().active,a.hasAdded=d.hasAdded(a.currentDish),a.buttonText=a.hasAdded?"已加入订单":"加入订单",0!=a.currentDish.active&&(a.currentDish.active=!0),a.addToCart=function(){var b=d.addToCart(a.currentDish);if(2==b){var c=e.confirm({title:"温馨提示",template:"您正在不同的区下订单，这将清空您之前所下的订单，确定要继续吗?",okText:"确定",okType:"button-assertive",cancelText:"取消"});c.then(function(b){b&&(d.resetCart(),d.addToCart(a.currentDish),a.hasAdded=!0,a.buttonText="已加入订单")})}else a.hasAdded=!0,a.buttonText="已加入订单"},a.isLiking=!1,a.likeIt=function(){d.likeThisDish(b.currentUser.mobile,c.dishId),a.isLiking=!0},a.unlikeIt=function(){d.unlikeThisDish(b.currentUser.mobile,c.dishId),a.isLiking=!1},b.hasLoggedIn){var g=d.checkLike(b.currentUser.mobile,c.dishId);g.then(function(b){b.res&&(a.isLiking=!0)})}var h=d.getAllCities();h.then(function(e){b.allCities=e;var g=d.getCurrentCityId();b.currentCity=""==g?f("filter")(b.allCities,{isDefault:!0})[0]:f("filter")(b.allCities,{_id:g})[0],d.updateCurrentSuburb(),d.updateCurrentRestaurant(),a.currentDish=d.getDishByDishId(c.dishId),0!=a.currentDish.active&&(a.currentDish.active=!0),a.currentRestaurant=d.getCurrentRestaurant().name,a.currentRestaurantStatus=d.getCurrentRestaurant().active})}]),angular.module("Mobile.controllers").controller("OrdersCtrl",["$scope","$stateParams","Global","$rootScope","$filter","$ionicListDelegate","$ionicPopup","Orders","Auth",function(a,b,c,d,e,f,g,h){d.isHome=!1,d.showLogin=!0,d.showDelete=!0,d.showBackButton=!1,a.cart=c.getCart(),a.data={showDelete:!1},d.$watch("showDeleteRow",function(b){a.showDeleteRow=b}),a.onItemDelete=function(b){c.deleteCartItem(b),a.cart=c.updateCartTotal()},a.gotoAddressPick=function(){if(c.checkMinSpend())if(c.checkDeliveryTime())window.location.href="#/tab/orders/pickAddress";else{var a=g.alert({title:"温馨提示",template:"您的订单与送餐时间不符，请查看餐厅的送餐时间！",okText:"确定",okType:"button-assertive"});a.then(function(){})}else{var a=g.alert({title:"温馨提示",template:"您的订单没有达到餐厅最低消费额度！",okText:"确定",okType:"button-assertive"});a.then(function(){})}},a.updateCart=function(){a.cart=c.updateCartTotal()},a.closeComment=function(){f.closeOptionButtons()};var i=c.getAllCities();i.then(function(b){d.allCities=b;var f=c.getCurrentCityId();d.currentCity=""==f?e("filter")(d.allCities,{isDefault:!0})[0]:e("filter")(d.allCities,{_id:f})[0],a.cart=c.updateCart()}),a.trackingOrder=h.getCart(),0==a.trackingOrder.total?(a.hasTrackingOrder=!1,d.$watch("hasLoggedIn",function(b){if(b){var e=c.getUnfinishedOrder(d.currentUser.mobile);e.then(function(b){b.length>0&&(a.trackingOrder=h.setCart(b[0]),a.hasTrackingOrder=!0,d.showDelete=!1)})}})):(a.hasTrackingOrder=!0,d.showDelete=!1)}]).controller("OrdersConfirmCtrl",["$scope","$stateParams","Orders","$rootScope","Account","Global","$filter",function(a,b,c,d,e,f,g){d.isHome=!1,d.showLogin=!1,d.showDelete=!1,d.showBackButton=!0,a.cart=f.getCart(),a.gotoTracking=function(){d.blacklist||(c.confirmCart(a.cart,d.currentUser.mobile),f.resetCart(),c.saveToDb(),window.location.href="#/tab/orders/tracking")};var h=f.getAllCities();h.then(function(b){d.allCities=b;var c=f.getCurrentCityId();d.currentCity=""==c?g("filter")(d.allCities,{isDefault:!0})[0]:g("filter")(d.allCities,{_id:c})[0],a.cart=f.updateCart()})}]).controller("PickAddressCtrl",["$scope","$stateParams","$ionicModal","$rootScope","Account","Global",function(a,b,c,d,e,f){d.isHome=!1,d.showLogin=!1,d.showDelete=!1,d.showBackButton=!0;var g=!0;a.gotoConfirm=function(){g&&f.setDeliveryAddress(a.userLocations.primaryAddress),window.location.href="#/tab/orders/confirm"},c.fromTemplateUrl("views/common/new-address.html",{scope:a}).then(function(b){a.modal=b}),a.closeModal=function(){a.submitted=!1,a.modal.hide()},a.newAddress=function(){a.modal.show()};var h=e.getAllLocationsByMobile(d.currentUser.mobile);h.then(function(b){a.userLocations=b}),a.addr={},a.addr.isPrimaryAddress=!1,a.submitted=!1,a.newAddressSubmit=function(b){if(a.submitted=!0,b.$valid){var c=e.addNewAddress(d.currentUser.mobile,a.addr.newAddressData,a.addr.isPrimaryAddress);c.then(function(b){if(b.res){var c=e.getAllLocationsByMobile(d.currentUser.mobile);c.then(function(b){a.userLocations=b})}a.modal.hide(),a.addr={},a.addr.isPrimaryAddress=!1,a.submitted=!1})}},a.setPrimaryAddress=function(a){g=!1,f.setDeliveryAddress(a),e.setPrimaryAddress(d.currentUser.mobile,a)}}]).controller("TrackingOrdersCtrl",["$scope","$stateParams","Orders","$rootScope","$ionicModal","$ionicNavBarDelegate","$interval",function(a,b,c,d,e,f,g){if(d.isHome=!1,d.showLogin=!1,d.showDelete=!1,d.showBackButton=!0,a.cart=c.getCart(),e.fromTemplateUrl("views/common/rating-modal.html",{scope:a}).then(function(b){a.modal=b}),a.closeModal=function(){a.modal.hide()},a.ratingPopup=function(){a.modal.show()},a.user={},a.user.rating=50,a.doRating=function(){c.updateRating(a.user.rating),a.modal.hide(),c.clearCart(),window.location.href="#/tab/orders"},a.cart.trackingStatus<4){var h;g.cancel(h),h=g(function(){var b=c.updateStatus(d.currentUser.mobile);b.then(function(b){a.cart=b,a.cart.trackingStatus>=4&&g.cancel(h)})},1e4)}}]).controller("OrderDetailsCtrl",["$scope","$stateParams","Orders","$rootScope","Global","$ionicPopup",function(a,b,c,d,e,f){d.isHome=!1,d.showLogin=!1,d.showDelete=!1,d.showBackButton=!0,"1"==b.orderId?a.cart=c.getCart():(a.cart=e.getCartById(b.orderId),a.enableReorder=!0),a.reOrder=function(){var b=e.getCart();if(0==b.total)e.resetCart(),e.setCart(a.cart),window.location.href="#/tab/orders";else{var c=f.confirm({title:"温馨提示",template:"这将清空您之前所下的订单，确定要继续吗?",okText:"确定",okType:"button-assertive",cancelText:"取消"});c.then(function(b){b&&(e.resetCart(),e.setCart(a.cart),window.location.href="#/tab/orders")})}}}]),angular.module("Mobile.controllers").controller("AccountCtrl",["$scope","$rootScope","Auth","Orders",function(a,b,c,d){b.isHome=!1,b.showDelete=!1,b.showLogin=!0,b.showBackButton=!1,a.logout=function(){c.logout(),b.hasLoggedIn=!1,b.currentUser={},d.clearCart()}}]).controller("HistoryCtrl",["$scope","$rootScope","Global",function(a,b,c){if(b.isHome=!1,b.showDelete=!1,b.showLogin=!1,b.showBackButton=!0,b.hasLoggedIn){var d=c.getOrderHistory(b.currentUser.mobile);d.then(function(b){a.orders=b})}}]).controller("AddressCtrl",["$scope","$stateParams","$ionicModal","$rootScope","Account","Auth",function(a,b,c,d,e){d.isHome=!1,d.showLogin=!1,d.showDelete=!1,d.showBackButton=!0,c.fromTemplateUrl("views/common/new-address.html",{scope:a}).then(function(b){a.modal=b}),a.closeModal=function(){a.submitted=!1,a.modal.hide()},a.newAddress=function(){a.modal.show()};var f=e.getAllLocationsByMobile(d.currentUser.mobile);f.then(function(b){a.userLocations=b}),a.addr={},a.addr.isPrimaryAddress=!1,a.submitted=!1,a.newAddressSubmit=function(b){if(a.submitted=!0,b.$valid){var c=e.addNewAddress(d.currentUser.mobile,a.addr.newAddressData,a.addr.isPrimaryAddress);c.then(function(b){if(b.res){var c=e.getAllLocationsByMobile(d.currentUser.mobile);c.then(function(b){a.userLocations=b})}a.modal.hide(),a.addr={},a.addr.isPrimaryAddress=!1,a.submitted=!1})}},a.setPrimaryAddress=function(a){e.setPrimaryAddress(d.currentUser.mobile,a)}}]).controller("PasswordCtrl",["$scope","$rootScope","User","Auth","$timeout","$ionicNavBarDelegate",function(a,b,c,d,e,f){b.isHome=!1,b.showDelete=!1,b.showLogin=!1,b.showBackButton=!0,a.submitted=!1,a.errors={},a.message="",a.changePassword=function(b){a.submitted=!0,b.$valid&&d.changePassword(a.user.oldPassword,a.user.newPassword).then(function(){a.message="密码修改成功！",e(function(){a.message="",f.back()},3e3)}).catch(function(){b.password.$setValidity("mongoose",!1),a.errors.other="旧密码输入错误！",e(function(){b.password.$setValidity("mongoose",!0)},3e3),a.message=""})}}]).controller("CommentsCtrl",["$scope","$rootScope","$ionicNavBarDelegate","Account","$timeout",function(a,b,c,d,e){b.isHome=!1,b.showDelete=!1,b.showLogin=!1,b.showBackButton=!0,a.user={},a.submitted=!1,a.message="",a.newFeedback=function(f){if(a.submitted=!0,f.$valid){var g=d.sendFeedback(b.currentUser.mobile,a.user.feedback);g.then(function(b){b.res&&(a.message="提交成功！",e(function(){a.message="",c.back()},3e3))})}}}]).controller("RegisterCtrl",["$scope","$rootScope","Auth","$timeout","$location","$ionicPopup","Account",function(a,b,c,d,e,f,g){b.isHome=!1,b.showDelete=!1,b.showLogin=!1,b.showBackButton=!0,a.user={},a.errors={},a.register=function(b){if(a.submitted=!0,b.$valid){var h=g.verifyCode(a.user.mobile,a.user.vericode);h.then(function(g){g.res?(a.invalidVeriCode=!1,c.createUser({name:"",mobile:a.user.mobile,password:a.user.password}).then(function(){var a=f.alert({title:"注册成功",template:"请点击确定返回首页。",okText:"确定",okType:"button-balanced"});a.then(function(){e.path("#/tab/home")})}).catch(function(c){c=c.data,a.errors={},angular.forEach(c.errors,function(c,e){b[e].$setValidity("mongoose",!1),a.errors[e]=c.message,d(function(){b[e].$setValidity("mongoose",!0)},3e3)})})):a.invalidVeriCode=!0})}},a.generateCount=0,a.generateVericode=function(){var c=/^04[\d]{8}$/;if(c.test(a.user.mobile))if(a.invalidTel=!1,a.generateCount++,a.generateCount<4){g.sendSMS(a.user.mobile);var e=f.alert({title:"验证码已发送",template:"请允许1到2分钟的时间收取验证码。",okText:"确定",okType:"button-energized"});e.then(function(){})}else{var e=f.alert({title:"温馨提示",template:"您提交的次数太多，请稍后再试！",okText:"确定",okType:"button-assertive"});e.then(function(){d(function(){a.generateCount=0,b.isScam=!1},12e5)}),b.isScam=!0}else a.invalidTel=!0}}]).controller("ForgotCtrl",["$scope","$rootScope","Account","$ionicPopup","$timeout",function(a,b,c,d,e){b.isHome=!1,b.showDelete=!1,b.showLogin=!1,b.showBackButton=!0,a.submitted=!1,a.existMobile=!1,a.generateCount=0,a.forgotPwd=function(f){if(a.submitted=!0,f.$valid){var g=/^04[\d]{8}$/;if(g.test(a.user.mobile)){a.invalidTel=!1;var h=c.isMobileExist(a.user.mobile);h.then(function(f){if(f.res)if(a.existMobile=!1,a.generateCount++,a.generateCount<4){c.sendPassword(a.user.mobile);var g=d.alert({title:"验证码已发送",template:"请允许1到2分钟的时间收取密码。",okText:"确定",okType:"button-energized"});g.then(function(){})}else{var g=d.alert({title:"温馨提示",template:"您提交的次数太多，请稍后再试！",okText:"确定",okType:"button-assertive"});g.then(function(){e(function(){a.generateCount=0,b.isScam=!1},12e5)}),b.isScam=!0}else a.existMobile=!0})}else a.invalidTel=!0}}}]),angular.module("Mobile.services").factory("Auth",["$location","$rootScope","$http","User","$cookieStore","$q","ENV",function(a,b,c,d,e,f,g){var h={};return e.get("token")&&(h=d.get()),{login:function(a,b){var i=b||angular.noop,j=f.defer();return c.post(g.apiEndpoint+"auth/local",{mobile:a.username,password:a.password}).success(function(a){return e.put("token",a.token),h=d.get(),j.resolve(a),i()}).error(function(a){return this.logout(),j.reject(a),i(a)}.bind(this)),j.promise},logout:function(){e.remove("token"),h={}},createUser:function(a,b){var c=b||angular.noop;return d.save(a,function(b){return e.put("token",b.token),h=d.get(),c(a)},function(a){return this.logout(),c(a)}.bind(this)).$promise},changePassword:function(a,b,c){var e=c||angular.noop;return d.changePassword({id:h._id},{oldPassword:a,newPassword:b},function(a){return e(a)},function(a){return e(a)}).$promise},getCurrentUser:function(){return h},isLoggedIn:function(){return h.hasOwnProperty("role")},isLoggedInAsync:function(a){h.hasOwnProperty("$promise")?h.$promise.then(function(){a(!0)}).catch(function(){a(!1)}):a(h.hasOwnProperty("role")?!0:!1)},isAdmin:function(){return"admin"===h.role},getToken:function(){return e.get("token")}}}]),angular.module("Mobile.services").factory("User",["$resource","ENV",function(a,b){return a(b.apiEndpoint+"api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}]),angular.module("Mobile.services").factory("Global",["$http","$q","ENV","$rootScope","$filter",function(a,b,c,d,e){var f,g,h,i,j="";this.getCurrentSuburb=function(){return f},this.getCurrentRestaurant=function(){return g},this.getAllCities=function(){this.checkMainSwitch();var e=b.defer(),f=c.apiEndpoint+"api/cities";return a.get(f,{ignoreLoadingBar:!0}).success(function(a){d.hasInternet=!0,e.resolve(a)}).error(function(a){d.hasInternet=!1,e.reject(a)}),e.promise},this.checkMainSwitch=function(){var b=c.apiEndpoint+"api/mainSwitchs/main";a.get(b,{ignoreLoadingBar:!0}).success(function(a){"on"==a.status||(d.mainSwitch=!1,d.mainSwitchInfo=a.info)}).error(function(){})},this.getCurrentCityId=function(){return j},this.setCurrentCity=function(a){j=a,this.resetCart()},this.getSuburbBySuburbId=function(a){return f=e("filter")(d.currentCity.suburbs,{_id:a})[0],h=a,f},this.updateCurrentSuburb=function(){f=e("filter")(d.currentCity.suburbs,{_id:h})[0]},this.getRestaurantByRestaurantId=function(a){return g=e("filter")(f.restaurants,{_id:a})[0],i=a,g},this.updateCurrentRestaurant=function(){g=e("filter")(f.restaurants,{_id:i})[0]},this.getDishByDishId=function(a){var b;return angular.forEach(g.menu,function(c){angular.forEach(c.dishes,function(c){c._id==a&&(b=c)})}),b},this.getAllSliders=function(){var d=b.defer(),e=c.apiEndpoint+"api/sliders";return a.get(e).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},this.getAllSlidersNoStatusBar=function(){var d=b.defer(),e=c.apiEndpoint+"api/sliders";return a.get(e,{ignoreLoadingBar:!0}).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},this.likeThisDish=function(b,d){var e=c.apiEndpoint+"api/likes",f={};f.mobile=b,f.dishId=d,a.post(e,f).success(function(){}).error(function(){})},this.unlikeThisDish=function(b,d){var e=c.apiEndpoint+"api/likes/1",f={};f.mobile=b,f.dishId=d,a.post(e,f).success(function(){}).error(function(){})},this.checkLike=function(d,e){var f=b.defer(),g=c.apiEndpoint+"api/likes/2",h={};return h.mobile=d,h.dishId=e,a.post(g,h,{ignoreLoadingBar:!0}).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise};var k,l={total:0,currentSuburb:"",deliveryAddress:"",orders:[]};return this.setCart=function(a){l.total=a.total,l.currentSuburb=a.currentSuburb,l.deliveryAddress=a.deliveryAddress,l.orders=a.orders},this.getOrderHistory=function(d){var f=b.defer(),g=c.apiEndpoint+"api/orders";return a.get(g).success(function(a){k=a;var b=e("filter")(a,{mobile:d,trackingStatus:5}),c="";angular.forEach(b,function(a){c="",angular.forEach(a.orders,function(b,d){c+=d==a.orders.length-1?b.name:b.name+"、"}),a.restaurants=c}),f.resolve(b)}).error(function(a){f.reject(a)}),f.promise},this.getCartById=function(a){return e("filter")(k,{_id:a})[0]},this.getUnfinishedOrder=function(d){var f=b.defer(),g=c.apiEndpoint+"api/orders";return a.get(g).success(function(a){k=a;var b=e("filter")(a,function(a){return a.mobile==d&&a.trackingStatus<5});f.resolve(b)}).error(function(a){f.reject(a)}),f.promise},this.getCart=function(){return l},this.hasAdded=function(a){if(e("filter")(l.orders,{_id:g._id}).length){var b=l.orders.indexOf(e("filter")(l.orders,{_id:g._id})[0]);return e("filter")(l.orders[b].dishes,{_id:a._id}).length?!0:!1}return!1},this.addToCart=function(a){if(0!=l.total){if(l.currentSuburb==f._id){if(e("filter")(l.orders,{_id:g._id}).length){var b=l.orders.indexOf(e("filter")(l.orders,{_id:g._id})[0]);return e("filter")(l.orders[b].dishes,{_id:a._id}).length?3:(l.orders[b].dishes.push({_id:a._id,name:a.name,spicy:a.spicy,price:a.price,number:1,picture:a.picture,comment:""}),l.total+=a.price,1)}return l.orders.push({_id:g._id,name:g.name,deliveryFee:g.deliveryFee,minSpend:g.minSpend,hoursFrom:g.hoursFrom,hoursTo:g.hoursTo,dishes:[{_id:a._id,name:a.name,spicy:a.spicy,price:a.price,number:1,picture:a.picture,comment:""}]}),l.total+=a.price+g.deliveryFee,1}return 2}return l.orders.push({_id:g._id,name:g.name,deliveryFee:g.deliveryFee,minSpend:g.minSpend,hoursFrom:g.hoursFrom,hoursTo:g.hoursTo,dishes:[{_id:a._id,name:a.name,spicy:a.spicy,price:a.price,number:1,picture:a.picture,comment:""}]}),l.currentSuburb=f._id,l.total=a.price+g.deliveryFee,1},this.updateCart=function(){var a=e("filter")(d.currentCity.suburbs,{_id:l.currentSuburb});if(a.length){a=a[0],l.total=0;for(var b=l.orders.length-1;b>=0;b--){var c=l.orders[b],f=e("filter")(a.restaurants,{_id:c._id});if(f.length){f=f[0],l.orders[b].name=f.name,l.orders[b].deliveryFee=f.deliveryFee,l.orders[b].minSpend=f.minSpend,l.orders[b].hoursFrom=f.hoursFrom,l.orders[b].hoursTo=f.hoursTo;for(var g=c.dishes.length-1;g>=0;g--){var h=c.dishes[g],i=null;angular.forEach(f.menu,function(a){angular.forEach(a.dishes,function(a){a._id==h._id&&(i=a)})}),null!=i&&0!=i.active?(l.orders[b].dishes[g].name=i.name,l.orders[b].dishes[g].spicy=i.spicy,l.orders[b].dishes[g].price=i.price,l.orders[b].dishes[g].picture=i.picture,l.total+=h.price*h.number):(l.orders[b].dishes.splice(g,1),0==l.orders[b].dishes.length&&l.orders.splice(b,1))}l.total+=c.deliveryFee}else l.orders.splice(b,1)}}else l={total:0,currentSuburb:"",deliveryAddress:"",orders:[]};return this.updateCartTotal()},this.checkMinSpend=function(){var a=0,b=!0;return angular.forEach(l.orders,function(c){angular.forEach(c.dishes,function(b){a+=b.price*b.number}),a<c.minSpend?b=!1:a=0}),b},this.checkDeliveryTime=function(){var a=!0,b=0,c=0,d=0,e=0,f=(new Date).getHours(),g=(new Date).getMinutes();return angular.forEach(l.orders,function(h){b=parseInt(h.hoursFrom.split(":")[0]),c=parseInt(h.hoursFrom.split(":")[1]),d=parseInt(h.hoursTo.split(":")[0]),e=parseInt(h.hoursTo.split(":")[1]),d>=b?f>=b&&d>=f?f==b&&g>=c?d>f||f==d&&e>=g||(a=!1):f>b?d>f||f==d&&e>=g||(a=!1):a=!1:a=!1:a=f>=b?g>=c?!0:!1:d>=f&&e>=g?!0:!1}),a},this.updateCartTotal=function(){return l.total=0,angular.forEach(l.orders,function(a){angular.forEach(a.dishes,function(a){l.total+=a.price*a.number}),l.total+=a.deliveryFee}),l},this.deleteCartItem=function(a){var b=!0;angular.forEach(l.orders,function(c,d){b&&angular.forEach(c.dishes,function(c,e){b&&c._id==a&&(1==l.orders[d].dishes.length?l.orders.splice(d,1):l.orders[d].dishes.splice(e,1),b=!1)})})},this.resetCart=function(){l={total:0,currentSuburb:"",deliveryAddress:"",orders:[]}},this.setDeliveryAddress=function(a){l.deliveryAddress=a},this}]),angular.module("Mobile.services").factory("Account",["$http","$q","ENV","$rootScope","$filter",function(a,b,c){return this.sendSMS=function(b){var d=c.apiEndpoint+"api/smsGateway",e={};e.mobile=b,a.post(d,e).success(function(){}).error(function(){})},this.verifyCode=function(d,e){var f=b.defer(),g=c.apiEndpoint+"api/verifyToken",h={};return h.mobile=d,h.token=e,a.post(g,h).success(function(a){f.resolve(a)}).error(function(a){f.resolve(a)}),f.promise},this.isMobileExist=function(d){var e=b.defer(),f=c.apiEndpoint+"api/isMobileExist",g={};return g.mobile=d,a.post(f,g).success(function(a){e.resolve(a)}).error(function(a){e.resolve(a)}),e.promise},this.sendPassword=function(b){var d=c.apiEndpoint+"api/forgotPassword",e={};e.mobile=b,a.post(d,e).success(function(){}).error(function(){})},this.getAllLocationsByMobile=function(d){var e=b.defer(),f=c.apiEndpoint+"api/userLocations/"+d;return a.get(f).success(function(a){e.resolve(a)}).error(function(a){e.resolve(a)}),e.promise},this.addNewAddress=function(d,e,f){var g=b.defer(),h=c.apiEndpoint+"api/userLocations/"+d,i={};return i.newAddress=e,i.isPrimaryAddress=f,a.put(h,i).success(function(a){g.resolve(a)}).error(function(a){g.resolve(a)}),g.promise},this.setPrimaryAddress=function(b,d){var e=c.apiEndpoint+"api/userLocations",f={};f.mobile=b,f.newAddress=d,a.post(e,f).success(function(){}).error(function(){})},this.sendFeedback=function(d,e){var f=b.defer(),g=c.apiEndpoint+"api/feedbacks",h={};return h.mobile=d,h.feedback=e,a.post(g,h).success(function(a){f.resolve(a)}).error(function(a){f.resolve(a)}),f.promise},this}]),angular.module("Mobile.services").factory("Orders",["$http","$q","ENV","$rootScope","$filter",function(a,b,c){var d={_id:"",mobile:"",total:0,currentSuburb:"",deliveryAddress:"",orders:[],trackingStatus:0,feedback:0,date:"",exactTime:"",finishTime:""};return this.confirmCart=function(a,b){d=a,d.mobile=b,d.date=(new Date).getDate()+"/"+((new Date).getMonth()+1)+"/"+(new Date).getFullYear(),d.exactTime=(new Date).getHours()+":"+(new Date).getMinutes(),d.trackingStatus=1},this.setCart=function(a){return d=a},this.getCart=function(){return d},this.saveToDb=function(){var b=c.apiEndpoint+"api/orders";a.post(b,d).success(function(a){d._id=a._id}).error(function(){})},this.updateStatus=function(){var e=b.defer(),f=c.apiEndpoint+"api/orders/"+d._id;return a.get(f).success(function(a){e.resolve(a),d.trackingStatus=a.trackingStatus}).error(function(a){e.reject(a)}),e.promise},this.updateRating=function(b){var e=c.apiEndpoint+"api/orders/"+d._id;d.feedback=b,d.trackingStatus=5,d.finishTime=(new Date).getDate()+"/"+((new Date).getMonth()+1)+"/"+(new Date).getFullYear()+" "+(new Date).getHours()+":"+(new Date).getMinutes(),a.put(e,d).success(function(){}).error(function(){})},this.clearCart=function(){d={_id:"",mobile:"",total:0,currentSuburb:"",deliveryAddress:"",orders:[],trackingStatus:0,date:"",exactTime:"",feedback:0}},this}]),angular.module("Mobile.directives").directive("ratingStars",function(){return{restrict:"E",scope:{rating:"="},transclude:!0,templateUrl:"views/directives/rating-stars.html",controller:"RatingStarsCtrl"}}),angular.module("Mobile.controllers").controller("RatingStarsCtrl",["$scope",function(a){switch(a.hasRating=!0,a.star1="ion-ios7-star",a.star2="ion-ios7-star",a.star3="ion-ios7-star",a.star4="ion-ios7-star",a.star5="ion-ios7-star",a.rating){case 0:a.star1="ion-ios7-star-outline",a.star2="ion-ios7-star-outline",a.star3="ion-ios7-star-outline",a.star4="ion-ios7-star-outline",a.star5="ion-ios7-star-outline";break;case.5:a.star1="ion-ios7-star-half",a.star2="ion-ios7-star-outline",a.star3="ion-ios7-star-outline",a.star4="ion-ios7-star-outline",a.star5="ion-ios7-star-outline";break;case 1:a.star2="ion-ios7-star-outline",a.star3="ion-ios7-star-outline",a.star4="ion-ios7-star-outline",a.star5="ion-ios7-star-outline";break;case 1.5:a.star2="ion-ios7-star-half",a.star3="ion-ios7-star-outline",a.star4="ion-ios7-star-outline",a.star5="ion-ios7-star-outline";break;case 2:a.star3="ion-ios7-star-outline",a.star4="ion-ios7-star-outline",a.star5="ion-ios7-star-outline";break;case 2.5:a.star3="ion-ios7-star-half",a.star4="ion-ios7-star-outline",a.star5="ion-ios7-star-outline";break;case 3:a.star4="ion-ios7-star-outline",a.star5="ion-ios7-star-outline";break;case 3.5:a.star4="ion-ios7-star-half",a.star5="ion-ios7-star-outline";break;case 4:a.star5="ion-ios7-star-outline";break;case 4.5:a.star5="ion-ios7-star-half";break;case 5:break;default:a.hasRating=!1}}]),angular.module("Mobile.directives").directive("ratingSpicy",function(){return{restrict:"E",scope:{rating:"="},transclude:!0,templateUrl:"views/directives/rating-spicy.html",controller:"RatingSpicyCtrl"}}),angular.module("Mobile.controllers").controller("RatingSpicyCtrl",["$scope",function(a){switch(a.hasRating=!0,a.spicy1="false",a.spicy2="false",a.spicy3="false",a.spicy4="false",a.spicy5="false",a.rating){case 0:break;
case 1:a.spicy1="true";break;case 2:a.spicy1="true",a.spicy2="true";break;case 3:a.spicy1="true",a.spicy2="true",a.spicy3="true";break;case 4:a.spicy1="true",a.spicy2="true",a.spicy3="true",a.spicy4="true";break;case 5:a.spicy1="true",a.spicy2="true",a.spicy3="true",a.spicy4="true",a.spicy5="true"}}]);