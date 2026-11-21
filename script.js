const textInput = document.querySelector("#textInput")
const reloadButton = document.querySelector("#reloadButton")
const outPut = document.getElementById("output")
const scaleInput = document.querySelector("#scaleInput")
const charachterSpace = document.querySelector("#spaceInput")
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
                        let i = element.length
                        while (i--){
                            if (element.includes(";BC")){
                                
                                i=-0
                            }if (element.includes(";WR")){
                                var scaled = scale(element)
                                let perfect = scaled.replaceAll(/,/g, "")
                                Gcode += `${perfect} \n`
                                i=-0
                            }
                        }
                        console.log(element)
                        
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
function scale(raw){
    let length = raw.length
    let positions = []
    //raw.split("").forEach((char, index) => {
    //    if(char === "X" || char === "Y" || char === ";"){
    //        positions.push(index)
    //    }
    //});
    console.log(raw)
    let updated = raw.replace(/([XY])\s*([-+]?\d*\.?\d+)/gi, (match, axis, num)=>{
        const scaledValue = Number(num) * scaleInput.value
        let better = `${axis}, ${scaledValue}`
        return  better.replaceAll(" ", "")
    })
    return updated
}