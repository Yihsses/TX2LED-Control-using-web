
const child_process = require('child_process');
const express = require("express") ; 
const app = express() ; 


app.use(express.static('./public')) ; 

app.get("/shine" , (req,res) => {
   console.log( req.query["on_off"]) ;
    for(var i = 1 ; i < 5 ; i++){
        if(req.query["LED" + i.toString()] != undefined){
            controlLED("LED" + i.toString() , req.query["on_off"]) ;
        }
    }
})
app.get("/switch" , (req,res) => {
   // console.log(req.query["switch_number"]); 
    Mode_Shine(req.query["switch_number"]) ; 
 })


function controlLED(LED,POWER){
    let process = child_process.execFile('sudo',["/home/nvidia/hw2/L2Program",LED,POWER]) ; 
    process.stdout.on('data' , (data) => {
        console.log(`stdout: ${data}`); 
    })
    process.stderr.on('data' , (data) => {
        console.log(`stdout: ${data}`); 
    })
}
function Mode_Shine(Time){
    let process = child_process.execFile('sudo',["/home/nvidia/hw2/L2Program" , "Mode_Shine",Time]) ; 
    process.stdout.on('data' , (data) => {
        console.log(`stdout: ${data}`); 
    })
    process.stderr.on('data' , (data) => {
        console.log(`stdout: ${data}`); 
    })
}
const PORT = process.env.PORT || 8080; 
app.listen(PORT , () =>{
    console.log('Server is running on port ${PORT}.') ; 
})