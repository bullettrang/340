function deleteTeam(id){
    $.ajax({
        url: '/people/team/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};