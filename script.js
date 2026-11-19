const textInput = document.querySelector("#textInput")
const reloadButton = document.querySelector("#reloadButton")
const outPut = document.querySelector("#output")
function makeGcode(){
    let Input = textInput.value
    let Gcode = ""
    fetch("./g-codeForLetters.json")
        .then((response)=> response.json())
        .then((data) =>{
            for (const char of Input){
                if (Object.hasOwn(data, char)){
                    Gcode += `${data[char][0]} \n`
                    console.log(Gcode)
                    showOnParagraph()
                }
            }
        })
    

}
reloadButton.addEventListener("click", makeGcode)
function showOnParagraph(){
    
    outPut.innerHTML = ""
}