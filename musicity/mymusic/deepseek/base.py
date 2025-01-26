from openai import OpenAI
import os


class DeepSeekModel:
    def __init__(self):
        api_key = os.getenv('DEEPSEEK_API')
        self.client = OpenAI(
            api_key=api_key,
            base_url='https://api.deepseek.com'
        )

    def prompt(self, *messages):
        response = self.client.chat.completions.create(
            model='deepseek-chat',
            messages=[
                # {"role": "system", "content": "You are a helpful assistant"},
                {"role": "user", "content": "Hello"},
            ],
            stream=False
        )
        print(response.choices)
