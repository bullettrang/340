function updateChampion(id){
    $.ajax({
        url: '/people/champion/' + id,
        type: 'PUT',
        data: $('#update-champion').serialize(),
        success: function(result){
            //The line below redirects us back to /people html page
            window.location.replace("/people/");
        }
    })
};