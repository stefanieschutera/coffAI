let net;

// Create classifier
const classifier = knnClassifier.create();

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // read image from file upload and associate it with a specific class
  const addExample = async (classId, img_name) => {
    // Capture an image from the browser
    var img = document.getElementById(img_name);

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = net.infer(img, true);

    // Pass the intermediate activation to the classifier.
    classifier.addExample(activation, classId);

    // Dispose the tensor to release the memory.
    img = null;
  };
  
  // When clicking a button, add an example for that class.
  document.getElementById('class-0').addEventListener('click', () => addExample(0, 'sunflower1'));
  document.getElementById('class-1').addEventListener('click', () => addExample(1, 'tulip1'));
  
  
  // merging the model so it can be infered and downloaded
  //const merge_models = async (backbone, outputlayer) => {
	//const model = tf.sequential({backbone
  //}
  
  // When clicking the download button, 
  //document.getElementById('class-inference').addEventListener('click', () => merge_models(net, classifier));
  
  // infer your test image on the trained classifier (validation step)
  const inference = async img_name => {
	// Capture an image from the browser
    var img = document.getElementById(img_name);
	
	// Get the activation from mobilenet from the webcam.
    const activation = net.infer(img, 'conv_preds');
    // Get the most likely class and confidence from the classifier module.
    const result = await classifier.predictClass(activation);
	
	const classes = ['SUNFLOWER', 'TULIP'];
    document.getElementById('console').innerText = `
      prediction: ${classes[result.label]}\n
      probability: ${result.confidences[result.label]}
    `;

    // Dispose the tensor to release the memory.
    img = null;
  };
  
  // When clicking the inference button, 
  document.getElementById('class-inference').addEventListener('click', () => inference('test'));


  // Make a prediction through the model on our image.
  //const imgEl = document.getElementById('test1');
  //const result = await net.classify(imgEl);
  //console.log(result);
}

app();