'use strict';
//  ----------------------------------- --------------------------- --------------------------------
    var fs                      = require('fs');
//  ----------------------------------- --------------------------- --------------------------------
    var SherlockPairs           = require('./SherlockPairs');
    var SherlockPermutations    = require('./SherlockPermutations');
//  ----------------------------------- --------------------------- --------------------------------
    String.prototype.splitLines = function ()  { return this.split(/\r?\n/); }                      //  !!
//  ----------------------------------- --------------------------- --------------------------------
    var Fake                    = {
        Name                    :   'Fake'
    ,   version                 :   'NONE'
    ,   Solution                :   (input)  => { console.log("Sorry.. I'm not supposed to solve anything!")}
    }
//  ----------------------------------- --------------------------- --------------------------------
    var Solution                = Fake;
    var EOT                     = 4;
//  ----------------------------------- --------------------------- --------------------------------
    var processData             = (input) =>  {
        console.log('using: '+Solution.Name);
        var console_log             = console.log;
        var res="";  
        console.log = function (r) {
         res+=r+"\n";
        } 
        Solution.Solution(input);
        if (res.length>0) res=res.substring(0,res.length-1);
        console.log=console_log;
        return res;
    }
//  ----------------------------------- --------------------------- --------------------------------
    Solution = SherlockPairs;
    //Solution = SherlockPermutations;
//  ----------------------------------- --------------------------- --------------------------------
    fs.readFile('input00.txt', 'utf8', (err,data) => {
        if (err) {
            console.log("Error: "+err);
            return -1;
        }
        
        var res=processData(data);

        fs.readFile( 'output00.txt', 'utf8', ( errd, data ) => {
            if ( err ) {
                console.log("Error: "+err);
                return -1;
            }
            var outLines=data.splitLines();
            var resLines=res.splitLines();
            var outN=outLines.length;
            var resN=resLines.length;
            if ( outN !=  resN ) {
                console.log("Error: different result lines: "+outN+" != "+resN);
                console.log("["+res+"]");
                return;
            }   
            var errAny=false;
            for ( var ln = 0; ln < outN; ln++ ) {
                if ( outLines[ln] != resLines[ln] ) {
                    errAny=true;
                    console.log("res n."+(ln+1)+" ERROR ("+outLines[ln]+" != "+resLines[ln]+")");
                }     
            }
            if (! errAny) console.log ("SUCCESS!");
        });
     });

//  ----------------------------------- --------------------------- --------------------------------
//  ----------------------------------- --------------------------- --------------------------------
//  Interactive mode!
//  ----------------------------------- --------------------------- --------------------------------
/*  
    var _input                  = "";
    process.stdin.resume        ();
    process.stdin.setEncoding   ("ascii");
   
    process.stdin.on            ("data", (input) => {
        if ( input.charCodeAt(0) == EOT ) {                                                             //  windows doesn't catch EOT !!
            var res=processData(_input);
            console.log(res);
        }    
        else _input += input;
    });

    process.stdin.on            ("end", () => {                                                         //  useless on windows (see above)
        var res=processData(_input);
        console.log(res);
    });
*/
//  ----------------------------------- --------------------------- --------------------------------
