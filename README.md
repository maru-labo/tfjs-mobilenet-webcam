
# WebCam ImageNet Recognition

This is a simple web app to show how to use
[TensorFlow.js](https://js.tensorflow.org/) to perform image recognition
based on a pre-trained
[NN](https://en.wikipedia.org/wiki/Artificial_neural_network)
and input from a WebCam.

[<img src="https://i.imgur.com/KsjP6on.jpg" width="200" align="right">](https://i.imgur.com/KsjP6on.jpg)

The model used is [MobileNet](https://arxiv.org/abs/1704.04861)
pre-trained on
[ImageNet (ILSVRC-2012-CLS)](http://www.image-net.org/challenges/LSVRC/2012/)
to recognize [1000 categories of images](src/imagenet_classes.js).
FYI, a collection of sample images is shown on the right.

The demo loads the model converted to TensorFlow.js format,
which is hosted at Google Cloud Storage
(e.g. its `weights_manifest.json` can be obtained
[here](https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/weights_manifest.json)).

The demo runs on reasonably new Chrome, Safari and Firefox (not on Edge nor IE).
It runs on Mobile Safari and Android Chrome with good amount of device's
GPU memory (i.e. Galaxy S7 and Pixel 2 XL).
It fails recognition when seemingly an out-of-GPU-memory situation
(see Issues [#2](https://github.com/maru-labo/tfjs-mobilenet-webcam/issues/2)
and [#3](https://github.com/maru-labo/tfjs-mobilenet-webcam/issues/3)).

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

After `yarn build`, `public` directory holds the deployable files.

### Notes

Although it supposed to distinguish [1000 categories](src/imagenet_classes.js),
the categories that ImageNet classifies don't include that many
usual everyday items.
It may be a bit hard to find many recognizable things around you.
Things like 'cellphone', 'water bottle' and 'remote control' usually work well.

### Related Repos

If you are interested in knowing how to train NN, check out
[maru-labo/doodle](https://github.com/maru-labo/doodle).<br/>
If you are interested in replacing the pre-trained model,
[this README of a TF.js app](https://github.com/maru-labo/doodle/tree/master/examples/tensorflow_js_simple)
included in the repo can be useful.
