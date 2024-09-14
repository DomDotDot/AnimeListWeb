const { useState, useEffect } = React;

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    // Загрузка данных из localStorage или из JSON файла
    const savedAnime = localStorage.getItem('animeList');
    if (savedAnime) {
      setAnimeList(JSON.parse(savedAnime));
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('animeList', JSON.stringify(data));
    setAnimeList(data);
  };

  const handleCardClick = (anime) => {
    setSelectedAnime(anime);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAnime(null);
  };

  const handleCreateCard = () => {
    // Логика для создания карточки
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(animeList);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'anime_cards.json';
    link.click();
  };

  const importFromJSON = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      saveToLocalStorage(importedData);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <button onClick={handleCreateCard}>Создать карточку</button>
      <button onClick={exportToJSON}>Экспорт JSON</button>
      <input type="file" onChange={importFromJSON} />

      <div className="anime-grid">
        {animeList.map((anime) => (
          <div className="card" key={anime.id} onClick={() => handleCardClick(anime)}>
            <img src={anime.image} alt={anime.titleRomaji} />
            <div className="card-content">
              <div className="card-title">{anime.titleRomaji}</div>
              <div className="card-subtitle">{anime.titleRus} / {anime.titleEng}</div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal active" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedAnime.image} alt={selectedAnime.titleRomaji} />
            <h1>{selectedAnime.titleRomaji}</h1>
            <p>{selectedAnime.titleRus} / {selectedAnime.titleEng}</p>
            <p>Жанры: {selectedAnime.genres.join(', ')}</p>
            <p>Эпизоды: {selectedAnime.episodes}</p>
            <p>Статус: {selectedAnime.status}</p>
            {/* Чеклист, рейтинг и комментарий */}
            <button onClick={handleModalClose}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
