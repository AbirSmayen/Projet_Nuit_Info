from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.2"

print("⏳ Loading model...")

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    torch_dtype=torch.float16,
    device_map="auto"
)

print(" Model Loaded !")

def generate_answer(prompt: str):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    output = model.generate(**inputs, max_new_tokens=200)
    return tokenizer.decode(output[0], skip_special_tokens=True)
