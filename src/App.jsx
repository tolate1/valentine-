
import { useState } from 'react'
import './index.css'
import cartuGif from './assets/cartu.gif'
import yunoGif from './assets/yuno-cute.gif'

const phrases = [
  "Нет",
  "Ты хорошо подумала?",
  "Мне кажется ты перепутала кнопки!",
  "Подумай еще разок!",
  "Не разбивай мне сердце...",
  "Я буду плакать...",
  "Ну пожалуйста, кексик!",
  "Я куплю тебе шоколадку!",
  "И цветы!",
  "Может все-таки да?",
  "Хватит ломаться)",
  "Ну скажи ДАААА!",
  "Будь умничкой и нажми на ДА!",
  "Ладно, я спрошу еще раз...",
  "Ты разбиваешь мне сердце ;(",
  "Очень очень грустно...",
  "Я тебе печеньку дам!",
  "Ну котиииик...",
  "Не будь такой букой!",
  "Я всё прощу!",
  "Люблю тебя!",
  "Ну даваааай!",
  "Последний шанс!",
  "Точно нет?",
  "А если подумать?",
  "Сердце болит...",
  "Ну позязя!",
  "Ты самая лучшая!",
  "Может передумаешь?",
  "Я настойчивый!",
  "Ну нажми уже на ДА!",
  "Я же тут стараюсь!",
  "Ну пожалуйста, ну давай!",
  "Не растрайвай меня..",
  "Я Начинаю злиться..",
  "Отвечай Да и я забуду про этот сюр",
  "Последний шанс",
];


function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  // State for locks: array of objects to track animation and position
  const [locks, setLocks] = useState([
    { id: 0, isBroken: false, style: { top: '-10px', left: '10%' } },
    { id: 1, isBroken: false, style: { top: '-10px', right: '10%' } },
    { id: 2, isBroken: false, style: { bottom: '-10px', left: '20%' } },
    { id: 3, isBroken: false, style: { bottom: '-10px', right: '20%' } },
    { id: 4, isBroken: false, style: { top: '50%', right: '-10px', transform: 'translateY(-50%)' } }, // Right edge
  ]);
  const [isShaking, setIsShaking] = useState(false);
  const [noChoice, setNoChoice] = useState(false);

  // Increase cap to allow it to get quite big, but CSS will constrain it to viewport
  const yesButtonSize = Math.min(noCount * 20 + 16, 300);

  function handleNoClick() {
    // Locks only active after 10 clicks
    if (noCount >= 10) {
      const firstUnbrokenIndex = locks.findIndex(lock => !lock.isBroken);
      if (firstUnbrokenIndex !== -1) {
        const newLocks = [...locks];
        newLocks[firstUnbrokenIndex].isBroken = true;
        setLocks(newLocks);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setNoCount(noCount + 1); // Increment noCount even if a lock is broken
        return;
      }
    }



    if (noCount >= phrases.length - 1) {
      setNoChoice(true);
      return;
    }

    setNoCount(noCount + 1);
  }

  const allLocksBroken = locks.every(lock => lock.isBroken);
  const showLocks = noCount >= 10 && !allLocksBroken;

  function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  if (yesPressed) {
    return (
      <div className={`container ${noChoice ? 'bg-red-gradient' : ''}`}>
        <div className="glass-card">
          <img
            src="https://media1.tenor.com/m/gUiu1zyxfzYAAAAC/bear-kiss-bear-kisses.gif"
            alt="bear-kiss"
            className="bear-img"
          />
          <div className="text text-success">Ура!!! Я люблю тебя!! ❤️</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${noChoice ? 'bg-red-gradient' : ''}`}>
      <div className="glass-card">
        {noChoice ? (
          <img
            src={yunoGif}
            alt="yuno-crazy"
            className="bear-img"
          />
        ) : (
          <img
            src={cartuGif}
            alt="bear-asking"
            className="bear-img"
          />
        )}
        <h1 className="text">{noChoice ? "Ты не оставила мне выбора..." : "Будешь моим Валентином?"}</h1>
        <div className="buttons">
          <button
            className="btn btn-yes"
            style={{ fontSize: yesButtonSize }}
            onClick={() => setYesPressed(true)}
          >
            {noChoice && <span className="arrow arrow-left">👉</span>}
            Да
            {noChoice && <span className="arrow arrow-right">👈</span>}
          </button>
          <button
            onClick={handleNoClick}
            className={`btn btn-no ${isShaking ? 'shake' : ''}`}
            style={noChoice ? { display: 'none' } : {}}
          >
            <span className="no-text">{!showLocks ? getNoButtonText() : 'Нет'}</span>
            {showLocks && (
              <div className="locks">
                {locks.map((lock) => (
                  <img
                    key={lock.id}
                    src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
                    alt="lock"
                    className={`lock-icon ${lock.isBroken ? 'broken' : ''}`}
                    style={lock.style}
                  />
                ))}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
