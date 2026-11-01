uniform sampler2D uTexture;

varying vec2 vUv;
varying float vY;

void main() {

    vec4 imageTexture = texture2D(uTexture, vUv);
    vec3 tintedTexture = imageTexture.rgb * vec3(0.95, 0.55, 0.15);
    imageTexture.rgb = mix(imageTexture.rgb, tintedTexture, 0.5);    
    imageTexture.rgb *= vec3(1.0, 0.8, 0.7);
    

    if (!gl_FrontFacing) {
        imageTexture.rgb *= 0.2;
    }
    gl_FragColor = imageTexture;

    #include <colorspace_fragment>

}