function createOverlay() {
  const overlay = document.createElement('div')
  overlay.id = 'model-modal'
  overlay.classList.add('overlay')

  const closeBtn = document.createElement('a')
  closeBtn.href = "javascript:void(0)"
  closeBtn.classList.add('closebtn')
  closeBtn.innerHTML = "&times;"
  closeBtn.onclick = function () {
    overlay.style.display = "none"
  }

  overlay.appendChild(closeBtn)

  const overlayContent = document.createElement('div')
  overlayContent.classList.add("overlay-content")

  overlay.appendChild(overlayContent)

  return {
    overlay,
    overlayContent,
    closeBtn
  }
}

let scene, camera, hlight, light, light2, light3, light4, loader, directionalLight

function createModel(content) {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xdddddd)

  camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000)
  camera.rotation.y = 45/180*Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;
  var renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  $(content).append(renderer.domElement);

  hlight = new THREE.AmbientLight (0x404040,100);
  scene.add(hlight);
  directionalLight = new THREE.DirectionalLight(0xffffff,100);
  directionalLight.position.set(0,1,0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  light = new THREE.PointLight(0xc4c4c4,10);
  light.position.set(0,300,500);
  scene.add(light);
  light2 = new THREE.PointLight(0xc4c4c4,10);
  light2.position.set(500,100,0);
  scene.add(light2);
  light3 = new THREE.PointLight(0xc4c4c4,10);
  light3.position.set(0,100,-500);
  scene.add(light3);
  light4 = new THREE.PointLight(0xc4c4c4,10);
  light4.position.set(-500,300,500);
  scene.add(light4);

  loader = new THREE.OBJLoader();
  loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/557388/star.obj", function(object) {
    scene.add(object);
  });
}

function disposeModel() {
  scene = null
  hlight = null
  loader = null
  camera = null
  directionalLight = null
  light = null
  light2 = null
  light3 = null
  light4 = null
}

const images = document.querySelectorAll('img');

const htmlButton = `
  <button class="img-btn tooltipped tooltipped-s" aria-label="Click to show model">
    Click
  </button>`;

images.forEach((img) => {
  if (img.src.includes('https') && (img.src.includes('.jpg') || img.src.includes('jpeg'))) {
    const parent = img.parentNode;
    const wrapper = document.createElement('div');

    parent.replaceChild(wrapper, img);
    wrapper.appendChild(img);

    wrapper.classList.add('codecopy');
    wrapper.firstChild.insertAdjacentHTML('beforebegin', htmlButton);
  }
});

// Replace tooltip message when mouse leaves button
// and prevent page refresh after click button

const btns = document.querySelectorAll('.img-btn');

const {overlay, overlayContent} = createOverlay()

document.querySelector('body').appendChild(overlay)

btns.forEach((btn) => {
  btn.addEventListener('mouseleave', (e) => {
    e.target.setAttribute('aria-label', 'Click to show model');
    e.target.blur();
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault()
    disposeModel()
    const content = document.createElement('div')
    createModel(content)
    if (overlayContent.firstChild) {
      overlayContent.removeChild(overlayContent.firstChild)
    }
    overlayContent.appendChild(content)
    overlay.style.display = "block"
    console.log(overlay)
  });
});
