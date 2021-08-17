import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RiShuffleLine, RiSkipBackFill, RiSkipForwardFill, RiRepeat2Line, RiPlayCircleFill, RiPauseCircleFill, RiVolumeUpLine, RiVolumeMuteLine } from 'react-icons/ri';
import './AudioBar.css';

function AudioBar() {
    const currSong = JSON.parse(localStorage.getItem('currSong'));
    const currPlaylist = JSON.parse(localStorage.getItem('currPlaylist'));

    const dispatch = useDispatch();
    const { index, startSong } = useSelector(state => state.playlist);

    const [ isPlaying, setPlayPauseClick ] = useState(false);
    const [ isLoop, setRepeatClick ] = useState(false);
    const [ trackProgress, setTrackProgress ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ trackIndex, setTrackIndex ] = useState(0);

    const audioElement = useRef();
    const intervalRef = useRef();

    const  currentPercent = duration ? `${(trackProgress/duration) * 100}` : 0;
    const trackStyling = `linear-gradient(90deg, #73d99f ${currentPercent}%, transparent ${currentPercent}%)`;

    useEffect(() => {
        if(isPlaying) {
            audioElement.current.play();
            startTimer();
        } else {
            audioElement.current.pause();
        }
    }, [isPlaying])

    useEffect(() => {
        if(currPlaylist) {
            dispatch({
                type: 'GET_CURRSONG_IN_PLAYLIST',
                payload: currPlaylist[trackIndex].name
            })
            if(startSong) {
                setTrackIndex(index);
                dispatch({
                    type: 'PLAY_PAUSE_PLAYLIST',
                    payload: {
                        startSong: false
                    }
                })
            }
        }
    }, [isPlaying, trackIndex])

    const handlePlayBtn = () => {
        setPlayPauseClick(!isPlaying);
    }

    const handleRepeatBtn = () => {
        setRepeatClick(!isLoop);
        audioElement.current.loop = isLoop;
    }

    const toNextTrack = () => {
        if(trackIndex < currPlaylist.length - 1) {
            setTrackIndex(prevIndex => prevIndex + 1);
        }
        else if(trackIndex === currPlaylist.length - 1) {
            setTrackIndex(0);
        }
        else {
            setTrackIndex(0);
        }
    }

    const startTimer = () => {
        clearInterval(intervalRef.current);

        if(audioElement.current !== null) {
            setDuration(audioElement.current.duration);
        }

        intervalRef.current = setInterval(() => {
            if(audioElement.current.ended) {
                if(currPlaylist) {
                    toNextTrack();
                }
                else {
                    setPlayPauseClick(false);
                }
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

    const onLoadedMetadata = () => {
        if(audioElement.current) {
            setDuration(audioElement.current.duration);
        }
    }

    useEffect(() => {
        audioElement.current.play();
    }, [trackIndex])

    return (
        <div className="player">
            <div className="audio-control-bar">
                {
                    currSong && (
                        <div className="audio-info-bar">
                            <div className="audio-track">
                                <img src={currSong.image} alt="" id="song-image"/>
                            </div>
                            <div className="audio-content">
                                <Link to={`/song/${currSong.slug}`}><span id="song-name">{currSong.name}</span></Link>
                                <br/>
                                <Link to={'/artist/'}><span id="song-artist">{currSong.artist}</span></Link>
                                <audio 
                                    id="song-audio"
                                    ref={audioElement} 
                                    src={currSong.audio}
                                    onLoadedMetadata={onLoadedMetadata}
                                ></audio>
                            </div>
                        </div>
                    )
                }  
                {
                    currPlaylist && (
                        <div className="audio-info-bar" id={trackIndex}>
                            <div className="audio-track">
                                <img src={currPlaylist[trackIndex].image} alt="" id="song-image"/>
                            </div>
                            <div className="audio-content">
                                <Link to={`/song/${currPlaylist[trackIndex].slug}`}><span id="song-name">{currPlaylist[trackIndex].name}</span></Link>
                                <br/>
                                <Link to={'/artist/'}><span id="song-artist">{currPlaylist[trackIndex].artist}</span></Link>
                                <audio 
                                    id="song-audio"
                                    ref={audioElement} 
                                    src={currPlaylist[trackIndex].audio}
                                    onLoadedMetadata={onLoadedMetadata}
                                ></audio>
                            </div>
                        </div>
                    )
                }
                <div className="control-bar">
                    <div className="control-bar__controls">
                        <button className="btn btn-random" title="Random"><RiShuffleLine/></button>
                        <button className="btn btn-prev"><RiSkipBackFill/></button>
                        <button 
                            id="btn-play"
                            className="btn btn-toggle-play" 
                            onClick={handlePlayBtn}
                        >
                            { !isPlaying ? (
                                <RiPlayCircleFill className="icon-play"/>
                            ) : (
                                <RiPauseCircleFill className="icon-pause"/>
                            )}
                        </button>
                        <button className="btn btn-next" onClick={toNextTrack}><RiSkipForwardFill/></button>
                        <button 
                            onClick={handleRepeatBtn}
                            className={ isLoop ? 'btn btn-repeat looping' : 'btn btn-repeat' }
                        >
                            <RiRepeat2Line/>
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
                            <RiVolumeUpLine className="icon-unmute"/>
                            <RiVolumeMuteLine className="icon-mute"/>
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
