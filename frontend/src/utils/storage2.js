import axios from 'axios';

// バックエンドAPIのURL
const API_URL = 'http://localhost:5001/api'; // エンドポイントは適切に変更してください

// バックエンドからレシピを取得する関数
export async function loadRecipesFromBackend() {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data || [];
  } catch (error) {
    console.error('Failed to load recipes from backend:', error);
    return [];
  }
}

// バックエンドにレシピを保存
export async function saveRecipesToBackend(recipes) {
    console.log('Sending recipes to backend:', recipes); // デバッグ用ログ
    try {
      const response = await axios.post(`${API_URL}/recipes`, { recipes });
      console.log('Recipes saved successfully:', response.data);
    } catch (error) {
      console.error('Failed to save recipes to backend:', error);
      throw error;
    }
  }