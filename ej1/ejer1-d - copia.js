function getPromise(list, { key, value }){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(list.find(element => element[key] === value));
    }, 2000);
  });
}
async function findOne(list, { key, value }) {
  let result = await getPromise(list, { key, value });
  return result;
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
.then(({name}) => console.log(`user: ${name}`))
.catch(() => {
  console.log('ERROR: Element Not Found');
});

console.log('findOne error');
findOne(users, { key: 'name', value: 'Fermin' })
.then(({name}) => console.log(`user: ${name}`))
.catch(() => {
  console.log('ERROR: Element Not Found');
});


/*
findOne success
findOne error
 //wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/
