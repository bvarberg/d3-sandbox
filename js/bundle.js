import domready from 'domready';

import LineGraph from './LineGraph';
import data from '../data/seven-capture.json';

domready(() => {
  console.log(data);

  let rightAnteriorShoulderGraph = new LineGraph({
      hook: '[data-hook=right-anterior-shoulder-graph]',
      data: data,
      zone: 'rightAnteriorShoulder',
      datapoints: ['rightShoulderAbductionEnd', 'rightShoulderRotationExternal', 'deltaShoulderAbductionEnd'],
      margin: { top: 40, right: 40, bottom: 40, left: 40 },
      height: 400,
      width: 400
  });

  let leftAnteriorShoulderGraph = new LineGraph({
    hook: '[data-hook=left-anterior-shoulder-graph]',
    data: data,
    zone: 'leftAnteriorShoulder',
    datapoints: ['leftShoulderAbductionEnd', 'leftShoulderRotationExternal', 'deltaShoulderAbductionEnd'],
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    height: 400,
    width: 400
  });

  let leftGluteGraph = new LineGraph({
    hook: '[data-hook=left-glute-graph]',
    data: data,
    zone: 'leftGlute',
    datapoints: ['leftLegStorkRightHipFlexion', 'leftUnilateralSquatLeftHipFlexion', 'rightTrunkRotationSacrum', 'trunkExtensionLeftKneeFlexionEnd'],
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    height: 400,
    width: 400
  });

  let rightGluteGraph = new LineGraph({
    hook: '[data-hook=right-glute-graph]',
    data: data,
    zone: 'rightGlute',
    datapoints: ['rightLegStorkLeftHipFlexion', 'rightUnilateralSquatRightHipFlexion', 'leftTrunkRotationSacrum', 'trunkExtensionRightKneeFlexionEnd'],
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    height: 400,
    width: 400
  });

  let leftCervicalSpineGraph = new LineGraph({
    hook: '[data-hook=left-cervical-spine-graph]',
    data: data,
    zone: 'leftCervicalSpine',
    datapoints: ['leftCervicalRotation'],
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    height: 400,
    width: 400
  });

  let rightCervicalSpineGraph = new LineGraph({
    hook: '[data-hook=right-cervical-spine-graph]',
    data: data,
    zone: 'rightCervicalSpine',
    datapoints: ['rightCervicalRotation'],
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    height: 400,
    width: 400
  });

  let leftThoracicSpineGraph = new LineGraph({
    hook: '[data-hook=left-thoracic-spine-graph]',
    data: data,
    zone: 'leftThoracicSpine',
    datapoints: ['leftShoulderAbductionEnd', 'leftTrunkRotationThoracic', 'trunkExtensionThoracicPosteriorDisplacementEnd'],
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    height: 400,
    width: 400
  });

  let rightThoracicSpineGraph = new LineGraph({
    hook: '[data-hook=right-thoracic-spine-graph]',
    data: data,
    zone: 'rightThoracicSpine',
    datapoints: ['rightShoulderAbductionEnd', 'rightTrunkRotationThoracic', 'trunkExtensionThoracicPosteriorDisplacementEnd'],
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    height: 400,
    width: 400
  });

  rightAnteriorShoulderGraph.render();
  leftAnteriorShoulderGraph.render();
  leftGluteGraph.render();
  rightGluteGraph.render();
  leftCervicalSpineGraph.render();
  rightCervicalSpineGraph.render();
  leftThoracicSpineGraph.render();
  rightThoracicSpineGraph.render();
});
