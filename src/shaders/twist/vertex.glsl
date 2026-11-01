varying vec2 vUv;
uniform float uY;
uniform float uTwistMax;
uniform float uRadius;

varying float vY;

void main() {
  vec4 modelPos = modelMatrix * vec4(position, 1.0);

  float worldY = uY + modelPos.y;
  
  float flatZone = 1.;
  float strength = smoothstep(flatZone, flatZone + uRadius, abs(worldY));

  float angle = worldY * uTwistMax * strength;
  
  float c = cos(angle);
  float s = sin(angle);
  float x = modelPos.x * c - modelPos.z * s;
  float z = modelPos.x * s + modelPos.z * c;
  modelPos.x = x;
  modelPos.z = z;

  gl_Position = projectionMatrix * viewMatrix * modelPos;
  vUv = uv;
}