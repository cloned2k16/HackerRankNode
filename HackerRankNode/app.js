'use strict';
//  ----------------------------------- --------------------------- --------------------------------
    var fs                              = require ('fs');
    var w4it                            = require ('w4it');
    var leftPad                         = require ('left_pad');
//  ----------------------------------- --------------------------- --------------------------------
    var SherlockPairs                   = require ('./SherlockPairs/SherlockPairs');
    var SherlockPermutations            = require ('./SherlockPermutations/SherlockPermutations');
    var AlgorithmicCrush                = require ('./AlgorithmicCrush/AlgorithmicCrush');
//  ----------------------------------- --------------------------- --------------------------------
    String.prototype.splitLines         = function ()  { return this.split(/\r?\n/); }                      //  !!
//  ----------------------------------- --------------------------- --------------------------------
    var Fake                            = {
        Name                            :   'Fake'
    ,   version                         :   'NONE'
    ,   Solution                        :   (input)  => { console.log("Sorry.. I'm not supposed to solve anything!")}
    }
//  ----------------------------------- --------------------------- --------------------------------
    var Solution                        = Fake;
    var EOT                             = 4;
//  ----------------------------------- --------------------------- --------------------------------
    var processData                     = (input) =>  {
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
    var procQueue                       = [];   
    var procQuInProg                    = false;
    var queueProcess                    = (solutionObj, tstNN, data , callBack)     => {
        var pair = { d: data , f: callBack, o: solutionObj , n: tstNN };
        procQueue.push(pair);
        if (!procQuInProg) doProcessQueue();
    }
    
    var _log                            = function () {  Function.prototype.apply.apply(console.log   , [console, arguments]); }
    var _err                            = function () {  Function.prototype.apply.apply(console.error , [console, arguments]); }

    var doProcessQueue = () => {
        procQuInProg=true;
        while ( procQueue.length > 0 ) {
           var runTest  =   procQueue[0];
           var data     =   runTest.d;
           var cb       =   runTest.f;
               Solution =   runTest.o;
           var res      =   processData(data);
           cb(runTest,res); 
           procQueue.shift();
        }  
        procQuInProg=false;
    }

//  ----------------------------------- --------------------------- --------------------------------
    var doTest                          = (solutionObj, tstList) => {
        var nT=tstList.length;
        for (var tn=0; tn < nT; tn++) {
            var tstNN=leftPad(tstList[tn],2,'0');
            (function (tstNN,solutionObj) {
                var inFile =solutionObj.Name+'/input' +tstNN+'.txt';
                fs.readFile(inFile, 'utf8', (err,data) => {
                    if (err) {
                        _err("Error: "+err);
                        return;
                    }

                 queueProcess(solutionObj, tstNN, data, function (runTest,res){ 

                    var outFile=solutionObj.Name+'/output'+tstNN+'.txt';
                    fs.readFile( outFile, 'utf8', function ( err, data ) {
                        if ( err ) {
                            _err("Error: "+err);
                            return;                        
                        }
                        var outLines=data.splitLines();
                        var resLines=res.splitLines();
                        var outN=outLines.length;
                        var resN=resLines.length;
                        if ( outN !=  resN ) {
                            _err("Error: different result lines: "+outN+" != "+resN);
                            _err("["+res+"]");
                            return;
                        }   
                        var errAny=false;
                        for ( var ln = 0; ln < outN; ln++ ) {
                            if ( outLines[ln] != resLines[ln] ) {
                                errAny=true;
                                _err("res n."+(ln+1)+" ERROR ("+outLines[ln]+" != "+resLines[ln]+")");
                            }     
                        }
                        if (! errAny) _log ("["+runTest.n+"]."+runTest.o.Name+" SUCCESS!");
                    });
                 });
                });
            })(tstNN,solutionObj);
        }
    }
//  ----------------------------------- --------------------------- --------------------------------
//  Interactive mode!
//  ----------------------------------- --------------------------- --------------------------------
    var runInteractive                  = () =>                     {
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
    }
//  ----------------------------------- --------------------------- --------------------------------
//  ----------------------------------- --------------------------- --------------------------------
//  MAIN ------------------------------
//  ----------------------------------- --------------------------- --------------------------------
    var main                            = () =>                     {
        //Solution=SherlockPairs;
        //runInteractive();

        doTest (SherlockPairs           , [ 0 ,3  ] );
        doTest (SherlockPermutations    , [ 0  ] );
        doTest (AlgorithmicCrush        , [ 7  ] );

       
    }
//  ----------------------------------- --------------------------- --------------------------------
    main();
