# Portfólio principal · Pedro Munareto

Portfólio de social media, tráfego pago e sites.

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
| `index.html` | Todos os textos: abertura (mesa com as pastas), sobre mim, projetos, resultados, sites e contato |
| `img/perfil/` | Fotos de perfil que aparecem no Instagram dentro do celular |
| `dados.js` | Artes de cada projeto (grupos `pousada`, `fasa`, `tabua`, `eco`, `escopo`), os carrosséis completos e, em `PERFIS`, os números e a bio do Instagram de cada cliente |
| `estilo.css` | Visual. As cores ficam no topo, em `:root` |
| `app.js` | Monta o feed 3x3, a grade, o celular de cada projeto e o visualizador |
| `img/t/` | Miniaturas das artes (cerca de 640 px) |
| `img/obras/` | Versões grandes que abrem no visualizador (cerca de 1100 px) |
| `img/fundo/` | Fotos de fundo das molduras com o celular |
| `img/res/` | Prints de resultado (Instagram e anúncios) |
| `img/sites/` | Prints dos sites, no computador e no celular |

## Como trocar ou adicionar uma arte

1. Salve a arte em JPG duas vezes, com o mesmo nome: uma pequena em `img/t/` e uma grande em `img/obras/`.
2. Em `dados.js`, copie um bloco e troque `id` (o nome do arquivo, sem `.jpg`), `titulo`, `cliente`, `ano` e `tipo`.
3. O `grupo` define o projeto: `pousada`, `fasa`, `tabua` ou `eco`.
4. A ordem dos blocos é a ordem no site. As 9 primeiras de cada projeto vão para o feed e para o celular;
   todas aparecem na grade larga, de 5 em 5 (deixe o total múltiplo de 5).

## Versão anterior

A versão laranja e preta ficou guardada na tag `versao-laranja` do repositório.

## Foto na seção Sobre mim

Salve a foto como `img/pedro.jpg` (vertical, 4:5) e siga o comentário que está logo acima da
seção "Sobre mim" no `index.html`.

## Depois de mudar o visual ou o funcionamento

No `index.html`, `estilo.css`, `dados.js` e `app.js` são carregados com `?v=4` no fim.
Sempre que mudar um desses arquivos, aumente esse número (`?v=5`, `?v=6`...). Senão o
navegador de quem já visitou o site pode continuar mostrando a versão antiga.

## Observação

As marcas mostradas pertencem aos clientes e aparecem aqui para fins de portfólio.

## Números do Instagram no celular

Os seguidores e posts mostrados no celular de cada projeto ficam em `window.PERFIS`, no fim do `dados.js`.
Foram copiados dos perfis em 13/11/2026. Para atualizar, troque os números lá.
