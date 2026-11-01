uniform sampler2D uTexture;

varying vec2 vUv;
varying float vY;

void main() {
    vec4 texture = texture(uTexture, vUv);

    if (!gl_FrontFacing) {
        texture.rgb *= 0.2;
    }
    gl_FragColor = texture;

    #include <colorspace_fragment>

}