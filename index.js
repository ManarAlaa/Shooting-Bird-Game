  let go=document.querySelector("input[type=submit]");
  // function nameValidation()
  // {
  //   if (document.querySelector("input[name=name]").value == null)
  //   {

  //   }
  // }
  

  go.onclick = function()
  {
    
      let name = document.querySelector("input[name=name]").value;
      let userName= localStorage.setItem("name",name);
  }

