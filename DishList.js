import React from 'react';
import DishCard from './DishCard';

export default function DishList({dishes, onToggleSelect, selectedIds, onOpenIngredients}){
  if(!dishes.length) return <div>No dishes found.</div>;
  return (
    <div className="dish-grid" role="list">
      {dishes.map(d => (
        <DishCard
          key={d.id}
          dish={d}
          isSelected={selectedIds.has(d.id)}
          onToggle={()=>onToggleSelect(d.id)}
          onIngredients={()=>onOpenIngredients(d)}
        />
      ))}
    </div>
  );
}
