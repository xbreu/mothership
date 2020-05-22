#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    float factor = vVertexPosition[0];
    gl_FragColor = vec4(0.5 + factor, 0.5 - factor, 0.0, 1.0);
}