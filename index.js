var https = require("https");
var fs = require("fs");
process.argv.shift();
process.argv.shift();
var arg = process.argv;
var exit = process.exit;
if(arg.length == 0){
  console.error("Missing arguments");
  exit(1);
}else{
  if(arg[0] == "help" || arg[0] == "h"){
    console.log(`OPM v1.0.0
 - install <name> / i <name>
   Install package
 - help / h
   Display help`);
    exit(0);
  }else if(arg[0] == "install" || arg[0] == "i"){
    if(!arg[1]){
      console.error("Missing argument: <name>");
      exit(1);
    }
    console.log("    Connecting...");
    https.get("https://library.theforarkld.repl.co/" + arg[1] + ".oba",(res)=>{
      console.log("\x1b[1A\x1b[1M\x1b[41m\x1b[30m\x1b[1m √ \x1b[m Connected!");
      if(res.statusCode != 200){
        console.log("\x1b[43m\x1b[30mERR\x1b[m Package not found!");
        exit(1);
      }
      var d = "";
      res.on("data",c=>{
        d+=c;
      }).on("end",()=>{
        console.log("\x1b[41m\x1b[30m\x1b[1m √ \x1b[m Done!");
        console.log(`Name    : ${arg[1]}
Filename: ${arg[1].split(/\/|\\/g).pop()}.oba`);
        fs.writeFileSync(arg[1].split(/\/|\\/g).pop() + ".oba",d);
        exit(0);
      });
    }).on("error",()=>{
      
    });
  }
}