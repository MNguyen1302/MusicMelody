import React, { useState, useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { FacebookShareButton,
         FacebookMessengerShareButton, 
         TwitterShareButton,
         TelegramShareButton,
         LineShareButton,
         RedditShareButton } from 'react-share';
import { FacebookIcon, 
         FacebookMessengerIcon, 
         TwitterIcon,
         TelegramIcon,
         LineIcon,
         RedditIcon } from 'react-share';
import { HiOutlineLink } from 'react-icons/hi';
import './Share.css';

function Share(props) {
    const [ isCopied, setIsCopied ] = useState(false);
    const inputRef = useRef(null);

    const handleClosePopup = () => {
        props.closeShareModal(false);
    }

    const copyToClipboard = (e) => {
        inputRef.current.select();
        document.execCommand('copy');

        e.target.focus();
        setIsCopied(true);
    }
    return (
        <div className="share-popup-background">
            <div className="share-popup-wrapper">
                <div className="share-popup-title">
                    <span>Share Modal</span>
                    <span><RiCloseLine onClick={handleClosePopup}/></span>
                </div>
                <div className="share-popup-container">
                    <div className="share-popup-media">
                        <FacebookShareButton
                            url='https://tainhacmienphi.mobi/bai-hat/2446/tai-bai-hat-online-run-free-mp3-hot.html'
                        >
                            <FacebookIcon size="40" round/>
                        </FacebookShareButton>
                        <FacebookMessengerShareButton
                            url='https://tainhacmienphi.mobi/bai-hat/2446/tai-bai-hat-online-run-free-mp3-hot.html'
                        >
                            <FacebookMessengerIcon size="40" round/>
                        </FacebookMessengerShareButton>
                        <TwitterShareButton 
                            url='https://tainhacmienphi.mobi/bai-hat/2446/tai-bai-hat-online-run-free-mp3-hot.html'
                        >
                            <TwitterIcon size="40" round/>
                        </TwitterShareButton>
                        <TelegramShareButton
                            url="https://tainhacmienphi.mobi/bai-hat/2446/tai-bai-hat-online-run-free-mp3-hot.html"
                        >
                            <TelegramIcon size="40" round/>
                        </TelegramShareButton>
                        <LineShareButton
                            url='https://tainhacmienphi.mobi/bai-hat/2446/tai-bai-hat-online-run-free-mp3-hot.html'
                        >
                            <LineIcon size="40" round/>
                        </LineShareButton>
                        <RedditShareButton	
                            url='https://tainhacmienphi.mobi/bai-hat/2446/tai-bai-hat-online-run-free-mp3-hot.html'
                        >
                            <RedditIcon size="40" round/>
                        </RedditShareButton>
                    </div>
                    <div className="share-popup-link-box">
                        <div className="share-popup-text">
                            Copy a link
                        </div>
                        <div className={ isCopied ? "share-popup-field active" : "share-popup-field"}>
                            <HiOutlineLink/>
                            <input
                                type="text"
                                ref={inputRef}
                                value={window.location.href}
                                readOnly
                            />
                            <button onClick={copyToClipboard}>Copy</button>
                        </div>
                    </div>
                </div>
                {/* <form className="edit-popup-form" onSubmit={handleSubmit}>
                    <div className="edit-popup-container">
                        <div className="edit-popup-upload">
                            <div className="edit-popup-image">
                                <img src={imgPreview ? imgPreview : props.playlist.image} alt=""/>
                                <div className="edit-popup-click">
                                    <RiEditFill onClick={handleFileInput}/>
                                </div>
                                <input 
                                    type="file" 
                                    id="file" 
                                    name="image"
                                    ref={inputRef}
                                    style={{ display: 'none' }} 
                                    onChange={handleChangeImage}
                                />
                            </div>
                        </div>
                        <div className="edit-popup-input-container">
                            <div className="edit-popup-input">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    defaultValue={props.playlist.name}
                                    name="name"
                                    onChange={handleChange}    
                                /> 
                            </div>
                            <div className="edit-popup-input">
                                <label>Description</label>
                                <textarea 
                                    name="description"
                                    placeholder="Write your description..."    
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="btn-edit-popup">
                        <button>Save</button>
                    </div>
                </form> */}
            </div>
        </div>
    )
}

export default Share
