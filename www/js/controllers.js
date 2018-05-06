var App=angular.module('app.controllers', ['ionic', 'ionic-datetimepicker']);



/* validation
########################################################
--------------------------------------------------------*/ 
App.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

/* rating
########################################################
--------------------------------------------------------*/ 
App.directive("raty", function() {
    return {
        restrict: 'AE',
        link: function(scope, elem, attrs) {
            scope.$evalAsync(function(){
                
                $(elem).raty({start: attrs.score,
                              number: attrs.number,
                              starHalf : 'img/heart-half.png',
                              starOff  : 'img/heart-off.png',
                              starOn   : 'img/heart-on.png',
                              precision: true,
                              half     : false,
                              numberMax : 5,
                              readOnly:  true,
                              
                    });        
            });
            
        }
    }
});
  

   



   



 