
const findOne = (list, { key, value }) => {
  //ahora en vez de utilizar callbacks, utilizamos Promise, donde si ha ido bien llamaramos a su propio callback resolve y si ha ido mal, a reject
  //si el valor pasado en resolve da error, también se llama a reject
  return myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(list.find(element => element[key] === value));
    }, 2000);
  });
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

console.log('findOne success');
findOne(users, { key: 'name', value: 'Carlos' })
//cuando findOne nos devuelve la promesa vamos al siguiente paso
.then(({name}) => console.log(`user: ${name}`)) //si la promesa ha llamado a resolve y ha ido correctamente, entraremos en el then, y se ejecutara lo que hay dentro
.catch(() => { //si la promesa ha llamado a resolve y ha ido mal o ha llamado a reject, entraremos en el catch, y se ejecutara lo que hay dentro
  console.log('ERROR: Element Not Found');
});

console.log('findOne error');
findOne(users, { key: 'name', value: 'Fermin' })
//cuando findOne nos devuelve la promesa vamos al siguiente paso
.then(({name}) => console.log(`user: ${name}`)) //si la promesa ha llamado a resolve y ha ido correctamente, entraremos en el then, y se ejecutara lo que hay dentro
.catch(() => { //si la promesa ha llamado a resolve y ha ido mal o ha llamado a reject, entraremos en el catch, y se ejecutara lo que hay dentro
  console.log('ERROR: Element Not Found');
});


/*
findOne success
findOne error
 //wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/
