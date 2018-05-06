
 App.service('WebService', function( $http, $q,$ionicLoading,$ionicPopup,$timeout){
  var headers = { 'X-API-KEY': 'mykey' };//me added
	/* SIGN UP
	===========================================*/
	 this.upload = function( link,img_el,post_data ){

		// $.mobile.loading('show');
		var url = server_admin + link ;
		var result = null;
    
		var deferred = $q.defer();

		var img = document.getElementById(img_el);
		var imageURI = img.src;

			var options = new FileUploadOptions();
			options.fileKey="file";
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
			options.mimeType="image/jpeg";
			// var params = new Object();
			// params.value1 = "test";
			// params.value2 = "param";

			options.params = post_data;
			options.chunkedMode = false;
			var ft = new FileTransfer();

			ft.upload(imageURI, url,
			function(r){
				deferred.resolve(r.response);
			}, function(error){
				alert("An error has occurred: Code::: = " + error.code);


			}, options);

		return deferred.promise;
	  //alert(result);
	 }

	 /* SEND DATA
	  ===============================================*/
	 this.send_data = function( link , post_data,type ){

			var self = this;
			var deferred = $q.defer();
			var result = null;

				/*  ajax
        --------------------------------------*/
            if( type == 'post'){

                var url = server_admin + link;

                 $.ajax({
                  type: "POST",
                  url: url,
                  data: post_data,
                  tryCount : 1,
                  retryLimit : 4,
                  timeout: 20000,
                  headers: headers,//me added
                  success: function(data){
                     
                    deferred.resolve(data);

                  },
                  error : function(xhr, textStatus, errorThrown ) {
                    deferred.resolve(xhr);
                    /*//alert(textStatus);
                    console.log(xhr);
                    var MSG;
                    var TITLE;
                    if( textStatus == 'timeout' ){
                      TITLE = "TIME OUT"
                      MSG = "Check your network strength";
                    }else if( xhr.status == 404){ //404
                      TITLE = "SERVER ERROR";
                      MSG = "Unable to connect to the server!";
                    }else if( xhr.status == 200 ){
                      TITLE = "SERVER ERROR";
                      MSG = "We're sorry, but Something went wrong.";
                    }else{
                      TITLE = "SERVER ERROR";
                      MSG = "Error code : " + xhr.status;
                    }

                    console.log(xhr);
                     $ionicLoading.hide();
                      var ajax_this = this;

                      var alertPopup = $ionicPopup.alert({
                        title: TITLE,
                        template: MSG,
                        cssClass: 'ALERT'
                      });

                      alertPopup.then(function(res) {
                        console.log('alertPopup called');
                        $ionicLoading.show({
                            content: 'Loading',
                            showBackdrop: false
                        });

                         $timeout(function(){
                           $.ajax(ajax_this);
                           return;
                         },100);

                      });*/
                  },
                  dataType: "json"
                });

            }
			else{

					var url = server_admin + link;
					var req = {
						 method: 'POST',
						 url: url,
						 data: post_data
					}


					$http(req).then(
						function (data){
							 //alert(JSON.stringify(data.data));
							deferred.resolve(data.data);
							//hideLoading();
						},function (error){
							$ionicLoading.hide();
							deferred.reject();
						}
					);
			}



		  return deferred.promise;
		 }

	  this.show_loading = function(){

			$ionicLoading.show({
          content: 'Loading',
          showBackdrop: false
      });

	 }

 })
