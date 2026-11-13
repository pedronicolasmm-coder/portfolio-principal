# Portfólio principal · Pedro Munareto

Portfólio de social media, tráfego pago e landing pages.

Site no ar: https://pedronicolasmm-coder.github.io/portfolio-principal/

## Como editar de outro computador

### Pelo navegador (mais fácil)

1. Abra o repositório no GitHub e clique no arquivo que quer mudar.
2. Clique no lápis (Edit this file), altere e clique em **Commit changes**.
3. O site atualiza sozinho em cerca de 1 minuto.

### Pelo Git

```
git clone https://github.com/pedronicolasmm-coder/portfolio-principal.git
cd portfolio-principal
# edite os arquivos
git add -A
git commit -m "o que mudou"
git push
```

Para ver no computador antes de subir, basta abrir o `index.html` no navegador.

## Onde fica cada coisa

| Arquivo | O que tem |
|---|---|
| `index.html` | Todos os textos: abertura, serviços, resultados, trajetória, sites, formação e contato |
| `dados.js` | Lista dos trabalhos da galeria (título, cliente, ano, tipo) e dos carrosséis completos |
| `estilo.css` | Visual. As cores ficam no topo, em `:root` |
| `app.js` | Funcionamento: galeria, filtros, visualizador, menu do celular |
| `img/t/` | Miniaturas da galeria (cerca de 640 px) |
| `img/obras/` | Versões grandes que abrem no visualizador (cerca de 1100 px) |
| `img/res/` | Prints de resultado (Instagram e anúncios) |
| `img/sites/` | Prints dos sites, no computador e no celular |

## Como trocar ou adicionar um trabalho

1. Salve a arte em JPG duas vezes, com o mesmo nome: uma pequena em `img/t/` e uma grande em `img/obras/`.
2. Em `dados.js`, copie um bloco de trabalho e troque `id` (o nome do arquivo, sem `.jpg`), `titulo`, `cliente`, `ano` e `tipo`.
3. O `grupo` define o filtro: `pousada`, `fasa`, `tabua`, `mitra` ou `outros`.
4. A ordem dos blocos é a ordem da galeria. Os 16 primeiros aparecem antes do botão "Ver todos".

## Depois de mudar o visual ou o funcionamento

No `index.html`, `estilo.css`, `dados.js` e `app.js` são carregados com `?v=1` no fim.
Sempre que mudar um desses arquivos, aumente esse número (`?v=2`, `?v=3`...). Senão o
navegador de quem já visitou o site pode continuar mostrando a versão antiga.

## Observação

As marcas mostradas pertencem aos clientes e aparecem aqui para fins de portfólio.
