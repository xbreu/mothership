#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}