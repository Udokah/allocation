angular.module("allocations.filters")
  .filter('fellowsSearch', function() {
    return function(fellows, search) {
      return fellows.filter(function(person){
        searchReg = new RegExp(search.name.toLowerCase());
        return searchReg.test(person.name.toLowerCase()) || searchReg.test(person.known_as.toLowerCase());
      });
    };
  });
