class ToggleFriendship{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriendship();
    }

    toggleFriendship(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
                
            })
            .done(function(data){
                if(data.data.removed == true){
                    $(self).html('Add');
                } else{
                    $(self).html('Remove');
                }
            })
            .fail(function(errData){
                console.log('Error in completing the request', errData);
            })
        });
    }

}