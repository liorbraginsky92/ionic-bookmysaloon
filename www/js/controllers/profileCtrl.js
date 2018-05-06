   
App.controller('profileCtrl', function($scope,$ionicPopup, $timeout,$ionicModal,$http,$ionicLoading,$state,WebService,$rootScope,$ionicHistory) {

$scope.star = {};
$scope.rattingPopup = function() {
   
    $scope.comments = $rootScope.cmnts;
    $scope.star.val=$rootScope.ratng;
	$scope.data = {}
	myPopup = $ionicPopup.show({
    template: '<div class="bms-close" ng-click="closePopup()"><i class="ion-close icon icon-left text-white"></i></div><div class="bms-rate-pop"><h1>REVIEW</h1><div class="bms-rate-pop-body"><h5>RATING</h5><form><span class="rating"><input type="radio" value="5" class="rating-input" id="rating-input-1-5" ng-model="star.val" name="val"><label for="rating-input-1-5" class="rating-star"></label><input type="radio" value="4" class="rating-input" id="rating-input-1-4" ng-model="star.val" name="val"> <label for="rating-input-1-4" class="rating-star"></label><input type="radio" value="3" class="rating-input" id="rating-input-1-3" ng-model="star.val" name="val"> <label for="rating-input-1-3" class="rating-star"></label><input type="radio" value="2" class="rating-input" id="rating-input-1-2" ng-model="star.val" name="val"> <label for="rating-input-1-2" class="rating-star"></label><input type="radio" value="1" class="rating-input" id="rating-input-1-1" ng-model="star.val" name="val"> <label for="rating-input-1-1" class="rating-star"></label></span></form><h5>COMMENTS</h5><textarea class="bms-pop-rate-input" ng-model="comments"></textarea><button class="bms-otp-btn" ng-click="closePopup();updateReview(comments)" >SUBMIT</button></div></div>',
    scope: $scope
	});
	myPopup.then(function(res) {
    
	});
};
$scope.closePopup = function() {
	myPopup.close();
};

/*EDIT-PROFILE*/


  $ionicModal.fromTemplateUrl('templates/edit.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.editModal = modal;
  });
	

/* PROFILE VIEW
########################################################
--------------------------------------------------------*/ 
    var user_data=JSON.parse(localStorage.getItem('userData'));
    $rootScope.username=user_data.username;
    $rootScope.city=user_data.city;
    $rootScope.country=user_data.country;
    $rootScope.profile_pic=user_data.profile_pic;

/* EDIT PROFILE 
########################################################
--------------------------------------------------------*/ 
$scope.val={};
$scope.editProfile=function(){
    
    var userdatas=$scope.val;
    var user_data=JSON.parse(localStorage.getItem('userData'));
    $rootScope.id_user=user_data.user_id;
    var link = 'updateuser';
    var post_data ={id:$rootScope.id_user,userdatas:userdatas};
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
        promise.then(function(data){
         //console.log(data);
         $ionicLoading.hide(); 
        });
}

/* USER BOOKING SHOPS
########################################################
--------------------------------------------------------*/  
$rootScope.mybooking=function(){   
    
    var user_data=JSON.parse(localStorage.getItem('userData'));
    $rootScope.user_id=user_data.user_id;
    var link = 'userbookings';
    var post_data ={user_id:$rootScope.user_id};
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
        promise.then(function(data){
         // console.log(data);
          if(data!=""){
            $rootScope.msgbk=false;
            $rootScope.userbookings=data;
            $state.go('mybooking');
          }else{
            $state.go('mybooking');
            $rootScope.msgbk=true;
            $rootScope.msg="Sorry, No Result Found.";
          } 
          $ionicLoading.hide(); 
        });
}
/* BOOKING HISTORY OF SINGLE SHOPS
########################################################
--------------------------------------------------------*/
$scope.bookinghistory=function(shopid,shopname,bookingdate,bookingtime,services,total,comments,rating,booking_id){   
    
    $rootScope.shopid=shopid;
    $rootScope.shopname=shopname;
    $rootScope.bookingdate=bookingdate;
    $rootScope.bookingtime=bookingtime;
    $rootScope.total=total;
    $rootScope.cmnts=comments;
    //alert($rootScope.cmnts);
    $rootScope.ratng=rating;
    var svc=services;
    var servc=svc.split("<=>");
    $rootScope.services=servc;
    $rootScope.booking_id=booking_id;
    $state.go('bookinghistory');
}

/* UPDATE REVIEW
########################################################
--------------------------------------------------------*/
$scope.updateReview=function(comments){

    
    var user_data=JSON.parse(localStorage.getItem('userData'));
    $rootScope.user_id=user_data.user_id;
    var link = 'ratingshop';
    var post_data ={shop_id:$rootScope.shopid,user_id:$rootScope.user_id,rating:$scope.star.val,comments:comments,booking_id:$rootScope.booking_id};
   // console.log(post_data);
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
        promise.then(function(data){

          $scope.message="Updated Successfully";
          $ionicLoading.hide();
        });
} 

/* Favourite shops
########################################################
--------------------------------------------------------*/       
$scope.userfavshops=function(){
  
    var user_data=JSON.parse(localStorage.getItem('userData'));
    $rootScope.userid=user_data.user_id;
    var link = 'favshops';
    var post_data ={user_id:$rootScope.userid};
   // console.log(post_data);
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
        promise.then(function(data){
          //console.log(data);
          if(data.fav!=""){
          $rootScope.msgfav=false;
          $rootScope.favshops=data.fav;
        }else{
          $rootScope.msgfav=true;
          $rootScope.msgf="Sorry, No Result Found.";
        }
          $state.go('userfavshops');
          $ionicLoading.hide();
        });

}


/* LOG OUT
########################################################
--------------------------------------------------------*/ 
$scope.logout = function(){
    
    localStorage.removeItem('userData');
    WebService.show_loading(); 
    $rootScope.loginstatus=""; 
    $timeout(function(){
        $ionicLoading.hide();
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go('menu.home', {}, {reload: true}); 
    }, 1000);
    
  };         
});