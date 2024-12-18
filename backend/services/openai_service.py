import re
from openai import OpenAI
from config import Config

client = OpenAI()

# OpenAI APIキーの設定
OPENAI_API_KEY = Config.OPENAI_API_KEY

def generate_recipe(ingredients):
    prompt = f"食材: {', '.join(ingredients)}"
     
    # OpenAI APIにリクエストを送信してレシピを生成
    messages = [
        {"role": "system", "content": "あなたはプロのシェフです。次の食材を使ったおいしいレシピを考えてください。出力する際は、以下のような形式にしてください。料理名：「」材料：「」、作り方：「」"},
        {"role": "user", "content": prompt}
    ]
        
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=2000
    )
    
    recipe = response.choices[0].message.content.strip()
    print(recipe)
    
    return recipe

def generate_recipe_img(recipe_name):
    response_img = client.images.generate(
      model="dall-e-3",
      prompt = recipe_name + "食欲をそそるような食に特化したイラストでお願いします。",
      size="1024x1024",
      quality="standard",
      n=1,
    )

    image_url = response_img.data[0].url
    return image_url
    
def extract_recipe_name(recipe):
    """
    レシピ文字列から料理名を抽出する関数
    """
    match = re.search(r'料理名：「(.*?)」', recipe)  # 「料理名：「」」内の文字列を取得
    if match:
        return match.group(1)  # マッチした部分を返す
    return None  # 料理名が見つからない場合

# def extract_recipe_ingredients(recipe):
#     """
#     レシピ文字列から材料を抽出する関数
#     """
#     match = re.search(r'材料：「([\s\S]*?)」', recipe)  # 改行を含めて全体をマッチ

#     if match:
#         return match.group(1)  # マッチした部分を返す
#     return None  # 材料名が見つからない場合

def generate_recipe_and_image(ingredients):
    recipe = generate_recipe(ingredients)

    # 料理名を抽出
    recipe_name = extract_recipe_name(recipe)

    # # 材料名を抽出
    # recipe_ingredient_name = extract_recipe_ingredients(recipe)


    if recipe_name:
        print(f"抽出した料理名: {recipe_name}")
        image_url = generate_recipe_img(recipe_name)
        print(f"生成された画像URL: {image_url}")
        return {"recipe": recipe, "image_url": image_url}
    else:
        print("料理名が見つかりませんでした。")
        return {"recipe": recipe, "image_url": None}