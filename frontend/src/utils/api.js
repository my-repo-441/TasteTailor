export async function processImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://127.0.0.1:5001/api/process-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.ingredients; // 認識された食材を返す
}

export async function fetchRecipe(ingredients) {
  const response = await fetch('http://127.0.0.1:5001/api/openai', { // フルURLを指定
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
   console.log("API Response:", data); // デバッグ用にレスポンス内容を確認
  return {
    recipe: data.recipe,
    imageUrl: data.image_url,
  }; // レシピを返す
}
