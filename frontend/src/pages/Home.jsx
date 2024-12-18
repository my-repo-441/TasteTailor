import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../contexts/RecipeContext';
import AvailableIngredients from '../components/AvailableIngredients';
import SelectedIngredients from '../components/SelectedIngredients';
import RecipeManager from '../components/RecipeManager';
import RecipeActions from '../components/RecipeActions';
import { fetchRecipe } from '../utils/api';
import { loadRecipesFromBackend, saveRecipesToBackend } from '../utils/storage2';
import styles from './Home.module.css';
import logo from '../../assets/images/taste-tailor-logo.png';

const Home = () => {
    const [generatedRecipes, setGeneratedRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const { selectedIngredients, setSelectedIngredients, recipes, setRecipes } = useContext(RecipeContext);
    const [loading, setLoading] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [availableIngredients, setAvailableIngredients] = useState([
        { id: 1, name: 'トマト', icon: '🍅' },
        { id: 2, name: '卵', icon: '🥚' },
        { id: 3, name: 'チーズ', icon: '🧀' },
        { id: 4, name: 'ぶどう', icon: '🍇' },
        { id: 5, name: '牛乳', icon: '🥛' },
        { id: 6, name: 'パン', icon: '🍞' },
        { id: 7, name: 'きのこ', icon: '🍄' },
        { id: 8, name: '葉物野菜', icon: '🥬' },
        { id: 9, name: '玉ねぎ', icon: '🧅' },
        { id: 10, name: 'ニンニク', icon: '🧄' },
        { id: 11, name: 'ブロッコリー', icon: '🥦' },
    ]);
    console.log(availableIngredients);
    console.log(selectedIngredients);
    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const recipes = await loadRecipesFromBackend();
                setSavedRecipes(recipes);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchSavedRecipes();
    }, []);

    const handleDropToSelected = (item) => {
        console.log("ドロップされたアイテム");
        //冷蔵庫ビューから選択された食材へ移動
        setAvailableIngredients((prev) =>
            prev.filter((ing) => ing.id !== item.id)
        );
        setSelectedIngredients((prev) => {
            if (prev.some((ing) => ing.id === item.id)) return prev;
            return [...prev, item]
        });
    };

    const handleDropToAvailable = (item) => {
        //選択された食材から冷蔵庫ビューへ移動
        setSelectedIngredients((prev) =>
            prev.filter((ing) => ing.id !== item.id)
        );
        setAvailableIngredients((prev) => {
            if (prev.some((ing) => ing.id === item.id)) return prev;
            return [...prev, item]
        });
    };

    const generateRecipe = async () => {
        setLoading(true);
        const ingredientNames = selectedIngredients.map((ingredient) => ingredient.name);
        try {
            const { recipe, imageUrl } = await fetchRecipe(ingredientNames);
            setGeneratedRecipes((prevRecipes) => [
                ...prevRecipes,
                {
                    title: `レシピ ${prevRecipes.length + 1}`,
                    recipe: recipe || '詳細がありません',
                    imageUrl: imageUrl || '',
                },
            ]);
            console.log(generateRecipe);
        } catch (error) {
            console.error('Error generating recipe:', error);
        }
        setLoading(false);
    };

    const handleSaveRecipe = async (updatedRecipe) => {
        const updatedRecipes = generatedRecipes.map((r) => (r === selectedRecipe ? updatedRecipe : r));
        setRecipes(updatedRecipes);

        try {
            await saveRecipesToBackend(updatedRecipes);
        } catch (error) {
            console.error('Failed to save recipe from backend:', error);
        }
    };

    const handleDeleteRecipe = async (index) => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);
        setRecipes(updatedRecipes);

        try {
            await saveRecipesToBackend(updatedRecipes);
        } catch (error) {
            console.error('Failed to delete recipe from backend:', error);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <img src={logo} alt="TasteTailor ロゴ" className={styles.logo} />
                <h1>TasteTailor</h1>
            </header>
            <div className={styles.ingredientsContainer}>
                <AvailableIngredients
                    ingredients={availableIngredients}
                    onDrop={handleDropToAvailable}
                />
                <SelectedIngredients
                    ingredients={selectedIngredients}
                    onDrop={handleDropToSelected}
                />
            </div>
            <RecipeActions
                loading={loading}
                generateRecipe={generateRecipe}
                disabled={loading || selectedIngredients.length === 0}
            />
            <RecipeManager
                generatedRecipes={generatedRecipes}
                selectedRecipe={selectedRecipe}
                isModalOpen={isModalOpen}
                openModal={setSelectedRecipe}
                handleSaveRecipe={handleSaveRecipe}
                handleDeleteRecipe={handleDeleteRecipe}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
};

export default Home;
