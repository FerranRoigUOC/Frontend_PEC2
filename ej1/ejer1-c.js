

const findOne = (list, { key, value }) => {
  let r = new Promise((resolve, reject) => {
    setTimeout(() => {
      const element = list.find(element => element[key] === value);
      element ? resolve(element) : reject({ msg: 'ERROR: Element Not Found' });
    }, 2000);
  });
  return r;
};

const users = [
  {
    name: 'Carlos',
    rol: 'Teacher'
  },
  {
    name: 'Ana',
    rol: 'Boss'
  }
];



(async () => { //creamos una función anonima con async para que luego el uso de await funcione correctamente
  console.log('findOne success');
  await findOne(users, { key: 'name', value: 'Carlos' }) //utilizamos la funcion await para bloquear el thread y esperar a que la funcion devuelva su resultado para continuar
  //por lo tanto, como tenemos el setTimeout, se esperara 2000 ms
  .then(({name}) => console.log(`user: ${name}`))
  .catch(({ msg }) => console.log(msg));

  console.log('findOne error');
  await findOne(users, { key: 'name', value: 'Fermin' }) //utilizamos la funcion await para bloquear el thread y esperar a que la funcion devuelva su resultado para continuar
  //por lo tanto, como tenemos el setTimeout, se esperara 2000 ms
  .then(({name}) => console.log(`user: ${name}`))
  .catch(({ msg }) => console.log(msg));
})();


/*
findOne success
findOne error
 //wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/
