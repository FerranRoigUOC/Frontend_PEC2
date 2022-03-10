

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



(async () => {
  console.log('findOne success');
  await findOne(users, { key: 'name', value: 'Carlos' })
  .then(({name}) => console.log(`user: ${name}`))
  .catch(({ msg }) => console.log(msg));

  console.log('findOne error');
  await findOne(users, { key: 'name', value: 'Fermin' })
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
