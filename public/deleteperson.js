function deletePerson(id){
    $.ajax({
        url: '/people/' + id,
        //type delete refers to router.delete
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};