

$('#add_user').submit(function(event){
    alert("Data inserted successfully");
})

$('#update_user').submit(function(event){
    event.preventDefault();

    let unindexed_arr = $(this).serializeArray();
    let data = {};
    
    $.map(unindexed_arr, function(arr, i){
        data[arr['name']] = arr['value']
    })
    console.log(unindexed_arr);


    let updateReq = {
        "url": `http://localhost:3000/api/crudapp/${data.id}`,
        "method": 'PUT',
        "data": data
    }
    $.ajax(updateReq).done(function(response){
        alert("Data updated successfully")
    })
})

//To delete user using delete request logic
if(window.location.pathname == '/'){
    $ondelete = $('.table tbody td a.delete');
    $ondelete.click(function(){
        let id = $(this).attr("data-id")

        let updateReq = {
            "url": `http://localhost:3000/api/crudapp/${id}`,
            "method": 'DELETE'
        }

        //user permission to delete request
        if(confirm("Do you really want to delete this record?")){
            //call the ajax request
            $.ajax(updateReq).done(function(response){
                alert("Data deleted successfully")
                //reload the browser after
                location.reload()
            })
        }

    })
}