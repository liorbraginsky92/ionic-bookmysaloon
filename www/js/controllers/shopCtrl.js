App.controller('shopCtrl',function($scope, $ionicPopup, $timeout,$ionicModal,$http,$ionicLoading,$state,WebService,$rootScope) {


/*network connection check*/
if(localStorage.getItem('network') == 'false'){
  alert("No Network Connection");
  location.reload();
  return false;
 // $state.go('no_connec');
}



/*SORT-POP-UP*/

 $scope.sortPopup = function() {
   $scope.data = {}
   myPopup = $ionicPopup.show({
   template: '<div class="bms-close" ng-click="closePopup()"><i class="ion-close icon icon-left text-white"></i></div><div class="bms-sort-pop-up"><h1>SORT BY</h1><ul><li class="w1" ng-click="sorting(\'popularity\')">POPULARITY</li><li class="w2" ng-click="sorting(\'discount\')">DISCOUNT</li><li style="border:none;" class="w3" ng-click="sorting(\'whats_new\')">WHATS NEW</li></ul></div>',
   scope: $scope
   });
   myPopup.then(function(res) {
   console.log('Tapped!', res);
  });
  };
  $scope.closePopup = function() {
  myPopup.close();
  };
  
/*FILTER-MODAL*/

  $ionicModal.fromTemplateUrl('templates/filter.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.filterModal = modal;
  });
  
  /*GALLERY-MODAL*/

  $ionicModal.fromTemplateUrl('templates/gallery.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.galleryModal = modal;
  });

  $scope.gallery_img = '';

  $scope.gallery_img = function(item){
    $scope.gall_img = '';   

    $scope.gall_img = item;
    $scope.galleryModal.show();
  }


/* SORTING
########################################################
--------------------------------------------------------*/
$scope.sorting=function(item){
 

    $scope.sortdata=item;
    $rootScope.popshow=false;
    var link = 'sorting';
    var post_data = {city:$rootScope.current_city,condition:$scope.sortdata};
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
  
      promise.then(function(data){
        
        if(data.sorting==""){
          $rootScope.messagefilter=true;
          $rootScope.popshow=false;
          $rootScope.filtershow=false;
          $rootScope.notfilter=false;
          $rootScope.message="Sorry, No shops found. Please try with different keywords.";
        }else{

          $scope.popularity =data.sorting;
          $rootScope.messagefilter=false;
          $rootScope.popshow=true;
          $rootScope.filtershow=false;
          $rootScope.notfilter=false;
        }
        
        $scope.closePopup();
        $ionicLoading.hide();
      }); 

}
/* get current city
########################################################
--------------------------------------------------------*/  

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){

  $scope.$apply(function(){
    $scope.position = position;
    var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    currgeocoder = new google.maps.Geocoder();
    currgeocoder.geocode({
    'location': myLatlng
    }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      var add = results[0].formatted_address;
      var value=add.split(",");
      var count=value.length;
      $rootScope.citys=value[count-3];//rootScope 's scope has get in all places
      $("#country").val(($rootScope.citys).toString());
      var city_data = {
                       "city": $rootScope.citys
                      };                    
        localStorage.setItem('city', JSON.stringify(city_data));
        var cityData=JSON.parse(localStorage.getItem('city'));
        $rootScope.current_city=cityData.city;
       
      } else {

      }
    });

  });
  });
}


/* Get search page details
########################################################
--------------------------------------------------------*/ 
$scope.get_shops = function(){
  //alert('ssss');
  var link = 'getsearchpage';
    var post_data = {home_city:$scope.city};
   // WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
  
      promise.then(function(data){
        $rootScope.shopDetails =data.shops;
        /*filter*/
        $scope.service=true;
        $scope.price=false;
        $scope.gender=false;
        $scope.location=false;
        $rootScope.srvcs=data.services;
        /*filter*/
        //$ionicLoading.hide();
      });
}
    
/* search shop function
########################################################
--------------------------------------------------------*/ 
  $rootScope.data = {};
  $scope.searchShop = function() {

    if($rootScope.data.search!=""){

      var link = 'getsearchpage';
      var post_data = {home_city:$rootScope.current_city};
      //WebService.show_loading();
      var promise = WebService.send_data(link,post_data,"post");
  
        promise.then(function(data){
           $rootScope.shops =data.shops;
           //$ionicLoading.hide();
        });
   
    }
  }




/* Get single shop details from id
########################################################
--------------------------------------------------------*/  
 //$rootScope.favid="";
  $scope.viewShopDetails=function(shop_id){
   // delete $rootScope.shopdata;
    var user_data=JSON.parse(localStorage.getItem('userData'));
    if(user_data!=null){
      $scope.userid=user_data.user_id;
      var post_data = {id:shop_id,user_id:$scope.userid};
    }else{
      var post_data = {id:shop_id};
    }  
    var link = 'getsingleshop';
    //WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
      promise.then(function(data){
        
         if(data.data[0].favid==null){
            $rootScope.favid="";
            $rootScope.favid ="fav";
          }else{
            $rootScope.favid="";
            $rootScope.favid ="noFav";
          }
          $rootScope.shopdata =data.data;
          var svc =data.data[0].services.split("<=>");
          $rootScope.bkngservcs=data.data[0].services.split("<=>");
          $rootScope.services = [];
          angular.forEach(svc, function(value) {
            $rootScope.services.push(value.split("<#>"));
          });
          $rootScope.gallery=data.data[0].gallery.split("<=>");
          $rootScope.reviews=data.review;
          //$ionicLoading.hide();
         // $state.go('menu.shopdetail');*/
          
      });
$state.go('menu.shopdetail');
    
  }
/* favourite the shop
########################################################
--------------------------------------------------------*/ 
$scope.favShop=function(shop_id){
  
  var user_data=JSON.parse(localStorage.getItem('userData'));
  $rootScope.shpid=shop_id;
    if(user_data!=null){
      
      $scope.userid=user_data.user_id;
      var link = 'favouriteShop';
      var post_data ={user_id:$scope.userid,shop_id:shop_id};
     // WebService.show_loading();
      var promise = WebService.send_data(link,post_data,"post");
        promise.then(function(data){
          //$ionicLoading.hide();
          $scope.viewShopDetails(shop_id);//call function
          
        });

    }else{
      $rootScope.favrt="noFavlogin";
      $state.go('signin');
    }
}
/* Filter by section
########################################################
--------------------------------------------------------*/ 
var cityData=JSON.parse(localStorage.getItem('city'));
if(cityData!=null){
  $rootScope.current_city=cityData.city;
}

/*service*/
    $scope.srvc=function(){
		$scope.reset_menu();
		$('#service').addClass('active');
      $scope.service=true;
      $scope.price=false;
      $scope.gender=false;
      $scope.location=false;
      var link = 'filtershops';
      var post_data = "";
      WebService.show_loading();
      var promise = WebService.send_data(link,post_data,"post");
        promise.then(function(data){
          $rootScope.srvcs=data.services;
          $ionicLoading.hide();
        });
    }

  /* price&offer */  
    $scope.pric=function(){
	 $scope.reset_menu();
	$('#price').addClass('active');
      $scope.price=true;
      $scope.service=false;
      $scope.gender=false;
      $scope.location=false;
    }

  /* gender */    
    $scope.gndr=function(){
	  $scope.reset_menu();
	  $('#gender').addClass('active');
      $scope.gender=true;
      $scope.service=false;
      $scope.price=false;
      $scope.location=false;
    }

  /* location */    
    $scope.lctn=function(){
	  $scope.reset_menu();
	  $('#location').addClass('active');
      $scope.location=true;
      $scope.service=false;
      $scope.price=false;
      $scope.gender=false;
    } 
	
	$scope.reset_menu = function(){
		$('#service').removeClass('active');
		$('#price').removeClass('active');
		$('#gender').removeClass('active');
		$('#location').removeClass('active');
	}
  $rootScope.notfilter=true;
    $scope.filter_shops=function() {
      
      $rootScope.filtershow=false;
      //$rootScope.shops_detils="";
      var value = $('.shop_filter_form').serialize();
      var link = 'filtershops';
      var post_data =value;
      WebService.show_loading();
      var promise = WebService.send_data(link,post_data,"post");
        promise.then(function(response){
          $ionicLoading.hide();
          if(response.shops == "") {
            $rootScope.filtershow=false;
            $rootScope.notfilter=false;
            $rootScope.messagefilter=true;
            $rootScope.message="Sorry, No shops found. Please try with different keywords.";
              
          }else {
            $rootScope.shops_detils=response.shops;
            $rootScope.filtershow=true;
            $rootScope.notfilter=false;
            $rootScope.messagefilter=false;

          }
         
        });
      
    }


/* view booking page
########################################################
--------------------------------------------------------*/    
  $rootScope.booknow=function(shop_id,shop_name){
    
    var user_data=JSON.parse(localStorage.getItem('userData'));
    //console.log(user_data);
    if(user_data!=null){
      $rootScope.shopid=shop_id;
      $rootScope.s_name=shop_name;
      $state.go('menu.date');
    }else{
      $rootScope.bookdate="bookdate";
      $state.go('signin');
    }  
  }

  /* PROFILE
########################################################
--------------------------------------------------------*/
$scope.profile=function(){
  
  var user_data=JSON.parse(localStorage.getItem('userData'));
  console.log(user_data);
  if(user_data!=null){
    $state.go('profile');
  }else{
    $rootScope.profilestatus="profile";
    $state.go('signin');
  }
}

});