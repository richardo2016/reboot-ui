import React from 'react'

const ASSETS = {
    Bg: `https://pbs.twimg.com/profile_banners/743958196138606593/1499726692/1500x500`,
    Avatar: `https://pbs.twimg.com/profile_images/1169233148003213313/9OWvs7hT_400x400.jpg`,
}

import './index.styl'
import { rclassnames } from '../../../utils/react-like'

export default ({
    ...props
}) => {
    return (
        <div
            {...props}
            className={rclassnames(props, 'preact-twitter')}
        >
            <div className="img-container bg-wrapper">
                <img src={ASSETS.Bg} />
            </div>
            <div className="profile-container">
                <div className="avatar-wrapper img-container" style={{maxWidth: 230}}>
                    <img src={ASSETS.Avatar} />
                </div>

                <div className="profile-text-content">
                    <div className="bar J-operation top">
                        <div className="button-wrapper">
                            <div className="button J_more">...</div>
                        </div>

                        <div className="button-wrapper">
                            <div className="button J_follow">关注</div>
                        </div>
                    </div>

                    <div className="names" style={{marginBottom: 10}}>
                        <div className="bar nickname">
                            <b className="nickname-wrapper">Preact</b>
                        </div>

                        <div className="bar twitterid">
                            <b className="twitterid-wrapper">@preact</b>
                        </div>
                    </div>

                    <div className="bar introduction" style={{marginBottom: 10}}>
                        <p className="introduction-wrapper">
                            Fast 3kb alternative to React with the same ES6 API. Slack chat: 
                            <a className="no-deco" href="//preact-slack.now.sh">preact-slack.now.sh</a>
                        </p>
                    </div>

                    <div className="bar otherinfo" style={{marginBottom: 15}}>
                        <p className="otherinfo-wrapper">
                            <a
                                className="info-item"
                                href="https://t.co/3FknfdSZXC?amp=1"
                                target="_blank"
                                role="link"
                                data-focusable="true"
                                rel=" noopener noreferrer"
                            >
                                <svg viewBox="0 0 24 24" className="info-item-icon"><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path></g></svg>
                                preactjs.com
                            </a>

                            <span
                                className="info-item"
                            >
                                <svg viewBox="0 0 24 24" className="info-item-icon"><g><path d="M7.75 11.083c-.414 0-.75-.336-.75-.75C7 7.393 9.243 5 12 5c.414 0 .75.336.75.75s-.336.75-.75.75c-1.93 0-3.5 1.72-3.5 3.833 0 .414-.336.75-.75.75z"></path><path d="M20.75 10.333c0-5.01-3.925-9.083-8.75-9.083s-8.75 4.074-8.75 9.083c0 4.605 3.32 8.412 7.605 8.997l-1.7 1.83c-.137.145-.173.357-.093.54.08.182.26.3.46.3h4.957c.198 0 .378-.118.457-.3.08-.183.044-.395-.092-.54l-1.7-1.83c4.285-.585 7.605-4.392 7.605-8.997zM12 17.917c-3.998 0-7.25-3.402-7.25-7.584S8.002 2.75 12 2.75s7.25 3.4 7.25 7.583-3.252 7.584-7.25 7.584z"></path></g></svg>
                                出生于 9月10日
                            </span>
                            <span
                                className="info-item"
                            >
                                <svg viewBox="0 0 24 24" className="info-item-icon"><g><path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path><circle cx="7.032" cy="8.75" r="1.285"></circle><circle cx="7.032" cy="13.156" r="1.285"></circle><circle cx="16.968" cy="8.75" r="1.285"></circle><circle cx="16.968" cy="13.156" r="1.285"></circle><circle cx="12" cy="8.75" r="1.285"></circle><circle cx="12" cy="13.156" r="1.285"></circle><circle cx="7.032" cy="17.486" r="1.285"></circle><circle cx="12" cy="17.486" r="1.285"></circle></g></svg>
                                2016年6月 加入
                            </span>
                        </p>
                    </div>

                    <div className="bar followinfo">
                        <p className="followinfo-wrapper">
                            <span className="followinfo-item">
                                <b>380</b>
                                正在关注
                            </span>

                            <span className="followinfo-item">
                                <b>1.3 万个</b>
                                关注者
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}