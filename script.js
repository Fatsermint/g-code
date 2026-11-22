const textInput = document.querySelector("#textInput")
const reloadButton = document.querySelector("#reloadButton")
const outPut = document.getElementById("output")
const scaleInput = document.querySelector("#scaleInput")
const characterSpace = document.querySelector("#spaceInput")
const startPosX = document.getElementById("startPosX")
const startPosY = document.getElementById("startPosY")

let Gcode =""
let num =0

function makeGcode(){
    let Input = textInput.value
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
                                
                                i=-0
                            }if (element.includes(";WR")){
                                let writing = false
                                if (element.includes("Z")){
                                    writing = !writing
                                }
                                
                                UpdateDemo(element, writing)
                                let scaled = scale(element)
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
                 Gcode += `G0 X${characterSpace.value} ;BC \n`
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
function addStart(){
    Gcode += `G28`
    Gcode += `G0 X${startPosX.value} Y${startPosY.value} \n`
    Gcode += `G0 Z10 \n`
    
    Gcode += `G91 \n`

}

function UpdateDemo(txt, penDown){
    let relPosX = 0
    let relPosY = 0

    let Xpos
    let Ypos
    if (txt ==null) return
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    console.log(txt)
    let positions = []
    txt?.split("").forEach((char, index) => {
        if(char === "X" || char === "Y" || char === ";"){
            positions.push(index)
        }
    });

    if (positions.length >= 3){
        Xpos = txt.slice(positions[0]+1, positions[1]-1)
        Ypos = txt.slice(positions[1]+1, positions[2]-1)
    }else{
        return
    }


    console.log(Xpos, Ypos)
    if (penDown == true){
        alert("i")
        ctx.beginPath()
        ctx.moveTo(relPosX, relPosY)
        ctx.lineTo(10, 100)
 

        ctx.lineTo(Xpos, Ypos)
        ctx.stroke()


    }else{
        relPosX += Xpos
        relPosY += Ypos
        alert("haha")


    }
    ctx.stroke()

}