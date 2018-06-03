function searchFighter(id){
    $.ajax({
        url: '/people/searchPerson/' + id,
        type: 'PUT',
        data: $('#searchPerson').serialize(),
       success: function(result){
            window.location.reload(true);
        }
    })
};