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
            
            for (let char of Input){
                let com = data[char][0].split(",")
                if (Object.hasOwn(data, char)){
                    com.forEach(element => {
                        console.log(element)
                        Gcode += `${element} \n`
                        num = num + 1
                    });
                    num = 0
                }
            }
            
            showOnParagraph()
        })
    

}
reloadButton.addEventListener("click", makeGcode)
function showOnParagraph(){
    alert(Gcode)

    document.getElementById("output").innerText = Gcode

}