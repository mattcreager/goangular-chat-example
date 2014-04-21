/*jshint browser: true */
/*global angular, $ */

'ust strict';

var app = angular.module('Chat', ['goangular']);

app.config(function($goConnectionProvider) {
  var url = window.connectUrl;

  $goConnectionProvider.$set(url);
});

app.controller('ChatCtrl', function($scope, $goKey) {
  $scope.messages = $goKey('messages').$sync();

  $scope.messages.$on('add', {
    local: true,
    listener: scrollOn
  });

  $scope.messages.$on('ready', scrollOn);

  $scope.sendMessage = function() {
    if(!$scope.newMessage) {
      return;
    }

    $scope.messages.$add({
      content: $scope.newMessage,
      author: $scope.author
    }).then(function() {
      $scope.$apply(function() {
        $scope.newMessage = '';
      });
    });
  };

  $scope.remove = function(id) {
    $scope.messages.$key(id).$remove();
  };

  function scrollOn() {
    setTimeout(function() {
      $('.table-wrapper').scrollTop($('.table-wrapper').children().height());
    }, 0);
  }
});
