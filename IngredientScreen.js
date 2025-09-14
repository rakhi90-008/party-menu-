import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import mockData from '../mockData.json';

export default function IngredientScreen(){
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dish = state?.dish || mockData.find(d => String(d.id) === String(id));

  const mockIngredients = [
    {name:'Paneer', qty:'200g'}, {name:'Onion', qty:'1 large'}, {name:'Capsicum', qty:'1/2'}, {name:'Oil', qty:'2 tbsp'}
  ];

  if(!dish) return <div>Dish not found</div>;

  return (
    <div>
      <button className="btn" onClick={()=>navigate(-1)} style={{marginBottom:12}}>Back</button>
      <h3>{dish.name}</h3>
      <p>{dish.description}</p>
      <h4>Ingredients</h4>
      <ul>
        {mockIngredients.map((it,i)=> <li key={i}>{it.name} - {it.qty}</li>)}
      </ul>
    </div>
  );
}
