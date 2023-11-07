<!DOCTYPE html>
<html lang="es">
    <!DOCTYPE html>
    <html lang="es">    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width">
            <title>Encriptador</title>
            <link rel="stylesheet" href="reset.css">
            <link rel="stylesheet" href="style.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
        </head>
        <body>

            <header>
                <img class="banner" src="LOGO.png64">
                
            </header>

            <main>

                <div class="container">
                    <div class="encrypted-media">
                        <form class="input" id="myinput">
                            <textarea type="text" id="encriptar" rows="20" placeholder="Ingrese el texto aqui"></textarea>
                           
                            
    
    
                        </form> 
                        
                        <p>&#9888 Solo letras minusculas sin acento</p>
                        
                        <section class="submits">
        
                                                <button class="ss" type="submit"  form="myinput" id="encript" onclick="showTextModified(event)">Encriptar</button>
                                                <button class="ss" type="submit"  form="myinput" id="unencript" onclick="showTextToBack(event)" >Desencriptar</button>
        
                        </section>
                        
    
                    </div>
    
                    <div class="result" >
                        <p id="result2">Ningún mensaje fue encontrado <br/> <br/>Ingresa el texto que desees encriptar o desencriptar</p>
                        <button id="copyButton" onclick="copyText()">Copiar</button>
                    </div>

                </div>
                <script>
                    var input = document.getElementById("encriptar");
                    var button = document.getElementById("encript");
                    var modifiedText = document.getElementById("result2");
                    var copyButton = document.getElementById("copyButton");

                    var valor;

                    function showTextModified(event){
                        event.preventDefault();
                        valor = input.value;
                        var text = valor;
                        valor = "";
                        for(var i = 0 ; i < text.length ; ++i){
                            if(text[i] == 'a'){
                                valor += "ai";
                            }else if(text[i] == 'e'){
                                valor += "enter";
                            }else if(text[i] == 'i'){
                                valor += "imes";
                            }else if(text[i] == 'o'){
                                valor += "ober";
                            }else if(text[i] == 'u'){
                                valor += "ufat";
                            }else{
                                valor += text[i];
                            }
                            
                            
                        }
                        copyButton.style.display = "block";
                        modifiedText.textContent = valor;
                    }

                    function showTextToBack(event){
                        event.preventDefault();
                        valor = input.value;
                        var text = valor;
                        text = valor.replace(/ai/g, "a");
                        text = text.replace(/enter/g, "e");
                        text =text.replace(/imes/g, "i");
                        text = text.replace(/ober/g, "o");
                        text = text.replace(/ufat/g, "u");

                        copyButton.style.display = "block";
                        modifiedText.textContent = text;
                    }
                    
                    function copyText(){
                        var textToCopy = modifiedText.textContent;

                        // Copiar el texto al portapapeles
                        navigator.clipboard.writeText(textToCopy)
                        .then(() => alert("Texto copiado con éxito"))
                        .catch(err => console.error("Error al copiar el texto: ", err));
                    }


                </script>


            </main>
    
    
            <footer>
               
            </footer>
    
            
            
            
            
            
    
        </body> 
    </html>
     


</html>