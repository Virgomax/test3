//In this lecture will use a templating engine, which let you render HTML dynamically like in the php programming language
//We creted a afolder named "views" which is the default directory that express uses for your templates.
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//tell expressto use handlebars
app.set('view engine','hbs');

// set partials folder
hbs.registerPartials(__dirname+ '/views/partials');

//-----------Middlewares go first-----------//

//customized middleware
app.use((req,res,next)=>{
	var now =new Date().toString();
	var log= `${now}: ${req.method}  ${req.url}`;
	console.log(log);

	fs.appendFile('server.log',log + '\n',(err)=>{
		if(err){
			console.log('Unnable to append to server.log');
		}
	});

	next(); //always call next() to continue with the execution of the nodeJs program for the user visiting.
	//if you wanna block the user, simply do not call next.
})



//customized middleware
app.use((req,res,next)=>{
	const info={
		pageTitle: 'Maintenance Page'
	};
	
		res.render('maintenance.hbs',info);
	
	//if you wanna block the user, simply do not call next.
})

//middelware to show static content
app.use(express.static(__dirname+'/staticDirectory'));  // now try in chrome:  http://localhost:3000/publicpage.html

//----------- Pages-----------//

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
}) // (nameOfHelper, functionToRun)


hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
}); // (nameOfHelper, functionToRun)


app.get('/',(req,res)=>{
	res.send('<h1>hello Express!</h1>');

});


app.get('/about',(req,res)=>{
const info={
	pageTitle: 'About Page',
	welcome: 'Welcome Loly'
};

	res.render('about.hbs',info);
});


app.get('/bad',(req,res)=>{
		/*
	res.send({
		type: 'JSON file',
		name: 'Martin Info',
		likes: [
			'Programming',
			'Learning']
	});
*/

	res.send({
		errorMessage: 'Sorry there was a freaking error!'
	});
});

app.listen(3000,()=>{
	console.log('Server is up on port 3000.');
});
