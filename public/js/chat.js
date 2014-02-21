/* jshint browser:true */
/* globals angular, connectUrl */

(function() {
'use strict';

var app = angular.module('Chat', ['goangular']);

app.config(function($goConnectionProvider) {
  $goConnectionProvider.$set(connectUrl);
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

  $scope.removeMessage = function(id) {

    $scope.messages.$key(id).$remove();
  };

  $scope.editMessage = function(id, edit) {
    $scope.messages.$key(id).$key('content').$set(edit);
    edit = '';
  };

  function scrollOn() {
    setTimeout(function() {
      $('.table-wrapper').scrollTop($('.table-wrapper').children().height());
    }, 0);
  }
});

app.directive('editor', function() {
  var template =
    '<form ng-submit="edit(message.$name)">' +
    '<div class="col-xs-11">' +
    '<input ng-model="editText" ng-init="editText = message.content" class="form-control" />' +
    '</div>' +
    '<div class="col-xs-1">' +
    '<button type="submit" class="btn btn-sm btn-default"><span class="glyphicon glyphicon-ok"></span></button>' +
    '</div>' +
    '</form>';

  return {
    restrict: 'A',
    template: template,
    controller: function($scope) {
      //$scope.editText = '';
      $scope.editing = false;

      $scope.edit = function(id) {
        $scope.editMessage(id, $scope.editText);

        $scope.editing = false;
      };
    }
  };
});

})();
