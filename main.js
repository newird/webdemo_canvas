// 点击时的node
let selectedNode = null;
let routerImg = new Image();
routerImg.onload = draw;  // 图片加载完成后再绘制
routerImg.src = 'router.jpg';

// 节点数量
let nodeCount = 12;

// Canvas size
let canvasWidth = 1200;
let canvasHeight = 800;

// Nodes
let nodes = [];

for (let i = 0; i < nodeCount; i++) {
    nodes.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        radius: 30,
        color: 'gray',
        connections: []
    });
}
// 每个节点至少连接到其后面的一个节点
for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].connections.push(nodes[i + 1]);
}

// // 额外添加一些随机的连接
// for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 2; j < nodes.length; j++) {
//         // 以30%的概率添加连接
//         if (Math.random() < 0.01) {
//             nodes[i].connections.push(nodes[j]);
//         }
//     }
// }
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// Draw everything
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 先画线
    nodes.forEach(node => {
        node.connections.forEach(connection => {
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(connection.x, connection.y);
            context.lineWidth = 5;  // 加粗连线
            context.stroke();
            // Reset line width
            context.lineWidth = 1;
        });
    });

    // 再画节点
    nodes.forEach(node => {
        context.drawImage(routerImg, node.x - node.radius, node.y - node.radius, node.radius * 2, node.radius * 2);
    });
}


// Listen for mouse down events
canvas.addEventListener('mousedown', e => {
    const pos = { x: e.offsetX, y: e.offsetY };

    // See if a node is clicked
    nodes.forEach(node => {
        const dist = Math.hypot(node.x - pos.x, node.y - pos.y);
        if (dist < node.radius) {
            selectedNode = node;
        }
    });
});

// Listen for mouse up events
canvas.addEventListener('mouseup', e => {
    if (selectedNode) {
        selectedNode = null;
    }
});

// Listen for mouse move events
canvas.addEventListener('mousemove', e => {
    if (selectedNode) {
        selectedNode.x = e.offsetX;
        selectedNode.y = e.offsetY;
        draw();
    }
});

// 连接两个node
nodes[0].connections.push(nodes[1]);
nodes[1].connections.push(nodes[0]);

// 初始绘制
draw();


// Get the context menu
let contextMenu = document.getElementById('context-menu');

// Listen for contextmenu events
canvas.addEventListener('contextmenu', e => {
    e.preventDefault();

    // See if a node is right-clicked
    nodes.forEach(node => {
        const dist = Math.hypot(node.x - e.offsetX, node.y - e.offsetY);
        if (dist < node.radius) {
            // Show the context menu
            contextMenu.style.left = `${e.pageX}px`;
            contextMenu.style.top = `${e.pageY}px`;
            contextMenu.style.display = 'block';
        }
    });
});

// Hide the context menu when clicking elsewhere
window.addEventListener('click', e => {
    if (e.button !== 2) {  // Not a right click
        contextMenu.style.display = 'none';
    }
});

// Add event listeners to your menu items
document.getElementById('item1').addEventListener('click', e => {
    alert('Item 1 clicked!');
    // Do something...
});

document.getElementById('item2').addEventListener('click', e => {
    alert('Item 2 clicked!');
    // Do something...
});

document.getElementById('item3').addEventListener('click', e => {
    alert('Item 3 clicked!');
    // Do something...
});
