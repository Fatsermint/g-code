const textInput = document.querySelector("#textInput")
const reloadButton = document.querySelector("#reloadButton")
const outPut = document.getElementById("output")
const scaleInput = document.querySelector("#scaleInput")
const characterSpace = document.querySelector("#spaceInput")
const startPosX = document.getElementById("startPosX")
const startPosY = document.getElementById("startPosY")
const calibrate = document.querySelector("#calibrateCheckBox")
let Gcode =""
let num =0

function makeGcode(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let Input = textInput.value
    relPosX = parseFloat(startPosX.value)
    relPosY = parseFloat(startPosY.value)

    Gcode =""
    addStart()
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
                                UpdateDemo(element)
                            }
                            
                            if (element.includes(";WR")){
                                UpdateDemo(element)
                                let scaled = scale(element)
                                let perfect = scaled.replaceAll(/,/g, "")
                                Gcode += `${perfect} \n`
                                i=-0
                            }
                        }
                        
                        
                        num = num + 1
                    });
                    num = 0
                }
                 Gcode += `G0 X${characterSpace.value} Y0 ;BC \n`
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
    console.log(raw)
    let updated = raw.replace(/([XY])\s*([-+]?\d*\.?\d+)/gi, (match, axis, num)=>{
        const scaledValue = Number(num) * scaleInput.value
        let better = `${axis}, ${scaledValue}`
        return  better.replaceAll(" ", "")
    })
    return updated
}
function addStart(){
    if (calibrate.checked == true){
        Gcode += `G28 \n`
    }
    Gcode += `G0 X${startPosX.value} Y${startPosY.value} \n`
    Gcode += `G0 Z10 \n`
    Gcode += `G91 \n`

}
let Xpos = 0
let Ypos = 0
let relPosX = 0
let relPosY = 0
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let writing = false

function UpdateDemo(txt){
    

    console.log(txt.includes("Z"))
    if (txt.includes("Z-10")){
        writing = true
    }
    if (txt.includes("Z10")){
        writing = false
    }


    let positions = []
    txt?.split("").forEach((char, index) => {
        if(char === "X" || char === "Y" || char === ";"){
            positions.push(index)
        }
    });

    if (positions.length >= 3){
        Xpos = txt.slice(positions[0]+1, positions[1]-1)
        Ypos = txt.slice(positions[1]+1, positions[2]-1)
    }
    


    console.log("", Xpos, Ypos)
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.moveTo(relPosX, relPosY)
    //ctx.lineTo(200, 20)
    relPosX += parseFloat(Xpos) 
    relPosY += parseFloat(Ypos)
    if (writing == true){
        ctx.lineTo(relPosX, relPosY)

    }
    ctx.stroke()
}