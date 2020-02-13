
$(document).ready(function() { 
   // variable para editar , cambia a true cuando hace click en algun elemento nombre
  let edit = false;

   console.log('funciona JQuery');
   // ocultar task-result(resultados de busqueda) de html
   $('#task-result').hide();
   fetchTasks();
// +++++++++++++++++ EMPIEZA BUSCAR +++++++++++++++++++++++++++++++
    // captura a id search, con el evento keyup(teclado)
   $('#search').keyup(function(e){
      // si se obtiene algun valor de search
      if($('#search').val()){
          
            // val: obtener valor y guardarlo en variable search
    let search = $('#search').val();
    // console.log(search);

//++++++++++++++ CONSULTA AJAX ++ BUSCAR EN BD search ++++++++++++++
    $.ajax ({
      url: 'task-search.php',
      type: 'POST', //ENVIAR
      data: { search },
      success: function(response){
          // console.log(response);
          // convertirlo de string  a un archivo json, a un archivo de objetos
          let tasks = JSON.parse(response);
          let template = '';
          // console.log(tasks);
          tasks.forEach(task => {
            // objetos separados
            // console.log(task);
            template += ` <li>
                  ${task.name} 
                  
                  </li> ` 
          });
          // seleccionar elemento en html y llenarlo con esta plantilla
          $('#container').html(template);
          // mostrar elemento
          $('#task-result').show();

          }  //success funtion 24
      
         });  //fin ajax 21

        } // if search 14

     }); //fin 12 search

// +++++++++++ FORMULARIO +++++++ GUARDAR ++++++++++
     $('#task-form').submit(function(e){
      // console.log('submiting');
      const postData = {
        name: $('#name').val(),
        description: $('#descripcion').val(),
        id: $('#taskId').val()
      };
      // console.log(postData)
      // variable que almacena una condicion en caso de editar o guardar
     let url = edit === false ? 'task-add.php' : 'task-edit.php';
     // console.log(url);
      // jquery usar metodo .post 
      $.post(url, postData, function(response){
        console.log(response);
        // mostrar en tabla
        fetchTasks();
        // limpiar formulario
        $('#task-form').trigger('reset');
      });
       // pagina no se refresque cada vez al hacer enter
      e.preventDefault();

     });
  // ++++++++++++ MOSTRAR DATOS +++++++++++++++++++<<<<<<<< 
  function fetchTasks(){
     // mostrar datos en tabla, se ejecuta al iniciar aplicacion   
      $.ajax({
        url: 'task-list.php',
        type: 'GET',
        success: function(response){
          // console.log(response);
          // variable let
          let tasks = JSON.parse(response);
          // esta tareas se recorrera una a una
          let template ='';
          tasks.forEach(task => {
             template += `
                  <tr taskId="${task.id}">
                    <td >${task.id}</td>
                    <td>
                     <a href="#" class="task-item">${task.name}</a>
                    </td>
                    <td>${task.description}</td>
                    <td>
                       <button class="task-delete btn btn-danger">
                       Delete
                       </button>
                    </td>
                  </tr>
             `
          });
          $('#tasks').html(template);
        }
      });
  }
// <++++++++++++  ELIMINAR ++++++++++++++++++++++++++++++++++++++++++<-<
  // en mi documento escuchar clase task-delete
    $(document).on('click','.task-delete',function(){
     if(confirm('Desea Eliminar tarea')){
       // console.log('hiso clic');
      // console.log($(this));
      // encontrar fila td
      let element = $(this)[0].parentElement.parentElement;
      // dentro de element encontar atributo 
      let id = $(element).attr('taskId');
      // console.log(id);
      $.post('task-delete.php', {id}, function(response){
        // console.log(response);
        fetchTasks();
      })
     }
    });
// seleccionar elemento id para enviar a base y traer demas valores
    $(document).on('click', '.task-item', function (){
      console.log('editando');
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('taskId');
      console.log(id);
      $.post('task-single.php', {id}, function(response){
        // console.log(response);
        const task = JSON.parse(response);
        $('#name').val(task.name);
        $('#descripcion').val(task.description);
        $('#taskId').val(task.id);
        edit = true;
      })
      });
});
