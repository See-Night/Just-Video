import React from 'react'
import '@/app/index.css'
import PlayBtn from './video-play-btn'
import VolumeBar from './video-volume-bar'
import VideoProgressBar from './video-progress-bar'
import SpeedBar from './video-speed-bar'
import FullScreenBtn from './video-fullscreen-btn'

type PropsType = {}
type StateType = {
    src: string
    volume: number
    fullscreen: boolean
    paused: boolean
    duration: number
    current_time: number
    speed: number
    controlShow: boolean
}

interface VideoPlayer {
    props: PropsType
    state: StateType
}

class VideoPlayer extends React.Component {
    videoNode: HTMLVideoElement | null = null
    maskNode: HTMLElement | null = null

    Timer: any

    constructor(props: PropsType) {
        super(props)

        this.state = {
            src: "",
            volume: 1,
            fullscreen: false,
            paused: true,
            duration: 0,
            current_time: 0,
            speed: 1,
            controlShow: true
        }

        this.videoNode = null

        this.createTimer = this.createTimer.bind(this)
        this.deleteTimer = this.deleteTimer.bind(this)
    }

    // Instantiate a Video.js player when the component mounts
    componentDidMount() {

        // PWA file handler
        if ("launchQueue" in window) {
            // IDE will probably report an error here 👇, because React doesn't have a launchQueue variable. 
            // Don't worry, it won't affect PWA
            launchQueue.setConsumer(async (launchParams) => {
                for (const f of launchParams.files) {
                    this.setState({
                        src: URL.createObjectURL(await f.getFile())
                    })
                }
            })
        }

        this.maskNode?.focus()
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.videoNode) {
            this.videoNode.addEventListener("loadedmetadata", e => {
                this.setState({
                    duration: this.videoNode?.duration
                })
            })

            this.videoNode.ontimeupdate = () => {
                this.setState({
                    current_time: this.videoNode?.currentTime
                })
            }
        }
    }

    controlShortCut(e: React.KeyboardEvent) {
        console.log(e.key)
        switch (e.key) {
            case "ArrowRight": this.videoForward(); break
            case "ArrowLeft": this.videoBackward(); break
            case "ArrowUp": this.volumeUp(); break
            case "ArrowDown": this.volumeDown(); break
            case " ": if (this.videoNode) this.videoNode.paused ? this.play() : this.pause(); break
            case "m": if (this.videoNode) this.videoNode.volume === 0 ? this.soundOn() : this.soundOff(); break
            case "f": e.preventDefault(); this.fullScreen(); break
        }
    }

    fileDropIn(e: React.DragEvent) {
        e.preventDefault()
        let src = URL.createObjectURL(e.dataTransfer.files[0])
        this.setState({
            src,
            paused: false,
        })
    }

    videoForward() {
        if (this.videoNode) {
            console.log(this.videoNode.currentTime)
            let time_temp = this.videoNode.currentTime + 5
            this.videoNode.currentTime = time_temp > this.videoNode.duration ? this.videoNode.duration : time_temp
            console.log(this.videoNode.currentTime)
        }
    }

    videoBackward() {
        if (this.videoNode) {
            let time_temp = this.videoNode.currentTime - 5
            this.videoNode.currentTime = time_temp < 0 ? 0 : time_temp
        }
    }

    volumeUp() {
        if (this.videoNode) {
            let volume_temp = this.videoNode.volume + 0.05
            this.videoNode.volume = volume_temp > 1 ? 1 : volume_temp
            this.setState({
                volume: this.videoNode.volume
            })
        }
    }

    volumeDown() {
        if (this.videoNode) {
            let volume_temp = this.videoNode.volume - 0.05
            this.videoNode.volume = volume_temp < 0 ? 0 : volume_temp
            this.setState({
                volume: this.videoNode.volume
            })
        }
    }

    play() {
        if (this.videoNode) {
            this.videoNode.play()
            this.setState({
                paused: false
            })
        }
    }

    pause() {
        if (this.videoNode) {
            this.videoNode.pause()
            this.setState({
                paused: true
            })
        }
    }

    soundOff() {
        if (this.videoNode) {
            this.setState({
                volume: this.videoNode.volume
            })
            this.videoNode.volume = 0
        }
    }

    soundOn() {
        if (this.videoNode) {
            if (this.state.volume > 1) this.videoNode.volume = 1
            else if (this.state.volume < 0) this.videoNode.volume = 0
        }
    }

    fullScreen() {
        if (this.videoNode) {
            if (this.state.fullscreen) {
                this.setState({
                    fullscreen: false
                }, () => document.exitFullscreen())
            }
            else {
                this.setState({
                    fullscreen: true
                }, () => {
                    // Webkit full screen API, ignore this error
                    document.getElementById("video-player")?.requestFullscreen()
                })
            }
        }
    }

    changeVolume(volume: number) {
        if (volume > 1) volume = 1
        else if (volume < 0) volume = 0

        this.setState({
            volume
        }, () => this.soundOn())
    }

    changeCurrentTime(time: number) {
        this.setState({
            current_time: time
        }, () => {
            if (this.videoNode) {
                this.videoNode.currentTime = time
            }
        })
    }

    changeSpeed(speed: number) {
        this.setState({
            speed
        }, () => {
            if (this.videoNode) {
                this.videoNode.playbackRate = speed
            }
        })
    }

    createTimer() {
        if (this.videoNode && this.state.src != "") {
            this.Timer = setInterval(() => {
                this.setState({
                    controlShow: false
                })

                let body = document.querySelector("body")
                if (body) body.style.cursor = "none"
            }, 1000)
        }
    }

    deleteTimer() {
        if (this.videoNode && this.videoNode.src != "") {
            this.setState({
                controlShow: true
            })
            let body = document.querySelector("body")
            if (body) body.style.cursor = "auto"
            clearInterval(this.Timer)
        }
    }

    render() {
        return (
            <div id='video-player'>
                <video ref={node => this.videoNode = node} src={this.state.src} autoPlay className="w-screen h-screen z-10 relative"></video>
                <div ref={node => this.maskNode = node} className='w-screen h-screen absolute z-[2147483647] top-0 left-0 overflow-visible' id='mask' style={{ overlay: "auto" }} tabIndex={-1} onKeyDown={this.controlShortCut.bind(this)} onDragOver={e => e.preventDefault()} onDrop={this.fileDropIn.bind(this)}>
                    <div className='w-full h-full' onDoubleClick={e => this.fullScreen()} onMouseMove={e => { this.deleteTimer(); this.createTimer() }} ></div>
                    <div id='control-bar' className={`w-full h-12 absolute bottom-8 left-0 flex flex-row justify-center transition-opacity items-end ${this.state.controlShow ? "opacity-1" : "opacity-0"}`} onMouseEnter={e => this.deleteTimer()} onMouseLeave={e => this.createTimer()}>
                        <PlayBtn paused={this.state.paused} play={this.play.bind(this)} pause={this.pause.bind(this)}></PlayBtn>
                        <VolumeBar volume={this.state.volume} changeVolume={this.changeVolume.bind(this)}></VolumeBar>
                        <VideoProgressBar duration={this.state.duration} current_time={this.state.current_time} changeCurrentTime={this.changeCurrentTime.bind(this)}></VideoProgressBar>
                        <SpeedBar changeSpeed={this.changeSpeed.bind(this)} speed={this.state.speed}></SpeedBar>
                        <FullScreenBtn fullscreen={this.state.fullscreen} fullScreen={this.fullScreen.bind(this)}></FullScreenBtn>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoPlayer