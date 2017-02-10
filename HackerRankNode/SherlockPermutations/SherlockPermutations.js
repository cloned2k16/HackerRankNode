
//  ----------------------------------- --------------------------- --------------------------------
    var SherlockPermutations = {

            Name        : 'SherlockPermutations'
        ,   Version     : '0.0.1' 
    };
//  ----------------------------------- --------------------------- --------------------------------
    var cache_data                      =   [ 1,1,2 ];                                               //     initialization must contain at least 1 value (0)!
    var cache_size                      =   1024;                                                    //     no big deal in space terms!
    var modulo                          =   1e9+7;

    var i,len = cache_data.length;
    for ( i = len ; i<cache_size ; i++ ) {
     cache_data [ i ]= ( ( cache_data [ i-1 ]*i ) % modulo );
    }
//  ----------------------------------- --------------------------- --------------------------------
                                                                        //     javascript precision is just of 2^53 so ..                
       var m=Number(100000007);                                         //     square of 1e8+7 already FAILS! and we need at least to have it working with 1e9+7 (the modulus)
       console.log (m*m,10000001400000049, Math.pow(m,2))               //     look!

       // we may eventually use this method instead!      
       //  AB
       //  CD
       // AC <<32 + (AD+BC) << 16 + BD
        
       //  010000 000007 
       //  010000 000007
      
       //  100000000.0000000
       //          70000.000
       //          70000.000
       //              00049
       //  10000001400000049
//  ----------------------------------- --------------------------- --------------------------------
    var modMultiply                     = (a,b,c)                => {
        if(a<=1000000 && b<=1000000){
            return  ((a%c)*(b%c))%c;
        }
        var ret = 0, a=a%c;
        while(b > 0){
            if(b&1) {
                ret = (ret+a)%c;
            }
            a = (a<<1)%c;
            b>>=1;
        }
        return ret%c;
    }
//  ----------------------------------- --------------------------- --------------------------------
    var modInverse                      = ( a , n )              => {
        var i = n
        ,   v = 0
        ,   d = 1
        ,   t
        ,   x
        ;
        while ( a>0 ) {
            t = (i / a)>>0;
            x = a;
            a = i % x;
            i = x;
            x = d;
            d = v - t*x;
            v = x;
        };
        v %= n;
        if ( v<0 ) v = ( v+n )%n ;
        return v;
    }
//  ----------------------------------- --------------------------- --------------------------------
    var fact_mod                        = ( n )                  => {
        var  i,r,len= cache_data.length;
        if ( n < len ) return cache_data [ n ];
        else {
            r=cache_data [ len-1 ];
            for ( i = len ; i <= n ; i++ ) {
                r = ( r * i ) % modulo ;
            }
            return r;
        }
    }    

//  ----------------------------------- --------------------------- --------------------------------
    SherlockPermutations        .Solution   = (input) => {
        var lines   = input.split(/\r?\n/);                                                                //  split lines either Linux or Windows Style!
        var nT      = lines[0];
        var ln      = 1;
        var n,m,tnr,A,iB;  
        for ( tn = 0 ; tn < nT ; tn++ ) {
            n_m = lines[ln++].split(' ');  
            n   = n_m[0]>>0;
            m   = n_m[1]>>0;
            A   = 0;
            iB  = 0;
            if ( m == 1 ) r = 1;
            else {
              m-=1;
              A  = fact_mod ( n+m );
              iB = modInverse ( modMultiply(  fact_mod ( n ) , fact_mod ( m )  , modulo ) , modulo );
              r = modMultiply(A,iB,modulo);
            }
            console . log ( r );    
        }
    }
//  ----------------------------------- --------------------------- --------------------------------
    module.exports = SherlockPermutations;
//  ----------------------------------- --------------------------- --------------------------------

