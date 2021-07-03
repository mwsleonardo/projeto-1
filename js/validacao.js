
// VALIDAÇÃO

const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
    function verifyErrors() {
        let foundError = false;

        for(let error in field.validity) {
            if (field.validity[error] && !field.validity.valid ) {
                foundError = error
            }
        }
        return foundError;

        
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "*Campo obrigatório"
            },
        
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")
        
        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "grey"
            setCustomMessage()
            

        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation();
   
}

for( field of fields ){
    field.addEventListener("invalid", event => { 
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}


document.querySelector("form")
.addEventListener("submit", event => {
    console.log("enviar o formulário")
    event.preventDefault();
    cadastrar()
    

});


// EXTRATO

var resultado=0.00;
var result="0,00";
var transacao=[];

function cadastrar(){
    if(field != "invalid"){
        var selecao=document.getElementById("transacao")
        var opcao=selecao.options[selecao.selectedIndex].value;
        var nome_produto=document.getElementById("mercadoria").value;
        var valor_produto =document.getElementById("valor").value;
        
    
        if(opcao=="compra"){
         valor_produto=valor_produto.replace(".","");
            valor_produto=valor_produto.replace(",",".");
            resultado=resultado-parseFloat(valor_produto); 
            document.getElementById("mercadoria").value="";
            document.getElementById("valor").value="";
            
                    
        }else{
          
            valor_produto=valor_produto.replace(".","");
            valor_produto=valor_produto.replace(",",".");
            resultado=resultado+parseFloat(valor_produto); 
            document.getElementById("mercadoria").value="";
            document.getElementById("valor").value="";
          }
          
         
    
          transacao.push({nome:nome_produto,valor:valor_produto,tipo:opcao});
          localStorage.setItem("transacao", JSON.stringify(transacao));
          localStorage.setItem("resultado",resultado);
    
      
         result=localStorage.getItem("resultado").toLocaleString('pt-br', {minimumFractionDigits: 2});
        
        if(result<0){
            
            document.getElementById("resultado").innerHTML="R$"+result+"<br />[PREJUIZO]";
            
        }else{
         
            document.getElementById("resultado").innerHTML="R$"+result+"<br />[LUCRO]";
           
        }
        
        listaTransacao();

    }
    

}


function listaTransacao(){
    if(JSON.parse(localStorage.getItem("transacao"))!=null){
    
  transacao=JSON.parse(localStorage.getItem("transacao"));
    
    document.getElementById("produtos").innerHTML=transacao.map((tra) => {
      if(tra.tipo=="compra"){
        return " <div class='linha-borda'></div><div class='produto'><div class='coluna-produto'>-"+tra.nome+"</div><div class='coluna-produto'>R$"+tra.valor+"</div></div>";
       
      }else{
        return " <div class='linha-borda'></div><div class='produto'><div class='coluna-produto'>+"+tra.nome+"</div><div class='coluna-produto'>R$"+tra.valor+"</div></div>";
      }
      
     }).join("");
  
     result=localStorage.getItem("resultado");
      
  
     if(result<0){
         
       document.getElementById("resultado").innerHTML="R$"+result+"<br />[PREJUIZO]";
       
   }else {
    
        document.getElementById("resultado").innerHTML="R$"+result+"<br />[LUCRO]";
      
   }
  
  
    
    }
  
   
    
  }
  
  listaTransacao();
  















// MASK

function formatarMoeda() {
    var elemento = document.getElementById('valor');
    var valor = elemento.value;

    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    elemento.value = valor;
    if(valor == 'NaN') elemento.value = '';
}

// EXTRATO

function limpar(){
    var escolha= confirm("Tem certeza que deseja limpar o extrato de transações?");
     if(escolha==true){
       localStorage.clear();
       window.location.reload();
     }
       
   }