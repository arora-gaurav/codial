class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
        //console.log('Value of this in constructor', this);
    }

    toggleLike(){
        //console.log('Value of this in toggle like', this);
        $(this.toggler).click(function(e){
            e.preventDefault();
            //console.log('Value of this in toggle like', this);
            let self = this;
            //This is new way of writing AJAX, looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
                
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted == true){
                    likesCount -= 1;
                } else{
                    likesCount += 1; 
                }
                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);
            })
            .fail(function(errData){
                console.log('Error in completing the request', errData);
            })
        });
    }

}