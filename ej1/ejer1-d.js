

const findOne = (list, { key, value }) => {
  let r = new Promise((resolve, reject) => {
    setTimeout(() => {
      const element = list.find(element => element[key] === value);
      element ? resolve(element) : reject({ msg: 'ERROR: Element Not Found' });
    }, 2000);
  })
  .then(({name}) => console.log(`user: ${name}`))
  .catch(({ msg }) => console.log(msg));
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
  console.log('findOne error');
  //utilizamos Promise.all(..) para que las promesas se ejecuten de manera paralela
  await Promise.all([findOne(users, { key: 'name', value: 'Carlos' }),  findOne(users, { key: 'name', value: 'Fermin' })]);
})();


/*
findOne success
findOne error
 //wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/
