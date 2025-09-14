import React from 'react';
export default function CategoryTabs({mealTypes, active, onChange, countsByMeal={}}){
  return (
    <div className="tabs" role="tablist" aria-label="meal categories">
      {mealTypes.map(m => (
        <div
          key={m}
          role="tab"
          className={'tab '+(active===m?'active':'')}
          onClick={()=>onChange(m)}
        >
          {m} <span style={{marginLeft:6, fontSize:12, opacity:0.9}}>({countsByMeal[m]||0})</span>
        </div>
      ))}
    </div>
  );
}
