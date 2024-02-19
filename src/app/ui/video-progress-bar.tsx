import React from "react"

type PropsType = {
    duration: number
    current_time: number

    changeCurrentTime: (time: number) => void
}
type StateType = {
    onClick: boolean
}

interface VideoProgressBar {
    props: PropsType
    state: StateType
}

class VideoProgressBar extends React.Component {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            onClick: false
        }
    }

    changeCurrentTime(t: number) {
        this.props.changeCurrentTime(t)
    }

    onClick(e: React.MouseEvent) {
        let video_progress_bar = document.getElementById("video-progress-bar")
        if (video_progress_bar) {
            let current_time: number = this.props.duration * ((e.clientX - video_progress_bar.offsetLeft) / video_progress_bar.clientWidth)
            this.changeCurrentTime(current_time)
        }
    }

    dragCurrentTime(e: React.MouseEvent) {
        if (this.state.onClick) {
            let video_progress_bar = document.getElementById("video-progress-bar")
            if (video_progress_bar) {
                let current_time: number = this.props.duration * ((e.clientX - video_progress_bar.offsetLeft) / video_progress_bar.clientWidth)
                this.changeCurrentTime(current_time)
            }
        }
    }

    render(): React.ReactNode {
        return (
            <div className="control-video-panel" id="video-progress-bar"
                onMouseDown={e => this.setState({ onClick: true })}
                onMouseUp={e => this.setState({ onClick: false })}
                onClick={this.onClick.bind(this)}
                onMouseMove={this.dragCurrentTime.bind(this)}
                onMouseLeave={e => this.setState({ onClick: false })}>
                <div
                    className="bg-white h-full contrast-125"
                    style={{
                        width: `${(this.props.current_time / this.props.duration * 100).toFixed(2)}%`
                    }}></div>
            </div>
        )
    }
}

export default VideoProgressBar