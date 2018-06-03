function updatePerson(id){
    $.ajax({
        url: '/people/' + id,
        type: 'PUT',
        data: $('#update-fighter').serialize(),
        success: function(result){
			//The line below redirects us back to /people html page
            window.location.replace("./");
        }
    })
};