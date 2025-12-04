from transformers import AutoTokenizer, AutoModelForCausalLM

model_name = "TheBloke/Mistral-7B-Instruct-v0.2-GGUF"

tokenizer = AutoTokenizer.from_pretrained(model_name, cache_dir="../ia_models/mistral-7b", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(model_name, cache_dir="../ia_models/mistral-7b", device_map="auto", trust_remote_code=True)

def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    output = model.generate(**inputs, max_new_tokens=200)
    return tokenizer.decode(output[0], skip_special_tokens=True)

import sys
if __name__ == "__main__":
    prompt = " ".join(sys.argv[1:])
    print(generate_response(prompt))
