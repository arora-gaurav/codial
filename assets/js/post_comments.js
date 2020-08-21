{
    // Method to submit the form data for new comment using AJAX
    function createComment(newCommentForm){
        //let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    let newComment = newCommentDOM(data.data.comment);
                    $(`#post-comment-${data.data.comment.post}`).prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
                    console.log($(' .delete-comment-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment Created",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //Method to create a new comment in DOM
    let newCommentDOM = function(comment){
        return $(`<li id="comment-${ comment._id }">
                    <p>
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">X</a>
                        </small>
                        ${ comment.content }
                        <br>
                        <small>
                        ${ comment.user.user }
                        </small>
                </p>
                </li>`);
    }

    //Method to delete a comment from Post
    let deleteComment = function(deleteLink){
        
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log('prevented');
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let convertCommentsToAJAX = function(){
        let all_Posts = $('.all-posts');
        for(let p of all_Posts){
            let postId = $(p).attr('id').split("-")[1];
            let newCommentForm = $(`#post-${postId}-comments-form`);
            createComment(newCommentForm);
            
            $(' .delete-comment-button', p).each(function(){
                deleteComment(this);
            });
            
        }
    }

    convertCommentsToAJAX();

}
