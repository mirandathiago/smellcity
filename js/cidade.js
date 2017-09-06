var Cidade = function(){
             
    this.bairros = {};
    this.predios = {};
    this.w = 0;
    this.h = 0;
          
    
    this.processarDados = function(dados,dadosadicionais){
        var self = this;
        dados.forEach(function(classe){
            console.log(classe);
            self.add(classe);
        });
    }
    
    
    this.add = function(classe){
                 
        if(classe.classes[0]){    
                    
            var pacotes = classe.classes[0].name.split('.');
                   
            if( !this.bairros[pacotes[0]] ){
                var bairro = new Bairro(pacotes[0]); 
                this.bairros[pacotes[0]] = bairro;
            }
                    
            restante = pacotes.splice(1);
            this.bairros[pacotes[0]].adicionar(classe,restante);
                      
      
        }
              
    }
             
    this.plotar = function(scene){
    
        var geometry = new THREE.BoxGeometry(this.w,10,this.h);
        var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0.5, 0.5, 0.5));
        
        var objcidade = new THREE.Mesh(geometry, material);
        objcidade.position.set(0,0,0);
        objcidade.scale.set(1,1,1);
        
        var geo = new THREE.EdgesGeometry( geometry );
        var mat = new THREE.LineBasicMaterial( { color: 0xCCCCCC, linewidth: 2 } );
        var wireframe = new THREE.LineSegments( geo, mat );

        scene.add( wireframe );
        objcidade.name = "cidade"

        this.plotarBairros(objcidade);
                    
        objetos.push(objcidade);

        scene.add(objcidade);
                    
       // return objcidade;
    }

             
    this.plotarBairros = function(cidade){
        var bairros = _.values(this.bairros); 
                 
        for(var i=0; i<bairros.length; i++){
            bairros[i].plotar(2,cidade);  
            numeropacotes++;
        }

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