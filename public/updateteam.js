function updateTeam(id){
    $.ajax({
        url: '/people/team/' + id,
        type: 'PUT',
        data: $('#update-team').serialize(),
        success: function(result){
			//The line below redirects us back to /people html page
            window.location.replace("/people/");
        }
    })
};