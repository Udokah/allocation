angular.module("allocations.filters")
 .filter('projectSearch', function() {
  return function(projects, search) {
    return projects.filter(function(project) {
      var match = true;
      var matchProject = true, matchPerson = false;
      if(search.name) {
        var re = new RegExp(search.name.toLowerCase());
        if(project.name) {
          matchProject = re.test(project.name.toLowerCase());
        }
        else {
          matchProject = false;
        }
        _.each(project.allocations, function(person) {
          matchPerson = matchPerson || re.test(person.name.toLowerCase()) || re.test(person.known_as.toLowerCase());
        });
      }
      return matchProject || matchPerson;
    });
  };
});
