'use client'

import React from 'react';

type StateType = {
    beforeVolume: number,
    url: string
}
type PropsType = {}

interface Home {
    props: PropsType,
    state: StateType
}

class Home extends React.Component {
    constructor(props: PropsType) {
        super(props)

        this.state = {
            beforeVolume: 1,
            url: ""
        }

        this.soundOn = this.soundOn.bind(this)
        this.soundOff = this.soundOff.bind(this)
        this.control = this.control.bind(this)
        this.fileDropIn = this.fileDropIn.bind(this)
    }

    componentDidMount(): void {
        let video = document.getElementsByTagName("video")[0]
        if ("launchQueue" in window) {
            // Your IDE will probably report an error here 👇, because React doesn't have a launchQueue variable. 
            // Don't worry, it won't affect PWA
            launchQueue.setConsumer(async (launchParams) => {
                for (const f of launchParams.files) {
                    this.setState({
                        url: URL.createObjectURL(await f.getFile())
                    })
                }
            })
        }
        video.focus()
    }

    control(e: React.KeyboardEvent) {
        let video = document.getElementsByTagName("video")[0]
        switch (e.key) {
            case "ArrowRight": this.fastForward(video); break;
            case "ArrowLeft": this.rewind(video); break;
            case "ArrowUp": this.volumeUp(video); break;
            case "ArrowDown": this.volumeDown(video); break;
            case "m": video.volume === 0 ? this.soundOn(video) : this.soundOff(video); break;
            case "Pause": this.pause(video); break;
            case "Play": this.play(video); break;
        }
    }

    fileDropIn(e: React.DragEvent) {
        e.preventDefault()
        let url = URL.createObjectURL(e.dataTransfer.files[0])
        this.setState({
            url
        })
    }

    fastForward(video: HTMLVideoElement) {
        video.currentTime += 5
    }

    rewind(video: HTMLVideoElement) {
        video.currentTime -= 5
    }

    play(video: HTMLVideoElement) {
        video.play()
    }

    pause(video: HTMLVideoElement) {
        video.pause()
    }

    soundOff(video: HTMLVideoElement) {
        this.setState({
            beforeVolume: video.volume
        }, () => video.volume = 0)
    }

    soundOn(video: HTMLVideoElement) {
        video.volume = this.state.beforeVolume
    }

    volumeUp(video: HTMLVideoElement) {
        if (video.volume < 0.95) video.volume += 0.05
        else video.volume = 1
    }

    volumeDown(video: HTMLVideoElement) {
        if (video.volume > 0.05) video.volume -= 0.05
        else video.volume = 0
    }

    render(): React.ReactNode {
        return (
            <div className='w-screen h-screen'>
                <video id="video" className='w-screen h-screen z-10' autoPlay controls onKeyDown={this.control} src={this.state.url} onEnded={e => this.setState({ url: "" })}>
                </video>
                <div className={`w-screen h-screen fixed top-0 left-0 z-20 flex justify-center items-center bg-black opacity-50 ${this.state.url == "" ? "" : "hidden"}`} id='mask' onDragOver={e => e.preventDefault()} onDrop={this.fileDropIn}>
                </div>
            </div>
        )
    }
}

export default Home;