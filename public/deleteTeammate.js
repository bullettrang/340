function deleteTeammate(id){
    $.ajax({
        url: '/people/teamRoster/' + id,
        //type delete refers to router.delete
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};