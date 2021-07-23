import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AudioBar.css';

function AudioBar() {
    const { currSong } = useSelector(state => state.song); 
    const [ isPlaying, setPlayPauseClick ] = useState(false);
    const [ isLoop, setRepeatClick ] = useState(false);
    const [ trackProgress, setTrackProgress ] = useState(0);
    const [ duration, setDuration ] = useState(0);

    const audioElement = useRef();
    const intervalRef = useRef();

    const  currentPercent = duration ? `${(trackProgress/duration) * 100}` : 0;
    const trackStyling = `linear-gradient(90deg, #73d99f ${currentPercent}%, transparent ${currentPercent}%)`

    const handlePlayBtn = () => {
        setPlayPauseClick(!isPlaying);
    }

    const handleRepeatBtn = () => {
        setRepeatClick(!isLoop);
    }

    useEffect(() => {
        audioElement.current.loop = isLoop;
        if(isPlaying) {
            audioElement.current.play();
            startTimer();
        } else {
            audioElement.current.pause();
        }
    }, [isPlaying])

    const startTimer = () => {
        clearInterval(intervalRef.current);

        if(audioElement.current !== null) {
            setDuration(audioElement.current.duration);
        }

        intervalRef.current = setInterval(() => {
            if(audioElement.current.ended) {
                setPlayPauseClick(false);
            } else {
                setTrackProgress(audioElement.current.currentTime);
            }  
        }, [1000])
        
    }
    
    const onTimeUpdate = (value) => {
        clearInterval(intervalRef.current);
        audioElement.current.currentTime = value;
        setTrackProgress(audioElement.current.currentTime);
    }

    const onChangeTime = () => {
        if(!isPlaying) {
            setPlayPauseClick(true);
        }
        startTimer();
    }

    const formatTime = function(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);

        if(seconds < 10) {
            return "0" + minutes + ":" + "0" + seconds;
        }
        return "0" + minutes + ":" + seconds;
    }

    return (
        <div className="player">
            <div className="audio-control-bar">
                <div className="audio-info-bar">
                    <div className="audio-track">
                        {
                            currSong !== null && (
                                <img src={currSong.image} alt="" id="song-image"/>
                            )
                        }
                    </div>
                    <div className="audio-content">
                        <Link to={currSong !== null && ('/song/' + currSong.slug)}><span id="song-name">{currSong !== null && currSong.name}</span></Link>
                        <br/>
                        <Link to='/artist'><span id="song-artist">{currSong !== null && currSong.artist}</span></Link>
                        <audio 
                            id="song-audio"
                            ref={audioElement} 
                            src={currSong !== null && currSong.audio}
                        ></audio>
                    </div>
                </div>  
                <div className="control-bar">
                    <div className="control-bar__controls">
                        <button className="btn btn-random" title="Random"><i className="ri-shuffle-line"></i></button>
                        <button className="btn btn-prev"><i className="ri-skip-back-fill"></i></button>
                        <button 
                            id="btn-play"
                            className="btn btn-toggle-play" 
                            onClick={handlePlayBtn}
                        >
                            { !isPlaying ? (
                                <i className="ri-play-circle-fill icon-play"></i>
                            ) : (
                                <i className="ri-pause-circle-fill icon-pause"></i>
                            )}
                        </button>
                        <button className="btn btn-next"><i className="ri-skip-forward-fill"></i></button>
                        <button 
                            onClick={handleRepeatBtn}
                            className={ isLoop ? 'btn btn-repeat looping' : 'btn btn-repeat' }
                        >
                            <i className="ri-repeat-2-line"></i>
                        </button>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-bar__current">
                            <span className="current-time">{formatTime(trackProgress)}</span>
                        </div>
                        <div className="progress-bar__slider">
                                <input 
                                    id="myRange"
                                    type="range" 
                                    value={trackProgress}
                                    step="1"
                                    min="0"
                                    max={duration ? duration : `${duration}`}
                                    className="progress__level"
                                    onChange={(e) => onTimeUpdate(e.target.value)}
                                    onMouseUp={onChangeTime}
                                    onKeyUp={onChangeTime}
                                    style={{ backgroundImage: trackStyling }}
                                ></input>
                        </div>
                        <div className="progress-bar__duration">
                            <span className="duration-time">{ duration ? formatTime(duration) : '00:00'}</span>
                        </div>
                    </div>
                </div>
                <div className="extra-control">
                    <div className="volume-container">
                        <button className="volume-toggle">
                            <i className="ri-volume-up-line icon-unmute"></i>
                            <i className="ri-volume-mute-line icon-mute"></i>
                        </button>
                        <div className="volume-slider">
                            <div className="volume-slider__total">
                                <div className="volume-slider__level"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default AudioBar;
