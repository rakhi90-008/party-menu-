import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import mockData from './mockData.json';
import CategoryTabs from './components/CategoryTabs';
import DishList from './components/DishList';
import IngredientScreen from './components/IngredientScreen';

const MEAL_TYPES = ['STARTER','MAIN COURSE','DESSERT','SIDES'];

export default function App(){
  const [mealType, setMealType] = useState('MAIN COURSE');
  const [query, setQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const navigate = useNavigate();

  const dishes = mockData;

  const filteredByMeal = useMemo(()=> dishes.filter(d=> d.mealType === mealType), [dishes, mealType]);

  const filtered = useMemo(()=>{
    let list = filteredByMeal;
    if(query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(d => d.name.toLowerCase().includes(q));
    }
    if(vegOnly && !nonVegOnly) list = list.filter(d => d.type === 'VEG');
    if(nonVegOnly && !vegOnly) list = list.filter(d => d.type === 'NON_VEG');
    return list;
  }, [filteredByMeal, query, vegOnly, nonVegOnly]);

  const countsByMeal = useMemo(()=>{
    const map = {};
    MEAL_TYPES.forEach(m => map[m] = 0);
    dishes.forEach(d => {
      if(selectedIds.has(d.id)) map[d.mealType] = (map[d.mealType]||0) + 1;
    });
    return map;
  }, [dishes, selectedIds]);

  const totalSelected = selectedIds.size;

  const toggleSelect = (id)=>{
    setSelectedIds(prev=>{
      const s = new Set(prev);
      if(s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  return (
    <div className="app">
      <h2>Party Menu Selection</h2>
      <CategoryTabs
        mealTypes={MEAL_TYPES}
        active={mealType}
        countsByMeal={countsByMeal}
        onChange={setMealType}
      />
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <input
          placeholder="Search dishes in this category..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          style={{flex:1, padding:8, borderRadius:6, border:'1px solid #ccc'}}
        />
        <label style={{display:'flex', alignItems:'center', gap:6}}>
          <input type="checkbox" checked={vegOnly} onChange={(e)=>setVegOnly(e.target.checked)} /> Veg
        </label>
        <label style={{display:'flex', alignItems:'center', gap:6}}>
          <input type="checkbox" checked={nonVegOnly} onChange={(e)=>setNonVegOnly(e.target.checked)} /> Non-Veg
        </label>
      </div>

      <Routes>
        <Route path="/" element={
          <DishList
            dishes={filtered}
            onToggleSelect={toggleSelect}
            selectedIds={selectedIds}
            onOpenIngredients={(dish)=> navigate('/ingredients/'+dish.id, {state: {dish}})}
          />
        } />
        <Route path="/ingredients/:id" element={<IngredientScreen />} />
      </Routes>

      <div className="summary">
        <div>
          <strong>Selected per category:</strong>&nbsp;
          {MEAL_TYPES.map(mt => (
            <span key={mt} style={{marginRight:8}} className="pill">{mt.split(' ')[0]}: {countsByMeal[mt]||0}</span>
          ))}
        </div>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <div><strong>Total:</strong> <span className="pill">{totalSelected}</span></div>
          <button className="btn primary">Continue</button>
        </div>
      </div>
    </div>
  );
}
