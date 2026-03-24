import { useState } from 'react';

import { books, diplomas as init } from './data/storage';
import { createDiploma, searchDiploma } from './logic/Logic';
import { decisions as initDecisions } from './data/storage';
import { increaseView } from './logic/Logic';

import DecisionList from './controllers/decisionList';
import DiplomaControl from './controllers/diplomaControl';
import DiplomaList from './controllers/diplomaList';
import SearchControl from './controllers/searchControl';
import SearchResult from './controllers/searchResult';

export default function Thuchanh4() {

  const [list, setList] = useState(init);
  const [result, setResult] = useState<any[]>([]);
  const [decisionList, setDecisionList] = useState(initDecisions);

  const handleAdd = (data: any) => {
    try {
      const d = createDiploma(data, books);

      const newList = [d, ...list];
      setList(newList);

      localStorage.setItem("diplomas", JSON.stringify(newList));

    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleSearch = (query: any) => {
  try {

    const res = searchDiploma(list, query);
    setResult(res);

    // tăng view theo decision
    let updated = decisionList;

    res.forEach(d => {
      updated = increaseView(updated, d.decisionId);
    });

    setDecisionList(updated);

  } catch (e: any) {
    alert(e.message);
  }
};

  return (
    <div>

      <h2>Thêm văn bằng</h2>
      <DiplomaControl 
      onAdd={handleAdd}
      decisions={decisionList}
       />

      <DiplomaList diplomas={list} />

      <h2>Quyết định</h2>
      <DecisionList decisions={decisionList} />

      <h2>Tra cứu</h2>
      <SearchControl onSearch={handleSearch} />

      <SearchResult data={result} />

    </div>
  );
}
