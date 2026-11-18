const textInput = document.querySelector("#textInput")
const reloadButton = document.querySelector("#reloadButton")

function makeGcode(){
    let Input = textInput.value
    let Gcode = ""
    fetch("./g-codeForLetters.json")
        .then((response)=> response.json())
        .then((data) =>{
            for (const char of Input){
                if (Object.hasOwn(data, char)){
                    Gcode += `${data[char]}`
                    console.log(Gcode)
                }
            }
        })
    

}
reloadButton.addEventListener("click", makeGcode)
