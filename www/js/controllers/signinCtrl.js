
App.controller('signinCtrl', function($scope,$http,$rootScope,$state,$ionicModal,$ionicPopup,$timeout,$ionicLoading,WebService,$ionicHistory) {

$rootScope.logs=false;
$rootScope.notlog=true;
$rootScope.signin=true;
$rootScope.logout=false;
//signin 
$scope.loginData={};
$scope.doSignIn= function() {

    
    $scope.showMessage = false;
    var link = 'signIn';
    var post_data = $scope.loginData;
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
    promise.then(function(data){
        $scope.showMessage = true;
          if(data.status=='success'){
            
            var user_data = {
                  "user_id": data.profile.id,
                  "username": data.profile.username,
                  "email_id": data.profile.email_id,
                  "phone_no": data.profile.phone_no,
                  "profile_pic": data.profile.profile_pic,
                  "user_type":data.profile.user_type,
                  "city":data.profile.city,
                  "country":data.profile.country
            };   
            localStorage.setItem('userData', JSON.stringify(user_data)); 
            var userData=JSON.parse(localStorage.getItem('userData')); 
            $rootScope.uname= userData.username;
            $rootScope.img= userData.profile_pic;
            //console.log($rootScope.img);
            $rootScope.logs=true;
            $rootScope.notlog=false;
            $rootScope.signin=false;
            $rootScope.logout=true;
            $rootScope.loginstatus="login";
              if($rootScope.profilestatus=="profile"){
                $state.go('profile');
              }else if($rootScope.favrt=="noFavlogin"){
                 $state.go('menu.shopdetail');
              }else if($rootScope.bookdate=="bookdate"){
                 $state.go('menu.date');
              }else{
                $state.go('menu.home');
              }
            
          }
        $ionicLoading.hide();
      }, function(reason) {
        $ionicLoading.hide();
        $scope.showMessage = true;
        $scope.class ="failure";  
        $scope.message ="Unknown Credential!!Please Try Again";
      });
}
//registration  
$scope.regData={};
$scope.doSignUp = function() {
    
    $scope.showMessage = false;
    var link = 'signUp';
    var post_data = $scope.regData;
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
     
      promise.then(function(data){
        $scope.showMessage = true;
          if(data.status=='success'){
            $state.go('signin');
          }else{
            $scope.class = "failure";  
            $scope.message = data.message;
          }
        $ionicLoading.hide();
      });
};

/*-SEARCH-BY-CITY-POP-UP*/

 $scope.sortPopup = function() {
   $scope.data = {}
   myPopup = $ionicPopup.show({
   template: '<div class="bms-close" ng-click="closePopup()"><i class="ion-close icon icon-left text-white"></i></div><div class="bms-sort-pop-up"><h1>SEARCH BY CITY</h1><input class="bms-search1-input" type="text" ng-change="searchCity()" placeholder="Search City" ng-model="city" id="country"><div class="menu_simple" ng-show="showCity"><ul><li ng-repeat="citys in cities|filter:city" ng-click="hidecityList(citys.city)"><a href="#">{{citys.city}}</a></li></ul><ul  ng-if="citys.city!=city"><li ><a href="#">No results</a></li></ul></div></div>',
   scope: $scope
   });
   myPopup.then(function(res) {
   console.log('Tapped!', res);
  });
  };
  $scope.closePopup = function() {
  myPopup.close();
  };
/* search city function
########################################################
--------------------------------------------------------*/  
  $rootScope.showCity=false;
  $rootScope.searchCity = function() {
      
    if($scope.city!=""){
    
      var link = 'getcityname';
      var post_data = {keyword:$scope.city};
      WebService.show_loading();
      var promise = WebService.send_data(link,post_data,"post");
  
        promise.then(function(data){
           $rootScope.cities =data;
           $rootScope.showCity=true;
           $ionicLoading.hide();
        });
   
    }else{
      $rootScope.showCity=false;
    }
  }
   $rootScope.hidecityList = function(item) {
       
    var city_data = {"city": item};                    
    localStorage.setItem('city', JSON.stringify(city_data));
    var cityData=JSON.parse(localStorage.getItem('city'));  
    var val=$("#country").val(cityData.city);
    $rootScope.current_city=cityData.city;
    $rootScope.showCity=false;
     
     var link = 'getsearchpage';
     var post_data = {home_city:item};
     WebService.show_loading();
     var promise = WebService.send_data(link,post_data,"post");
      promise.then(function(data){
        $rootScope.shopDetails =data.shops;
        $rootScope.showCity=false;
        $scope.closePopup();
        $ionicLoading.hide();
      });
   
  }

/* LOG OUT
########################################################
--------------------------------------------------------*/ 
$scope.lgout = function(){
    
    localStorage.removeItem('userData');
    WebService.show_loading(); 
    $rootScope.loginstatus=""; 
    $timeout(function(){
        $ionicLoading.hide();
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $rootScope.logout=false;
        $rootScope.signin=true;
        $rootScope.logs=false;
        $rootScope.notlog=true;
        $state.go('menu.home', {}, {reload: true}); 
    }, 1000);
    
  }; 
 
});