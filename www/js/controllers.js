angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, RestService, localStorageService, toaster, $filter, $ionicLoading, jwtHelper, $state, $ionicNavBarDelegate) {

    $scope.data = {};
    $scope.data.user = {};
    $scope.data.newUser = {};
    $scope.data.currentUser = {};
    $scope.data.isListView = false;

    $scope.clearOrder = function () {
      $scope.data.order = {
        total: 0,
        items: [],
        location: {}
      };
    };
	/*Sub Menu*/
	 $scope.openSub = function(name) {
		$scope.submenu = true;
		$scope.selection = 'sub';
	  }
	  $scope.backToMainMenu = function() {
		$scope.submenu = false;
		$scope.selection = 'main';
	  }
	/*Sub Menu*/
	/* Hide Back Button */

	/* Hide Back Button */
    $ionicModal.fromTemplateUrl('./templates/modals/login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalLogin = modal;
    });

    $scope.openModalLogin = function() {
      $scope.modalLogin.show();
    };

    $scope.closeModalLogin = function() {
      $scope.modalLogin.hide();
    };

    $scope.viewSignInPage = function () {
      $scope.data.isSignUpPage = false;
    };

    $scope.viewSignUpPage = function () {
      $scope.data.isSignUpPage = true;
    };

    $scope.login = function () {
      $ionicLoading.show({
        template: 'Signing...'
      });
      RestService.login($scope.data.user).then(function (response) {
        localStorageService.set('sCurrentUser', response);
        $scope.data.currentUser = response;
        toaster.success($filter('translate')('LOGIN_DONE'));
        $scope.closeModalLogin();
        $ionicLoading.hide();
        $state.go('app.dashboard');
      }, function (err) {
        toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
        $ionicLoading.hide();
      })
    };

    $scope.createNewUser = function () {
      RestService.create($scope.data.newUser, 'users').then(function (response) {
      }, function (err) {

      })
    };

    $scope.logOut = function () {
      localStorageService.remove('sCurrentUser');
      $scope.data.currentUser = {};
      $state.go('app.feature');
    };

    $scope.switchView = function () {
      $scope.data.isListView = !$scope.data.isListView;
    };

    $scope.viewFeature = function () {
      $scope.data.isListView = false;
    };

    $scope.viewSale = function () {
      $scope.data.isListView = true;
    };

    $scope.goViewProduct = function (id) {
      $state.go('app.productByCategory', {id: id})
    };

    $scope.addItem = function (item) {
      var product = angular.copy(item);
      product.quantity = 1;
      $scope.data.order.items.push(product);
      $scope.totalOrder();
      localStorageService.set('sOrder', $scope.data.order)
    };

    $scope.totalOrder = function () {
      var total = 0;
      angular.forEach($scope.data.order.items, function (value) {
        if (value.isSale && value.sale) {
          total += (value.price + value.price*value.sale/100);
          value.subTotal = value.price + value.price*value.sale/100;
        } else {
          total += value.price;
          value.subTotal = value.price;
        }
      });
      $scope.data.order.total = total;
    };

    $scope.removeItemOrder = function (index) {
      $scope.data.order.items.splice(index, 1);
      $scope.totalOrder();
      if (!$scope.data.order.items.length) {
        localStorageService.remove('sOrder')
      } else {
        localStorageService.set('sOrder', $scope.data.order)
      }
    };

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
      }
    }

    function showPosition(position) {
      $scope.data.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    }

    $scope.createUser = function () {
      $ionicLoading.show({
        template: 'Loading...'
      });
      RestService.create($scope.data.newUser, 'users').then(function (response) {
        $scope.viewSignInPage();
        $ionicLoading.hide();
      }, function (err) {

      })
    };

    var _init = function () {
      if (localStorageService.get('sCurrentUser')) {
        var user = localStorageService.get('sCurrentUser');
        if (!jwtHelper.isTokenExpired(user.token)) {
          $scope.data.currentUser = user;
        }
      }

      RestService.getList('categories').then(function (response) {
        $scope.data.categories = response;
      }, function (err) {

      });

      $scope.clearOrder();

      if (localStorageService.get('sOrder')) {
        $scope.data.order = localStorageService.get('sOrder');
      }

      getLocation();

    };

    _init();

  });
