class ToggleFriendship{constructor(t){this.toggler=t,this.toggleFriendship()}toggleFriendship(){$(this.toggler).click((function(t){t.preventDefault();let e=this;$.ajax({type:"POST",url:$(e).attr("href")}).done((function(t){1==t.data.removed?$(e).html("Add"):$(e).html("Remove")})).fail((function(t){console.log("Error in completing the request",t)}))}))}}