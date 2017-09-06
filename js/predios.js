var Predio = function(classe){
             
    this.nome =  classe.classes[0].name;
    this.pacote = classe.package;
    this.w = 0;
    this.h = 0;
    this.altura = 0;                         
    this.atributos = classe.classes[0];  
    this.objeto;
             
    this.getMetrica = function(metrica){
        
        if(this.atributos){
            for(var i =0; i<=this.atributos.metrics.length; i++){
                if(this.atributos.metrics[i].metric == metrica){
                    return this.atributos.metrics[i].value;
                }
            }
        }

                 
    }
             
             
    this.atualizarMedidas = function(){
               
        this.w = this.getMetrica('NOM')+100;
        this.h = this.getMetrica('WMC')+100;  
        this.altura =  this.getMetrica('LOC')+55;   
    } 
         
    this.setPosicionamento = function(nivel){
        this.objeto.position.z = this.fit.y;
        this.objeto.position.x = this.fit.x;
        this.objeto.position.y = ((this.altura+nivel+30)/2);
        this.objeto.scale.set(1,1,1);
       
    }

    
   this.setDados = function(){
       
        this.objeto.corOriginal = "#2f9dbd";
        this.objeto.name = this.nome;
    
        this.objeto.conteudo = "<h4>Classe: "+this.nome+"</h4>";
        this.objeto.conteudo += "<p>Pacote: "+this.pacote+"</p>";
        this.objeto.conteudo += "<p><b>Métricas:</b></p>";
        this.objeto.conteudo += "<li>LOC: "+this.getMetrica('LOC')+"</li>";
        this.objeto.conteudo += "<li>NOM: "+this.getMetrica('NOM')+"</li>";
        this.objeto.conteudo += "<li>WMC: "+this.getMetrica('WMC')+"</li>";


        for(let i=0; i< adicionais.length;i++){
           if(adicionais[i].classes[0].name == this.nome){
              this.atributos.codesmells.push(adicionais[i].classes[0].codesmells[0]);
            }
        }
         
        this.objeto.userData = this.atributos;

   }


    this.plotar = function(nivel,bairro){
            
        var geometry = new THREE.BoxGeometry( this.w-45, this.altura+nivel, this.h-45 );
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,0));
        geometry.boundingBox = null;
        var material = new THREE.MeshLambertMaterial({color:0x2f9dbd});
        this.objeto = new THREE.Mesh( geometry,material);

        
        this.setPosicionamento(nivel);
        this.setDados();
           
       
        numerolinhas += this.getMetrica('LOC');

        
        var edges = new THREE.EdgesGeometry( geometry );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x0d2747, linewidth: 2 } ) ); 
            
        objetos.push(this.objeto);
            
        this.objeto.add(line);
        bairro.add(this.objeto);
                 
    }         







         
}