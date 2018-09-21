module.exports = function(){
    var express = require('express');
    var router = express.Router();



        function getTeam(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name,coach,location FROM teams ", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }




    function getPromotion(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name, CEO FROM promotion", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.promotion = results;
            complete();
        });
    }
    //notice we passed in a complete function for parameters, this is to make sure the callback functions complete before display
    function getPeople(res, mysql, context, complete){
        mysql.pool.query("SELECT f.id, fname, lname,country,organization, p.name AS promotion, age  FROM fighters f LEFT JOIN promotion p ON p.id = f.organization  LEFT JOIN fighter_team ft ON ft.pid = f.id GROUP BY f.id ORDER BY lname" , function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			//context.fighters refers to #fighters in handlebars
            context.fightersDisplay = results;
            complete();
        });
    }
        //notice we passed in a complete function for parameters, this is to make sure the callback functions complete before display
    function getFighters(res, mysql, context, complete){
        mysql.pool.query("SELECT id, fname, lname FROM fighters GROUP BY id ORDER BY fname" , function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			//context.fighters refers to #fighters in handlebars
            context.fighters = results;
            complete();
        });
    }
    function getCountries(res,mysql,context,complete){
               mysql.pool.query("SELECT country FROM fighters GROUP BY country ORDER BY country" , function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			//context.fighters refers to #fighters in handlebars
            context.countries = results;
            complete();
        });

    }


        function getChampions(res, mysql, context, complete){
        mysql.pool.query("SELECT c.id AS id, c.name AS titleName, c.holder, f.fname AS firstName, f.lname AS lastName, c.weightclass  AS weightclass, p.name AS organ FROM champion c LEFT JOIN fighters f ON f.id=c.holder LEFT JOIN promotion p ON c.organization = p.id" , function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			//context.champion refers to #champion in handlebars
            context.champion = results;
            complete();
        });
    }

/*FILTER BY HELPER FUNCTIONS */

       //notice we passed in a complete function for parameters, this is to make sure the callback functions complete before display
    function getPeopleByfname(res, mysql, context, complete){
        mysql.pool.query("SELECT f.id, fname, lname,country,organization, p.name AS promotion, age  FROM fighters f LEFT JOIN promotion p ON p.id = f.organization  LEFT JOIN fighter_team ft ON ft.pid = f.id GROUP BY f.id ORDER BY fname" , function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			//context.fighters refers to #fighters in handlebars
            context.fightersDisplay = results;
            complete();
        });
    }
           //notice we passed in a complete function for parameters, this is to make sure the callback functions complete before display
    function getPeopleBylname(res, mysql, context, complete){
        mysql.pool.query("SELECT f.id, fname, lname,country,organization, p.name AS promotion, age  FROM fighters f LEFT JOIN promotion p ON p.id = f.organization  LEFT JOIN fighter_team ft ON ft.pid = f.id GROUP BY f.id ORDER BY lname" , function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			//context.fighters refers to #fighters in handlebars
            context.fightersDisplay = results;
            complete();
        });
    }
           //notice we passed in a complete function for parameters, this is to make sure the callback functions complete before display
    function getPeopleByCountry(res, mysql, context, complete){
        mysql.pool.query("SELECT f.id, fname, lname,country,organization, p.name AS promotion, age  FROM fighters f LEFT JOIN promotion p ON p.id = f.organization  LEFT JOIN fighter_team ft ON ft.pid = f.id GROUP BY f.id ORDER BY country" , function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			//context.fighters refers to #fighters in handlebars
            context.fightersDisplay = results;
            complete();
        });
    }

               //notice we passed in a complete function for parameters, this is to make sure the callback functions complete before display
    function getPeopleByAge(res, mysql, context, complete){
        mysql.pool.query("SELECT f.id, fname, lname,country,organization, p.name AS promotion, age  FROM fighters f LEFT JOIN promotion p ON p.id = f.organization  LEFT JOIN fighter_team ft ON ft.pid = f.id GROUP BY f.id ORDER BY age" , function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			//context.fighters refers to #fighters in handlebars
            context.fightersDisplay = results;
            complete();
        });
    }

        function getPeopleByPromotion(res, mysql, context, complete){
        mysql.pool.query("SELECT f.id, fname, lname,country,organization, p.name AS promotion, age  FROM fighters f LEFT JOIN promotion p ON p.id = f.organization  LEFT JOIN fighter_team ft ON ft.pid = f.id GROUP BY f.id ORDER BY promotion" , function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			//context.fighters refers to #fighters in handlebars
            context.fightersDisplay = results;
            complete();
        });
    }

    /*END OF FILTER BY HELPER FUNCTIONS */

/**** UPDATE HELPER FUNCTIONS  ********/
    //helper function for UPDATE
    function getPerson(res, mysql, context, id, complete){
        var sql = "SELECT id, fname, lname, country, age, organization  FROM fighters WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.fighters= results[0];
            complete();
        });
    }
    function getCompanyRoster(res,mysql,context,id,complete){
        var sql= "SELECT  f.fname AS fname, f.lname AS lname,f.age AS age, f.country AS country FROM promotion p INNER JOIN fighters f ON f.organization = p.id WHERE p.id=? ";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.roster= results;
            complete();
        });
    }

       function getTeamRoster(res,mysql,context,id,complete){
        var sql= "SELECT f.id AS id, f.fname AS fname, f.lname AS lname,f.age AS age, f.country AS country, t.coach AS coach FROM teams t  INNER JOIN fighter_team ft ON ft.tid=t.id INNER JOIN fighters f ON f.id=ft.pid WHERE t.id=?  ";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.fighter= results;
            complete();
        });
    }
    function getFighterById(res,mysql,context,id,complete){

        var sql= "SELECT f.id AS id, fname, lname, age, p.name AS organization, country FROM fighters f INNER JOIN promotion p ON f.organization=p.id WHERE f.id=?";
        var inserts=[id];
         mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.fightersDisplay= results;
            complete();
        });
    }

    function getFighterByCountry(res,mysql,context,country,complete){

        var sql= "SELECT f.id AS id, fname, lname, age, p.name AS organization, country  FROM fighters f INNER JOIN promotion p ON f.organization=p.id WHERE country=?";
        var inserts=[country];
         mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.fightersDisplay= results;
            complete();
        });
    }
 


            //helper function for UPDATE
    function getTeamSingle(res, mysql, context, id, complete){
        var sql = "SELECT id, name, coach, location  FROM teams WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team= results[0];
            complete();
        });
    }

        function getChampionSingle(res, mysql, context, id, complete){
        var sql = "SELECT id, name, organization, holder, weightclass  FROM champion WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.champion= results[0];
            complete();
        });
    }
          function getPromotionSingle(res, mysql, context, id, complete){
        var sql = "SELECT id, name, CEO FROM promotion WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.promotion= results[0];
            complete();
        });
    }



    /**** END OF UPDATE HELPER FUNCTIONS  ********/

    /*Display all data. Requires web based javascript to delete users with AJAX*/
//this mounts people.js to /
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
		//include whatever javascript stuff on this page.
        context.jsscripts = ["deleteperson.js","deleteteam.js","deletepromotion.js","deletechampion.js","showCountryColors.js","searchFighter.js"];
        var mysql = req.app.get('mysql');
        //here we have two callback functions, getPeople() and getPromotion(), so that is why we are checking for a callbackCount ==2
        getPeople(res, mysql, context, complete);
        getPromotion(res, mysql, context, complete);
        getTeam(res, mysql, context, complete);
        getChampions(res,mysql,context,complete);
        getFighters(res, mysql, context, complete);
        getCountries(res,mysql,context,complete);
        // getTeam(res,mysql,context,complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 6){
                //render refers to handlebar files
                res.render('people', context);
            }
        }
    });



/*ROUTES FOR FILTERS */

        /*Display all data. Requires web based javascript to delete users with AJAX filter by fname*/
//this mounts people.js to 
    router.get('/filterByfname/', function(req, res){
        var callbackCount = 0;
        var context = {};
		//include whatever javascript stuff on this page.
        context.jsscripts = ["deleteperson.js","deleteteam.js","deletepromotion.js","deletechampion.js","showCountryColors.js","searchFighter.js" ];
        var mysql = req.app.get('mysql');
        //here we have two callback functions, getPeople() and getPromotion(), so that is why we are checking for a callbackCount ==2
        getPeopleByfname(res, mysql, context, complete);
        getPromotion(res, mysql, context, complete);
        getTeam(res, mysql, context, complete);
        getChampions(res,mysql,context,complete);
        getFighters(res, mysql, context, complete);
         getCountries(res,mysql,context,complete);
        // getTeam(res,mysql,context,complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 6){
                //render refers to handlebar files
                res.render('people', context);
            }
        }
    });

        /*Display all data. Requires web based javascript to delete users with AJAX filter by fname*/
//this mounts people.js to 
    router.get('/filterBylname/', function(req, res){
        var callbackCount = 0;
        var context = {};
		//include whatever javascript stuff on this page.
        context.jsscripts = ["deleteperson.js","deleteteam.js","deletepromotion.js","deletechampion.js","showCountryColors.js","searchFighter.js" ];
        var mysql = req.app.get('mysql');
        //here we have two callback functions, getPeople() and getPromotion(), so that is why we are checking for a callbackCount ==2
        getPeopleBylname(res, mysql, context, complete);
        getPromotion(res, mysql, context, complete);
        getTeam(res, mysql, context, complete);
        getChampions(res,mysql,context,complete);
        getFighters(res, mysql, context, complete);
         getCountries(res,mysql,context,complete)
        // getTeam(res,mysql,context,complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 6){
                //render refers to handlebar files
                res.render('people', context);
            }

        }
    });

            /*Display all data. Requires web based javascript to delete users with AJAX filter by fname*/
//this mounts people.js to 
    router.get('/filterBycountry/', function(req, res){
        var callbackCount = 0;
        var context = {};
		//include whatever javascript stuff on this page.
        context.jsscripts = ["deleteperson.js","deleteteam.js","deletepromotion.js","deletechampion.js","showCountryColors.js","searchFighter.js" ];
        var mysql = req.app.get('mysql');
        //here we have two callback functions, getPeople() and getPromotion(), so that is why we are checking for a callbackCount ==2
        getPeopleByCountry(res, mysql, context, complete);
        getPromotion(res, mysql, context, complete);
        getTeam(res, mysql, context, complete);
        getChampions(res,mysql,context,complete);
        getFighters(res, mysql, context, complete);
         getCountries(res,mysql,context,complete);
        // getTeam(res,mysql,context,complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 6){
                //render refers to handlebar files
                res.render('people', context);
            }
        }
    });

        router.get('/filterByAge/', function(req, res){
        var callbackCount = 0;
        var context = {};
		//include whatever javascript stuff on this page.
        context.jsscripts = ["deleteperson.js","deleteteam.js","deletepromotion.js","deletechampion.js","showCountryColors.js","searchFighter.js" ];
        var mysql = req.app.get('mysql');
        //here we have two callback functions, getPeople() and getPromotion(), so that is why we are checking for a callbackCount ==2
        getPeopleByAge(res, mysql, context, complete);
        getPromotion(res, mysql, context, complete);
        getTeam(res, mysql, context, complete);
        getChampions(res,mysql,context,complete);
        getFighters(res, mysql, context, complete);
         getCountries(res,mysql,context,complete)
        // getTeam(res,mysql,context,complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 6){
                //render refers to handlebar files
                res.render('people', context);
            }
        }
    });

          router.get('/filterByPromotion/', function(req, res){
        var callbackCount = 0;
        var context = {};
		//include whatever javascript stuff on this page.
        context.jsscripts = ["deleteperson.js","deleteteam.js","deletepromotion.js","deletechampion.js","showCountryColors.js","searchFighter.js"];
        var mysql = req.app.get('mysql');
        //here we have two callback functions, getPeople() and getPromotion(), so that is why we are checking for a callbackCount ==2
        getPeopleByPromotion(res, mysql, context, complete);
        getPromotion(res, mysql, context, complete);
        getTeam(res, mysql, context, complete);
        getChampions(res,mysql,context,complete);
        getFighters(res, mysql, context, complete);
         getCountries(res,mysql,context,complete);
        // getTeam(res,mysql,context,complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 6){
                //render refers to handlebar files
                res.render('people', context);
            }
        }
    });


    /*END OF ROUTES FOR FILTERS */

    /* Display one company for the specific purpose of displaying company roster */

    router.get('/companyRoster/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        //referring to javascript files in public folder
        // context.jsscripts = ["selectedplanet.js", "updateperson.js","selectteam.js"];
        var mysql = req.app.get('mysql');
       
        //this line getPromotion is to populate the drop down menu, not data in the table
        getPromotionSingle(res, mysql, context, req.params.id, complete);
        getCompanyRoster(res,mysql,context,req.params.id,complete);
     
        function complete(){
            //every callback that is completed is incremented, once we hit 2 or more, we know all callbacks finished
            callbackCount++;
            if(callbackCount >= 2){
                //render handlebar file
                res.render('companyRoster', context);
            }

        }
    });

        router.get('/teamRoster/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        //referring to javascript files in public folder
        // context.jsscripts = ["selectedplanet.js", "updateperson.js","selectteam.js"];
        var mysql = req.app.get('mysql');
       context.jsscripts = ["deleteTeammate.js"];
        //this line getPromotion is to populate the drop down menu, not data in the table
       getFighters(res, mysql, context, complete);
        getTeamSingle(res, mysql, context, req.params.id, complete);
        getTeamRoster(res,mysql,context,req.params.id,complete);
        function complete(){
            //every callback that is completed is incremented, once we hit 2 or more, we know all callbacks finished
            callbackCount++;
            if(callbackCount >= 3){
                //render handlebar file
                res.render('teamRoster', context);
            }
        }
    });

/* Page for updating a single fighter*/
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        //referring to javascript files in public folder
        context.jsscripts = ["selectedplanet.js", "updateperson.js","selectteam.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        //this line getPromotion is to populate the drop down menu, not data in the table
        getPromotion(res, mysql, context, complete);
     
        function complete(){
            //every callback that is completed is incremented, once we hit 2 or more, we know all callbacks finished
            callbackCount++;
            if(callbackCount >= 2){
                //render handlebar file
                res.render('update-person', context);
            }

        }
    });
 /* Display one team for the specific purpose of updating a team */
        router.get('/team/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        //referring to javascript files in public folder
        context.jsscripts = ["updateteam.js"];
        var mysql = req.app.get('mysql');
        getTeamSingle(res, mysql, context, req.params.id, complete);
  
        function complete(){
            //every callback that is completed is incremented, once we hit 2 or more, we know all callbacks finished
            callbackCount++;
            if(callbackCount >= 1){
                //render handlebar file
                res.render('update-team', context);
            }

        }
    });

     /* Display one champion for the specific purpose of updating a champion */
        router.get('/champion/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        //referring to javascript files in public folder
        context.jsscripts = ["updatechampion.js","selectBeltHolder.js","selectedplanet.js"];
        var mysql = req.app.get('mysql');
        getChampionSingle(res, mysql, context, req.params.id, complete);
        getFighters(res, mysql, context, complete);
        getPromotion(res, mysql, context, complete);
        function complete(){
            //every callback that is completed is incremented, once we hit 2 or more, we know all callbacks finished
            callbackCount++;
            if(callbackCount >= 3){
                //render handlebar file
                res.render('update-champion', context);
            }

        }
    });

    router.get('/searchPerson/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        //referring to javascript files in public folder
        var mysql = req.app.get('mysql');
        context.jsscripts = ["deleteperson.js","deleteteam.js","deletepromotion.js","deletechampion.js","showCountryColors.js","searchFighter.js"];
        var inserts =[req.body.id];
        getFighterById(res,mysql,context,req.params.id,complete);
        getFighters(res, mysql, context, complete);
        getPromotion(res, mysql, context, complete);
        getTeam(res, mysql, context, complete);
        getChampions(res,mysql,context,complete);
        getCountries(res,mysql,context,complete);
        function complete(){
            //every callback that is completed is incremented, once we hit 2 or more, we know all callbacks finished
            callbackCount++;
            if(callbackCount >= 6){
                //render handlebar file
                res.render('people', context);
            }

        }
    });

         router.get('/searchCountry/:country', function(req, res){
        callbackCount = 0;
        var context = {};
        //referring to javascript files in public folder
        var mysql = req.app.get('mysql');
        context.jsscripts = ["deleteperson.js","deleteteam.js","deletepromotion.js","deletechampion.js","showCountryColors.js","searchFighter.js"];
        var inserts =[req.body.country];
        getFighterByCountry(res,mysql,context,req.params.country,complete);
        getFighters(res, mysql, context, complete);
        getPromotion(res, mysql, context, complete);
        getTeam(res, mysql, context, complete);
        getChampions(res,mysql,context,complete);
        getCountries(res,mysql,context,complete);
        function complete(){
            //every callback that is completed is incremented, once we hit 2 or more, we know all callbacks finished
            callbackCount++;
            if(callbackCount >= 6){
                //render handlebar file
                res.render('people', context);
            }

        }
    });


/********ROUTES FOR ADDING *********************** */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        //do not concantenate a long string for SQl queries, use this below where sql can place value pairs into the command.
        //one value for each question mark
        var sql = "INSERT INTO fighters (fname, lname, country, age, organization) VALUES (?,?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.country, req.body.age, req.body.organization];
       //callback function below, if we get an error tell us, otherwise redirect
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //when we redirect after adding send us back to /people url
                res.redirect('/people');
            }
        });
    });


 /* Adds a team, redirects to the people page after adding */
        router.post('/team', function(req, res){
        var mysql = req.app.get('mysql');
        //do not concantenate a long string for SQl queries, use this below where sql can place value pairs into the command.
        //one value for each question mark
        var sql = "INSERT INTO teams (name, coach, location) VALUES (?,?,?)";
        var inserts = [req.body.name, req.body.coach, req.body.location];
       //callback function below, if we get an error tell us, otherwise redirect
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //when we redirect after adding send us back to /people url
                res.redirect('/people');
            }
        });
    });

     /* Adds a team, redirects to the people page after adding */
        router.post('/promotion', function(req, res){
        var mysql = req.app.get('mysql');
        //do not concantenate a long string for SQl queries, use this below where sql can place value pairs into the command.
        //one value for each question mark
        var sql = "INSERT INTO promotion (name, CEO) VALUES (?,?)";
        var inserts = [req.body.name, req.body.CEO];
       //callback function below, if we get an error tell us, otherwise redirect
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //when we redirect after adding send us back to /people url
                res.redirect('/people');
            }
        });
    });

     router.post('/champion', function(req, res){
        var mysql = req.app.get('mysql');
        //do not concantenate a long string for SQl queries, use this below where sql can place value pairs into the command.
        //one value for each question mark
        var sql = "INSERT INTO champion (name,organization,holder,weightclass) VALUES (?,?,?,?)";
        var inserts = [req.body.name,req.body.organization,req.body.holder,req.body.weightclass];
       //callback function below, if we get an error tell us, otherwise redirect
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //when we redirect after adding send us back to /people url
                res.redirect('/people');
            }
        });
    });

        router.post('/addTeammate', function(req, res){
        var mysql = req.app.get('mysql');
        //do not concantenate a long string for SQl queries, use this below where sql can place value pairs into the command.
        //one value for each question mark
        var sql = "INSERT INTO fighter_team (tid,pid) VALUES (?,?)";
        var inserts = [req.body.tid,req.body.pid];
       //callback function below, if we get an error tell us, otherwise redirect
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                //when we redirect after adding send us back to /people url
                res.redirect('/people');
            }
        });
    });

/******** END OF ROUTES FOR ADDING *********************** */


    /********ROUTES FOR UPDATING *********************** */

    /* The URL that update data is sent to in order to update a person */
    /* http://flip3.engr.oregonstate.edu:\*****\/people/13*/
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE fighters SET fname=?, lname=?, country=?, age=?, organization=? WHERE id=?";
        var inserts = [req.body.fname, req.body.lname, req.body.country, req.body.age,req.body.organization, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });




  /* The URL that update data is sent to in order to update a team */
    /* http://flip3.engr.oregonstate.edu:\*****\/people/team/13*/
        router.put('/team/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE teams SET name=?, coach=?, location=? WHERE id=?";
        var inserts = [req.body.name, req.body.coach, req.body.location, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });


        router.put('/champion/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE champion SET name=?, organization=?, weightclass=?, holder=? WHERE id=?";
        var inserts = [req.body.name, req.body.organization, req.body.weightclass,req.body.holder, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /********END OF ROUTES FOR UPDATING *********************** */

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM fighters WHERE id = ?";
        var inserts = [req.params.id];
		console.log(req.params.id);
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

        router.delete('/team/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM teams WHERE id = ?";
        var inserts = [req.params.id];
		console.log(req.params.id);
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    router.delete('/promotion/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM promotion WHERE id = ?";
        var inserts = [req.params.id];
		console.log(req.params.id);
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

       router.delete('/champion/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM champion WHERE id = ?";
        var inserts = [req.params.id];
		console.log(req.params.id);
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

           router.delete('/teamRoster/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM fighter_team WHERE pid = ?";
        var inserts = [req.params.id];
		console.log(req.params.id);
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
