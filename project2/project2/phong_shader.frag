#version 400

layout (location = 0) out vec4 FragColor;

flat in vec3 color;
in vec3 position;
in vec3 normal;
uniform int light_id;
uniform mat4 camera_matrix;
uniform vec3 reflectance;

const float shininess = 20.0f;
//const vec3 light_position = vec3(0.0, 0.0, 0.0);


struct LightInfo{
	vec4 light_position;
};

 LightInfo lights[4];

vec3 ads(int light_index )
{
  vec3 n = normal;

  if (!gl_FrontFacing)
	n = -n;
  vec3 l=vec3(lights[light_index].light_position.x,lights[light_index].light_position.y,lights[light_index].light_position.z);
  vec3 s = normalize( l- position);
  vec3 v = normalize(-position);
  vec3 r = normalize(reflect(-s, n));
  float s_dot_n = max(dot(s, n), 0.0);
  

  return color * s_dot_n + (s_dot_n > 0 ? color * reflectance.x * pow(max(dot(r, v), 0.0), shininess) : vec3(0.0));
}

void main()
{
	int num_of_lights=0;
	if(mod(light_id,2)==0)
	{
		lights[num_of_lights].light_position=camera_matrix*vec4(0.0,100.0,0.0,1.0);
		num_of_lights++;
	}
	if(mod(light_id,3)==0)
	{
		lights[num_of_lights].light_position=camera_matrix*vec4(200.0,0.0,100.0,1.0);
		num_of_lights++;
	}
	if(mod(light_id,5)==0)
	{
		lights[num_of_lights].light_position=camera_matrix*vec4(-200.0,0.0,100.0,1.0);
		num_of_lights++;
	}
	if(mod(light_id,7)==0)
	{
		lights[num_of_lights].light_position=camera_matrix*vec4(0.0,-200.0,0.0,1.0);
		num_of_lights++;
	}

	vec4 temp;
	for(int i=0;i<num_of_lights;i++)
	{
		
		 temp += vec4(ads(i), 1.0);
	}
	
	FragColor=temp+vec4(color*0.2,0.1);//add ambient
	//FragColor = vec4(ads(), 1.0);
}
