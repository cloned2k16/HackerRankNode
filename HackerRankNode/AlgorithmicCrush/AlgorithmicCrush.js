//  ----------------------------------- --------------------------- --------------------------------
    var AlgorithmicCrush                = {

            Name        : 'AlgorithmicCrush'
    ,       Version     : '0.0.1' 
    };
//  ----------------------------------- --------------------------- --------------------------------
//   3 <= N <= 1e7
//   1 <= M <= 1*1e5
//   1 <= a <= b <= N
//   0 <= k <= 1e9

    AlgorithmicCrush    .Solution       = (input)               =>  {

        var lines= input.split(/\r?\n/);                                                                //  split lines either Linux or Windows Style!
        var NM=lines[0].split(' ');
        var N=NM[0]>>0;
        var M=NM[1]>>0;

        var n,pos=1;
        var aa = new Array(N+1).fill(0);

        for (n = 0; n < M; n++) {
            var abk=lines[pos++].split(' ');
            var a=abk[0]>>0;
            var b=abk[1]>>0;
            var k=abk[2]>>0;
            
            aa [a    ] +=k;
            aa [b + 1] -=k;  
        }

        var max = aa[0];
        for ( n = 1; n <= N; n++) {
            var v = aa[n - 1] + aa[n];
            aa[n] = v;
            if (v>max) max = v;
        }
        
        console.log(max);

    }
//  ----------------------------------- --------------------------- --------------------------------
    module.exports = AlgorithmicCrush;
//  ----------------------------------- --------------------------- --------------------------------
