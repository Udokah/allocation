angular.module("allocations.directives")
  .directive('avatar', ['Fellows', function(Fellows) {
    return {
      restrict: 'E',
      templateUrl: "views/avatar.html",
      link: function(scope, element, attrs) {
        scope.$watch('person.cohort.color', function(newValue) {
          element.find('div').css({"border-color": newValue});
        });

        element.find('div').on('dragstart', function(event) {
          if(scope.person.$save) {
            scope.$root.draggedPerson = scope.person;
          } else {
            scope.$root.draggedPerson = Fellows.find(scope.person.$id);
          }
          event.dataTransfer.setDragImage(document.getElementById(scope.person.$id), 25, 25);
        });
      }
    };
  }])
  .directive('personLookup', function() {
    return {
      replace: false,
      restrict: 'E',
      controller: ['$scope', 'Allocations', 'Fellows', function($scope, Allocations, Fellows) {
        $scope.person = Fellows.find($scope.uid);
        $scope.person.$loaded().then(function(data) {
          $scope.allocation = Allocations.find(data.allocation_ref);
        });
      }]
    };
  });
