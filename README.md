
# WebCam ImageNet Recognition

This is a simple web app to show how to use
[TensorFlow.js](https://js.tensorflow.org/) to performs image recognition
based on a pre-trained
[NN](https://en.wikipedia.org/wiki/Artificial_neural_network)
and with feeding input from a WebCam.

The model used is [MobileNet](https://arxiv.org/abs/1704.04861)
pre-trained on
[ImageNet (ILSVRC-2012-CLS)](http://www.image-net.org/challenges/LSVRC/2012/)
to recognize [1000 categories of images](src/imagenet_classes.js)
(e.g. 'goldfish').
The demo loads the model converted to TensorFlow.js format,
which is hosted at Google Cloud Storage
(e.g. its `weights_manifest.json` can be obtained
[here](https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/weights_manifest.json)).

The demo runs on reasonably new Chrome, Safari and Firefox (not on Edge nor IE).
It supposed to run on Mobile Safari and Android Chrome,
but there are issues to be fixed.

You can try it out at: https://tfjs-mobilenet-webcam.netlify.com/

![Screenshot](https://i.imgur.com/bAglYvd.png)

### Building and Running

The following commands will start a web server on `localhost:8080`
and open a browser page with the demo.

```bash
cd tfjs-mobilenet-webcam
yarn        # Installs dependencies.
yarn start  # Starts a web server and opens a page. Also watches for changes.
```

After `$ yarn build`, `public` directory holds the deployable files.

### Notes

Although it supposed to distinguish [1000 categories](src/imagenet_classes.js),
the categories that ImageNet classifies don't include that many
usual everyday items, and the image set is a bit old.
It can be hard to capture recognizable things with this demo.
Things like 'cellphone', 'water bottle' and 'remote control' usually work well.
