// Função para adicionar uma tarefa
function adicionarTarefa() {
  var input = document.getElementById("input-search").value;
  var ulList = document.getElementById("ulList");

  if (input.trim() === "") {
    alert('Digite algo.');
    return;
  }

  // Cria um objeto representando a tarefa
  var task = {
    text: input,
    checked: false,
  };

  // Adiciona a tarefa à lista
  adicionarTarefaNaLista(task);

  // Salva a lista atualizada no localStorage
  salvarListaNoLocalStorage();

  // Limpa o campo de entrada
  document.getElementById("input-search").value = "";

  // Dá foco novamente ao campo de entrada
  document.getElementById("input-search").focus();
}

// Função para adicionar uma tarefa na lista
function adicionarTarefaNaLista(task) {
  var ulList = document.getElementById("ulList");

  var text = document.createElement("li");
  var image = document.createElement("img");

  text.appendChild(document.createTextNode(task.text));
  text.appendChild(image);
  image.src =
    "https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-x-mark-circle-thin.png";

  text.addEventListener("click", function () {
    task.checked = !task.checked;
    text.classList.toggle("checked-text");
    text.classList.toggle("checked");
    salvarListaNoLocalStorage(); // Atualiza o estado ao clicar na tarefa
  });

  image.addEventListener("click", function () {
    ulList.removeChild(text);
    salvarListaNoLocalStorage(); // Atualiza o estado ao remover a tarefa
  });

  // Adiciona a tarefa à lista na memória
  ulList.appendChild(text);

  // Marca a tarefa como concluída se necessário
  if (task.checked) {
    text.classList.add("checked-text");
    text.classList.add("checked");
  }
}

// Função para salvar a lista no localStorage
function salvarListaNoLocalStorage() {
  var ulList = document.getElementById("ulList");
  var tasks = [];

  // Itera sobre os elementos da lista para obter suas informações
  for (var i = 0; i < ulList.children.length; i++) {
    var text = ulList.children[i].textContent;
    var checked = ulList.children[i].classList.contains("checked");
    tasks.push({ text: text, checked: checked });
  }

  // Salva as informações no localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar a lista do localStorage ao carregar a página
function carregarListaDoLocalStorage() {
  var storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    var tasks = JSON.parse(storedTasks);

    // Adiciona cada tarefa armazenada à lista
    for (var i = 0; i < tasks.length; i++) {
      adicionarTarefaNaLista(tasks[i]);
    }
  }
}

// Chama a função para carregar a lista ao carregar a página
carregarListaDoLocalStorage();
