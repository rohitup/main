angular.module('starter')
.controller('AccReceiptCollectionCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state, $sessionStorage,$rootScope) {
	$scope.receiptCollections_ = {};
	$scope.receiptCollections_.list = [];

	$scope.addReceiptCollectionDetail = function(saveaction){
		if($sessionStorage.receiptArray){
			var index = findWithAttr($scope.receiptCollections_.list, 'id', $rootScope.CRReceiptHeadId);
			if(index !== -1 && $rootScope.CRReceiptHeadId != $scope.RCOpenModalData.id){
				alert("Receipt Heads cannot be same. Please select another Receipt Head");
				return;
			}
		}
		if($scope.action == "new"){
			/*var rHeadName = $.grep($scope.receiptHeadsList, function (rHead) {
	            return rHead.value == $rootScope.CRReceiptHead;
	        })[0].name;*/

			$scope.receiptCollections_.list.push({
				id: $rootScope.CRReceiptHeadId,
				receiptHead : $rootScope.CRReceiptHead,
				amount : $scope.CRRCAmount
			})
			$sessionStorage.receiptArray = $scope.receiptCollections_.list;
		}
		else{
			
			var index = findWithAttr($sessionStorage.receiptArray, 'id', $scope.RCOpenModalData.id);
			if (index !== -1) {
				var rHeadName = $.grep($scope.receiptHeadsList, function (rHead) {
		            return rHead.value == $rootScope.CRReceiptHeadId;
		        })[0].name;
				$sessionStorage.receiptArray[index].id = $rootScope.CRReceiptHeadId;
				$sessionStorage.receiptArray[index].receiptHead = rHeadName;
				$sessionStorage.receiptArray[index].amount = $scope.CRRCAmount;
			}
		}
		/*var optionIndex = findWithAttr($sessionStorage.receiptArray, 'id', $scope.CRReceiptHead);
		if(optionIndex !== -1){
			var optionReceiptIndex = findWithAttr($scope.receiptHeadsList, 'value', $scope.CRReceiptHead);
			$scope.receiptHeadsList[optionReceiptIndex].disabled = true;
		}*/

		console.log("$sessionStorage.receiptArray after push: "+JSON.stringify($sessionStorage.receiptArray));
		$rootScope.$broadcast('RCChangeEvt',$sessionStorage.receiptArray);
		
		if(saveaction == "savenew"){
			$rootScope.CRReceiptHeadId = "";
			$rootScope.CRReceiptHead = "";
			$scope.CRRCAmount = "";
			$rootScope.modalAction = "new";
		}
		else $scope.closeModalReceiptCollection();
	}
	
	$scope.$on('RCOpenModalEvt', function (event, data){
		$scope.RCOpenModalData = JSON.parse(data);
		console.log("id: "+$scope.RCOpenModalData.id+"|amount: "+$scope.RCOpenModalData.amount+"|action: "+$scope.RCOpenModalData.action);
		
		$scope.action = $scope.RCOpenModalData.action;
		console.log("scope.action: "+$scope.action);
		if($scope.action == "new"){
			$rootScope.CRReceiptHeadId = "";
			$rootScope.CRReceiptHead = "";
			$scope.CRRCAmount = "";
			$rootScope.modalAction = "new";
		}
		else {
			var rHeadName = $.grep($scope.receiptHeadsList, function (rHead) {
				return rHead.value == $scope.RCOpenModalData.id;
			})[0].name;
			$rootScope.CRReceiptHeadId = $scope.RCOpenModalData.id;
			$rootScope.CRReceiptHead = rHeadName;
			$scope.CRRCAmount = $scope.RCOpenModalData.amount;
			$rootScope.modalAction = "edit";
		}
		console.log("receiptHeadList in the end: "+JSON.stringify($scope.receiptHeadsList));
	});
	
	function findWithAttr(array, attr, value) {
	    for(var i = 0; i < array.length; i += 1) {
	        if(array[i][attr] === value) {
	            return i;
	        }
	    }
	    return -1;
	}
    var _init = function () {
    };
    _init();

  })
.directive('ionReceiptHeadSelect', ['$ionicModal', '$ionicGesture', function ($ionicModal, $ionicGesture) {
    return {
        restrict: 'E',
        scope: {
            options: "=",
            optionSelected: "="
        },
        controller: function ($scope, $element, $attrs,$rootScope) {
            $scope.searchSelect = {
                title: $attrs.title,
                keyProperty: $attrs.keyProperty,
                valueProperty: $attrs.valueProperty,
                templateUrl: $attrs.templateUrl || 'templates/receiptHeadSelect.html',
                animation: $attrs.animation || 'slide-in-up',
                option: null,
                searchvalue: "",
                enableSearch: $attrs.enableSearch ? $attrs.enableSearch == "true" : true
            };
            $ionicGesture.on('tap', function (e) {
                if(!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty){
                  if ($scope.optionSelected) {
                	  $scope.searchSelect.option = $scope.optionSelected[$scope.searchSelect.keyProperty];
                  }
                }
                else{
                  $scope.searchSelect.option = $scope.optionSelected;
                }
                if($rootScope.modalAction == "new"){ $scope.searchSelect.option = "";}
                if($rootScope.modalAction == "edit"){ $scope.searchSelect.option = $rootScope.CRReceiptHeadId;}
                $scope.OpenModalFromTemplate($scope.searchSelect.templateUrl);
            }, $element);

            $scope.saveOption = function () {
            	$rootScope.modalAction = "";
            	if(!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty){
	                for (var i = 0; i < $scope.options.length; i++) {
	                    var currentOption = $scope.options[i];
	                    if(currentOption[$scope.searchSelect.keyProperty] == $scope.searchSelect.option){
	                    	$scope.optionSelected = currentOption;
	                    	break;
	                    }
	                }
            	}
            	else{
            		$scope.optionSelected = $scope.searchSelect.option;
                }
            	$rootScope.CRReceiptHead = $scope.optionSelected.name;
            	$rootScope.CRReceiptHeadId = $scope.optionSelected.value;
            	$scope.searchSelect.searchvalue = "";
                $scope.modal.remove();
            };
            $scope.closeModal = function () {
            	$scope.searchSelect.searchvalue = "";
                $scope.modal.remove();
            };
            $scope.$on('$destroy', function () {
                if ($scope.modal) {
                    $scope.modal.remove();
                }
            });
          
            $scope.OpenModalFromTemplate = function (templateUrl) {
                $ionicModal.fromTemplateUrl(templateUrl, {
                    scope: $scope,
                    animation: $scope.searchSelect.animation
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };
        }
    };
} ]);