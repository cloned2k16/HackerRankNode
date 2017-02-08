//  ----------------------------------- --------------------------- --------------------------------
    var SherlockPairs                   = {

            Name        : 'SherlockPairs'
    ,       Version     : '0.0.1' 
    };
//  ----------------------------------- --------------------------- --------------------------------
    var getPairs                        = (a)                   =>  {
        var sum = 0;
        var len = a.length;
        for (var i = 1; i < len; i++) {
            var c = 1;
            var p = a[i - 1], p1;
            while (i < len && (p1 = a[i]) == p) {
                c++;
                p = p1;
                i++;
            }
            sum += (c * (c - 1));
        }
        return sum;        
    }
//  ----------------------------------- --------------------------- --------------------------------
    SherlockPairs       .Solution       = (input)               =>  {
        var lines= input.split(/\r?\n/);                                                                //  split lines either Linux or Windows Style!
        var nt=lines[0];
        var pos=1;
        var res=""
        for (var tn = 0; tn < nt; tn++) {
            var N=lines[pos++];
            var A=lines[pos++].split(' ');
            A.sort();
            var r=getPairs(A);
            console.log(r);
        }
    }
//  ----------------------------------- --------------------------- --------------------------------
    module.exports = SherlockPairs;

