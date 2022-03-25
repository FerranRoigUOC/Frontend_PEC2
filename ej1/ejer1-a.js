//funcion de retorno donde entra como parametros una lista, 
//un objeto con key y value como parametros, y dos callbacks, uno para indicar que ha ido bien,
//y otro para indicar que ha ido mal
const findOne = (list, { key, value }, { onSuccess, onError }) => { 
  //con el settimeout, posponemos 2000 ms a que se ejecute lo que hay dentro de este
  setTimeout(() => {
    const element = list.find(element => element[key] === value); //mira si existe un objeto en la lista con la key y value que han entrado por parametros
    element ? onSuccess(element) : onError({ msg: 'ERROR: Element Not Found' }); //si ha encontrado un objeto, se lanza el callback onSuccess, sino, se lanza el callback on Error
  }, 2000);
};

//funciones utilizadas como callbacks en la función de arriba
const onSuccess = ({ name }) => console.log(`user: ${name}`); //funcion de retorna donde entra el parametro name de un objeto, y lo printa por consola
const onError = ({ msg }) => console.log(msg); //funcion de retorna donde entra el parametro msg de un objeto, y lo printa por consola

//lista de usuarios 
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
findOne(users, { key: 'name', value: 'Carlos' }, { onSuccess, onError }); //se llama a la funcion findOne con un valor que existe, y nos fijamos como se pasan los callbacks onSucces y onError

console.log('findOne error');
findOne(users, { key: 'name', value: 'Fermin' }, { onSuccess, onError }); //se llama a la funcion findOne con un valor que no existe, y nos fijamos como se pasan los callbacks onSucces y onError

/*
findOne success
findOne error
 //wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/
