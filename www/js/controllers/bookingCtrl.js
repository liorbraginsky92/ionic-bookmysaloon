App.controller('bookingCtrl',function($scope,$ionicPopup, $timeout,$ionicModal,$http,$ionicLoading,$state,$stateParams,WebService,$rootScope,$filter,$ionicHistory) {

  /*BACK-BUTTON*/
$scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

/* Datetimepicker
########################################################
--------------------------------------------------------*/  
$scope.notselectdate=true;
$scope.select=false;
$scope.datetimepickerObject = {


    titleLabel: 'Select Date and Time',                  // Optional
    closeLabel: 'Close',                  // Optional
    setLabel: 'Set',                      // Optional
    setButtonType : 'button-assertive',   // Optional
    closeButtonType : 'button-assertive', // Optional
    inputDatetime: new Date(),            // Optional
    step: 1,                             // Optional
    format: 12,                           // Optional
    mondayFirst: true,                    // Optional
    from: new Date(),           // Optional
    //to: new Date(2016, 6, 1),            // Optional
    callback: function (val) {            // Required
        datetimePickerCallback(val);
    }
}
function datetimePickerCallback(val){
 delete $rootScope.dateAsString;
  $scope.notselectdate=false;
  $scope.select=true;
  $rootScope.dateAsString = $filter('date')(val, "yyyy-MM-dd hh:mm:ss");
  $rootScope.day=	$filter('date')(val, "EEEE");
  $rootScope.month= $filter('date')(val, "MMM");
  $rootScope.year= $filter('date')(val, "yy");
   $rootScope.timet= $filter('date')(val, "hh:mm");
 
}
 
/* Booking 
########################################################
--------------------------------------------------------*/ 
$scope.bookingConf=function(){
     
      $rootScope.array = [];
      $rootScope.sprice=0;
	  var numberOfChecked = $('input:checkbox:checked').length;
	  if(numberOfChecked==0 || $rootScope.dateAsString == undefined){
		  $scope.fac = numberOfChecked==0? true:false;
		  $scope.dat = $rootScope.dateAsString == undefined? true:false;
		  return false;
	  } else {
		  $scope.fac = false;
	  }
       $('input[name="services"]:checked').each(function() {
          	var a = this.value;
          	a = JSON.parse(a);
          	$rootScope.servis=a[0];
          	$rootScope.sid=a[1];
          	$rootScope.sprice = parseInt($rootScope.sprice)+parseInt(a[2]);
          $rootScope.servic_id = $rootScope.servic_id!=''?$rootScope.servic_id+','+a[1]:a[1];
            $rootScope.array.push(a);

			});

          //console.log($rootScope.servic_id);
          
          var user_data=JSON.parse(localStorage.getItem('userData'));
          $rootScope.email_id=user_data.email_id;
          $rootScope.phone_no=user_data.phone_no;

         $state.go('menu.bookreview');
}	
/* Booking Confirmation
########################################################
--------------------------------------------------------*/ 
$scope.finalBooking=function(){
    //delete $rootScope.dateAsString;
    var user_data=JSON.parse(localStorage.getItem('userData'));
    $scope.u_id=user_data.user_id;
    console.log()
    var link = 'finalbook';
    var post_data ={user_id:$scope.u_id,shop_id:$rootScope.shopid,datetime:$rootScope.dateAsString,total:$rootScope.sprice,service_id:$rootScope.servic_id,booking_order_id:"",booking_id:"",status:""};
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
      promise.then(function(data){
          $state.go('bookingconfirmation')
          $ionicLoading.hide();
      });

}  
 
});