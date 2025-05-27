import React from 'react';
import DataProductMarketplace from './components/DataProductCatalog.jsx';
import DataProductCatalog from "./components/DataProductCatalog.jsx"; // Импортируем ваш компонент
// Если у вас был файл App.css и вы хотите его использовать для стилей App,
// раскомментируйте следующую строку. Но основные стили теперь через Tailwind и index.css
// import './App.css';

function App() {
  return (
    <div> {/* Вы можете использовать div или React.Fragment (<></>) в качестве обертки */}
      <DataProductCatalog />
    </div>
  );
}

export default App;