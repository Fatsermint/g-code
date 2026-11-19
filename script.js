const textInput = document.querySelector("#textInput")
const reloadButton = document.querySelector("#reloadButton")
const outPut = document.getElementById("output")
let Gcode =""
let num =0
function makeGcode(){
    let Input = textInput.value
    Gcode =""
    fetch("./g-codeForLetters.json")
        .then((response)=> response.json())
        .then((data) =>{
            for (const char of Input){
                if (Object.hasOwn(data, char)){
                    data.array.forEach(element => {
                        
                    
                        Gcode += `${data[char][num]} aaaaa \n`
                        console.log(Gcode)
                        showOnParagraph()
                        num +=1
                    });
                }
            }
            num =0
        })
    

}
reloadButton.addEventListener("click", makeGcode)
function showOnParagraph(){
    alert(Gcode)

    document.getElementById("output").innerHTML = Gcode

}