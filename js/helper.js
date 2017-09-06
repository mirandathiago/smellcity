 function gerarCor(cor, luminosidade) {
        let hex_string = ('000000' + cor.toString(16)).slice(-6);
        let rgb = "#";

        lum = luminosidade || 0;

        for (let i = 0; i < 3; i++) {
            let num_color = parseInt(hex_string.substr(i * 2, 2), 16);
            let str_color = Math.round(Math.min(Math.max(0, num_color + (num_color * lum)), 255)).toString(16);
            rgb += ("00" + str_color).substr(str_color.length);
        }

        return rgb;
    }