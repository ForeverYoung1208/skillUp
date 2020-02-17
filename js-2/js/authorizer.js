'use strict'

var USER_ATTRIBUTES = [
	{key:'name', name:'имя'}, 
	{key:'familyName', name:'фамилия'}, 
	{key:'age', name:'возраст'}, 
	{key:'email', name:'e-mail'}, 
	{key:'password', name:'пароль'}
];

var optionsText = `What do you want?
a)Зарегистрироваться
b)Авторизироваться
c)Просмотреть список всех пользователей
d)Изменить данные пользователя
q)Выйти `;

var doNextChoise = true;
var userChoise;

function logUserData(user) {
	Object.keys(user).forEach( key => 
		console.log(`[${key}]:`,user[key] )
	)
	console.log('------------');
}

function askNewUserData(attrList) {
	var newUser = {}
	attrList.forEach( (attr)=>
		newUser[attr.key]=prompt('Enter ' + attr.name + ':')
	)	
	return newUser;
} //<User>

//----------------------------------------------------------------

function signUp(){
	var newUser = askNewUserData(USER_ATTRIBUTES);
	console.log('--- User created:');
	console.log('[newUser.name]', newUser.name);
	console.log('[newUser.familyName]', newUser.familyName);
	return(newUser)
} //<User>

function authorizeIn(usersList) {
	var enteredEmail = prompt('enter email')
	var enteredPassword = prompt('enter password')
	var foundUser = usersList.find( (user)=>
		user.email.toLowerCase() === enteredEmail.toLowerCase()
	)
	if (foundUser && foundUser.password === enteredPassword) {
		console.log('--- User with e-mail '+ foundUser.email +' is authorized');
		logUserData(foundUser)
		return true;
	}
	console.log('--- Not authorized');
	return false;
} //<boolean>


function listUsers(usersList) {
	console.log('--- Registered users:');

	if (!usersList || usersList.length < 1) {
		console.log('none');
		return false;
	}

	console.log(usersList.length);
	usersList.forEach(user => logUserData(user))
	return true;
} //<boolean>


function changeUsers(usersList) { 
	if ( !usersList || usersList.length===0){
		alert('no users registered, first register any user !');
		return [];
	}
	var enteredName = prompt('enter user name to modify:')
	var userToModify = usersList.find(user => user.name === enteredName)
	if (userToModify){
		var newUsersList = usersList.map( user =>{
			user.name === enteredName ? user = askNewUserData(USER_ATTRIBUTES) : null
			return user
		})
	} else {		
		alert('user with name [' + enteredName + '] not found')
		return usersList
	}
	
	return newUsersList
} //<array of Users>



// ====================================================
alert('Hi!')
// if ( confirm('Clear Storage?') ){
//   localStorage.clear();
// }

var allUsers = [];

while (doNextChoise) {
  userChoise = prompt(optionsText);
  switch (userChoise) {
		case 'a':
			allUsers.push(signUp());
			break;

		case 'b':
			authorizeIn(allUsers);
			break;

		case 'c':
			listUsers(allUsers);
			break;

		case 'd':
			allUsers = changeUsers(allUsers);
			break;
		case 'q':
			doNextChoise = false;			
			break;
		
		default:
			alert('Choose the option by typing letter')
      break;
	}
	
	if (doNextChoise){
		confirm('Do you want to continue?') 
			? null 
			: doNextChoise=false
	}
  
}

alert('Bye-bye!')