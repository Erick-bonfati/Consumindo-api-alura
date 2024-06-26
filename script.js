const containerVideos = document.querySelector('.videos__container');

//Assincrona = faz uma busca, mas para fazer a busca, ela espera um await, de onde estamos fazendo a busca
async function buscarEMostrarVideos() {
    try {
        //Aqui estamos retornando uma promise(promessa): que é basicamente buscar alguma coisa
      //AWAIT = Aguarda até que a busca seja feita, para fazer a busca com o FETCH  
      const busca = await fetch("http://localhost:3000/videos") // faz uma busca com o fetch no nosso json-server, que está escutando nossa API FAKE
      const videos = await busca.json(); // o await aqui é apos a busca ser feita, nós fazemos o proximo await e transformamos o resultado
      // que recebemos para JSON, sem precisar usar o .then

      videos.forEach((video) => { // para cada resposta(video), nós vamos fazer isso com cada resposta(video)...

      if(video.categoria == "") {
        throw new Error('Vídeo não tem categoria');
      } else {
        containerVideos.innerHTML += `
        <li class="videos__item">
          <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
          <div class="descricao-video">
            <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
            <h3 class="titulo-video">${video.titulo}</h3>
            <p class="titulo-canal">${video.descricao}</p>
            <p class="categoria" hidden>${video.categoria}</p>
          </div>
        </li>
        `;// Aqui nós criamos um li dentro do html para adicionar cada um dos videos que temos na API, adicionando com o link do video(URL) e
            // o titulo e todas as outras propriedades da API Fake
        }
      })
    } catch(error) {
      containerVideos.innerHTML = `<p> Houve um erro ao carregar os videos: ${error} </p>`
    }
    // finally { // O finally é sempre executado, o código passando somente pelo try ou pelo catch
    //   alert('Isso sempre acontece')
    // }
    
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector('.pesquisar__input');

barraDePesquisa.addEventListener('input', filtrarPesquisa)

//Aqui criamos uma funcão para filtrar uma pesquisa, ele compara se o input digitado pelo usuario, corresponde a algum dos titulos de
//algum video
function filtrarPesquisa() {
  const videos = document.querySelectorAll('.videos__item');

  if(barraDePesquisa.value != "") {
    for(let video of videos) {
      let titulo = video.querySelector('.titulo-video').textContent.toLowerCase(); // pegar o titulo do video e transformamos em Minusculo
      let valorFiltro = barraDePesquisa.value.toLowerCase();

      if(!titulo.includes(valorFiltro)) { // Se o titulo do video não inclui o valor que a pessoa esta pesquisando, ele some com o video
        video.style.display = "none"
      } else {
        video.style.display = "block" // e caso o video e o filtro forem iguais, ele vai exibir o video
      }
    }
  } else {
    videos.style.display = "block";
  }
}


//De maneira simplificada
// function filtrarPesquisa() {
//   const videos = document.querySelectorAll('.videos__item');
//   const valorFiltro = barraDePesquisa.value.toLowerCase();

//   videos.forEach((video) => {
//     const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

//     video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
//   });
// }

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute("name"); // pegando o atributo name, que foi declarado para cada botão no HTML
  botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria)); // e para cada clique, ele vai executar a funcão filtrar
  //porCategoria com base no nome da categoria que foi clicada
})

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll('.videos__item');
  for(let video of videos) {
    let categoria = video.querySelector('.categoria').textContent.toLowerCase();
    let valorFiltro = filtro.toLowerCase();

    if(!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  }
}