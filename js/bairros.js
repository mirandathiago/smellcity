var Bairro = function(nome){
             
    this.nome =  nome;
    this.w = 0;
    this.h = 0;
    this.bairros = {};
    this.predios = {};
            
    this.adicionar = function(classe,pacotes){
                
        if( !this.bairros[pacotes[0]] ){
            var bairro = new Bairro(pacotes[0]);
            this.bairros[pacotes[0]] =  bairro;     
        }
               
        if(pacotes.length == 2){
            var predio = new Predio(classe);
            predio.atualizarMedidas();
            this.bairros[pacotes[0]].predios[pacotes[1]] = predio;
            return;
        }    
                 
        restante = pacotes.splice(1);
        this.bairros[pacotes[0]].adicionar(classe,restante);
                 
    }
             
    this.plotar = function (nivel, pai){
    
        if(_.values(this.bairros).length == 0){
            var bairro = this.criarBairro(nivel,pai);
            var predios = _.values(this.predios);
            for(var i=0; i<predios.length; i++){
                predios[i].plotar(nivel, bairro);
                numeroclasses++;
            }
                
        } else{
                    
            var bairro = this.criarBairro(nivel,pai);
            var predios = _.values(this.predios);

            for(var i=0; i<predios.length; i++){
                predios[i].plotar(nivel, bairro);
                numeroclasses++;
            }
                    
            var bairros = _.values(this.bairros);
            nivel = nivel+1;

            for(var i=0; i<bairros.length; i++){
                bairros[i].plotar(nivel, bairro);
                numeropacotes++;
            }
    
                 
        }  
    }
            
            
    this.criarBairro = function(nivel,pai){
               
        var geometry = new THREE.BoxGeometry(this.w-30,nivel*5,this.h-30);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,0));
    
        var cor = gerarCor("727272",(nivel/10));;
        var material = new THREE.MeshBasicMaterial({ color: cor});
    
        var bairro = new THREE.Mesh(geometry, material);
    
        bairro.position.z = this.fit.y;
        bairro.position.x = this.fit.x;
        bairro.position.y = nivel*5;
        bairro.scale.set(1,1,1);
        bairro.name = this.nome;
        
        var classes = _.values(this.predios);
        var subpacotes = _.values(this.bairros);
        
        bairro.conteudo = "<h3>Pacote: "+ this.nome+"</h3> Classes: "+classes.length+"<br>Sub-Pacotes: "+subpacotes.length;

        var edges = new THREE.EdgesGeometry( geometry );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 1 } ) ); 
        line.position.z = this.fit.y;
        line.position.x = this.fit.x;  
        line.position.y = nivel*5; 
        bairro.add(line);
        pai.add(bairro,line);
                
        objetos.push(bairro);
                
        return bairro;
                
                
    }

        this.calcularPosicoes = function(){
             
        if( _.values(this.bairros).length == 0 ){
             this.calcularBin();     
        }else{
                
            var bairros = _.values(this.bairros);
            for(var i=0; i<bairros.length; i++){
                bairros[i].calcularPosicoes();
            }
                
            this.calcularBin();    
        } 
             
    }   
         
    this.calcularBin = function(){

        var itens = _.values(this.bairros).concat(_.values(this.predios));
        itens.sort(function( a, b ) { return b.w - a.w; } );

        var packer = new GrowingPacker();
        packer.fit(itens);      
        this.w = packer.root.w+30;
        this.h = packer.root.h+30;
        this.ajustarPosicoes();
                         
    }
                                
                
    this.ajustarPosicoes = function(){
        var itens = _.values(this.predios).concat(_.values(this.bairros))
        
        for(var i = 0; i < itens.length; i++){
            var elemento = itens[i];
            if(elemento.fit){
                elemento.fit.y = elemento.fit.y -(this.h/2) + (elemento.h/2) + 12;
                elemento.fit.x = elemento.fit.x - (this.w/2) + (elemento.w/2) + 12; 
            }
        }
        
    }

    

             
                                       
}