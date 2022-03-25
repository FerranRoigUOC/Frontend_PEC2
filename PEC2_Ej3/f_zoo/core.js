const data = require('./data');
function entryCalculator(entrants) {
  if(entrants == null || Object.entries(entrants).length === 0){
    return 0;
  }
  Object.keys(entrants).map(function(key, index) {
    Object.keys(data.prices).map(function(key2, index2) {
      if(key == key2){
        entrants[key] = entrants[key] * data.prices[key2];
      }
    });
  });
  return Object.values(entrants).reduce((a, b) => a + b);
}

function schedule(dayName) {
  var objectSchedules = {};
  Object.keys(data.hours).map(function(key, index) {
    Object.values(data.hours[key]).reduce(function(previousValue, currentValue) {
      if(previousValue == 0 && currentValue == 0) {
        objectSchedules[key] = 'CLOSED';
      } else {
        if(currentValue > 12) currentValue -= 12;
        objectSchedules[key] = 'Open from ' + previousValue + 'am until ' + currentValue + 'pm';
      }
    });
  });

  if(dayName== null) {
    return objectSchedules;
  } else {
    var filtered = Object.keys(objectSchedules).reduce(function (filtered, key) {
      if (key == dayName) filtered[key] = objectSchedules[key];
      return filtered;
    }, {});
    return filtered;
  }
  
}

function animalCount(species) {
  var objectSpecies = {};
  data.animals.map(function(animal) {
    objectSpecies[animal.name]= animal.residents.length;
  });
  if(species== null) {
    return objectSpecies;
  } else {
    return objectSpecies[species];
  }
}

function animalMap(options) {
  if (options == null || (!options.includeNames && options.sex)) {
    var a = data.animals.reduce((acc, obj) => {
      const key = obj['location'];
      if (!acc[key]) {
         acc[key] = [];
      }
      acc[key].push(obj.name);
      return acc;
   }, {});
   return a;
  }else if(options.includeNames) {
    var a = data.animals.reduce((acc, obj) => {
      const key = obj['location'];
      if (!acc[key]) {
         acc[key] = [];
      }
      var residentsName = obj.residents;
      if(options.sex){
        residentsName = obj.residents.filter(n => n.sex == options.sex);
      }
      var c = residentsName.map(function(x) {
        return x.name;
     });
      var aux = {};
      aux[obj.name] = c;
      acc[key].push(aux);
      return acc;
    }, {});
    return a;
  }
}

function animalPopularity(rating) {
  var animalGroupByPopularity = data.animals.reduce((acc, obj) => {
    const key = obj['popularity'];
    if (!acc[key]) {
       acc[key] = [];
    }
    acc[key].push(obj.name);
    return acc;
  }, {});
  if(rating){
    return animalGroupByPopularity[rating];
  }
  return animalGroupByPopularity;
}

function animalsByIds(ids) {
  if(ids == null){
    return [];
  } else if (typeof ids == "string"){
    return data.animals.filter(x => x.id == ids);
  }
  return data.animals.filter(x => ids.some(id => id == x.id));
  
}

function animalByName(animalName) {
  var objectName = {};
  data.animals.map(animal => animal.residents.map(function(resident) {
    if(resident.name == animalName) {
      objectName['name'] = resident.name;
      objectName['sex'] = resident.sex;
      objectName['age'] = resident.age;
      objectName['species'] = animal.name;
    }
  }));
  return objectName;
}

function employeesByIds(ids) {
  if(ids == null){
    return [];
  } else if (typeof ids == "string"){
    return data.employees.filter(x => x.id == ids);
  }
  return data.employees.filter(x => ids.some(id => id == x.id));
}

function employeeByName(employeeName) {
  var objectName = {};
  data.employees.map(function(e) {
    if(e.firstName == employeeName || e.lastName == employeeName) {
      objectName = e;
    }
  });
  return objectName;
}

function managersForEmployee(idOrName) {
  var objectName = {};
  var managersName = [];
  data.employees.map(function(e) {
    if(e.firstName == idOrName || e.id == idOrName || e.lastName == idOrName) {
      objectName = e;
      e.managers.map(m => {
        var a = data.employees.filter(x => x.id == m);
        a.map(n => {
          managersName.push(n.firstName + " " + n.lastName);
        });
      });
    }
  });
  objectName['managers'] = managersName;
  return objectName;
}

function employeeCoverage(idOrName) {
  var employeeGroupByAnimal = data.employees.reduce((acc, obj) => {
    if(!idOrName || obj['id'] == idOrName || obj['firstName'] == idOrName || obj['lastName'] == idOrName){
      const key = obj['firstName'] + " " + obj['lastName'];
      var nameAnimals = [];
      obj.responsibleFor.map(employeeIdAnimal => {
        var a = data.animals.filter(idAnimal => idAnimal.id == employeeIdAnimal);
        a.map(n => {
          nameAnimals.push(n.name);
        });
        acc[key] = nameAnimals;
      });
    }
    return acc;
  }, {});
  return employeeGroupByAnimal;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage
};
