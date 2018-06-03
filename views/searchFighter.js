function searchFighter(id){
    $.ajax({
        url: '/people/searchPerson/' + id,
        type: 'PUT',
        data: $('#searchPerson').serialize(),
        success: function(result){
			//The line below redirects us back to /people html page
            window.location.replace("./");
        }
    })
};