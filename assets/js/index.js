
 $("#add_record").submit(function(event){
     //alert("Success");
 })

 $("#update_record").submit(function(event){
     event.preventDefault();

     var unindexed_array = $(this).serializeArray();
     var data = {};

     $.map(unindexed_array, function(n,i){
         data[n['name']] = n['value']
     })

     var request = {
         "url" : `/api/records/${data.id}`,
         "method" : "PUT",
         "data" : data
     }

     $.ajax(request).done(function(response){
         //alert("Success");
         window.location.replace("/");
     })
 })

 if(window.location.pathname == "/"){
     $ondelete = $(".table tbody td a.delete");
     $ondelete.click(function(){
         var id = $(this).attr("data-id")
         var request = {
             "url" : `/api/records/${id}`,
             "method" : "DELETE"
         }
         if(confirm("Remove record?")){
             $.ajax(request).done(function(response){
                 //alert("Success");
                 location.reload();
             })
         }
     })
 }