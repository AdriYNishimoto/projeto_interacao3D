# Visualizador 3D com Three.js

Este é um aplicativo web simples que permite fazer upload e visualizar modelos 3D nos formatos `.glb` e `.obj`, manipulá-los no frontend com controles de órbita e ajustar o brilho da iluminação em tempo real. O projeto utiliza a biblioteca [Three.js](https://threejs.org/) para renderização 3D.

## Funcionalidades
- **Upload de Modelos 3D**: Suporte para arquivos `.glb` (GLTF binário) e `.obj`.
- **Manipulação Interativa**: Rotação, zoom e pan usando controles de órbita.
- **Controle de Brilho**: Ajuste da intensidade da luz direcional com um slider.
- **Centralização Automática**: Modelos são automaticamente escalados e centralizados na tela.

## Estrutura do Projeto

![Visualizador 3D em Ação](./estrutura.png)

## Pré-requisitos
- Um navegador moderno (Chrome, Firefox, etc.).
- Um servidor local para rodar o projeto (necessário devido a restrições de CORS ao carregar arquivos locais).

## Instalação
1. **Clone ou Baixe o Projeto**:
   - Faça o download dos arquivos ou clone este repositório para sua máquina.

2. **Inicie um Servidor Local**:
   - Abra o terminal na pasta do projeto e execute um dos comandos abaixo:
     - Python: `python -m http.server 8000`
     - Node.js (com http-server): `npx http-server`
     - Ou use uma extensão como "Live Server" no VS Code.
   - Isso evita problemas de CORS ao carregar arquivos locais no navegador.

3. **Acesse no Navegador**:
   - Abra `http://localhost:8000` (ou a porta indicada pelo servidor) no seu navegador.

## Uso
1. **Carregar um Modelo**:
   - Clique no botão "Escolher arquivo" e selecione um arquivo `.glb` ou `.obj` do seu computador.
   - Modelos de exemplo podem ser encontrados em sites como [Sketchfab](https://sketchfab.com) (baixe no formato GLB) ou exportados de ferramentas como Blender.

2. **Manipular o Modelo**:
   - **Rotação**: Clique com o botão esquerdo e arraste.
   - **Zoom**: Use a roda do mouse.
   - **Pan**: Clique com o botão direito e arraste.

3. **Ajustar o Brilho**:
   - Use o slider "Brilho" (varia de 0 a 2) para aumentar ou diminuir a intensidade da luz direcional.

## Tecnologias Utilizadas
- **Three.js**: Biblioteca JavaScript para renderização 3D (versão 0.162.0).
- **GLTFLoader**: Carrega modelos no formato `.glb`.
- **OBJLoader**: Carrega modelos no formato `.obj`.
- **OrbitControls**: Permite interação com o modelo.
- **HTML/CSS**: Estrutura e estilo da interface.

## Limitações
- **Arquivos .obj**: Não suporta materiais `.mtl` automaticamente. Modelos sem material recebem um padrão cinza.
- **Tamanho dos Modelos**: Modelos muito complexos podem exigir ajustes manuais na escala ou iluminação.
- **Dependência de CDN**: O Three.js é carregado via CDN (unpkg), então é necessária uma conexão com a internet.

## Personalização
- Para adicionar suporte a `.mtl` (materiais para `.obj`), inclua o `MTLLoader` e ajuste o `script.js`.
- Para mudar a cor da luz ou adicionar mais controles, modifique as propriedades da `directionalLight` ou adicione novos elementos no `index.html`.

## Contribuição
Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias, como suporte a mais formatos ou novos controles de iluminação.

## Licença
Este projeto é de código aberto e está disponível sob a [Licença MIT](https://opensource.org/licenses/MIT).# projeto_interacao3D
# projeto_interacao3D
