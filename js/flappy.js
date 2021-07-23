function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

class Barreira {
    constructor(reversa = false) {
        this.elemento = novoElemento('div', 'barreira')

        const borda = novoElemento('div', 'borda')
        const corpo = novoElemento('div', 'corpo')

        this.elemento.appendChild(reversa ? corpo : borda)
        this.elemento.appendChild(reversa ? borda : corpo)

        this.setAltura = altura => corpo.style.height = `${altura}px`

    }
}


// const b = new Barreira(true)
// b.setAltura(500)
// document.querySelector('[wm-flappy]').appendChild(b.elemento)

function PardeBarreiras(altura, abertura, x) {
    this.elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const aberturaSuperior = Math.random() * (altura - abertura)
        const aberturaInferior = altura - abertura - aberturaSuperior
        this.superior.setAltura(aberturaSuperior)
        this.inferior.setAltura(aberturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => history.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}
// const b = new PardeBarreiras(700, 200, 400)
// document.querySelector('[wm-flappy]').appendChild(b.elemento)

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new PardeBarreiras(altura, abertura, largura),
        new PardeBarreiras(altura, abertura, largura + espaco),
        new PardeBarreiras(altura, abertura, largura + espaco * 2),
        new PardeBarreiras(altura, abertura, largura + espaco * 3)
    ]
    const deslocamento = 3

    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            if(par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco *this.pares.length)
            }
        }
        )
    }
}

