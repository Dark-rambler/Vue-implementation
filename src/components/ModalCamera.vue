<template>
  <div class="modal fade" id="modalCamera" tabindex="-1" data-bs-backdrop="static" aria-labelledby="modalCameraLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalCameraLabel">Cámara</h5>
          <button type="button" class="btn-close" @click="stopCamera" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <video id="camera-preview" autoplay muted playsinline></video>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="stopCamera">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';

let stream: MediaStream | null = null;

function activeCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('La API de MediaDevices no es soportada en este navegador.');
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((mediaStream) => {
      stream = mediaStream;
      const videoElement = document.getElementById('camera-preview') as HTMLVideoElement;
      if (videoElement) {
        videoElement.srcObject = stream;
        videoElement.play();
      }
    })
    .catch((error) => {
      console.error('Error al acceder a la cámara:', error);
    });
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop()); // Detiene todas las pistas de la transmisión
    const videoElement = document.getElementById('camera-preview') as HTMLVideoElement;
    if (videoElement) {
      videoElement.srcObject = null; // Limpia el elemento <video>
    }
  }
}

// Detener la cámara cuando el componente se desmonta
onUnmounted(() => {
  stopCamera();
});

// Exponer la función al componente padre
defineExpose({
  activeCamera,
});
</script>

<style scoped>
video {
  width: 100%;
  max-width: 500px;
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>
