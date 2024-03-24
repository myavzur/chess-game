import { Colors } from "models/Colors"
import { Player } from "models/Player"
import React, { useEffect, useRef, useState } from "react"

interface TimerProps {
  currentPlayer: Player | null
  restart: () => void
}

const Timer: React.FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300)
  const [whiteTime, setWhiteTime] = useState(300)
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }

    const callback = currentPlayer?.color === Colors.WHITE ? decrWhiteTimer : decrBlackTimer

    timer.current = setInterval(callback, 1000)
  }

  function decrBlackTimer() {
    setBlackTime(prev => prev - 1)
  }

  function decrWhiteTimer() {
    setWhiteTime(prev => prev - 1)
  }

  const handleRestart = () => {
    setWhiteTime(300)
    setBlackTime(300)
    restart()
  }

  return (
    <div className="timer">
      <button className="timer__restart" onClick={handleRestart}>Restart Game</button>

      <p className="timer__player">
        Черные - <span className="timer__time">{blackTime}</span>
      </p>

      <p className="timer__player">
        Белые - <span className="timer__time">{whiteTime}</span>
      </p>
    </div>
  )
}

export default Timer