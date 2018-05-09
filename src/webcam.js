// based on: https://github.com/hideya/tfjs-examples/blob/master/webcam-transfer-learning/webcam.js
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as tf from '@tensorflow/tfjs-core';

/**
 * A class that wraps webcam video elements to capture Tensor4Ds.
 */
export class Webcam {
  /**
   * @param {HTMLVideoElement} webcamElement A HTMLVideoElement representing the webcam feed.
   */
  constructor(webcamElement) {
    this.webcamElement = webcamElement;
  }

  /**
   * Captures a frame from the webcam and normalizes it between -1 and 1.
   * Returns a batched image (1-element batch) of shape [1, w, h, c].
   */
  capture() {
    return tf.tidy(() => {
      // Reads the image as a Tensor from the webcam <video> element.
      // hideya: Somehow the following line resulted in
      // 'Uncaught TypeError: Cannot read property 'drawImage' of null'
      // at backend_webgl.js:132
      //   const webcamImage = tf.fromPixels(this.webcamElement);
      // So, a canvas and a context 2d are created manually here.
      const canvas = document.createElement('canvas');
      canvas.width = this.webcamElement.width;
      canvas.height = this.webcamElement.height;
      canvas.getContext('2d').drawImage(this.webcamElement,
          0, 0, this.webcamElement.width, this.webcamElement.height);
      const webcamImage = tf.fromPixels(canvas);

      // Crop the image so we're using the center square of the rectangular
      // webcam.
      const croppedImage = this.cropImage(webcamImage);

      // Expand the outer most dimension so we have a batch size of 1.
      const batchedImage = croppedImage.expandDims(0);

      // Normalize the image between -1 and 1. The image comes in between 0-255,
      // so we divide by 127 and subtract 1.
      return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    });
  }

  /**
   * Crops an image tensor so we get a square image with no white space.
   * @param {Tensor4D} img An input image Tensor to crop.
   */
  cropImage(img) {
    const size = Math.min(img.shape[0], img.shape[1]);
    const centerHeight = img.shape[0] / 2;
    const beginHeight = centerHeight - (size / 2);
    const centerWidth = img.shape[1] / 2;
    const beginWidth = centerWidth - (size / 2);
    return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
  }

  /**
   * Adjusts the video size so we can make a centered square crop without
   * including whitespace.
   * @param {number} width The real width of the video element.
   * @param {number} height The real height of the video element.
   */
  adjustVideoSize(width, height) {
    const aspectRatio = width / height;
    if (width >= height) {
      this.webcamElement.width = aspectRatio * this.webcamElement.height;
    } else if (width < height) {
      this.webcamElement.height = this.webcamElement.width / aspectRatio;
    }
  }

  async setup(constraints) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.webcamElement.srcObject = stream;
      this.webcamElement.addEventListener('loadeddata', () => {
        this.adjustVideoSize(
            this.webcamElement.videoWidth,
            this.webcamElement.videoHeight);
      }, false);
    }
  }
}
