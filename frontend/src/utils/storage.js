// 保存されたレシピを取得する関数
export function loadRecipes() {
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

// レシピ一覧を完全に保存する関数
export function saveRecipesToStorage(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

// 選択した食材を保存する関数
export function saveSelectedIngredients(selectedIngredients) {
  localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
}

// 保存された選択した食材を取得する関数
export function loadSelectedIngredients() {
  return JSON.parse(localStorage.getItem('selectedIngredients')) || [];
}
