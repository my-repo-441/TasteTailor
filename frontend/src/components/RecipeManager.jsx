import React from 'react';
import RecipeList from './RecipeList';
import RecipeModal from './RecipeModal';

const RecipeManager = ({
    generatedRecipes,
    selectedRecipe,
    isModalOpen,
    openModal,
    handleSaveRecipe,
    handleDeleteRecipe,
    setIsModalOpen,
}) => (
    <>
        <RecipeList
            generatedRecipes={generatedRecipes}
            openModal={openModal}
            onSave={handleSaveRecipe}
            onDelete={handleDeleteRecipe}
        />
        <RecipeModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            recipe={selectedRecipe?.recipe || ''}
            imageUrl={selectedRecipe?.imageUrl || ''}
            onSave={handleSaveRecipe}
            onDelete={handleDeleteRecipe}
        />
    </>
);

export default RecipeManager;
