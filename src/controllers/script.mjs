import Graph from "../models/Graph.mjs";

const graph = new Graph();

const btnAgregarDestino = document.getElementById("AddRed");
const btnAgregarConexion = document.getElementById("AddRed2");
const btnRecorridoProfundidad = document.getElementById("profundidad");
const btnRecorridoAnchura = document.getElementById("anchura");
const btnRedMasRapida = document.getElementById("redMasRapida");
const tbodyProfundidad = document.getElementById("tbodyProfundidad");
const tbodyAnchura = document.getElementById("tbodyAnchura");
const tbodyDijkstra = document.getElementById("tbodyDijkstra");

function mostrarAlerta(icon, title, message) {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        confirmButtonColor: '#007bff'
    });
}

btnAgregarDestino.addEventListener("click", () => {
    const red = document.getElementById("redes").value.trim();
    
    if (red !== "") {
        if (graph.addVertex(red)) {
            mostrarAlerta('success', 'Registro Exitoso', `Se registró la red ${red}`);
        } else {
            mostrarAlerta('error', 'Error', 'No se pudo registrar la red');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar el nombre de la red');
    }
});

btnAgregarConexion.addEventListener("click", () => {
    const redInicial = document.getElementById("inicial").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const peso = parseInt(document.getElementById("peso").value);

    if (redInicial !== "" && destino !== "" && !isNaN(peso)) {
        if (graph.addEdge(redInicial, destino, peso)) {
            mostrarAlerta('success', 'Conexión Agregada', 'La conexión se agregó correctamente');
        } else {
            mostrarAlerta('error', 'Error', 'No se pudo agregar la conexión');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar ambas redes y el peso para la conexión');
    }
});

btnRecorridoProfundidad.addEventListener("click", () => {
    tbodyProfundidad.innerHTML = '';

    const vertices = [...graph.getVertices()];
    if (vertices.length === 0) {
        mostrarAlerta('error', 'Error', 'No hay vértices en el grafo');
        return;
    }

    graph.dfs(vertices[0], (vertex) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = vertex;
        row.appendChild(cell);
        tbodyProfundidad.appendChild(row);
    });
});

btnRecorridoAnchura.addEventListener("click", () => {
    tbodyAnchura.innerHTML = '';

    const vertices = [...graph.getVertices()];
    if (vertices.length === 0) {
        mostrarAlerta('error', 'Error', 'No hay vértices en el grafo');
        return;
    }

    graph.bfs(vertices[0], (vertex) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = vertex;
        row.appendChild(cell);
        tbodyAnchura.appendChild(row);
    });
});

btnRedMasRapida.addEventListener("click", () => {
    tbodyDijkstra.innerHTML = '';

    const inicioDijkstra = document.getElementById("inicioDijkstra").value.trim();

    if (inicioDijkstra !== "") {
        const distances = graph.dijkstra(inicioDijkstra);
        if (distances) {
            for (let [node, distance] of Object.entries(distances)) {
                const row = document.createElement('tr');
                const cellNode = document.createElement('td');
                const cellDistance = document.createElement('td');
                cellNode.textContent = node;
                cellDistance.textContent = distance === Infinity ? 'Infinito' : distance;
                row.appendChild(cellNode);
                row.appendChild(cellDistance);
                tbodyDijkstra.appendChild(row);
            }

            mostrarAlerta('success', 'Rutas Más Rápidas', `Se calcularon las distancias más rápidas desde ${inicioDijkstra}`);
        } else {
            mostrarAlerta('error', 'Error', 'No se encontró una ruta desde la red especificada');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar la red de inicio para encontrar las rutas más rápidas');
    }
});
