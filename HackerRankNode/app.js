'use strict';

    var EOT         = 4;
    var _input      = "";

    var processData =   (input) =>  {
        console.log(input);
    }

    process.stdin.resume        ();
    process.stdin.setEncoding   ("ascii");
   
    process.stdin.on            ("data", (input) => {
        if ( input.charCodeAt(0) == EOT ) {                                                             //  windows doesn't catch EOT !!
            processData(_input);
        }    
        else _input += input;
    });

    process.stdin.on            ("end", () => {                                                         //  useless on windows (see above)
        processData(_input);
    });


