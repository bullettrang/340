function deletePromotion(id){
    $.ajax({
        url: '/people/promotion/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};