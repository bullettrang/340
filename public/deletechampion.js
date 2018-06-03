function deleteChampion(id){
    $.ajax({
        url: '/people/champion/' + id,
        //type delete refers to router.delete
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};