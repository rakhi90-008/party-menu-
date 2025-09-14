import React from 'react';
export default function DishCard({dish, isSelected, onToggle, onIngredients}){
  return (
    <div className="card" role="listitem" aria-label={dish.name}>
      <div className="img">
        {dish.image ? <img src={dish.image} alt={dish.name} style={{maxHeight:110}} /> : <div style={{textAlign:'center'}}>{dish.type}</div>}
      </div>
      <h4 style={{margin:'6px 0'}}>{dish.name}</h4>
      <div style={{fontSize:13, marginBottom:8}}>{dish.description}</div>
      <div className="controls">
        <button className="btn" onClick={onToggle}>{isSelected ? 'Remove' : 'Add'}</button>
        <button className="btn" onClick={onIngredients}>Ingredients</button>
        {isSelected && <span className="pill">Added</span>}
      </div>
    </div>
  );
}
