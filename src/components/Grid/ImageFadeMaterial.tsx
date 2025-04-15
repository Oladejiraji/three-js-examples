import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 0.5,
    dispFactor: 0,
    tex: null,
    tex2: null,
    disp: null,
    uCurvature: 0,
    uScreenWidth: 0,
    uOffsetX: 0,
  },
  `uniform float uCurvature;
  uniform float uScreenWidth;
  uniform float uOffsetX;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 curvedPosition = position;
    float relativePosX = (position.x + uOffsetX);
    float normalizedPosX = (relativePosX + (uScreenWidth / 2.0)) / uScreenWidth;
    curvedPosition.z = (-sin(normalizedPosX * 3.14)) * uCurvature;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(curvedPosition, 1.0);
  }`,
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`
);

extend({ ImageFadeMaterial });

export { ImageFadeMaterial };
